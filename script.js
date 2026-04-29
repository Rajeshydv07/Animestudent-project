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

});
