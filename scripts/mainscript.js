// dil değiştirme fonksiyonu
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



// tıklanan bayrağı pasifleştirmek için
function disableElement(element) {
    const eelement = document.getElementById(element);
    eelement.disabled = true;
    eelement.style.opacity = 0.5;
}
// diğer bayrağı aktifleştirmek için
function enableElement(element) {
    const eelement = document.getElementById(element);
    eelement.disabled = false;

    // İsteğe bağlı olarak stil değişikliği yapabilirsiniz
    eelement.style.opacity = 1;
}

// ingilizce seçilirse elementlerin yazılarını güncelleyelim
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

// türkçe seçilirse elementlerin yazılarını güncelleyelim
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

// dom content tamamlandığında, eğer local storage'da token girili değilse, kullanıcı direk main.html'i açamasın diye kontrol yapalım.
// eğer token varsa, token validation yapalım.
document.addEventListener("DOMContentLoaded", async function() {
    try {
        if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
            window.location.href = "login.html";
        } else
        {
            const token = localStorage.getItem('token')
            const result = await fetch('http://localhost:9999/api/token-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token,
                })
            }).then((res) => res.json())
        
            if (result.status === 'ok') {
               
            } else {
                exitFunction();
            }
        }
    } catch (error) {
        exitFunction();
    }
})

// logout fonksiyon
function exitFunction() {
    localStorage.removeItem('token');
    window.location.href = 'login.html'
}