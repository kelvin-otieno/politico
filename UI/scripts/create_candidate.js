
document.getElementById('createCandidate').addEventListener('submit', createCandidate);

function createCandidate(e) {
    e.preventDefault();
    let user_id = document.getElementById('userList').value;
    let party_id = document.getElementById("partyList").value;
    let office_id = document.getElementById("officeList").value;
    console.log(user_id)
    console.log(party_id)
    console.log(office_id)
    fetch('https://vast-mountain-54945.herokuapp.com/api/v2/office/' + office_id + '/register/', {
        method: 'POST',
        headers: new Headers({
            'token': localStorage.auth,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            user_id: parseInt(user_id, 10), party_id: parseInt(party_id, 10)
        })
    }
    )
        .then((res) => res.json())
        .then((candidate) => {
            console.log(candidate)
            if (candidate['status'] == 201) {
                alert("Successfully created candidate")
            }
            else {
                alert(candidate['error'])
                // console.log(localStorage.auth)
            }
        })


}

