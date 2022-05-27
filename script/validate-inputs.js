//formular auslesen
const form = document.getElementById('form');
const vorname = document.getElementById('vorname');
const nachname = document.getElementById('nachname');

//validierung der verschiedenen elemente
function validateForm(){

}

//event aufzählung
form.addEventListener('submit',function (e){
    e.preventDefault();
    //zuerst Formular validieren
    validateForm();
})


