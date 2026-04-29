// wait for page to load
document.addEventListener("DOMContentLoaded", function() {
    
    // get anime stuff from api
    fetch("https://api.jikan.moe/v4/top/anime")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let animeList = data.data;

        // hide the loading text
        document.getElementById("loadingText").style.display = "none";
        
        // show the rows now
        document.getElementById("all-rows").style.display = "block";

        // split into 3 rows so it looks cool
        let row1_data = animeList.slice(0, 8);
        let row2_data = animeList.slice(8, 16);
        let row3_data = animeList.slice(16, 24);

        // put data into html
        createCards(row1_data, "row1");
        createCards(row2_data, "row2");
        createCards(row3_data, "row3");

        setupScrollButtons();
    })
    .catch(function(error) {
        console.log("error with api", error);
        document.getElementById("loadingText").innerHTML = "Error loading animes. Please refresh.";
    });

    // function to loop array and make html
    function createCards(array, elementId) {
        let rowDiv = document.getElementById(elementId);
        
        for(let i = 0; i < array.length; i++) {
            let anime = array[i];
            
            // fix empty titles
            let title = anime.title_english || anime.title;

            // make sure image works
            let imgUrl = "";
            if(anime.images && anime.images.jpg) {
                imgUrl = anime.images.jpg.image_url;
            }

            let htmlString = `
                <div class="card">
                    <img src="${imgUrl}">
                    <div class="card-overlay">
                        <div class="card-title">${title}</div>
                        <div class="score">Score: ${anime.score}</div>
                    </div>
                </div>
            `;
            
            // add to row
            rowDiv.innerHTML += htmlString;
        }
    }

    // Scroll buttons logic
    function setupScrollButtons() {
        let leftBtns = document.querySelectorAll(".left-btn");
        let rightBtns = document.querySelectorAll(".right-btn");

        leftBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                let row = this.nextElementSibling;
                row.scrollBy({ left: -400, behavior: 'smooth' });
            });
        });

        rightBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                let row = this.previousElementSibling;
                row.scrollBy({ left: 400, behavior: 'smooth' });
            });
        });
    }

    // login popup logic
    let loginBtn = document.getElementById("loginBtn");
    let loginModal = document.getElementById("loginModal");
    let closeBtn = document.getElementById("closeBtn");
    let submitLogin = document.getElementById("submitLogin");

    // open the modal
    loginBtn.addEventListener("click", function() {
        loginModal.style.display = "block";
    });

    // close the modal
    closeBtn.addEventListener("click", function() {
        loginModal.style.display = "none";
    });

    // check if user is student
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

    // menu clicking logic
    let navLinks = document.querySelectorAll(".nav-link");
    let heroTitle = document.querySelector(".title-text");
    let heroDesc = document.querySelector(".hero-desc");
    let heroDiv = document.querySelector(".hero");
    
    // Rows logic
    let trendingRow = document.querySelector("#all-rows h2:nth-of-type(1)").parentElement;
    let popularRow = document.querySelector("#all-rows h2:nth-of-type(2)").parentElement;
    let originalsRow = document.querySelector("#all-rows h2:nth-of-type(3)").parentElement;

    for(let i=0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function(event) {
            event.preventDefault(); // dont reload page
            
            // reset colors
            for(let j=0; j < navLinks.length; j++) {
                navLinks[j].style.color = "var(--text-muted)";
                navLinks[j].style.fontWeight = "600";
            }
            
            // color the clicked one white
            this.style.color = "white";
            this.style.fontWeight = "bold";

            // change the big picture and hide rows
            let clickedText = this.innerHTML;
            
            if(clickedText == "Home") {
                heroTitle.innerHTML = "ONE PIECE";
                heroDesc.innerHTML = "Monkey D. Luffy sets off on an adventure with his pirate crew in hopes of finding the greatest treasure ever left by the legendary Pirate, Gold Roger.";
                heroDiv.style.backgroundImage = "url('https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg')"; 
            } else if (clickedText == "Movies") {
                heroTitle.innerHTML = "JUJUTSU KAISEN 0";
                heroDesc.innerHTML = "Yuta Okkotsu, a high schooler who gains control of an extremely powerful Cursed Spirit, gets enrolled in the Tokyo Prefectural Jujutsu High School by Jujutsu Sorcerers to help him control his power.";
                heroDiv.style.backgroundImage = "url('https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQ0ceO8jxgHg.jpg')"; 
            } else if (clickedText == "TV Shows") {
                heroTitle.innerHTML = "DEMON SLAYER";
                heroDesc.innerHTML = "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly.";
                heroDiv.style.backgroundImage = "url('https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-YfZhKABiqMVp.jpg')"; 
            } else if (clickedText == "Live Sports" || clickedText == "My List") {
                heroTitle.innerHTML = "BLEACH";
                heroDesc.innerHTML = "High school student Ichigo Kurosaki gains soul reaper powers from Rukia Kuchiki and sets out to save the world.";
                heroDiv.style.backgroundImage = "url('https://s4.anilist.co/file/anilistcdn/media/anime/banner/269-KCcJAZDQqXwT.jpg')"; 
            }
        });
    }

});
