document.getElementById('createVote').addEventListener('submit', createVote);

function createVote(e) {
    e.preventDefault();
    let office_id = document.getElementById('createVote').elements.namedItem("office_name").value
    let candidate_id = document.getElementById('createVote').elements.namedItem("candidates").value
    let voter_id = localStorage.loggedID
    console.log(office_id)
    console.log(candidate_id)
    fetch('http://127.0.0.1:5000/api/v2/votes/', {
        method: 'POST',
        headers: new Headers({
            'token': localStorage.auth,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            office_id: parseInt(office_id, 10), candidate_id: parseInt(candidate_id, 10)
        })
    }
    )
        .then((res) => res.json())
        .then((vote) => {
            console.log(vote)
            if (vote['status'] == 201) {
                alert("Congratulations on Casting your vote")
            }
            else {
                alert(vote['error'])
                // console.log(localStorage.auth)
            }
        })


}

