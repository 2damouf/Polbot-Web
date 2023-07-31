const form = document.getElementById('new-customer-userform');
const fullname = document.getElementById('reg-input-fullname');
const passport = document.getElementById('reg-input-passport');
const mail = document.getElementById('reg-input-mail');
const birthdate = document.getElementById('reg-input-birthdate');
const phone = document.getElementById('reg-input-phone');
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
    console.log('tıklandı buna')
    e.preventDefault();
    checkRequired([fullname,passport,passport,birthdate,phone]);
    const validate = validateEmail(mail.value);
    console.log(validate);
    if (validate == null) {
        error(mail, 'invalid mail adress');
    } else {
        success(mail);
    }
    checkPhone(phone);
    newCustomerSendRequest();
});





// kayıt için istek yollama fonksiyonu
async function newCustomerSendRequest(){
    console.log('request')
    if (validation !== true) {
        alert('Lütfen alanları düzgün doldurun.')
        return;
    }


    const fullName = document.getElementById('reg-input-fullname').value
    const mailAdress = document.getElementById('reg-input-mail').value
    const passport = document.getElementById('reg-input-passport').value
    const phoneNumber = document.getElementById('reg-input-birthdate').value
    const birthDate = document.getElementById('reg-input-phone').value

    
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
            birthDate
        })
    }).then((res) => res.json())

    if(result.status === 'ok'){
        alert('Yeni Kişi Eklendi!')
       /* document.getElementById('reg-input-fullname').value = "";
        document.getElementById('reg-input-passport').value = "";
        document.getElementById('reg-input-mail').value = "";
        document.getElementById('reg-input-birthdate').value = "";
        document.getElementById('reg-input-phone').value = "";*/
    } else {
        alert(result.error)
    }
};