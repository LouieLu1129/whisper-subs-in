// Demo data for the README screenshot: fakes Node and Premiere so the real panel can render in WebKit.
window.require = (m) => ({
  fs: { existsSync: () => true, mkdirSync() {}, readdirSync: (d) => d.endsWith("Models") ? [{ name: "ggml-medium.bin", isDirectory: () => false }] : [],
        statSync: () => ({ size: 1.53e9 }), readFileSync: () => "", writeFileSync() {} },
  os: { homedir: () => "/Users/you", tmpdir: () => "/tmp" },
  path: { join: (...a) => a.join("/").replace(/\/+/g, "/"), dirname: (p) => p.split("/").slice(0, -1).join("/"),
          basename: (p, e) => { const b = p.split("/").pop(); return e && b.endsWith(e) ? b.slice(0, -e.length) : b; } },
  child_process: { spawn: () => ({}) },
})[m];
window.__adobe_cep__ = {
  getSystemPath: () => "file:///ext", addEventListener() {},
  getHostEnvironment: () => JSON.stringify({ appSkinInfo: { panelBackgroundColor: { color: { red: 35, green: 35, blue: 35 } } } }),
  evalScript: (c, cb) => cb("OK|" + JSON.stringify({ name: "Interview", projDir: "/p", inSec: 0, outSec: 153, endSec: 153,
    tracks: [{ index: 0, name: "Audio 1", clips: 1, muted: false }, { index: 1, name: "Audio 2", clips: 2, muted: false }, { index: 2, name: "Audio 3", clips: 0, muted: false }] })),
};
window.cep = { fs: {}, util: {} };
// After the panel starts, show the "done" state
window.addEventListener("load", () => setTimeout(() => {
  document.querySelectorAll('#tracks input')[1].checked = false;
  setStatus("Done: 29 captions · Detected English", 100);
  document.getElementById("elapsed").textContent = "0:18";
  document.getElementById("after").style.display = "";
}, 200));
// Look like a docked Premiere panel: panel tab header, blue focus outline, Premiere's blue checkboxes
window.addEventListener("DOMContentLoaded", () => {
  const css = document.createElement("style");
  css.textContent = `
    html { background: #1a1a1a; }
    body { margin: 0; border: 1px solid #2d8ceb; border-radius: 3px; min-height: 100vh; box-sizing: border-box; }
    .demo-tab { display: flex; gap: 10px; align-items: center; margin: -10px -10px 12px; padding: 7px 10px;
                background: #1d1d1d; color: #ddd; font-size: 12px; border-bottom: 1px solid #111; }
    .demo-tab span { color: #888; }
    input[type=checkbox] { accent-color: #2d8ceb; }`;
  document.head.appendChild(css);
  const tab = document.createElement("div");
  tab.className = "demo-tab";
  tab.innerHTML = "Whisper Subs In <span>≡</span>";
  document.body.prepend(tab);
});
// Match Chromium (what Premiere uses): single down chevron on menus, blue checkboxes with a white tick
window.addEventListener("DOMContentLoaded", () => {
  const chevron = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="#ddd" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  const tick = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path d="M3 7.2 5.8 10 11 4.2" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  const css = document.createElement("style");
  css.textContent = `
    select { -webkit-appearance: none; appearance: none; padding-right: 26px;
             background: var(--field) url("${chevron}") no-repeat right 8px center; }
    input[type=checkbox] { -webkit-appearance: none; appearance: none; width: 13px; height: 13px; margin: 0 3px 0 0;
                           border-radius: 3px; background: #fff; border: 1px solid #8a8a8a; }
    input[type=checkbox]:checked { background: #2d8ceb url("${tick}") no-repeat center / 12px; border-color: #2d8ceb; }`;
  document.head.appendChild(css);
});
