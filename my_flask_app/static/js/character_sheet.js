
// Send data to backend for preview
function previewCharacter() {
    console.log('Preview character function called.'); // Logging for debugging
    $.ajax({
        url: '/preview_character',
        type: 'post',
        data: JSON.stringify({
            name: $('#character_name').val(),
            race: $('#character_race').val(),
            class: $('#character_class').val(),
            strength: $('#character_strength').val(),
            dexterity: $('#character_dexterity').val(),
            constitution: $('#character_constitution').val(),
            intelligence: $('#character_intelligence').val(),
            wisdom: $('#character_wisdom').val(),
            charisma: $('#character_charisma').val()
        }),
        contentType: 'application/json',
        success: function(response) {
            console.log('Preview successful.', response); // Logging for debugging
            // Display the preview
            $('#character-preview').html(response);
        },
        error: function(error) {
            console.error('Error in preview:', error); // Logging for debugging
        }
    });
}

document.getElementById('preview-pdf').addEventListener('click', function() {
    console.log('Preview PDF button clicked.'); // Logging for debugging
    generate_pdf_data(); // Call the generate_pdf_data function from pdf.js
});

document.getElementById('export-pdf').addEventListener('click', function() {
    console.log('Export PDF button clicked.'); // Logging for debugging
    // Logic to export PDF
    var characterData = {
        name: $('#character_name').val(),
        race: $('#character_race').val(),
        class: $('#character_class').val(),
        strength: $('#character_strength').val(),
        dexterity: $('#character_dexterity').val(),
        constitution: $('#character_constitution').val(),
        intelligence: $('#character_intelligence').val(),
        wisdom: $('#character_wisdom').val(),
        charisma: $('#character_charisma').val()
    };

    $.ajax({
        url: '/export_pdf',
        type: 'post',
        data: JSON.stringify(characterData),
        contentType: 'application/json',
        success: function(response) {
            console.log('Export successful.', response); // Logging for debugging
            // Trigger the download of the PDF
            window.location.href = response;
        },
        error: function(error) {
            console.error('Error in export:', error); // Logging for debugging
        }
    });
});
