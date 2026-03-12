from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(100), nullable=False)
    position = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), nullable=False, default="Applied")
    deadline = db.Column(db.String(50))