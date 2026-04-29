// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Helper delay to avoid Jikan API rate limit (3 req/sec)
    const delay = ms => new Promise(res => setTimeout(res, ms));

    // Fetch Anime Data
    const fetchAnime = async () => {
        try {
            // Fetch three different categories
            const [resTrending, resPopular, resTopRated] = await Promise.all([
                fetch('https://api.jikan.moe/v4/seasons/now?limit=15').then(res => res.json()),
                delay(400).then(() => fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=15').then(res => res.json())),
                delay(800).then(() => fetch('https://api.jikan.moe/v4/top/anime?limit=15').then(res => res.json()))
            ]);

            // Hide loader
            document.getElementById('loading').style.display = 'none';

            // Show sections
            document.getElementById('trending-section').style.display = 'block';
            document.getElementById('popular-section').style.display = 'block';
            document.getElementById('top-rated-section').style.display = 'block';

            // Populate rows
            populateRow('trending-row', resTrending.data);
            populateRow('popular-row', resPopular.data);
            populateRow('top-rated-row', resTopRated.data);

        } catch (error) {
            console.error('Error fetching anime data:', error);
            document.getElementById('loading').innerHTML = '<p style="color: var(--text-muted); text-align: center; margin-top: 20px;">Failed to load anime data. Rate limit might be exceeded. Please try again later.</p>';
        }
    };

    const populateRow = (rowId, animes) => {
        const row = document.getElementById(rowId);
        
        if (!animes || animes.length === 0) return;

        animes.forEach(anime => {
            // Create card element
            const card = document.createElement('div');
            card.classList.add('anime-card');
            
            // Extract data securely
            const title = anime.title_english || anime.title;
            const imageUrl = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || '';
            const score = anime.score ? `${anime.score} Rating` : 'N/A';
            
            card.innerHTML = `
                <img src="${imageUrl}" alt="${title}" loading="lazy">
                <div class="anime-card-overlay">
                    <div class="anime-card-title" title="${title}">${title}</div>
                    <div class="anime-card-score"><i class="fas fa-star"></i> ${score}</div>
                </div>
            `;
            
            row.appendChild(card);
        });
    };

    // Initialize fetch
    fetchAnime();
});
