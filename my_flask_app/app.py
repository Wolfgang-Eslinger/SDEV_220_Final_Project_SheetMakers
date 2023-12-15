
from flask import Flask, render_template, redirect, url_for, flash, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from models import Character

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = 'D&D'
db = SQLAlchemy(app)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        # Process the form data here
        # Assuming form data matches the Character model fields
        name = request.form['character_name']
        race = request.form['race']
        class_ = request.form['class']
        
        # Added fields based on updated HTML structure
        strength = request.form['strength']
        dexterity = request.form['dexterity']
        constitution = request.form['constitution']
        intelligence = request.form['intelligence']
        wisdom = request.form['wisdom']
        charisma = request.form['charisma']
        personality_traits = request.form['personality_traits']
        ideals = request.form['ideals']
        bonds = request.form['bonds']
        equipment = request.form['equipment']

        new_character = Character(name=name, race=race, class_=class_, strength=strength, 
                                dexterity=dexterity, constitution=constitution, 
                                intelligence=intelligence, wisdom=wisdom, charisma=charisma, 
                                personality_traits=personality_traits, ideals=ideals, 
                                bonds=bonds, equipment=equipment)
        db.session.add(new_character)
        db.session.commit()
        flash('Character successfully created', 'success')
        # Redirect to a new page or the same with confirmation
        return redirect(url_for('home'))
    else:
        return render_template('home.html')


@app.route('/submit_character', methods=['POST'])
def submit_character():
    # Implement logic to process the character data and save it
    try:
        # Process and save character data
        # For now, just a placeholder to indicate successful operation
        flash('Character submitted successfully!', 'success')
    except Exception as e:
        flash(str(e), 'danger')
    return redirect(url_for('home'))

@app.route('/export_pdf/<int:character_id>')
def export_pdf(character_id):
    # Assuming the pdf_generator.py script is properly set up to generate a PDF
    # The script is located under the "reports" directory
    pdf_path = f'my_flask_app/reports/{character_id}.pdf'  # Update with actual logic to generate/get the PDF
    return send_from_directory(directory='my_flask_app/reports', filename=f'{character_id}.pdf')

if __name__ == '__main__':
    app.run(debug=True)
