const form = document.getElementById('form');
const fullname = document.getElementById('fullname');
const passport = document.getElementById('passport');
const mail = document.getElementById('mail');
const username = document.getElementById('reg-username');
const password = document.getElementById('reg-password');
const repassword = document.getElementById('reg-repassword');
const birthdate = document.getElementById('birthdate');
const phone = document.getElementById('phone');
var validation = false

// eğer validation hata verirse
function error(input, message) {
    input.className = 'form-control is-invalid'
    const div = input.nextElementSibling;
    div.innerText = message;
    div.className = 'invalid-feedback';
    validation = false
};

// validation sağlanırsa
function success(input) {
    input.className = 'form-control is-valid'
    validation = true
};


// mail doğrulaması yapalım
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

// doğrulamalarda sıkıntı var mı kontrolü yapalım
function checkRequired(inputs) {
    inputs.forEach(function(input) {
        if (input.value === ''){
            error(input, `${input.id} is required`)
        } else {
            success(input);
        }
    });
};

// şifre uzunluğu kontrol etme
function checkLength(input, min, max) {
    if (input.value.length < min) {
        error(input, `${input.id} is very short, min length is: ${min}`)
    } else if(input.value.length > max) {
        error(input, `${input.id} is very long, max length is: ${max}`)
    }
};

// geçerli bir telefon numarası girildi mi kontrolü
function checkPhone(input) {
    var exp = /^\d{10}$/;

    if(!exp.test(input.value)){
        error(input, "invalid phone number");
    }
};

// şifreler aynı mı kontrolü
function checkPasswords(input1, input2) {
        if (input1.value !== input2.value) {
            error(input2, 'passwords are not matching');
        } 
};

// her şey sorunsuz ise bitirelim
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
    sendRequest();
});





// kayıt için istek yollama fonksiyonu
async function sendRequest(){
    if (validation !== true) {
        alert('Lütfen alanları düzgün doldurun.')
        return;
    }
    const fullName = document.getElementById('fullname').value
    const mailAdress = document.getElementById('mail').value
    const passport = document.getElementById('passport').value
    const phoneNumber = document.getElementById('phone').value
    const birthDate = document.getElementById('birthdate').value
    const userName = document.getElementById('username').value
    const password = document.getElementById('password').value
    const repassword = document.getElementById('repassword').value

    const token = localStorage.getItem('token')
    const result = await fetch('http://localhost:9999/apiv2/new-customer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token,
            fullName,
            mailAdress,
            passport,
            phoneNumber,
            birthDate,
            userName,
            password,
            repassword
        })
    }).then((res) => res.json())

    if(result.status === 'ok'){
        alert('Yeni Kişi Eklendi!')
        document.getElementById('fullname').value = "";
        document.getElementById('mail').value = "";
        document.getElementById('passport').value = "";
        document.getElementById('phone').value = "";
        document.getElementById('birthdate').value = "";
        document.getElementById('username').value = "";
        document.getElementById('password').value = "";
        document.getElementById('repassword').value = "";
    } else {
        alert(result.error)
    }
};

// ana menüye dönme
const mainMenuBtn = document.getElementById("mainMenuBtn");
mainMenuBtn.addEventListener('click', () => {
    window.location.href = "main.html"
})

