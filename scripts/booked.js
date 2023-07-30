
const users = [];
var globalUserList;




// customer listesini almak için istek yollayalım
async function sendRequest(){

  const token = localStorage.getItem('token')
  const result = await fetch('http://localhost:9999/apiv2/get-booked-list', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          token,
      })
  }).then((res) => res.json())

  if(result.status === 'ok'){
      const userList = result.data
      userList.forEach((document, index) => {
      const user = userList[index];
      const { passport, fullName } = user;
      users.push({ name: fullName, Pasaport: passport })
    });
    globalUserList = userList;
    displayUsers();
  } else {
      alert(result.error)
  }

}




const userListElement = document.getElementById('userList');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const usersPerPage = 10; // sayfa başına max kullanıcı
let currentPage = 1; // default olarak ilk sayfayı yükleyelim

// kullanıcıları listeleyelim
function displayUsers() {
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const displayedUsers = users.slice(startIndex, endIndex);

  let userHTML = '';
  displayedUsers.forEach(user => {
    userHTML += `<li><strong>${user.name}</strong> - ${user.Pasaport}</li>`;
  });
  userListElement.innerHTML = userHTML;

// sayfa değişince butonları güncelleyelim
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === Math.ceil(users.length / usersPerPage);
}

// ileri düğmesi
nextBtn.addEventListener('click', () => {
  if (currentPage < Math.ceil(users.length / usersPerPage)) {
    currentPage++;
    displayUsers();
  }
});

// geri düğmesi
prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayUsers();
  }
});

// Sayfa yüklendiğinde kullanıcıları göster
displayUsers();
sendRequest();


// tıklanan elemanı tespit etme
userListElement.addEventListener('click', (event) => {
  var userInfo = null
  const clickedElement = event.target;
  if (clickedElement.tagName === 'LI' || clickedElement.tagName === 'STRONG' ) {
    if (clickedElement.tagName === 'STRONG') {
      const nextSibling = clickedElement.nextSibling;
      userInfo = clickedElement.innerText + ' ' +nextSibling.textContent.trim();
    } else {
      userInfo = clickedElement.innerText;
    }
    const splitText = userInfo.split('-');
    const trimmedText = splitText.map(item => item.trim());
    const pasaportNo = trimmedText[1]
    const searchTerm = pasaportNo;
    const searchResults = globalUserList.filter(user => user.passport.includes(searchTerm));
    document.getElementById('fullNameInput').value = searchResults[0].fullName
    document.getElementById('emailInput').value = searchResults[0].mailAdress
    document.getElementById('passportInput').value = searchResults[0].passport
    document.getElementById('phoneInput').value = searchResults[0].phoneNumber
    openListPanel()
    openPanel();
  }
});

// listenin olduğu paneli gösterme
function openListPanel() {
  const panel = document.getElementById('listPanel');
  panel.classList.add('active');
}
// listenin olduğu paneli gizleme
function closeListPanel() {
  const panel = document.getElementById('listPanel');
  panel.classList.remove('active');
}

// düzenleme panelini gösterme
function openPanel() {
  closeListPanel()
  const panel = document.getElementById('userPanel');
  panel.classList.add('active');
}

// düzenleme panelini gizleme
function closePanel() {
  openListPanel()
  const panel = document.getElementById('userPanel');
  panel.classList.remove('active');
}
// Kapat butonuna tıklama olayı ekleme
const closeButton = document.getElementById('closeBtn');
closeButton.addEventListener('click', () => {
  closePanel();
});
// MainMenu butonuna tıklama olayı ekleme
const mainMenuBtn = document.getElementById('mainMenuBtn');
mainMenuBtn.addEventListener('click', () => {
  window.location.href = "main.html"
});
