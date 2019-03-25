function loadNavMenus() {
    navmenu = `
    <div class="container">


            <nav>
                <p><a href="index.html">Politico</a> </p>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="#">Parties&nbsp;<span class="fas fa-caret-down"></span></a>
                        <ul>
                            <li><a href="parties.html">Parties</a></li>
                            <li><a href="create_party.html">Create Party</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Offices&nbsp;<span class="fas fa-caret-down"></span></a>
                        <ul>
                            <li><a href="offices.html">Offices</a></li>
                            <li><a href="create_office.html">Create Office</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Candidates&nbsp;<span class="fas fa-caret-down"></span></a>
                        <ul>
                            <li><a href="candidates.html">Candidates</a></li>
                            <li><a href="create_candidate.html">Create Candidate</a></li>
                        </ul>
                    </li>
                    <li><a href="vote.html">Vote</a>
                    </li>
                    

                </ul>

                <ul id="user-profile">
                    <li>
                        <a href="#" class="user-profile"><img src="${localStorage.passport}" onerror="if (this.src != './images/user.png') this.src = './images/user.png';"/><span
                                class="fas fa-caret-down"></span></a>
                        <ul>
                            <li><a id="signin" href="login.html" onclick=logOut()>${signText()}</a></li>
                            <li><a href="register.html">User Profile</a></li>
                        </ul>
                    </li>
                </ul>
               
            </nav>
        </div>


`


    console.log(localStorage.passport)
    // document.getElementById('navbar').innerHTML = navmenu
    document.getElementsByTagName('header')[0].innerHTML = navmenu
    console.log('works');
}

function signText() {
    if (localStorage.getItem('loggedID') === null) {
        return "Sign In"

    } else {
        return "Sign Out"
    }
}

function logOut() {
    if (document.getElementById('signin').innerText == 'Sign Out') {
        window.location = "login.html"
        localStorage.clear()
    }
}