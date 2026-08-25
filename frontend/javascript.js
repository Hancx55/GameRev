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

    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");

    if (q) {
        runSearch(q);
    }
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
        const secDegrees = ((seconds/60) * 360) + 90 + 180;

        const minutes = now.getMinutes();
        const minDegrees = ((minutes/60) * 360) + ((seconds/60)*6) + 90 + 180;

        const hours = now.getHours();
        const hourDegrees = ((hours/12) * 360) + ((minutes/60)*30) + 90 + 180;

        secHand.style.transform = `rotate(${secDegrees}deg)`;
        minHand.style.transform = `rotate(${minDegrees}deg)`;
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;  
    }


    setInterval(clockTick, 1000);

    // clock numbers
    const mainClock = document.querySelector(".clockFace");
    

    for (let i = 1; i <= 12; i++) {
        const clockNumber = document.createElement("div");
        
        clockNumber.className = "clockNumber";
        clockNumber.id = `num${i}`;

        clockNumber.innerText = i;

        const angle = (i*30) * (Math.PI / 180); //radians
        const radius = mainClock.offsetWidth / 2 * 1.09; //slightly larger than clocks radius
        const x = (mainClock.offsetWidth/2) + radius * Math.sin(angle); 
        const y = (mainClock.offsetHeight/2) - radius * Math.cos(angle);

        clockNumber.style.left = `${x}px`;
        clockNumber.style.top = `${y}px`;


        mainClock.appendChild(clockNumber);
    }
}




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
