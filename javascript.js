
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