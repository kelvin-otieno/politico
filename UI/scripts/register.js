
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

