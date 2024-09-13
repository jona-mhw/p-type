from flask import Flask, send_from_directory, send_file
import os

app = Flask(__name__)

@app.route('/')
def index():
    if os.path.exists('index.html'):
        return send_file('index.html')
    return "Bienvenido al servidor del juego R-Type!"

@app.route('/<path:path>')
def serve_file(path):
    if os.path.exists(path):
        return send_file(path)
    return "Archivo no encontrado", 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
