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
