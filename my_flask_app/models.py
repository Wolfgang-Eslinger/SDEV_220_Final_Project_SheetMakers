from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    race = db.Column(db.String(80), nullable=False)
    class_ = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return f"<Character {self.name}>"
    # Additional fields based on updated HTML structure
    strength = db.Column(db.Integer)
    dexterity = db.Column(db.Integer)
    constitution = db.Column(db.Integer)
    intelligence = db.Column(db.Integer)
    wisdom = db.Column(db.Integer)
    charisma = db.Column(db.Integer)
    personality_traits = db.Column(db.String(250))
    ideals = db.Column(db.String(250))
    bonds = db.Column(db.String(250))
    equipment = db.Column(db.String(500))

class CurrentAdventure(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    setting = db.Column(db.String(100), nullable=True)
    start_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end_date = db.Column(db.DateTime, nullable=True)
    character_ids = db.relationship('Character', backref='adventure', lazy=True)

    def __repr__(self):
        return f"<CurrentAdventure {self.title}>"
    
class InventoryItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    item_type = db.Column(db.String(50), nullable=False)
    value = db.Column(db.Integer, nullable=False)
    properties = db.Column(db.Text, nullable=True)
    character_id = db.Column(db.Integer, db.ForeignKey('character.id'), nullable=False)

    def __repr__(self):
        return f"<InventoryItem {self.name}>"

