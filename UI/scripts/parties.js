
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
            let output = `
            <tr>
            <th>ID</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Headquarters</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
            
            `;
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
      <td><button id="editButton" type="button" name="${party.party_id}" onclick=getParty(this.name) >Edit</button></td>
      <td>
        <button id="deleteButton" style="background:#f7919c" value="${party.party_id}">Delete</button>
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

function getID(name) {
    alert(name)
}

function getParty(party_id) {
    fetch("https://vast-mountain-54945.herokuapp.com/api/v2/parties/" + party_id, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'token': localStorage.auth
        })
    })
        .then((res) => {
            return res.json()
        })
        .then(function (party) {

            localStorage.isEdit = new Boolean(true)
            localStorage.party_name = party['data'][0]['name']
            localStorage.hqAddress = party['data'][0]['hqAddress']
            localStorage.logoUrl = party['data'][0]['logoUrl']
            localStorage.party_id = party['data'][0]['party_id']

            window.location = "https://kelvin-otieno.github.io/politico/UI/create_party.html"


        })
}