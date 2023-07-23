const form = document.getElementById('form');
const username = document.getElementById('username');
const fullname = document.getElementById('fullname');
const passport = document.getElementById('passport');
const mail = document.getElementById('mail');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');
const birthdate = document.getElementById('birthdate');
const phone = document.getElementById('phone');

function error(input, message) {
    input.className = 'form-control is-invalid'
    const div = input.nextElementSibling;
    div.innerText = message;
    div.className = 'invalid-feedback';
}

function success(input) {
    input.className = 'form-control is-valid'
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

function checkRequired(inputs) {
    inputs.forEach(function(input) {
        if (input.value === ''){
            error(input, `${input.id} is required`)
        } else {
            success(input);
        }
    });
  }

function checkLength(input, min, max) {
    if (input.value.length < min) {
        error(input, `${input.id} is very short, min length is: ${min}`)
    } else if(input.value.length > max) {
        error(input, `${input.id} is very long, max length is: ${max}`)
    }
}

function checkPhone(input) {
    var exp = /^\d{10}$/;

    if(!exp.test(input.value)){
        error(input, "invalid phone number");
    }
}

function checkPasswords(input1, input2) {
        if (input1.value !== input2.value) {
            error(input2, 'passwords are not matching');
        } 
}

form.addEventListener('submit',function(e){
    e.preventDefault();
    checkRequired([username,fullname,passport,passport,password,repassword,birthdate,phone]);
    const validate = validateEmail(mail.value);
    console.log(validate);
    if (validate == null) {
        error(mail, 'invalid mail adress');
    } else {
        success(mail);
    }

    if (username.value !== '') {
        checkLength(username, 4, 15);
    }
    if (password.value !== '') {
        checkLength(password, 5, 12);
    }
    if (repassword.value !== '') {
        checkLength(repassword, 5, 12);
    }
    console.log(password + ' '+ repassword)
    checkPasswords(password, repassword);
    checkPhone(phone);

});


