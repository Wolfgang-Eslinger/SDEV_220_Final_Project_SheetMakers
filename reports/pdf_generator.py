from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def generate_report(character_name, level, gold):
    # Create a new PDF document
    c = canvas.Canvas("character_report.pdf", pagesize=letter)

    # Write some text to the PDF document
    c.drawString(100, 750, f"Character Name: {character_name}")
    c.drawString(100, 730, f"Level: {level}")
    c.drawString(100, 710, f"Gold: {gold}")

    # Save the PDF document
    c.save()