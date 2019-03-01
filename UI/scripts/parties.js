
window.onload = getParties;
function getParties() {
    fetch("https://vast-mountain-54945.herokuapp.com/api/v2/parties/", {
        method: 'GET',
        headers: new Headers({
            'token': localStorage.auth,
            'Content-Type': 'application/json'
        })

    })
        .then((res) => {
            return res.json()
        })
        .then(function (parties) {
            let output = '';
            // console.log(parties)
            if (parties['status'] == 200) {

                console.log(parties['data'])

                parties['data'].forEach(function (party) {
                    output += `
          <tr>
      <td>${party.party_id}</td>
      <td><img class="party_logo" src="${party.logoUrl}" onerror="if (this.src != './images/party.png') this.src = './images/party.png';"/></td>
      <td>${party.name}</td>
      <td>${party.hqAddress}</td>
      <td><button id="editButton">Edit</button></td>
      <td>
        <button id="deleteButton" style="background:#f7919c">Delete</button>
      </td>
    </tr>
        
          `
                })
            } else {
                confirm(parties['error'])
            }


            document.getElementById('parties').innerHTML = output

        })
}

