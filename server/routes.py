from app import app, db
from flask import request, jsonify
from models import Friend

# Get All Friends (GET)
@app.route('/api/friends', methods=['GET'])
def get_friends():
    friends = Friend.query.all()
    friends_json = [friend.to_json() for friend in friends] # [{...}, {...}, {...}]
    return jsonify(friends_json)



# Create a friend (POST)
@app.route('/api/friends', methods=['POST'])
def create_friend():
    try:
        data = request.json

        # Validations
        required_fields = ["name","role","description","gender"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error":f'Missing required field: {field}'}), 400
        
        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")

        # Fetch avatar image based on gender
        if gender == "Male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "Female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None

        new_friend = Friend(name=name, role=role, description=description, gender=gender, img_url=img_url)

        # This is like "git add ." and then " git commit -m "message" "
        db.session.add(new_friend)
        db.session.commit()

        return jsonify({"message": "Friend created successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# DELETE a friend (DELETE)
@app.route('/api/friends/<int:id>', methods=['DELETE'])
def delete_friend(id):
    try:

        friend = Friend.query.get(id)
        if not friend:
            return jsonify({"error": "Friend not found"}), 404

        db.session.delete(friend)
        db.session.commit()

        return jsonify({"message": "Friend deleted successfully"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# Update a friend (PUT)
@app.route('/api/friends/<int:id>', methods=['PUT'])
def update_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error":"Friend not found"}), 404
        
        data = request.json

        friend.name = data.get("name",friend.name)
        friend.role = data.get("role",friend.role)
        friend.description = data.get("description",friend.description)
        friend.gender = data.get("gender",friend.gender)

        db.session.commit()
        return jsonify(friend.to_json()),200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}),500