//auslesen der Formular informationen
const form = document.getElementById('form');
const vorname = document.getElementById('vorname');
const nachname = document.getElementById('nachname');
const mail = document.getElementById('email');
const haken = document.getElementById('agb');
const dropdown = document.getElementById('dropdown');
const user = dropdown.options[dropdown.selectedIndex].value;
const radio = document.getElementById('gender');


//Error anzeigen
function showError(input, message){
    const formGroup = input.parentElement;
    formGroup.className = 'form-group error';
    const small = formGroup.querySelector('small');
    small.innerText = message;
}

//Erfolg anzeigen
function showSuccess(input){
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success';
}

// pflicht Felder checken
function checkRequired(inputArr){
    let isRequired = false;
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            //error
            showError(input, `${getFieldName(input)} ist pflicht`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    })
    return isRequired;
}

//Formular validierung der Eingaben
function validateForm(){
    if (!checkRequired([vorname, nachname, mail, haken,dropdown, radio])){
        //success
        checkLength(vorname,2,10);
        checkLength(nachname, 2,20);
        checkMail(mail);
        getDropdown(dropdown);
        getChecked(haken);
        getGender(radio);
    }
}

//checkbox überprüfen
function getChecked(input){
    if (document.getElementById('agb').checked) {
        console.log("no");
        showError(input, 'Setze einen Haken');
    }else {
        console.log("yes");
        showSuccess(input);
    }
}

//geschlecht überprüfen
function getGender(input){
    if (document.getElementById('Divers').checked){
        showSuccess(input);
    }else if(document.getElementById('Frau').checked){
        showSuccess(input);
    }else if(document.getElementById('Mann').checked){
        showSuccess(input);
    } else {
    showError(input, 'Bitte wähle eins aus');
    }
}

//dropdown überprüfen
function getDropdown(input){
    if(user === 0){
        showError(input);
    } else if (user >= 0){
        showSuccess(input);
    }
}

//email überprüfen
function checkMail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
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
        showSuccess(input);
    }
}

//Feldname gross
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e){
    e.preventDefault();
    validateForm();
});