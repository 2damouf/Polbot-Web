const formLogin = document.getElementById('login-form')


formLogin.addEventListener('submit', registerUser)


async function registerUser(event) {
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    console.log(username)
    console.log(password)
    const result = await fetch('http://localhost:9999/api/register', {
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
        alert('Giriş Başarılı')
        window.location.href = "main.html";
    } else {
        alert(result.error)
    }
}