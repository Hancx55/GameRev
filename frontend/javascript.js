
//nav bar for all pages
const header = document.getElementsByTagName("header")[0];

document.addEventListener("DOMContentLoaded", () => {
    fetch("Components/navigation.html")
    .then(response => response.text())
    .then(nav => {
        header.innerHTML = nav;

        //phone side nav
        const navBtn = document.getElementById("navBtn")
        let navOpen = false;

        navBtn.addEventListener("click", () => {
            document.getElementById("sideNav").classList.toggle("open");
            
            if (!navOpen) {
                document.getElementById("navBtnImg").src = "Images/blueGhost.jpg";
                navOpen = true;
            } else {
                document.getElementById("navBtnImg").src = "Images/blinky.jpg";
                navOpen = false;
            }
        })
    })
})




//scrolling sections on main page
const scrollSections = document.getElementsByClassName("scrollSection");

for (let i=0; i< scrollSections.length; i++) {
    const section = scrollSections[i];

    const scroll = section.getElementsByClassName("scroll")[0];
    const left = section.getElementsByClassName("left")[0];
    const right = section.getElementsByClassName("right")[0];

    left.addEventListener("click", () => {
        scroll.scrollBy({
            left: -scroll.clientWidth,
            behavior: "smooth"
        })
    })

    right.addEventListener("click", () => {
        scroll.scrollBy({
            left: scroll.clientWidth,
            behavior: "smooth"
        })
    })
}

//clock
const clockFace = document.querySelector(".clock");

if (clockFace) {

    const secHand = document.querySelector('.secondHand');
    const minHand = document.querySelector('.minHand');
    const hourHand = document.querySelector('.hourHand');

    function clockTick() {
        
        const now = new Date();

        const seconds = now.getSeconds();
        const secDegrees = (seconds/60) * 360;

        const minutes = now.getMinutes();
        const minDegrees = ((minutes/60) * 360) + ((seconds/60)*6) + 90;

        const hours = now.getHours();
        const hourDegrees = ((hours/12) * 360) + ((minutes/60)*30) + 90;

        secHand.style.transform = `rotate(${secDegrees}deg)`;
        minHand.style.transform = `rotate(${minDegrees}deg)`;
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;  
    }


    setInterval(clockTick, 1000);

}

//search bar
const searchInput = document.getElementById("search-input");


searchInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const query = searchInput.value.trim();
        console.log(query);
        if (!query) return;

        const res = await fetch(`/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();

        console.log(data);
        displayResults(data);
    }
})

// display
function displayResults(games) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    games.forEach(game => {
        const item = document.createElement("div");
        item.className = "game-item";

        let coverUrl;

        if(game.cover && game.cover.url) {
            coverUrl = "https:" + game.cover.url.replace("t_thumb", "t_cover_big");
        }
        else {
            coverUrl = "https://via.placeholder.com/200x250?text=No+Image";
        }

        item.innerHTML = `
        <div class="imgCard"><img src="${coverUrl}" /></div>
        <h3>${game.name}</h3>
        `
        resultsDiv.appendChild(item);
    })
    
}