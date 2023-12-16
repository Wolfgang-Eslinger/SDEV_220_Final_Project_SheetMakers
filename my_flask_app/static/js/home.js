// Toggle the spellcasting section based on the selected class
function toggleSpellcasting() {
    var classSelect = document.getElementById('class-select');
    var spellSection = document.getElementById('spellcasting-section');
    var spellcastingClasses = ['Bard', 'Cleric', 'Druid', 'Sorcerer', 'Warlock', 'Wizard'];
    
    if (spellcastingClasses.includes(classSelect.value)) {
        spellSection.style.display = 'block';
    } else {
        spellSection.style.display = 'none';
    }
}

// Add a new spell input field with a removal option
function addSpellField() {
}

// Wait for the DOM to fully load before attaching event handlers
document.addEventListener('DOMContentLoaded', (event) => {
    // Get references to the class dropdown and the add spell button
    var classSelect = document.getElementById('class-select');
    var addSpellButton = document.getElementById('add-spell-button');

    // Attach event listeners to those elements
    classSelect.addEventListener('change', toggleSpellcasting);
    addSpellButton.addEventListener('click', addSpellField);

    // Initial call to set the right display state for the spellcasting section
    toggleSpellcasting();
});

// Toggle the spellcasting section based on the selected class
function toggleSpellcasting() {
    var classSelect = document.getElementById('class-select');
    var spellSection = document.getElementById('spellcasting-section');
    var spellcastingClasses = ['Bard', 'Cleric', 'Druid', 'Sorcerer', 'Warlock', 'Wizard'];
    
    spellSection.style.display = spellcastingClasses.includes(classSelect.value) ? 'block' : 'none';
}

// Add a new spell input field
function addSpellField() {
    var container = document.getElementById('spells-container');
    var newSpellInput = document.createElement('div');
    newSpellInput.className = 'spell-input';
    newSpellInput.innerHTML = `
        <input type="text" name="spells[]" placeholder="Spell Name">
        <select name="spell_levels[]">
            <option value="">Select Spell Level</option>
            <option value="Cantrip">Cantrip</option>
            <option value="1">Level 1</option>
            <!-- Add other levels as needed -->
        </select>
        <textarea name="spell_descriptions[]" placeholder="Spell Description"></textarea>
    `;
    container.appendChild(newSpellInput);
}

document.getElementById('preview-pdf').addEventListener('click', async () => {
    // Your code to generate the PDF data goes here
    const pdfData = generate_pdf_data();

    // Create a PDF.js PDFDocument from the PDF data
    const pdfDoc = await pdfjsLib.getDocument({data: pdfData}).promise;

    // Render the first page of the PDF document into a canvas element
    const pageNum = 1;
    const canvas = document.createElement('canvas');
    const canvasContext = canvas.getContext('2d');
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({scale: 1.0});
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = {
        canvasContext,
        viewport,
    };
    await page.render(renderContext);

    // Append the canvas element to the 'character-preview' div
    document.getElementById('character-preview').appendChild(canvas);
});
// Add a new spell input field with a removal option
function addSpellField() {
    var container = document.getElementById('spells-container');
    var newSpellInput = document.createElement('div');
    newSpellInput.className = 'spell-input';
    newSpellInput.innerHTML = `
        <input type="text" name="spells[]" placeholder="Spell Name">
        <select name="spell_levels[]">
            <option value="">Select Spell Level</option>
            <option value="Cantrip">Cantrip</option>
            <option value="1">Level 1</option>
            <!-- Add other levels as needed -->
        </select>
        <textarea name="spell_descriptions[]" placeholder="Spell Description"></textarea>
        <button type="button" class="remove-spell" onclick="removeSpellField(event)">Remove</button>
    `;
    container.appendChild(newSpellInput);
}

function generate_pdf_data() {
    var doc = new window.jspdf.jsPDF();

    // Retrieve values from form fields
    var characterName = document.getElementsByName('character_name')[0].value;
    var race = document.getElementsByName('race')[0].value;
    var charClass = document.getElementsByName('class')[0].value;
    var strength = document.getElementsByName('strength')[0].value;
    var dexterity = document.getElementsByName('dexterity')[0].value;
    var constitution = document.getElementsByName('constitution')[0].value;
    var intelligence = document.getElementsByName('intelligence')[0].value;
    var wisdom = document.getElementsByName('wisdom')[0].value;
    var charisma = document.getElementsByName('charisma')[0].value;
    var personalityTraits = document.getElementsByName('personality_traits')[0].value;
    var ideals = document.getElementsByName('ideals')[0].value;
    var bonds = document.getElementsByName('bonds')[0].value;
    var equipment = document.getElementsByName('equipment')[0].value;
    var gold = document.getElementsByName('gold')[0].value;
    var adventureTitle = document.getElementsByName('adventure_title')[0].value;
    var itemName = document.getElementsByName('item_name')[0].value;
    var itemType = document.getElementsByName('item_type')[0].value;

    // Add text to PDF
    doc.text(`Name: ${characterName}`, 10, 10);
    doc.text(`Race: ${race}`, 10, 20);
    doc.text(`Class: ${charClass}`, 10, 30);
    doc.text(`STR: ${strength}`, 10, 40);
    doc.text(`DEX: ${dexterity}`, 10, 50);
    doc.text(`CON: ${constitution}`, 10, 60);
    doc.text(`INT: ${intelligence}`, 10, 70);
    doc.text(`WIS: ${wisdom}`, 10, 80);
    doc.text(`CHA: ${charisma}`, 10, 90);
    doc.text(`Traits: ${personalityTraits}`, 10, 100);
    doc.text(`Ideals: ${ideals}`, 10, 110);
    doc.text(`Bonds: ${bonds}`, 10, 120);
    doc.text(`Equipment: ${equipment}`, 10, 130);
    doc.text(`Gold: ${gold}`, 10, 140);
    doc.text(`Adventure: ${adventureTitle}`, 10, 150);
    doc.text(`Item: ${itemName} (${itemType})`, 10, 160);

     // Prepare the form data to send to the server
     var formData = {
        characterName: characterName,
        race: race,
        charClass: charClass,
        strength: strength,
        dexterity: dexterity,
        constitution: constitution,
        intelligence: intelligence,
        wisdom: wisdom,
        charisma: charisma,
        personalityTraits: personalityTraits,
        ideals: ideals,
        bonds: bonds,
        equipment: equipment,
        gold: gold,
        adventureTitle: adventureTitle,
        itemName: itemName,
        itemType: itemType
        
    };

        // Send the form data to the server to generate the PDF
        $.ajax({
            url: '/export_pdf', // Your server endpoint
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                // Handle the response from the server
                console.log('PDF generated by the server:', response);
            },
            error: function(error) {
                // Handle errors
                console.error('Error generating PDF:', error);
            }
        });
    
        // Serialize the PDF as binary data
        var pdfData = doc.output('arraybuffer');
    
        // Return the serialized PDF data
        return new Uint8Array(pdfData);
    }