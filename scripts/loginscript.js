const formLogin = document.getElementById('login-form')
formLogin.addEventListener('submit', login)

// login isteği
async function login(event) {
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    console.log(username)
    console.log(password)
    const result = await fetch('http://localhost:9999/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then((res) => res.json())

    if (result.status === 'ok') {
        localStorage.setItem('token', result.data)
        window.location.href = "main.html";
        alert('Giriş Başarılı')
    } else {
        alert(result.error)
    }
}