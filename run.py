#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
import webbrowser
import socket
import threading
from http.server import HTTPServer, SimpleHTTPRequestHandler

def get_free_port():
    """Tìm cổng TCP còn trống."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('', 0))
        return s.getsockname()[1]

def open_browser(url, delay=1.5):
    """Mở trình duyệt sau một khoảng thời gian ngắn."""
    def _open():
        import time
        time.sleep(delay)
        webbrowser.open(url)
    threading.Thread(target=_open, daemon=True).start()

def main():
    # Xác định thư mục gốc (nơi chứa file index.html)
    root_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(root_dir)

    # Kiểm tra sự tồn tại của file index.html
    if not os.path.isfile("index.html"):
        print("⚠️ Không tìm thấy file index.html trong thư mục hiện tại.")
        print("Hãy đảm bảo file HTML chính có tên là index.html")
        sys.exit(1)

    # Chọn cổng
    port = get_free_port()
    server_address = ('', port)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)

    url = f"http://localhost:{port}"
    print(f"🚀 Đang chạy server tại {url}")
    print("Nhấn Ctrl+C để dừng.")

    # Tự động mở trình duyệt
    open_browser(url)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Đã dừng server.")
        httpd.server_close()
        sys.exit(0)

if __name__ == "__main__":
    main()