// Send data to backend for preview
function previewCharacter() {
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
            // Display the preview
            $('#character-preview').html(response);
        }
    });
}

document.getElementById('preview-pdf').addEventListener('click', function() {
    generate_pdf_data() // Call the generate_pdf_data function from pdf.js
});

document.getElementById('export-pdf').addEventListener('click', function() {
    // Implement logic to export PDF
});