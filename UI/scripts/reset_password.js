document.getElementById('resetPassword').addEventListener('submit', resetPassword);

function resetPassword(e) {
    e.preventDefault();

    let newPassword = document.getElementById('newPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    if (newPassword == confirmPassword) {
        fetch("https://vast-mountain-54945.herokuapp.com/api/v2/auth/reset", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: confirmPassword,
                token: window.location.search.substring(1)
            })
        }
        )
            .then((res) => res.json())
            .then((user) => {
                if (user['status'] == 200) {
                    alert(user['data']['message'])
                    window.location = "login.html"
                }
                else {
                    alert(user['error'])
                }
            })
        // console.log(window.location.search.substring(1))
    } else {
        alert("Passwords not matching")
    }



}