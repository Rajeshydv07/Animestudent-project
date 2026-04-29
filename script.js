// wait for page to load
document.addEventListener("DOMContentLoaded", function() {
    
    // console.log("page loaded");

    // fetch anime from jikan api
    fetch("https://api.jikan.moe/v4/top/anime")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let animeList = data.data;
        // console.log(animeList);

        // hide loading text
        document.getElementById("loadingText").style.display = "none";
        // show rows
        document.getElementById("all-rows").style.display = "block";

        // make 3 rows by slicing the array (so we dont get rate limited by api)
        let row1_data = animeList.slice(0, 8);
        let row2_data = animeList.slice(8, 16);
        let row3_data = animeList.slice(16, 24);

        // add data to html
        createCards(row1_data, "row1");
        createCards(row2_data, "row2");
        createCards(row3_data, "row3");

    })
    .catch(function(error) {
        console.log("Error getting api", error);
        document.getElementById("loadingText").innerHTML = "Error loading animes. Please refresh.";
    });

    // function to loop through array and make html cards
    function createCards(array, elementId) {
        let rowDiv = document.getElementById(elementId);
        
        for(let i = 0; i < array.length; i++) {
            let anime = array[i];
            
            // fix if title is too long
            let title = anime.title_english;
            if (title == null) {
                title = anime.title;
            }

            // make sure image exists so it doesnt break
            let imgUrl = "";
            if(anime.images && anime.images.jpg) {
                imgUrl = anime.images.jpg.image_url;
            }

            let htmlString = `
                <div class="card">
                    <img src="${imgUrl}">
                    <div class="card-title">${title}</div>
                    <div class="score">Score: ${anime.score}</div>
                </div>
            `;
            
            // append to the row
            rowDiv.innerHTML += htmlString;
        }
    }

    // --- DYNAMIC LOGIN MODAL ---
    let loginBtn = document.getElementById("loginBtn");
    let loginModal = document.getElementById("loginModal");
    let closeBtn = document.getElementById("closeBtn");
    let submitLogin = document.getElementById("submitLogin");

    // open modal
    loginBtn.addEventListener("click", function() {
        loginModal.style.display = "block";
    });

    // close modal
    closeBtn.addEventListener("click", function() {
        loginModal.style.display = "none";
    });

    // fake login check
    submitLogin.addEventListener("click", function() {
        let user = document.getElementById("username").value;
        if(user == "student") {
            alert("Welcome back student!");
            loginModal.style.display = "none";
            loginBtn.innerHTML = "Logout";
        } else {
            document.getElementById("loginMessage").style.display = "block";
        }
    });

    // --- DYNAMIC NAVBAR LINKS ---
    let navLinks = document.querySelectorAll(".nav-link");
    let heroTitle = document.querySelector(".title-text");
    let heroDiv = document.querySelector(".hero");
    let row1 = document.getElementById("row1");
    let row2 = document.getElementById("row2");
    let row3 = document.getElementById("row3");
    let row1Title = document.querySelector("#all-rows h2:nth-of-type(1)");
    let row2Title = document.querySelector("#all-rows h2:nth-of-type(2)");
    let row3Title = document.querySelector("#all-rows h2:nth-of-type(3)");

    for(let i=0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function(event) {
            event.preventDefault(); // stop page from reloading
            
            // reset all colors to white
            for(let j=0; j < navLinks.length; j++) {
                navLinks[j].style.color = "white";
            }
            
            // make clicked link red
            this.style.color = "red";

            // change hero text and background depending on what was clicked
            let clickedText = this.innerHTML;
            
            if(clickedText == "Home") {
                heroTitle.innerHTML = "ANIMEFLIX HOME";
                heroDiv.style.backgroundImage = "url('https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg')"; // One Piece banner
                row1.style.display = "flex"; row1Title.style.display = "block";
                row2.style.display = "flex"; row2Title.style.display = "block";
                row3.style.display = "flex"; row3Title.style.display = "block";
            } else if (clickedText == "Movies") {
                heroTitle.innerHTML = "TOP MOVIES";
                heroDiv.style.backgroundImage = "url('https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQ0ceO8jxgHg.jpg')"; // Jujutsu Kaisen 0 banner
                row1.style.display = "none"; row1Title.style.display = "none";
                row2.style.display = "flex"; row2Title.style.display = "block";
                row3.style.display = "none"; row3Title.style.display = "none";
            } else if (clickedText == "TV") {
                heroTitle.innerHTML = "TV SHOWS";
                heroDiv.style.backgroundImage = "url('https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-YfZhKABiqMVp.jpg')"; // Demon Slayer banner
                row1.style.display = "flex"; row1Title.style.display = "block";
                row2.style.display = "none"; row2Title.style.display = "none";
                row3.style.display = "flex"; row3Title.style.display = "block";
            } else if (clickedText == "Anime") {
                heroTitle.innerHTML = "BLEACH";
                heroDiv.style.backgroundImage = "url('https://s4.anilist.co/file/anilistcdn/media/anime/banner/269-KCcJAZDQqXwT.jpg')"; // Bleach banner
                row1.style.display = "flex"; row1Title.style.display = "block";
                row2.style.display = "flex"; row2Title.style.display = "block";
                row3.style.display = "flex"; row3Title.style.display = "block";
            }
        });
    }

});
