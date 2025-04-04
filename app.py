from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__)
app.secret_key = "votre_cle_secrete"

# Initialisation de Firebase avec le fichier de clé
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")
@app.route('/about')
def about():
    return render_template('about.html')  
@app.route('/api/get-images')

@app.route('/informatique')
def informatique():
    return render_template('informatique.html')
@app.route('/design')
def design():
    return render_template('design.html')
@app.route('/softSkills')
def softSkills():
    return render_template('soft_skills.html')

def get_images():
    folder = request.args.get('folder')
    if not folder:
        return jsonify({'error': 'Folder parameter is required'}), 400

    # Construct the full path to the folder
    full_path = os.path.join(app.root_path, folder) # Important for finding static files

    try:
        files = [f for f in os.listdir(full_path) if os.path.isfile(os.path.join(full_path, f))] #List only files
        return jsonify(files)
    except FileNotFoundError:
        return jsonify({'error': 'Folder not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route("/submit", methods=["POST"])
def submit_form():
    # Récupération des données du formulaire
    name = request.form.get("name")
    email = request.form.get("email")
    subject = request.form.get("subject")
    message = request.form.get("message")

    # Vérification : tous les champs doivent être remplis
    if not (name and email and subject and message):
        # Si la requête est AJAX, renvoyer un JSON avec le message d'erreur
        if request.headers.get("X-Requested-With") == "XMLHttpRequest":
            return jsonify({"message": "Tous les champs sont requis.", "status": "error"})
        flash("Tous les champs sont requis.")
        return redirect(url_for("index", _anchor="contact"))
    
    # Préparation des données
    data = {
        "name": name,
        "email": email,
        "subject": subject,
        "message": message
    }

    try:
        # Enregistrement dans Firestore
        db.collection("contacts").add(data)
        success_msg = "Votre message a été envoyé avec succès!"
        if request.headers.get("X-Requested-With") == "XMLHttpRequest":
            return jsonify({"message": success_msg, "status": "success"})
        flash(success_msg)
    except Exception as e:
        error_msg = "Une erreur est survenue lors de l'envoi du message: " + str(e)
        if request.headers.get("X-Requested-With") == "XMLHttpRequest":
            return jsonify({"message": error_msg, "status": "error"})
        flash(error_msg)
    
    return redirect(url_for("index", _anchor="contact"))

if __name__ == "__main__":
    app.run(debug=True)
