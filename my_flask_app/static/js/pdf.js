function generate_pdf_data() {
    const doc = new jsPDF();

    // Retrieve form values
    const characterName = document.querySelector('[name="character_name"]').value;
    const race = document.querySelector('[name="race"]').value;
    const characterClass = document.querySelector('[name="class"]').value;
    const strength = document.querySelector('[name="strength"]').value;
    const dexterity = document.querySelector('[name="dexterity"]').value;
    const constitution = document.querySelector('[name="constitution"]').value;
    const intelligence = document.querySelector('[name="intelligence"]').value;
    const wisdom = document.querySelector('[name="wisdom"]').value;
    const charisma = document.querySelector('[name="charisma"]').value;
    const personalityTraits = document.querySelector('[name="personality_traits"]').value;
    const ideals = document.querySelector('[name="ideals"]').value;
    const bonds = document.querySelector('[name="bonds"]').value;
    const equipment = document.querySelector('[name="equipment"]').value;

    // Add content to the PDF
    let y = 10; // Initial y coordinate
    doc.text(`Character Name: ${characterName}`, 10, y);
    y += 10;
    doc.text(`Race: ${race}`, 10, y);
    y += 10;
    doc.text(`Class: ${characterClass}`, 10, y);
    y += 10;
    doc.text(`Strength: ${strength}`, 10, y);
    y += 10;
    doc.text(`Dexterity: ${dexterity}`, 10, y);
    y += 10;
    doc.text(`Constitution: ${constitution}`, 10, y);
    y += 10;
    doc.text(`Intelligence: ${intelligence}`, 10, y);
    y += 10;
    doc.text(`Wisdom: ${wisdom}`, 10, y);
    y += 10;
    doc.text(`Charisma: ${charisma}`, 10, y);
    y += 10;
    doc.text(`Personality Traits: ${personalityTraits}`, 10, y);
    y += 10;
    doc.text(`Ideals: ${ideals}`, 10, y);
    y += 10;
    doc.text(`Bonds: ${bonds}`, 10, y);
    y += 10;
    doc.text(`Equipment: ${equipment}`, 10, y);

    // Gather spell details
    const spells = [];
    const spellInputs = document.querySelectorAll('#spells-container .spell-input');
    spellInputs.forEach((spellDiv) => {
        const spellName = spellDiv.querySelector('[name="spells[]"]').value;
        const spellLevel = spellDiv.querySelector('[name="spell_levels[]"]').value;
        const spellDescription = spellDiv.querySelector('[name="spell_descriptions[]"]').value;
        spells.push({ spellName, spellLevel, spellDescription });
    });

    // Add spells to the PDF
    spells.forEach((spell) => {
        y += 10;
        doc.text(`Spell Name: ${spell.spellName}`, 10, y);
        y += 10;
        doc.text(`Spell Level: ${spell.spellLevel}`, 10, y);
        y += 10;
        doc.text(`Description: ${spell.spellDescription}`, 10, y);
        y += 10;
    });

    // Save the generated PDF to the user's computer
    doc.save('generated_character_sheet.pdf');
}
