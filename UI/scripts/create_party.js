window.onload = loadParties
window.onunload = function reset() {
    localStorage.isEdit = false;
}
document.getElementById('createParty').addEventListener('submit', createParty);

function createParty(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let hqAddress = document.getElementById('hqAddress').value;
    let logoUrl = document.getElementById('logoUrl').value;
    if (localStorage.isEdit == 'true') {
        fetch('https://vast-mountain-54945.herokuapp.com/api/v2/parties/' + localStorage.party_id, {
            method: 'PATCH',
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
            .then((party) => {
                if (party['status'] == 200) {
                    localStorage.isEdit = false
                    alert(party['message'])
                }
                else {
                    alert(party['error'])
                    // console.log(localStorage.auth)
                }
            })
    } else {
        fetch('https://vast-mountain-54945.herokuapp.com/api/v2/parties/', {
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
            .then((party) => {
                if (party['status'] == 201) {
                    alert("Successfully created party")
                }
                else {
                    alert(party['error'])
                    // console.log(localStorage.auth)
                }
            })
    }

}

function loadParties() {
    if (localStorage.isEdit == 'true') {
        document.getElementById('name').value = localStorage.party_name;
        console.log(localStorage.party_name)
        document.getElementById('logoUrl').value = localStorage.logoUrl;
        document.getElementById('hqAddress').value = localStorage.hqAddress;
        document.getElementById("title").innerText = "UPDATE PARTY"

    }
}