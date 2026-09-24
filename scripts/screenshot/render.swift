// Render an HTML file to a PNG with WebKit (used for the README screenshot).
// Usage: swift render.swift <input.html> <output.png> <width> <height>
import AppKit
import WebKit

let args = CommandLine.arguments
let input = URL(fileURLWithPath: args[1])
let output = URL(fileURLWithPath: args[2])
let size = CGSize(width: Double(args[3]) ?? 380, height: Double(args[4]) ?? 520)

final class Renderer: NSObject, WKNavigationDelegate {
  let view = WKWebView(frame: CGRect(origin: .zero, size: size))
  func start() {
    view.navigationDelegate = self
    view.loadFileURL(input, allowingReadAccessTo: input.deletingLastPathComponent())
  }
  func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
    // give the page's own script a moment to fill in the panel
    DispatchQueue.main.asyncAfter(deadline: .now() + 0.8) {
      let config = WKSnapshotConfiguration()
      config.snapshotWidth = NSNumber(value: Double(size.width) * 2)   // 2x for Retina sharpness
      webView.takeSnapshot(with: config) { image, _ in
        guard let image, let tiff = image.tiffRepresentation, let rep = NSBitmapImageRep(data: tiff),
              let png = rep.representation(using: .png, properties: [:]) else { exit(1) }
        try? png.write(to: output)
        exit(0)
      }
    }
  }
}

let app = NSApplication.shared
let window = NSWindow(contentRect: CGRect(origin: .zero, size: size), styleMask: [.borderless], backing: .buffered, defer: false)
let renderer = Renderer()
window.contentView = renderer.view
renderer.start()
app.run()
