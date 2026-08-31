//loads game info into game page
document.addEventListener('DOMContentLoaded', () => {
    //load content as page opens
    const params = new URLSearchParams(window.location.search);

    const path = window.location.pathname.split("/");
    
    const id = path.pop();
    console.log(id);

    loadGameInformation(id);
})

//fetches information for game
let gameData;

async function loadGameInformation(id) {
    const res = await fetch(`/api/game/${id}`);
    const data = await res.json();

    console.log(data[0]);
    gameData = data[0];
    displayGameInfo(data[0]);
} 

//displays game information for specific game
function displayGameInfo(game) {
    //image
    const gameImg = document.getElementById("gameImg");
    gameImg.src = findGameCoverLarge(game);
    //for a smoother image appearance
    gameImg.classList.add("loaded");

    //title
    const title = document.getElementById("gameName");
    if (!(game.name === null)) {
        title.innerHTML = game.name;
    }
    else { title.innerHTML = 'game name not found.'}
    

    //summary
    const summary = document.getElementById("gameDesc");
    if (!(game.summary === null)) {
        summary.innerHTML = renderSummary(game.summary);
    }
    else { summary.innerHTML = 'no game summary'};


    //metadata
    //developer
    const dev = document.getElementById("devResult");
    if (!(getDeveloper(game) === null)) {
        dev.innerHTML = getDeveloper(game);
    }
    else {dev.innerHTML = 'unknown developer'}
    

    //publisher
    const pub = document.getElementById("pubResult");
    if (!(getPublisher(game) === null)) {
        pub.innerHTML = getPublisher(game);
    }
    else {pub.innerHTML = 'unknown publisher'}

    //date released
    const release = document.getElementById("relResult");
    if (!(formatDate(game.first_release_date) === null)) {
        release.innerHTML = formatDate(game.first_release_date);
    }
    else { release.innerHTML = 'unknown release date'}

    //rating
    const rating = document.getElementById("ratResult");
    if (!(Math.round(game.rating) === null)) {
        rating.innerHTML = Math.round(game.rating) + '%';
    }
    else {rating.innerHTML = 'unknown rating'}

    //game platforms
    const platforms = document.getElementById("gamePlatforms");
    platforms.innerHTML = renderPlatforms(game.platforms);
}

function getDeveloper(game) {
    let developer;
    const companies = game.involved_companies;
    
    companies.forEach(company => {
        if (company.developer === true) {
            developer = company.company.name;
        }
    })
    return developer;
}

function getPublisher(game) {
    let publisher;
    const companies = game.involved_companies;

    companies.forEach(company => {
        if (company.publisher === true) {
            publisher = company.company.name;
        }
    })
    return publisher;
}

function formatDate(d) {
    // eg 05 Aug 2026
    return new Date(d * 1000).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric"
    })
}

let platformOpen = false;

function renderPlatforms(platforms) {
    let html = "";

    if (!platformOpen && platforms.length > 4)
    {
        const firstP = platforms.slice(0,4);
        
        firstP.forEach(p => {
            html += `<li>${p.name}</li>`
        })

        html += `<button id="loadPlatformsBtn" class="seeMore">see more</button>`;
    }
    else {
        platforms.forEach(platform => {
            html += `<li>${platform.name}</li>`
        })
        if (platforms.length > 4) {
            html += `<button id="loadPlatformsBtn" class="seeMore">see less</button>`;
        }
    }

    return html;
}

let summaryOpen = false;

document.addEventListener('click', (e) => {
    if (e.target.id === 'loadPlatformsBtn') {
        if (platformOpen) {platformOpen = false}
        else {platformOpen = true}

        //render platforms list
        const platforms = document.getElementById("gamePlatforms");
        platforms.innerHTML = renderPlatforms(gameData.platforms);
    }

    if(e.target.id === 'readMoreSummary') {
        if (summaryOpen) {summaryOpen = false}
        else {summaryOpen = true}

        const summary = document.getElementById("gameDesc");
        summary.innerHTML = renderSummary(gameData.summary);
    }
})


function formatSummary(summary, max) {
    if (summary.length <= max) {
        return summary;
    }

    return summary.slice(0, summary.lastIndexOf(" ", max));
}

function renderSummary (summary) {
    const maxSummaryLength = 620;

    const firstS = formatSummary(summary, maxSummaryLength);

    if (!(summaryOpen) && summary.length > maxSummaryLength) {
        return (`${firstS}... <button id="readMoreSummary" class="seeMore">read more</button>`);
    }
    else {
        let html = summary;
        if (summary.length > maxSummaryLength) {
            html += ` <button id="readMoreSummary" class="seeMore">read less</button>`;
        }

        return html;
    }

    
}