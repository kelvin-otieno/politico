
document.getElementById('createParty').addEventListener('submit', createParty);

function createParty(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let hqAddress = document.getElementById('hqAddress').value;
    let logoUrl = document.getElementById('logoUrl').value;

    fetch('http://127.0.0.1:5000/api/v2/parties/', {
        method: 'POST',
        headers: new Headers({
            'token': localStorage.auth,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            name: name, hqAddress: hqAddress, logoUrl: logoUrl
        })
    }
    )
        .then((res) => res.json())
        .then((user) => {
            if (user['status'] == 201) {
                confirm("Successfully created party")
            }
            else {
                confirm(user['error'])
                // console.log(localStorage.auth)
            }
        })
}


