document.getElementById('sendLink').addEventListener('submit', sendLink);

function sendLink(e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    fetch("https://vast-mountain-54945.herokuapp.com/api/v2/auth/send_link", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        }
        )
            .then((res) => res.json())
            .then((user) => {
                if (user['status'] == 200) {
                    confirm(user['data']['message'])
                }
                else {
                    confirm(user['error'])
                }
            })
 

}