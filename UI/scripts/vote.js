function loadOfficeRadios() {
    fetch("https://vast-mountain-54945.herokuapp.com/api/v2/offices/", {
        method: 'GET',
        headers: new Headers({
            'token': localStorage.auth,
            'Content-Type': 'application/json'
        })

    })
        .then((res) => {
            return res.json()
        })
        .then(function (offices) {
            let output = `
            
            `;
            // console.log(parties)
            if (offices['status'] == 200) {

                // console.log(offices['data'])

                offices['data'].forEach(function (office) {
                    output += `
                    
                    <td><input type="radio" name="office_name" value="${office.office_id}" id="${office.name}" onclick=getCandidates(this.value)> ${office.name}</td>
                    
        
          `
                })
            } else {
                alert(offices['error'])
            }


            document.getElementById('officeRadios').innerHTML = output

            if (offices['data'].length == 0) {
                alert("Not found any candidates.")
            }

        })
}

function getCandidates(office_id) {
    fetch("https://vast-mountain-54945.herokuapp.com/api/v2/office/" + office_id, {
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
            <th>Candidate</th>
            <th>Name</th>
            <th>Office</th>
            <th>Party</th>
            <th>Vote</th>
          </tr>
            
            `;
            // console.log(parties)
            if (candidates['status'] == 200) {

                // console.log(candidates['data'])
                if (candidates['data'].length == 0) {
                    alert("No candidates for the selected office.")
                } else {
                    candidates['data'].forEach(function (candidate) {
                        output += `
                        <tr>
                        <td><img class="party_logo" src="${candidate.candidate_pic}" onerror="if (this.src != './images/party.png') this.src = './images/party.png';"/></td>
                        <td>${candidate.candidate_name}</td>
                        <td>${candidate.office_name}</td>
                        <td>${candidate.party_name}</td>
                        <td><input type="radio" name="candidates" value="${candidate.candidate_id}" id="${candidate.candidate_id}"/></td>
                      </tr>
            
              `
                    })
                    document.getElementById('submit').style.display = "block"
                }

            } else {
                confirm(candidates['error'])
            }


            document.getElementById('candidates').innerHTML = output

        })
}