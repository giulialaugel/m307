/*
garavaldis version that doesn't work..
//formular auslesen
const form = document.getElementById('form');
const vorname = document.getElementById('vorname');
const nachname = document.getElementById('nachname');
const email = document.getElementById('inputEmail4');

//zeige erfolgreiche Angabe
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//deklaration
let isRequired = false;

//überprüfung der Felder
function checkRequired(inputArr){
    inputArr.forEach(function (input){
        if (input.value.trim() === ''){
            console.log('${input.id} is required!');
            isRequired = true;
        } else {
            showSuccess(input);
            console.log('${input.id} is provided!');
        }
    })
    return isRequired;
}

//validierung der verschiedenen elemente
function validateForm(){
    if (!checkRequired([vorname, nachname, email])){
        //success
    }
}

//event aufzählung
form.addEventListener('submit',function (e){
    e.preventDefault();
    //zuerst Formular validieren
    validateForm();
});*/

(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        const validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity('') === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

