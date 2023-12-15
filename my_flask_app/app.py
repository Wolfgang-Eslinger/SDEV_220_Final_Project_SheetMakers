
from flask import Flask, jsonify, render_template, redirect, url_for, flash, request, send_from_directory, current_app
from flask_sqlalchemy import SQLAlchemy
from models import Character
import os
import logging

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = 'D&D'
db = SQLAlchemy(app)
logging.basicConfig(level=logging.INFO)

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
        gold = request.form['gold']

        new_character = Character(name=name, race=race, class_=class_, strength=strength, 
                                dexterity=dexterity, constitution=constitution, 
                                intelligence=intelligence, wisdom=wisdom, charisma=charisma, 
                                personality_traits=personality_traits, ideals=ideals, 
                                bonds=bonds, equipment=equipment, gold=gold)
        db.session.add(new_character)
        db.session.commit()
        flash('Character successfully created', 'success')
        # Redirect to a new page or the same with confirmation
        return redirect(url_for('home'))
    else:
        return render_template('home.html')


@app.route('/submit_character', methods=['POST'])
def submit_character():
    try:
        # Extracting data from the form
        name = request.form['character_name']
        race = request.form['race']
        class_ = request.form['class']
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
        gold = request.form['gold']

        # Creating a new Character object with the form data
        new_character = Character(name=name, race=race, class_=class_, strength=strength,
                                  dexterity=dexterity, constitution=constitution, 
                                  intelligence=intelligence, wisdom=wisdom, charisma=charisma,
                                  personality_traits=personality_traits, ideals=ideals, 
                                  bonds=bonds, equipment=equipment, gold=gold)
        db.session.add(new_character)
        db.session.commit()
        flash('Character submitted successfully!', 'success')
    except Exception as e:
        flash(str(e), 'danger')
    return redirect(url_for('home'))


@app.route('/export_pdf', methods=['POST'])
def export_pdf():
    app.logger.info('Export PDF request received')
    try:
        from reports.pdf_generator import generate_report
        data = request.json
        app.logger.info('Data for PDF generation: %s', data)
        pdf_filename = generate_report(data)
        app.logger.info('PDF generated successfully')
        return send_from_directory(directory=os.path.dirname(pdf_filename),
                                   filename=os.path.basename(pdf_filename),
                                   as_attachment=True)
    except Exception as e:
        app.logger.error('Error generating PDF: %s', e)
        return jsonify({'error': str(e)}), 500



@app.route('/preview_character', methods=['POST'])
def preview_character():
    data = request.json

    try:
        # Example of simple validation
        if 'name' not in data or 'race' not in data:
            return jsonify({'error': 'Missing required fields'}), 400

        # Example of data processing
        processed_data = process_character_data(data)

        # Example of logging
        current_app.logger.info('Processed character data for preview')

        return jsonify(processed_data)
    except Exception as e:
        current_app.logger.error(f'Error processing character data: {e}')
        return jsonify({'error': str(e)}), 500
    

def process_character_data(data):
    # Placeholder for your data processing logic
    # For example, you might modify some values or calculate additional fields
    return data


if __name__ == '__main__':
    app.run(debug=True)
