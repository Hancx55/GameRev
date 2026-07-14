
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

//search bar 

const searchInput = document.getElementById("search-input");

if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && document.activeElement === searchInput) {
            //prevent form submit
            e.preventDefault();
            console.log("enter pressed");
            const query = searchInput.value;
            console.log("searching for: " + query);
            //call backend
            searchGames(query);
        }
    })
}


async function searchGames(query) {

    const response = await fetch("http://localhost:3000/search?query="+ encodeURIComponent(query));
    const data = await response.json();

    console.log(data);
    console.log("search completed");
}