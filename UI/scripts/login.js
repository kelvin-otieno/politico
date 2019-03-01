
document.getElementById('loginUser').addEventListener('submit', loginUser);

function loginUser(e) {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch('http://vast-mountain-54945.herokuapp.com/api/v2/auth/login/', {
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
                window.location = "https://kelvin-otieno.github.io/politico/UI/index.html"
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

