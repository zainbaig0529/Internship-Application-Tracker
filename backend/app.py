from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Application

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///applications.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/applications", methods=["GET"])
def get_applications():
    apps = Application.query.all()
    return jsonify([
        {
            "id": app.id,
            "company": app.company,
            "position": app.position,
            "status": app.status
        }
        for app in apps
    ])

@app.route("/applications", methods=["POST"])
def add_application():
    data = request.get_json()

    new_app = Application(
        company=data["company"],
        position=data["position"],
        status=data.get("status", "Applied")
    )

    db.session.add(new_app)
    db.session.commit()

    return jsonify({"message": "Application added successfully"}), 201

if __name__ == "__main__":
    app.run(debug=True)
