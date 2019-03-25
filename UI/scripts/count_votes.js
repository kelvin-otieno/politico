var tallies = ``
var output = ``;



function getVotes() {
    fetch("https://vast-mountain-54945.herokuapp.com/api/v2/offices/voted", {
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

            console.log(offices)
            console.log(localStorage.auth)
            if (offices['status'] == 200) {

                // console.log(offices['data'])

                offices['data'].forEach(function (office) {



                    fetch("https://vast-mountain-54945.herokuapp.com/api/v2/office/" + office.office_id + "/result/", {
                        method: 'GET',
                        headers: new Headers({
                            'token': localStorage.auth,
                            'Content-Type': 'application/json'
                        })

                    })
                        .then((res) => res.json())
                        .then(function (votes) {
                            // console.log(votes)
                            let i = 1
                            votes['data'].forEach(function (vote) {
                                vote_pc = (parseInt(vote.result, 10) / parseInt(vote.votes_casted, 10)) * 100
                                // console.log(vote_pc)
                                tallies = `
                                <div class="numbers">
                                    <span id="office">office:${vote.of_name}</span>
                                    <span id="turnout">voter turnout:${vote.voter_turnout}</span>
                                    <span id="casted">votes casted:${vote.votes_casted}</span>
                                </div>
                                
                                `
                                document.getElementById('tallyingCenter').innerHTML += `
                                
                            <div id="content">
                            <img src="${vote.cd_passport}" onerror="if (this.src != './images/party.png') this.src = './images/party.png';"/>
                            <ul>
                              <li>${vote.cd_name}</li>
                              <li>${vote.party_name}</li>
                              <li>${vote.of_name}</li>
                            </ul>
                      
                            <img src="${vote.party_logo}" class="party_logo_results" id="party_logo" onerror="if (this.src != './images/party.png') this.src = './images/party.png';" />
                            
                            <span class="results">${Math.round(vote_pc)}%</span>
                            <span class="result">votes:${vote.result}</span>
                          </div>
                          
                            `

                            })
                            document.getElementById('tallyingCenter').innerHTML += "<br>"
                            document.getElementById('tallyingCenter').innerHTML += tallies
                        })
                    // output += `<br/>`

                })

                // console.log(this.tallies)

            } else {
                confirm(offices['error'])
            }




        })


}
