// Toggle the spellcasting section based on the selected class
function toggleSpellcasting() {
    var classSelect = document.getElementById('class-select');
    var spellSection = document.getElementById('spellcasting-section');
    // Add all spellcasting classes in this array
    var spellcastingClasses = ['Bard', 'Cleric', 'Druid', 'Sorcerer', 'Warlock', 'Wizard'];
    
    if (spellcastingClasses.includes(classSelect.value)) {
        spellSection.style.display = 'block';
    } else {
        spellSection.style.display = 'none';
    }
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