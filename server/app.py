from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

CORS(app)

# DB Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///friends.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# DB Instance
db = SQLAlchemy(app)


# Import all the codes from routes and running them
import routes



# Creating the database table with some kind of optimization as SQL_ALCHEMY needs it
with app.app_context():
    db.create_all()



if __name__ == "__main__":
    # Running the application (debug=True) so as to have better debugging in the console
    app.run(debug=True)