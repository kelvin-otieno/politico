window.onload = loadCombos

function loadCombos() {
    fetch("https://vast-mountain-54945.herokuapp.com/api/v2/auth/", {
        method: 'GET',
        headers: new Headers({
            'token': localStorage.auth,
            'Content-Type': 'application/json'
        })

    })
        .then((res) => {
            return res.json()
        })
        .then(function (users) {
            let output = `
            
            
            `;
            // console.log(parties)
            if (users['status'] == 200) {

                console.log(users['data'])

                users['data'].forEach(function (user) {
                    output += `
                    <option value="${user.user_id}">${user.firstname}</option>
        
          `
                })
            } else {
                confirm(users['error'])
            }


            document.getElementById('userList').innerHTML = output

        })

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

                console.log(offices['data'])

                offices['data'].forEach(function (office) {
                    output += `
                        <option value="${office.office_id}">${office.name}</option>
            
              `
                })
            }


            document.getElementById('officeList').innerHTML = output

        })
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
                    
                    
                    `;
            console.log(parties)
            if (parties['status'] == 200) {

                console.log(parties['data'])

                parties['data'].forEach(function (party) {
                    output += `
                            <option value="${party.party_id}">${party.name}</option>
                
                  `
                })

            } else {
                console.log(parties['error'])
            }


            document.getElementById('partyList').innerHTML = output

        })

}


