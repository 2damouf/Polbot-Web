function changeLanguage(language) {
    if (language === 'tr') {
        console.log("Türkçe dil seçildi. İşlemleriniz Türkçe olarak devam edecek.");
        turkish();
        disableElement('flag-tr')
        enableElement('flag-gb')
    } else if (language === 'en') {
        console.log("İngilizce dil seçildi. Your operations will continue in English.");
        english();
        disableElement('flag-gb')
        enableElement('flag-tr')
    }
}

function exitFunction() {
    window.location.href = 'login.html'
}


function disableElement(element) {
    const eelement = document.getElementById(element);
    eelement.disabled = true;
    eelement.style.opacity = 0.5;
}

function enableElement(element) {
    const eelement = document.getElementById(element);
    eelement.disabled = false;

    // İsteğe bağlı olarak stil değişikliği yapabilirsiniz
    eelement.style.opacity = 1;
}

function addClientMenu() {
    window.location.href = "addclient.html";
}

function english() {
    const menu1 = document.getElementById('customer');
    const menu2 = document.getElementById('newClient');
    const menu3 = document.getElementById('reservation');
    const menu4 = document.getElementById('setting');
    menu1.innerText = "Manage Customers";
    menu2.innerText = "Add Customer";
    menu3.innerText = "Reservations";
    menu4.innerText = "Settings";
    document.title = "Main Menu";
}

function turkish() {
    const menu1 = document.getElementById('customer');
    const menu2 = document.getElementById('newClient');
    const menu3 = document.getElementById('reservation');
    const menu4 = document.getElementById('setting');
    menu1.innerText = "Müşterileri Yönet";
    menu2.innerText = "Yeni Müşteri Ekle";
    menu3.innerText = "Alınan Randevular"
    menu4.innerText = "Ayarlar"
    document.title = "Main Menu";
}

