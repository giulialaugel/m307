//auslesen der Formular informationen
const form = document.getElementById('form');
const vorname = document.getElementById('vorname');
const nachname = document.getElementById('nachname');
const mail = document.getElementById('email');
const haken= document.forms["form"]["agb"];
const flavour = document.getElementById('dropdown');
const genDiv = document.getElementById("diverse");
const genMale = document.getElementById("male");
const genFemale = document.getElementById("female");
const genderField = document.getElementById("geschlecht");
var x = "true"
//Error anzeigen
function showError(input, message){
    const formGroup = input.parentElement;
    formGroup.className = 'form-group error';
    const small = formGroup.querySelector('small');
    small.innerText = message;
    x ="false";
}
//Erfolg anzeigen
function showSuccess(input, message){
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
    const small = formGroup.querySelector('small');
    small.innerText = message;
    x = "true";
}
// pflicht Felder checken
function checkRequired(inputArr){
    let isRequired = false;
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
//error
            showError(input, `${getFieldName(input)} ist pflicht`);
            isRequired = false;
        } else {
            showSuccess(input,'');
        }
    })
    return isRequired;
}
//dropdown
function getDropdown(input){
    if (input.value === ''){
        showError(input, 'Wähle eins aus!');
    }else if (input.value > 0){
        showSuccess(input, 'Danke für Deine Rückmeldung!');
    }
}
//gender überprüfung
function getGender(div,male,female,gender){
    if (div.checked === false && male.checked === false && female.checked === false){
        showError(gender,'Bitte wähle eins an');
    } else {
        showSuccess(gender, '');
    }
}
//checkbox überprüfung
function getChecked(){
    const checkbox = haken.checked;
    if(checkbox === false) {
        showError(haken, 'Bitte kreuze an');
    }else if(checkbox=== true) {
        showSuccess(haken,'');
    }
}
//email überprüfen
function checkMail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input,'');
    } else {
        showError(input, 'Email ist nicht gültig');
    }
}
// Prüfung der Länge der Eingabe
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input,
            `${getFieldName(input)} muss mindestens ${min} Buchstaben beinhalten`);
    } else if (input.value.length > max){
        showError(input,
            `${getFieldName(input)} muss weniger als ${max} Buchstaben beinhalten`);
    } else{
        showSuccess(input,'');
    }
}
//Feldname gross
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//Formular validierung der Eingaben
function validateForm(){
    if (!checkRequired([vorname, nachname, mail])){
        //success
        getChecked();
        checkLength(vorname,2,10);
        checkLength(nachname, 2,20);
        checkMail(mail);
        getDropdown(flavour);
        getGender(genDiv,genMale,genFemale,genderField);
        showPage();
    }
}
// Event listeners
form.addEventListener('submit', function(e){
    e.preventDefault();
    validateForm();
});
function showPage(){
    if (x === "true"){
        alert ("Danke für deine Anmeldung!");
    }
}