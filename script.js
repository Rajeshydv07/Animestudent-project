// wait for page to load
document.addEventListener("DOMContentLoaded", function() {
    
    // We are now using the Kitsu API!
    // Kitsu provides gorgeous, high-resolution English movie posters perfectly suited for a Flixer clone.

    const trendingUrl = "https://kitsu.io/api/edge/trending/anime?limit=8";
    const popularUrl = "https://kitsu.io/api/edge/anime?sort=-userCount&page[limit]=8";
    const highestRatedUrl = "https://kitsu.io/api/edge/anime?sort=-averageRating&page[limit]=8";

    // Fetch all 3 categories at the same time
    Promise.all([
        fetch(trendingUrl).then(res => res.json()),
        fetch(popularUrl).then(res => res.json()),
        fetch(highestRatedUrl).then(res => res.json())
    ])
    .then(function(results) {
        // hide the loading text
        document.getElementById("loadingText").style.display = "none";
        
        // show the rows now
        document.getElementById("all-rows").style.display = "block";

        let trendingData = results[0].data;
        let popularData = results[1].data;
        let ratedData = results[2].data;

        // put data into html
        createCards(trendingData, "row1");
        createCards(popularData, "row2");
        createCards(ratedData, "row3");

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
            let anime = array[i].attributes;

            // Kitsu has titles in english or en_jp
            let title = anime.titles.en || anime.titles.en_jp || anime.canonicalTitle;
            let score = anime.averageRating || "N/A";
            
            // Get the large, high-quality poster
            let imgUrl = "";
            if(anime.posterImage && anime.posterImage.large) {
                imgUrl = anime.posterImage.large;
            } else if (anime.posterImage && anime.posterImage.original) {
                imgUrl = anime.posterImage.original;
            }

            let htmlString = `
                <div class="card">
                    <img src="${imgUrl}" loading="lazy">
                    <div class="card-overlay">
                        <div class="card-title">${title}</div>
                        <div class="score">Score: ${score}</div>
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
