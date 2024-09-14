from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Lista para almacenar las puntuaciones
high_scores = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit-score', methods=['POST'])
def submit_score():
    data = request.json
    initials = data['initials']
    score = data['score']
    high_scores.append({'initials': initials, 'score': score})
    high_scores.sort(key=lambda x: x['score'], reverse=True)
    high_scores[:] = high_scores[:10]  # Mantener solo los 10 mejores
    return jsonify({'success': True})

@app.route('/highscores')
def get_highscores():
    return jsonify(high_scores)

if __name__ == '__main__':
    app.run(debug=True)
