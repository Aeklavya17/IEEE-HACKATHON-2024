from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2 import sql
import bcrypt
import jwt  
import datetime

app = Flask(__name__)
CORS(app)

# Database connection parameters
DB_HOST = 'localhost'
DB_NAME = 'healthsphere'
DB_USER = 'postgres'
DB_PASS = 'admin'
SECRET_KEY = 'your_jwt_secret_key'

def execute_procedure(proc_name, *args):
    try:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASS
        )
        cur = conn.cursor()

        # Create a placeholder for each argument
        placeholders = ', '.join(['%s'] * len(args))
        
        # Use CALL for procedures
        query = sql.SQL("CALL {}({});").format(sql.Identifier(proc_name), sql.SQL(placeholders))
        cur.execute(query, args)

        # Check if there are OUT parameters and fetch them if needed
        if cur.description:
            # Return the first value of the first row if an OUT parameter is present
            return cur.fetchone()[0]  
        else:
            conn.commit()  # Commit the transaction if no OUT parameters
            return True  # Indicate success
            
    except Exception as e:
        print(f"An error occurred: {e}")
        return False
    finally:
        # Close the cursor and connection
        if cur:
            cur.close()
        if conn:
            conn.close()



@app.route('/add_doctor', methods=['POST'])
def add_doctor():
    data = request.json
    try:
        # Retrieve fields and validate
        name = data.get('name')
        specialization = data.get('specialization')
        contact = data.get('contact')

        # Check for required fields
        if name is None or specialization is None or contact is None:
            return jsonify({"error": "All fields are required"}), 400

        # Print debug information to validate input
        print(f"name: {name}, specialization: {specialization}, contact: {contact}")

        # Call the procedure
        execute_procedure('insert_doctor', name, specialization, contact)

        return jsonify({"message": "Doctor added successfully"}), 201

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "Internal Server Error"}), 500



@app.route('/add_blood_pressure', methods=['POST'])
def add_blood_pressure():
    data = request.json
    try:
        # Retrieve fields and validate
        user_id = data.get('user_id')
        systolic = data.get('systolic')
        diastolic = data.get('diastolic')
        pulse = data.get('pulse')

        # Validate input data
        if user_id is None or systolic is None or diastolic is None or pulse is None:
            return jsonify({"error": "All fields are required"}), 400

        # Convert data types
        user_id = int(user_id)
        systolic = int(systolic)
        diastolic = int(diastolic)
        pulse = int(pulse)

        # Print debug information to validate input
        print(f"user_id: {user_id}, systolic: {systolic}, diastolic: {diastolic}, pulse: {pulse}")

        # Call the procedure
        with psycopg2.connect(host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASS) as conn:
            with conn.cursor() as cur:
                cur.execute("CALL insert_blood_pressure(%s, %s, %s, %s);", (user_id, systolic, diastolic, pulse))

                # If your BloodPressure table has a primary key oid, fetch it
                cur.execute("SELECT LASTVAL();")
                oid = cur.fetchone()[0]

        return jsonify({"message": "Blood pressure added successfully", "oid": oid}), 201

    except ValueError as ve:
        return jsonify({"error": f"Invalid input type: {str(ve)}"}), 400
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "Internal Server Error"}), 500


@app.route('/add_heart_rate', methods=['POST'])
def add_heart_rate():
    data = request.json
    try:
        # Retrieve fields and validate
        user_id = data.get('user_id')
        heart_rate = data.get('heart_rate')
        stress = data.get('stress')
        o2 = float(data.get('o2'))

        # Check for required fields
        if user_id is None or heart_rate is None or stress is None or o2 is None:
            return jsonify({"error": "All fields are required"}), 400

        # Ensure types are correct
        user_id = int(user_id)  # INT
        heart_rate = int(heart_rate)  # INT
        stress = int(stress)  # INT
        # o2 is already a float

        # Print debug information to validate input
        print(f"user_id: {user_id}, heart_rate: {heart_rate}, stress: {stress}, o2: {o2}")

        # Call the procedure
        with psycopg2.connect(host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASS) as conn:
            with conn.cursor() as cur:
                cur.execute("CALL insert_heart_rate(%s, %s, %s, %s);", (user_id, heart_rate, stress, o2))

                # Fetch the last inserted oid if necessary
                cur.execute("SELECT LASTVAL();")  # Assuming your HeartRate table has an oid
                oid = cur.fetchone()[0]

        return jsonify({"message": "Heart rate added successfully", "oid": oid}), 201

    except ValueError as ve:
        return jsonify({"error": f"Invalid input type: {str(ve)}"}), 400
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "Internal Server Error"}), 500


@app.route('/add_blood_glucose', methods=['POST'])
def add_blood_glucose():
    data = request.json
    try:
        # Retrieve fields and validate
        user_id = data.get('user_id')
        glucose_level = data.get('glucose_level')

        # Check for required fields
        if user_id is None or glucose_level is None:
            return jsonify({"error": "All fields are required"}), 400

        # Ensure types are correct
        user_id = int(user_id)
        glucose_level = float(glucose_level)

        # Print debug information to validate input
        print(f"user_id: {user_id}, glucose_level: {glucose_level}")

        # Call the procedure
        success = execute_procedure('insert_blood_glucose', user_id, glucose_level)

        if success:
            return jsonify({"message": "Blood glucose added successfully"}), 201
        else:
            return jsonify({"error": "Failed to add blood glucose"}), 500

    except ValueError as ve:
        return jsonify({"error": f"Invalid input type: {str(ve)}"}), 400
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "Internal Server Error"}), 500


@app.route('/add_lung_function', methods=['POST'])
def add_lung_function():
    data = request.json
    try:
        # Retrieve fields and validate
        user_id = data.get('user_id')
        fvc = data.get('fvc')
        fev1 = data.get('fev1')
        pef = data.get('pef')

        # Check for required fields
        if user_id is None or fvc is None or fev1 is None or pef is None:
            return jsonify({"error": "All fields are required"}), 400

        # Ensure types are correct
        user_id = int(user_id)
        fvc = float(fvc)
        fev1 = float(fev1)
        pef = float(pef)

        # Print debug information to validate input
        print(f"user_id: {user_id}, fvc: {fvc}, fev1: {fev1}, pef: {pef}")

        # Call the procedure
        success = execute_procedure('insert_lung_function', user_id, fvc, fev1, pef)

        if success:
            return jsonify({"message": "Lung function data added successfully"}), 201
        else:
            return jsonify({"error": "Failed to add lung function data"}), 500

    except ValueError as ve:
        return jsonify({"error": f"Invalid input type: {str(ve)}"}), 400
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "Internal Server Error"}), 500


@app.route('/add_oximeter', methods=['POST'])
def add_oximeter():
    data = request.json
    try:
        # Retrieve fields and validate
        user_id = data.get('user_id')
        spo2 = data.get('spo2')
        perfusion_index = data.get('perfusion_index')
        pulse_rate = data.get('pulse_rate')

        # Check for required fields
        if user_id is None or spo2 is None or perfusion_index is None or pulse_rate is None:
            return jsonify({"error": "All fields are required"}), 400

        # Ensure types are correct
        user_id = int(user_id)  # INT
        spo2 = float(spo2)  # DECIMAL(5, 2)
        perfusion_index = float(perfusion_index)  # DECIMAL(5, 2)
        pulse_rate = int(pulse_rate)  # INT

        # Print debug information to validate input
        print(f"user_id: {user_id}, spo2: {spo2}, perfusion_index: {perfusion_index}, pulse_rate: {pulse_rate}")

        # Call the procedure and fetch the last inserted oid in the same connection
        with psycopg2.connect(host=DB_HOST, database=DB_NAME, user=DB_USER, password=DB_PASS) as conn:
            with conn.cursor() as cur:
                # Call the procedure
                cur.execute("CALL insert_oximeter(%s, %s, %s, %s);", (user_id, spo2, perfusion_index, pulse_rate))
                # Get the last inserted oid
                cur.execute("SELECT LASTVAL();")  # Get the last inserted oid
                oid = cur.fetchone()[0]

        return jsonify({"message": "Oximeter data added successfully", "oid": oid}), 201

    except ValueError as ve:
        return jsonify({"error": f"Invalid input type: {str(ve)}"}), 400
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "Internal Server Error"}), 500


@app.route('/add_user_measurements', methods=['POST'])
def add_user_measurements():
    data = request.json
    try:
        # Retrieve fields and validate
        user_id = data.get('user_id')
        height = data.get('height')
        weight = data.get('weight')
        gender = data.get('gender')

        # Check for required fields
        if user_id is None or height is None or weight is None or gender is None:
            return jsonify({"error": "All fields are required"}), 400

        # Ensure the types are correct (you might want to do more robust checks)
        user_id = int(user_id)
        height = float(height)
        weight = float(weight)
        gender = str(gender)

        # Call the procedure
        success = execute_procedure('insert_user_measurements', user_id, height, weight, gender)

        if success:
            return jsonify({"message": "User measurements added successfully"}), 201
        else:
            return jsonify({"error": "Failed to add user measurements"}), 500

    except ValueError as ve:
        return jsonify({"error": f"Invalid input type: {str(ve)}"}), 400
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "Internal Server Error"}), 500



@app.route('/add_prescription', methods=['POST'])
def add_prescription():
    data = request.json
    try:
        # Retrieve fields and check for None values
        pid = data.get('pid')
        userid = data.get('userid')
        doctorid = data.get('doctorid')
        prescription_date = data.get('prescriptiondate')

        # Check for required fields
        if pid is None or userid is None or doctorid is None or prescription_date is None:
            return jsonify({"error": "All fields are required"}), 400
        
        # Convert to integers
        pid = int(pid)
        userid = int(userid)
        doctorid = int(doctorid)

        # Ensure prescription_date is in the correct format for PostgreSQL (YYYY-MM-DD)
        prescription_date = prescription_date.strip()
        
        # Call the procedure
        success = execute_procedure('insert_prescription', pid, userid, doctorid, prescription_date)

        if success:
            return jsonify({"message": "Prescription added successfully"}), 201
        else:
            return jsonify({"error": "Failed to add prescription"}), 500
    except ValueError as e:
        return jsonify({"error": f"Invalid input type: {str(e)}"}), 400
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
   
   
# Retrive
def your_database_connection_function():
    return psycopg2.connect(
        dbname="healthsphere",
        user="postgres",
        password="admin",
        host="localhost",
        port="5432"
    )

@app.route('/get_user_info', methods=['GET'])
def get_user_info():
    username = request.args.get('username')
    
    if not username:
        return jsonify({"error": "Username is required"}), 400

    conn = None
    cur = None
    try:
        conn = your_database_connection_function()
        cur = conn.cursor()

        # Call the stored procedure
        cur.execute("CALL get_user_info_by_username(%s);", (username,))
        
        # Fetch the results from the user_info_results table
        cur.execute("SELECT info FROM user_info_results;")
        results = cur.fetchall()

        # Format the results into a structured response
        response_data = [result[0] for result in results]

        return jsonify({"data": response_data}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()
            
            
            
# Function to connect to the database
def get_db_connection():
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )

# Function to add a new user with bcrypt hashed password
def insert_user(username, password):
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Hash the password using bcrypt
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Insert the user with the bcrypt hashed password
        cur.execute(
            sql.SQL("INSERT INTO users (username, password) VALUES (%s, %s);"),
            (username, hashed_password.decode('utf-8'))
        )

        conn.commit()
    except Exception as e:
        print(f"An error occurred: {e}")
        return False
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()
    
    return True

# Signup route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Call insert_user function to add user
    success = insert_user(username, password)
    
    if success:
        return jsonify({"message": "User signed up successfully"}), 201
    else:
        return jsonify({"error": "Failed to sign up user"}), 500

# Function to verify user credentials and generate JWT token
def verify_user_and_generate_token(username, password):
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Get the user details from the database
        cur.execute(sql.SQL("SELECT userid, password FROM users WHERE username = %s;"), (username,))
        user = cur.fetchone()

        if user is None:
            return None

        userid, hashed_password = user

        # Verify the provided password with the stored bcrypt hashed password
        if not bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
            return None

        # Generate a JWT token upon successful login
        token = jwt.encode({
            'userid': userid,
            'username': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token valid for 1 hour
        }, SECRET_KEY, algorithm='HS256')

        return token

    except Exception as e:
        print(f"An error occurred: {e}")
        return None
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Verify the user and generate JWT token
    token = verify_user_and_generate_token(username, password)

    if token:
        return jsonify({"token": token}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401

if __name__ == '__main__':
    app.run(debug=True)
