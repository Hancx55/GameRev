//nav bar for all pages
const header = document.getElementsByTagName("header")[0];

document.addEventListener("DOMContentLoaded", () => {
    fetch("/Components/navigation.html")
    .then(response => response.text())
    .then(nav => {
        header.innerHTML = nav;

        //phone side nav
        const navBtn = document.getElementById("navBtn")
        let navOpen = false;

        //opening side nav on smaller devices
        navBtn.addEventListener("click", () => {
            document.getElementById("sideNav").classList.toggle("open");
            
            //changing ghost image
            if (!navOpen) {
                document.getElementById("navBtnImg").src = "/Images/blueGhost.jpg";
                navOpen = true;
            } else {
                document.getElementById("navBtnImg").src = "/Images/blinky.jpg";
                navOpen = false;
            }
        })
    })
})

//for IGDB covers - game.html and games.html 

//gets correct sized cover, and replaces with image filler if no image for game
function findGameCoverSmall(game) {
    if(game.cover && game.cover.url) {
            return ("https:" + game.cover.url.replace("t_thumb", "t_cover_big"));
        }
        else {
            console.log(`no game cover for ${game.name}`);
            return ("/images/imageFiller.png");
            
        }
}

//gets correct sized cover, and replaces with image filler if no image for game
function findGameCoverLarge(game) {
    if(game.cover && game.cover.url) {
            return ("https:" + game.cover.url.replace("t_thumb", "t_cover_big_2x"));
        }
        else {
            console.log(`no game cover for ${game.name}`);
            return ("/images/imageFiller.png");
            
        }
}