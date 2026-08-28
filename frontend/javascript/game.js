//loads game info into game page
document.addEventListener('DOMContentLoaded', () => {
    //load content as page opens
    const params = new URLSearchParams(window.location.search);

    const path = window.location.pathname.split("/");
    console.log(path);
    
    const id = path.pop();
    console.log(id);

    loadGameInformation(id);
})

//fetches information for game
async function loadGameInformation(id) {
    const res = await fetch(`/api/game/${id}`);
    const data = await res.json();

    console.log(data[0]);
    displayGameInfo(data[0]);
} 

//displays game information for specific game
function displayGameInfo(game) {
    //image
    const gameImg = document.getElementById("gameImg");
    gameImg.src = findGameCoverLarge(game);
    //for a smoother image appearance
    gameImg.classList.add("loaded");
}
