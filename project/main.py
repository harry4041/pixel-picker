from flask import Blueprint, render_template, url_for, redirect, request
from flask_login import login_required, current_user
from . import db
from .models import User
from flask_sqlalchemy import SQLAlchemy

main = Blueprint('main', __name__)

@main.route('/')
def index():
    # If user is logged in then true
    if current_user.is_authenticated:
        logged = "true"
    else:
        logged = "false"

    # Get all the users from db, then pass that data to JS where it will be converted to JSON
    user_list = []
    users = User.query.all()
    for user in users:
        user_list.append({c.name: getattr(user, c.name) for c in user.__table__.columns})
    data = user_list

    # Show the main page
    return render_template('index.html', data=data, logged=logged)

@main.route('/', methods=['POST'])
def login_post():
    xAxis = request.form["xPos"]
    yAxis = request.form["yPos"]
    setattr(current_user, "x", xAxis)
    setattr(current_user, "y", yAxis)
    db.session.commit()
    return redirect(url_for('main.index'))


@main.route('/profile')
@login_required
def profile():
    return render_template('profile.html', name=current_user.name)


