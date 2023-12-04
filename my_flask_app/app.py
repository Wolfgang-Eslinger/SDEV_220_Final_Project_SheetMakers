from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/export_pdf', methods=['POST'])
def export_pdf():
    # Logic to create a PDF from the data
    return send_file('path/to/generated/pdf', as_attachment=True)

@app.route('/submit_character', methods=['POST'])
def submit_character():
    # Extract form data
    character_name = request.form.get('character_name')
    # Save data and/or send it to the backend for processing
    return redirect(url_for('home'))

@app.route('/preview_character', methods=['POST'])
def preview_character():
    # Process data and generate a preview
    # Return an HTML snippet representing the character sheet
    return render_template('character_preview.html', data=character_data)

@app.route('/submit_character', methods=['POST'])
def submit_character():
    # Extract and process form data
    # Implement your logic here
    return 'Character data received'
