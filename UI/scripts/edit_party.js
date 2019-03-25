// document.getElementById("editParty").addEventListener("click", getParty);

window.onload = function GetID() {
    id = ""
    document.getElementById("editButton").click(function () {
        id = $(this).val()
    })
    console.log(id)
}

// function getParty() {
//   fetch("https://vast-mountain-54945.herokuapp.com/api/v2/parties/")
//     .then((res) => {
//       return res.json()
//     })
//     .then(function (parties) {

//       console.log(parties)
//       let output = '<h2>Users</h2>';
//       // console.log(parties['data'])

//       parties['data'].forEach(function (party) {
//         output += `
//         <ul class="list-group mb-3">
//          <li class="list-group-item">ID: ${party.party_id}</li>
//          <li class="list-group-item">Name: ${party.name}</li>
//          <li class="list-group-item">Address: ${party.hqAddress}</li>
//          <li class="list-group-item">Logo: ${party.logoUrl}</li>
//        </ul>

//         `
//       })

//       document.getElementById('output').innerHTML = output

//     })
// }