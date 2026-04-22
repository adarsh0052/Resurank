import webview

frontend_url = 'http://localhost:5173/'  # or your built site location

webview.create_window("Resume Screener", frontend_url, width=1200, height=800)
webview.start()

