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