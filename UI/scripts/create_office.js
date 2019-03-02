window.onload = loadOffices
window.onunload = function reset() {
    localStorage.isEdit = false;
}
document.getElementById('createOffice').addEventListener('submit', createOffice);

function createOffice(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    var sel = document.getElementById("officeTypeList");
    let office_type = sel.options[sel.selectedIndex].text;
    if (localStorage.isEdit == 'true') {
        fetch('https://vast-mountain-54945.herokuapp.com/api/v2/offices/' + localStorage.office_id, {
            method: 'PUT',
            headers: new Headers({
                'token': localStorage.auth,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                name: name, office_type: office_type
            })
        }
        )
            .then((res) => res.json())
            .then((office) => {
                if (office['status'] == 200) {
                    localStorage.isEdit = false
                    alert(office['message'])
                }
                else {
                    alert(office['error'])
                    // console.log(localStorage.auth)
                }
            })
    } else {
        fetch('https://vast-mountain-54945.herokuapp.com/api/v2/offices/', {
            method: 'POST',
            headers: new Headers({
                'token': localStorage.auth,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                name: name, office_type: office_type
            })
        }
        )
            .then((res) => res.json())
            .then((office) => {
                console.log(office)
                if (office['status'] == 201) {
                    alert("Successfully created office")
                }
                else {
                    alert(office['error'])
                    // console.log(localStorage.auth)
                }
            })
    }

}

function loadOffices() {
    if (localStorage.isEdit == 'true') {
        document.getElementById('name').value = localStorage.office_name;
        console.log(localStorage.office_name)
        var textToFind = localStorage.office_type;
        var dd = document.getElementById('officeTypeList');
        for (var i = 0; i < dd.options.length; i++) {
            if (dd.options[i].text === textToFind) {
                dd.selectedIndex = i;
                break;
            }
        }


        document.getElementById("title").innerText = "UPDATE OFFICE"

    }
}