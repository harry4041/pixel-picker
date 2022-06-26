from flask import Flask, render_template
app = Flask(__name__)


@app.route('/')
def hello():
    data = [{"id": 0, "x": 1, "y": 1,},  # id will be replaced with the username of the person who took the square
    {"id": "John", "x": 1, "y": 2},
    {"id": "Jacob", "x": 2, "y": 1},
    {"id": "Jingle", "x": 2, "y": 2},
    {"id": "Heimer", "x": 3, "y": 1},
    {"id": "Schmidt", "x": 3, "y": 2}]
    return render_template('index.html', data=data)


if __name__ == "__main__":
    app.run(port=5000)
