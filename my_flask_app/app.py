from flask import Flask, render_template, redirect, url_for, flash, request
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from models import db, Character

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = 'D&D'
db.init_app(app)




@app.route('/')
def home():
    if request.method == 'POST':
        name = request.form['name']
        race = request.form['race']
        class_ = request.form['class']
        new_character = Character(name=name, race=race, class_=class_)
        db.session.add(new_character)
        db.session.commit()
        return redirect(url_for('character_list'))
    return render_template('home.html')

@app.route('/add_character', methods=['POST'])
def add_character():
    character_name = request.form['name']
    character_level = request.form['level']
    character_race = request.form['race']
    character_class = request.form['class']

    new_character = Character(name=character_name, level=character_level, race=character_race, character_class=character_class)
    db.session.add(new_character)
    db.session.commit()

    return redirect(url_for('character_list'))

@app.route('/submit_character', methods=['POST'])
def submit_character():
    character_name = request.form['name']
    character_level = request.form['level']
    character_race = request.form['race']
    character_class = request.form['class']

    # Add your logic here to process the character data, such as saving it to a database or displaying
    try:
        # Your processing logic here
        pass
    except Exception as e:
        return render_template('error.html', message=str(e))
    return redirect(url_for('character_list'))

@app.route('/submit_character')
def submit_character_form():
    return render_template('submit_character.html')

@app.route('/character_list')
def character_list():
    characters = Character.query.all()
    return render_template('character_list.html', characters=characters)

@app.route('/export_pdf', methods=['POST'])
def export_pdf():
    # Logic to create a PDF from the data
    return send_file('path/to/generated/pdf', as_attachment=True)

@app.route('/preview_character', methods=['POST'])
def preview_character():
    # Process data and generate a preview
    # Return an HTML snippet representing the character sheet
    return render_template('character_preview.html', data=character_data)

@app.route('/create_character')
def create_character():
    return render_template('character_creation.html')

@app.route('/character_sheet/<int:character_id>')
def character_sheet(character_id):
    # Fetch character data based on character_id
    character_data = get_character_data(character_id)  # Replace with actual data retrieval logic
    return render_template('character_sheet.html', character_data=character_data)


def generate_report(character_name, level, gold):
    # Create a new PDF document
    c = canvas.Canvas("character_report.pdf", pagesize=letter)

    # Write some text to the PDF document
    c.drawString(100, 750, f"Character Name: {character_name}")
    c.drawString(100, 730, f"Level: {level}")
    c.drawString(100, 710, f"Gold: {gold}")

    # Save the PDF document
    c.save()

@app.route('/')
def home():
    return render_template('home.html')






if __name__ == '__main__':
    app.run(debug=True)
