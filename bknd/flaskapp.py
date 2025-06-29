from flask import *
from flask_cors import CORS
import sqlite3
import json

app = Flask(__name__)
CORS(app)

# Database initialization
def init_db():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            points INTEGER DEFAULT 0,
            level INTEGER DEFAULT 1,
            missionsCompleted INTEGER DEFAULT 0,
            ecoActions INTEGER DEFAULT 0
        )
    ''')
    conn.commit()
    conn.close()

# Helper function to get database connection
def get_db_connection():
    conn = sqlite3.connect('users.db')
    conn.row_factory = sqlite3.Row  # This allows us to access columns by name
    return conn


@app.route('/<path:path>', methods=['OPTIONS'])
def options(path):
    response = make_response('')
    return add_cors_headers(response)
@app.route('/')
def index():
    return 'Api running'

@app.route('/adduser', methods=['POST'])
def add_user():
    if request.method == 'POST':
        try:
            user = request.json
            
            # Validate required fields
            required_fields = ['id', 'name', 'email', 'password']
            for field in required_fields:
                if field not in user:
                    return jsonify({'message': f'Missing required field: {field}'}), 400
            
            conn = get_db_connection()
            cursor = conn.cursor()
            
            # Insert user into database
            cursor.execute('''
                INSERT INTO users (id, name, email, password, points, level, missionsCompleted, ecoActions)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                user['id'],
                user['name'],
                user['email'],
                user['password'],
                user.get('points', 0),
                user.get('level', 1),
                user.get('missionsCompleted', 0),
                user.get('ecoActions', 0)
            ))
            
            conn.commit()
            conn.close()
            
            return jsonify({'message': 'User added successfully', 'user': user}), 201
            
        except sqlite3.IntegrityError as e:
            return jsonify({'message': 'User with this email already exists'}), 409
        except Exception as e:
            return jsonify({'message': f'Error adding user: {str(e)}'}), 500
    else:
        return jsonify({'message': 'Method not allowed'}), 405

@app.route('/allusers', methods=['GET'])
def get_users():
    if request.method == 'GET':
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM users')
            users = cursor.fetchall()
            conn.close()
            
            # Convert sqlite3.Row objects to dictionaries
            users_list = []
            for user in users:
                user_dict = {
                    'id': user['id'],
                    'name': user['name'],
                    'email': user['email'],
                    'password': user['password'],
                    'points': user['points'],
                    'level': user['level'],
                    'missionsCompleted': user['missionsCompleted'],
                    'ecoActions': user['ecoActions']
                }
                users_list.append(user_dict)
            
            return jsonify(users_list), 200
            
        except Exception as e:
            return jsonify({'message': f'Error retrieving users: {str(e)}'}), 500
    else:
        return jsonify({'message': 'Method not allowed'}), 405


if __name__ == '__main__':
    init_db()  # Initialize database when starting the app
    app.run(debug=True, host='0.0.0.0', port=5000)