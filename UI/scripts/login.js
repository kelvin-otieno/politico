
document.getElementById('loginUser').addEventListener('submit', loginUser);

function loginUser(e) {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch('http://127.0.0.1:5000/api/v2/auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email, password: password
        })
    }
    )
        .then((res) => res.json())
        .then((user) => {
            if (user['status'] == 200) {
                window.location = "http://127.0.0.1:5500/UI/index.html"
                // sessionStorage.setItem('token', user['data']['token'])
                localStorage.auth = user['data']['token']
                // console.log(user['data']['token'])
                // console.log(localStorage.auth)
                // document.cookie = "token=" + user['data']['token'];
            }
            else {
                confirm(user['error'])
            }
        })
}

