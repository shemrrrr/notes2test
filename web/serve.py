#!/usr/bin/env python3
"""Serve the web app and /alltests without a Node build step."""

import http.server
import socketserver
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WEB = ROOT / "web"
ALLTESTS = ROOT / "alltests"
PORT = 5173


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        """Serve files from the web directory by default."""
        super().__init__(*args, directory=str(WEB), **kwargs)

    def do_GET(self):
        """Serve /alltests JSON files directly while keeping the normal web app behavior."""
        if self.path.startswith("/alltests/"):
            rel = self.path.removeprefix("/alltests/").split("?")[0]
            file_path = ALLTESTS / rel
            if file_path.is_file():
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(file_path.read_bytes())
                return
        return super().do_GET()


if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        httpd.serve_forever()
