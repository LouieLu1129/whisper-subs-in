// Whisper Subs In — ExtendScript side: read sequence info, export audio, import the SRT as a caption track.
// Inspired by AutoSubs (github.com/tmoroney/auto-subs), which showed how to export sequence audio and create caption tracks.
// Every function returns a string: "OK|..." or "ERR|CODE|detail".

var BIN_NAME = "Whisper Subs In";

function ws_esc(s) {
    return String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')
        .replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
}

function ws_timeSec(t) {
    if (t && t.seconds !== undefined) return Number(t.seconds);
    return parseFloat(t) || 0;
}

// Returns "OK|{json}": sequence name, project folder, In/Out, audio tracks
function ws_info() {
    try {
        if (!app.project) return "ERR|NO_PROJECT";
        var seq = app.project.activeSequence;
        if (!seq) return "ERR|NO_SEQUENCE";
        var projDir = app.project.path ? new File(app.project.path).parent.fsName : "";

        var inSec = seq.getInPointAsTime ? ws_timeSec(seq.getInPointAsTime()) : parseFloat(seq.getInPoint());
        var outSec = seq.getOutPointAsTime ? ws_timeSec(seq.getOutPointAsTime()) : parseFloat(seq.getOutPoint());
        var endSec = parseFloat(seq.end) / 254016000000; // seq.end is a ticks string

        var tracks = [];
        for (var i = 0; i < seq.audioTracks.numTracks; i++) {
            var t = seq.audioTracks[i];
            var muted = false;
            try { muted = t.isMuted(); } catch (e) {}
            tracks.push('{"index":' + i + ',"name":"' + ws_esc(t.name) + '","clips":' + t.clips.numItems + ',"muted":' + (muted ? "true" : "false") + '}');
        }
        return 'OK|{"name":"' + ws_esc(seq.name) + '","projDir":"' + ws_esc(projDir) + '","inSec":' + inSec +
            ',"outSec":' + outSec + ',"endSec":' + endSec + ',"tracks":[' + tracks.join(",") + "]}";
    } catch (e) {
        return "ERR|" + e.toString();
    }
}

// useInOut: true exports only In to Out (workAreaType 1)
// trackIndexes: comma-separated 0-based audio track indexes; empty string = all
function ws_exportAudio(outPath, presetPath, useInOut, trackIndexes) {
    var seq = app.project.activeSequence;
    if (!seq) return "ERR|NO_SEQUENCE";
    var preset = new File(presetPath);
    if (!preset.exists) return "ERR|PRESET_MISSING|" + presetPath;

    // Temporarily mute unselected tracks; always restored after export
    var saved = [];
    var wanted = {};
    var filter = trackIndexes !== "";
    if (filter) {
        var parts = trackIndexes.split(",");
        for (var p = 0; p < parts.length; p++) wanted[parseInt(parts[p], 10)] = true;
    }
    try {
        for (var i = 0; i < seq.audioTracks.numTracks; i++) {
            var t = seq.audioTracks[i];
            var was = false;
            try { was = t.isMuted(); } catch (e) {}
            saved.push(was);
            if (filter) t.setMute(wanted[i] ? 0 : 1);
        }
        var result = seq.exportAsMediaDirect(outPath, preset.fsName, useInOut ? 1 : 0);
        if (!new File(outPath).exists) return "ERR|EXPORT_FAILED|" + result;
        return "OK|" + outPath;
    } catch (e) {
        return "ERR|" + e.toString();
    } finally {
        if (filter) {
            for (var k = 0; k < saved.length; k++) {
                try { seq.audioTracks[k].setMute(saved[k] ? 1 : 0); } catch (e) {}
            }
        }
    }
}

function ws_findBin() {
    var root = app.project.rootItem;
    for (var i = 0; i < root.children.numItems; i++) {
        var c = root.children[i];
        if (c.type === ProjectItemType.BIN && c.name === BIN_NAME) return c;
    }
    return root.createBin(BIN_NAME);
}

function ws_findItemByPath(bin, path) {
    var target = new File(path).fsName;
    for (var i = bin.children.numItems - 1; i >= 0; i--) {
        var c = bin.children[i];
        try {
            if (c.getMediaPath && new File(c.getMediaPath()).fsName === target) return c;
        } catch (e) {}
    }
    return null;
}

// startSec: where the caption track starts on the sequence (the In point when using In/Out)
function ws_importSrt(srtPath, startSec) {
    try {
        var seq = app.project.activeSequence;
        if (!seq) return "ERR|NO_SEQUENCE";
        var bin = ws_findBin();
        app.project.importFiles([srtPath], true, bin, false);
        var item = ws_findItemByPath(bin, srtPath);
        if (!item) return "ERR|SRT_NOT_IN_BIN";
        var start = Number(startSec) || 0;
        var fmt = (typeof Sequence !== "undefined" && Sequence.CAPTION_FORMAT_SUBTITLE !== undefined)
            ? Sequence.CAPTION_FORMAT_SUBTITLE : undefined;
        if (fmt !== undefined) seq.createCaptionTrack(item, start, fmt);
        else seq.createCaptionTrack(item, start);
        return "OK|" + item.name;
    } catch (e) {
        return "ERR|" + e.toString();
    }
}
