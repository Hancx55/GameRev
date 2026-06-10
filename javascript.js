
//nav bar for all pages

//phone side nav
const navBtn = document.getElementsByClassName("navBtn")

for(let i=0; i<navBtn.length; i++) {
    navBtn[i].addEventListener("click", () => {
        document.getElementById("sideNav").classList.toggle("open");
    })
}

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