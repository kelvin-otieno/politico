function getCandidates() {
    fetch("https://vast-mountain-54945.herokuapp.com/api/v2/office/", {
        method: 'GET',
        headers: new Headers({
            'token': localStorage.auth,
            'Content-Type': 'application/json'
        })

    })
        .then((res) => {
            return res.json()
        })
        .then(function (candidates) {
            let output = `
            <tr>
            <th>ID</th>
            <th>Candidate</th>
            <th>Office Type</th>
            <th>Party</th>
          </tr>
            
            `;
            // console.log(parties)
            if (candidates['status'] == 200) {

                console.log(candidates['data'])

                candidates['data'].forEach(function (candidate) {
                    output += `
          <tr>
      <td>${candidate.candidate_id}</td>
      <td>${candidate.candidate_name}</td>
      <td>${candidate.office_name}</td>
      <td>${candidate.party_name}</td>
    </tr>
        
          `
                })
            } else {
                confirm(candidates['error'])
            }


            document.getElementById('candidates').innerHTML = output

        })

    
}


