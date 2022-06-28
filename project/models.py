from flask import request, render_template
from flask_login import UserMixin
from . import db
from flask_sqlalchemy import SQLAlchemy

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(1000))
    x = db.Column(db.String(1000))
    y = db.Column(db.String(1000))
