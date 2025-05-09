from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import json
import os
import shutil
from werkzeug.utils import secure_filename

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

SPECIES_FILE = 'species_data.json'
UPLOAD_FOLDER = 'imagens/individuos'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}

# Create the upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Initialize the species data file if it doesn't exist
if not os.path.exists(SPECIES_FILE):
    with open(SPECIES_FILE, 'w') as f:
        json.dump([], f)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def load_species():
    with open(SPECIES_FILE, 'r') as f:
        return json.load(f)

def save_species(species_list):
    with open(SPECIES_FILE, 'w') as f:
        json.dump(species_list, f, indent=4)

@app.route('/admin.html')
def admin_page():
    return send_from_directory('.', 'admin.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    # Simple authentication (you'll want to improve this in production)
    if username == 'admin' and password == 'password':
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials'})

@app.route('/add_species', methods=['POST'])
def add_species():
    species_name = request.form.get('species-name')
    scientific_name = request.form.get('scientific-name')
    species_description = request.form.get('species-description')
    
    # Handle file upload
    file = request.files.get('species-image')
    
    if not species_name or not scientific_name or not species_description:
        return jsonify({'success': False, 'message': 'Missing required fields'})
    
    if file and allowed_file(file.filename):
        # Secure the filename and save the file
        filename = secure_filename(file.filename)
        # Create a safe filename based on the scientific name
        safe_scientific_name = scientific_name.replace(' ', '-').lower()
        file_extension = filename.rsplit('.', 1)[1].lower()
        new_filename = f"{safe_scientific_name}.{file_extension}"
        file_path = os.path.join(UPLOAD_FOLDER, new_filename)
        file.save(file_path)
        
        # Add the new species to our data
        species_list = load_species()
        new_species = {
            'id': len(species_list) + 1,
            'name': species_name,
            'scientific_name': scientific_name,
            'description': species_description,
            'image_path': f"{UPLOAD_FOLDER}/{new_filename}"
        }
        species_list.append(new_species)
        save_species(species_list)
        
        return jsonify({'success': True, 'message': 'Species added successfully'})
    
    return jsonify({'success': False, 'message': 'Invalid image file'})

@app.route('/get_species', methods=['GET'])
def get_species():
    return jsonify(load_species())

if __name__ == '__main__':
    app.run(debug=True)
