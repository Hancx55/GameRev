
document.addEventListener("DOMContentLoaded", () => {
    
    //load the results if there is query in url already
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");

    if (q) {
        runSearch(q);
    }
})

//search bar
const searchInput = document.getElementById("search-input");

if (searchInput) {
        searchInput.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            const query = searchInput.value.trim();
            console.log(query);
            if (!query) return;

            window.history.pushState({}, "", `?q=${query}`);

            runSearch(query);
        }
    })
}

async function runSearch(q) {
    const res = await fetch(`/search?query=${encodeURIComponent(q)}`);
    const data = await res.json();

    console.log(data);
    displayResults(data);
}

// display the games results
function displayResults(games) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    games.forEach(game => {
        const item = document.createElement("div");
        item.className = "game-item";
        item.id = game.id;

        let coverUrl = findGameCoverSmall(game);

        item.innerHTML = `
        <div class="imgCard"><img src="${coverUrl}" /></div>
        <h3>${game.name}</h3>
        `
        resultsDiv.appendChild(item);
    })
    
    //go onto game info page
    const gameItems = Array.from(document.getElementsByClassName("game-item"));
    console.log(gameItems);

    if (gameItems) {
        gameItems.forEach(item => item.addEventListener('click', () => {
            console.log("clicked");
            console.log(item.id);

            const name = (item.querySelector('h3')).innerHTML;
            console.log(name);
            //change to the specific game page
            window.location.href = `/game/${item.id}`;
        }))
    }
    
}