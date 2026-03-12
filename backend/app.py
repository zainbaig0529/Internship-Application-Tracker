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
            "status": app.status,
            "deadline": app.deadline
        }
        for app in apps
    ])

@app.route("/applications", methods=["POST"])
def add_application():
    data = request.get_json()

    new_app = Application(
        company=data["company"],
        position=data["position"],
        status=data.get("status", "Applied"),
        deadline=data.get("deadline", "")
    )

    db.session.add(new_app)
    db.session.commit()

    return jsonify({"message": "Application added successfully"}), 201

@app.route("/applications/<int:id>", methods=["DELETE"])
def delete_application(id):
    app = Application.query.get(id)

    if not app:
        return jsonify({"error": "Application not found"}), 404

    db.session.delete(app)
    db.session.commit()

    return jsonify({"message": "Application deleted"})

@app.route("/applications/<int:id>", methods=["PUT"])
def update_application(id):
    data = request.get_json()

    app = Application.query.get(id)

    if not app:
        return jsonify({"error": "Application not found"}), 404

    app.status = data.get("status", app.status)
    db.session.commit()

    return jsonify({"message": "Application updated"})

if __name__ == "__main__":
    app.run(debug=True)