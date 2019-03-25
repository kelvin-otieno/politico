function getOffices() {
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
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Office Type</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
            
            `;
            // console.log(parties)
            if (offices['status'] == 200) {

                console.log(offices['data'])

                offices['data'].forEach(function (office) {
                    output += `
          <tr>
      <td>${office.office_id}</td>
      <td>${office.name}</td>
      <td>${office.office_type}</td>
      <td><button id="editButton" type="button" name="${office.office_id}" onclick=getOffice(this.name) >Edit</button></td>
      <td>
        <button id="deleteButton" type="button" style="background:#f7919c" name="${office.office_id}" onclick=deleteOffice(this.name)>Delete</button>
      </td>
    </tr>
        
          `
                })
            } else {
                confirm(offices['error'])
            }


            document.getElementById('offices').innerHTML = output

        })
}


function getOffice(office_id) {
    fetch("https://vast-mountain-54945.herokuapp.com/api/v2/offices/" + office_id, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'token': localStorage.auth
        })
    })
        .then((res) => {
            return res.json()
        })
        .then(function (office) {

            localStorage.isEdit = new Boolean(true)
            localStorage.office_name = office['data'][0]['name']
            localStorage.office_type = office['data'][0]['office_type']
            localStorage.office_id = office['data'][0]['office_id']

            window.location = "https://kelvin-otieno.github.io/politico/UI/create_office.html"


        })
}

function deleteOffice(office_id) {
    answer = confirm('Sure to delete office?')
    if (answer) {
        fetch("https://vast-mountain-54945.herokuapp.com/api/v2/offices/" + office_id, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'token': localStorage.auth
            })
        })
            .then((res) => {
                return res.json()
            })
            .then(function (office) {
                if (office['status'] == 200) {
                    alert(office['message'])
                    window.location = "https://kelvin-otieno.github.io/politico/UI/offices.html"
                } else {
                    alert(office['error'])
                }




            })
    } else {
        // Do nothing!
    }

}

