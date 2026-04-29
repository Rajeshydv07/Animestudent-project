// wait for page to load
document.addEventListener("DOMContentLoaded", function() {
    
    // We are replacing the Jikan API with a custom premium database
    // so we get gorgeous, high-quality, English-only posters just like Flixer.
    
    const premiumAnimeDatabase = [
        // Trending
        { title: "Jujutsu Kaisen", score: "9.8", img: "https://image.tmdb.org/t/p/w500/hFWP5HkbVEe40hrptjvfcKqcNTS.jpg" },
        { title: "Demon Slayer", score: "9.7", img: "https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SnCQBNWQsISCW3.jpg" },
        { title: "Attack on Titan", score: "9.9", img: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg" },
        { title: "Solo Leveling", score: "9.5", img: "https://image.tmdb.org/t/p/w500/geCRueVbVs2RkHk6sX5PUNB2q8L.jpg" },
        { title: "Spy x Family", score: "9.2", img: "https://image.tmdb.org/t/p/w500/3r4LYGFXjAqT3PEkgFl88NIspKV.jpg" },
        { title: "My Hero Academia", score: "8.9", img: "https://image.tmdb.org/t/p/w500/ivtRhNdA1L4E3E5j0v2xY75c1xV.jpg" },
        { title: "One Piece", score: "9.6", img: "https://image.tmdb.org/t/p/w500/fcZNmbPIaIzw0rAIf81xO351s7V.jpg" },
        { title: "Naruto Shippuden", score: "9.4", img: "https://image.tmdb.org/t/p/w500/zAYRe2bJxpWTVrwwmBc00VFkAfV.jpg" },
        
        // Popular Movies
        { title: "Your Name", score: "9.9", img: "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg" },
        { title: "Spirited Away", score: "9.8", img: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRU84vtw1nSMy.jpg" },
        { title: "A Silent Voice", score: "9.6", img: "https://image.tmdb.org/t/p/w500/drkO2g0U0s3Q1I2S6ZzB937fH9x.jpg" },
        { title: "Jujutsu Kaisen 0", score: "9.5", img: "https://image.tmdb.org/t/p/w500/3pTwMUEavTzVOh6yLN0aEwR7uSy.jpg" },
        { title: "Demon Slayer Movie", score: "9.7", img: "https://image.tmdb.org/t/p/w500/h8Rb9gBrCQcg1IHNvwXVKCVqwTE.jpg" },
        { title: "Suzume", score: "9.4", img: "https://image.tmdb.org/t/p/w500/vIeu8WysZvNgpzqJxvKDr1l3wE5.jpg" },
        { title: "Howl's Moving Castle", score: "9.5", img: "https://image.tmdb.org/t/p/w500/6pZgH10jhpnUpcgGvRkVjX4uVzO.jpg" },
        { title: "Akira", score: "9.1", img: "https://image.tmdb.org/t/p/w500/neZ0yzNUMC64YwB6WnS10vB7Xn6.jpg" },

        // Top Rated
        { title: "Death Note", score: "9.8", img: "https://image.tmdb.org/t/p/w500/tCpeqK0qA4Qz1wzV3Z200J5N9kL.jpg" },
        { title: "Fullmetal Alchemist", score: "9.9", img: "https://image.tmdb.org/t/p/w500/5ZFHN1w6UxcW27fIavw0bB1bYIn.jpg" },
        { title: "Cyberpunk Edgerunners", score: "9.5", img: "https://image.tmdb.org/t/p/w500/7lKIfN0Ym8pE4P0y7F0L5jC8UvL.jpg" },
        { title: "Chainsaw Man", score: "9.4", img: "https://image.tmdb.org/t/p/w500/npdB6eFzizki0WaZ1OvKcJrWe97.jpg" },
        { title: "Bleach", score: "9.2", img: "https://image.tmdb.org/t/p/w500/2Eewbc7HcAOXDsBML2hEaBeb2d.jpg" },
        { title: "Hunter x Hunter", score: "9.6", img: "https://image.tmdb.org/t/p/w500/xpgx6NRAMg30pqAfZz7FGH18Dtl.jpg" },
        { title: "Steins;Gate", score: "9.5", img: "https://image.tmdb.org/t/p/w500/pw2q2v1a9P1m0s4lqUv5P0E6M5S.jpg" },
        { title: "Vinland Saga", score: "9.4", img: "https://image.tmdb.org/t/p/w500/uTs1bU2v1lWq1s1dO3X7h4uR5tq.jpg" }
    ];

    // hide the loading text
    document.getElementById("loadingText").style.display = "none";
    
    // show the rows now
    document.getElementById("all-rows").style.display = "block";

    // split into 3 rows
    let row1_data = premiumAnimeDatabase.slice(0, 8);
    let row2_data = premiumAnimeDatabase.slice(8, 16);
    let row3_data = premiumAnimeDatabase.slice(16, 24);

    // put data into html
    createCards(row1_data, "row1");
    createCards(row2_data, "row2");
    createCards(row3_data, "row3");

    setupScrollButtons();

    // function to loop array and make html
    function createCards(array, elementId) {
        let rowDiv = document.getElementById(elementId);
        
        for(let i = 0; i < array.length; i++) {
            let anime = array[i];

            let htmlString = `
                <div class="card">
                    <img src="${anime.img}" loading="lazy">
                    <div class="card-overlay">
                        <div class="card-title">${anime.title}</div>
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
