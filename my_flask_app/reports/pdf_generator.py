
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def generate_report(data):
    character_name = data['character_name']
    race = data['race']
    class_ = data['class']
    strength = data['strength']
    dexterity = data['dexterity']
    constitution = data['constitution']
    intelligence = data['intelligence']
    wisdom = data['wisdom']
    charisma = data['charisma']
    personality_traits = data['personality_traits']
    ideals = data['ideals']
    bonds = data['bonds']
    equipment = data['equipment']
    gold = data['gold']
    
    # Create a new PDF document
    c = canvas.Canvas("character_report.pdf", pagesize=letter)

    # Write the character details to the PDF document
    c.drawString(100, 800, f"Character Name: {character_name}")
    c.drawString(100, 785, f"Race: {race}")
    c.drawString(100, 770, f"Class: {class_}")
    c.drawString(100, 755, f"Strength: {strength}")
    c.drawString(100, 740, f"Dexterity: {dexterity}")
    c.drawString(100, 725, f"Constitution: {constitution}")
    c.drawString(100, 710, f"Intelligence: {intelligence}")
    c.drawString(100, 695, f"Wisdom: {wisdom}")
    c.drawString(100, 680, f"Charisma: {charisma}")
    c.drawString(100, 665, f"Personality Traits: {personality_traits}")
    c.drawString(100, 650, f"Ideals: {ideals}")
    c.drawString(100, 635, f"Bonds: {bonds}")
    c.drawString(100, 620, f"Equipment: {equipment}")
    c.drawString(100, 605, f"Gold: {gold}")

    # Save the PDF document
    c.save()
