import http.server, os
os.chdir('/Users/anna/Documents/CCSF/Spring 2026/CDEV/website')
handler = http.server.SimpleHTTPRequestHandler
httpd = http.server.HTTPServer(('', 3000), handler)
print('Serving at http://localhost:3000')
httpd.serve_forever()
