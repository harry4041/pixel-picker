from flask import Blueprint, render_template
from flask_login import login_required, current_user
from . import db

main = Blueprint('main', __name__)

@main.route('/')
def index():
    data = [{"id": "Steve", "x": 1, "y": 1,},  # id will be replaced with the username of the person who took the square
    {"id": "John", "x": 1, "y": 2},
    {"id": "Jacob", "x": 2, "y": 1},
    {"id": "Jingle", "x": 2, "y": 2},
    {"id": "Heimer", "x": 3, "y": 1},
    {"id": "Schmidt", "x": 3, "y": 2}]
    return render_template('index.html', data=data)

@main.route('/profile')
@login_required
def profile():
    return render_template('profile.html', name=current_user.name)