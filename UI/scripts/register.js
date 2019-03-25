
document.getElementById('addUser').addEventListener('submit', addUser);

function addUser(e) {
    e.preventDefault();
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let othername = document.getElementById('othername').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let passportUrl = document.getElementById('passportUrl').value;
    let password = document.getElementById('password').value;
    let confirmpassword = document.getElementById('confirmpassword').value;
    if (localStorage.getItem('loggedID') != null) {
        fetch("http://127.0.0.1:5000/api/v2/auth/" + localStorage.loggedID, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: firstname, lastname: lastname, othername: othername, email: email, phoneNumber: phone,
                passportUrl: passportUrl, password: password
            })
        }
        )
            .then((res) => res.json())
            .then((user) => {
                if (user['status'] == 200) {
                    confirm(user['message'])
                }
                else {
                    confirm(user['error'])
                }
            })

    } else {
        fetch('http://127.0.0.1:5000/api/v2/auth/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: firstname, lastname: lastname, othername: othername, email: email, phoneNumber: phone,
                passportUrl: passportUrl, password: password
            })
        }
        )
            .then((res) => res.json())
            .then((user) => {
                if (user['status'] == 201) {
                    confirm(user['message'])
                }
                else {
                    confirm(user['error'])
                }
            })
    }

}

function loadUserProfile() {
    if (localStorage.getItem('loggedID') != null) {
        document.getElementsByClassName('title')[0].innerText = "USER PROFILE"
        getUser(localStorage.loggedID)

    }
}

function getUser(user_id) {
    fetch("http://127.0.0.1:5000/api/v2/auth/" + user_id, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'token': localStorage.auth
        })
    })
        .then((res) => {
            return res.json()
        })
        .then(function (user) {

            document.getElementById('firstname').value = user['data'][0]['firstname']
            document.getElementById('othername').value = user['data'][0]['othername']
            document.getElementById('lastname').value = user['data'][0]['lastname']
            document.getElementById('email').value = user['data'][0]['email']
            document.getElementById('phone').value = user['data'][0]['phoneNumber']
            document.getElementById('passportUrl').value = user['data'][0]['passportUrl']
            document.getElementById('password').value = user['data'][0]['password']



        })
}