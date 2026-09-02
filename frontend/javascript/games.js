let allResults = [];

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

let currentQuery;
let currentPage;

async function runSearch(q) {
    currentQuery = q;
    currentPage = 1;

    const res = await fetch(`/search?query=${encodeURIComponent(q)}&page=1`);
    const data = await res.json();

    allResults = data;

    //allresults = {page, data, moreToCome <- boolean}
    console.log(allResults);
    displayResults(allResults.data);

    //adds button if 20+ results
    loadMoreBtn(allResults.moreToCome);
}

function loadMoreBtn(isMore) {
    const div = document.getElementById("loadMore");
    console.log(`is more = ${isMore}`);

    if (isMore) {
        div.innerHTML = (`<button id=loadMoreBtn>Load More</button>`);

        const btn = document.getElementById('loadMoreBtn');

        btn.addEventListener('click', () => {
            loadMoreResults();
        })
    }
    else {
        //no more results, removes button
        div.innerHTML = "";
    }
}

async function loadMoreResults() {
    currentPage ++;
    
    const res = await fetch(`/search?query=${encodeURIComponent(currentQuery)}&page=${currentPage}`);
    const data = await res.json();

    //add next 'page' of data to results, displaying this
    console.log(`${data.data.length} results added`)

    //updating results
    allResults.data = [...allResults.data, ...data.data];
    allResults.page = data.page;
    allResults.moreToCome = data.moreToCome;

    console.log(allResults);

    displayResults(allResults.data);
    loadMoreBtn(allResults.moreToCome);    
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