//карусель

const img = document.getElementById('carousel');
const rightBtn = document.getElementById('right-btn');
const leftBtn = document.getElementById('left-btn');


let pictures =  ['../images/swiper-1.jpeg', '../images/swiper-2.jpeg', '../images/swiper-3.jpeg', '../images/swiper-4.jpeg', '../images/swiper-5.jpeg', '../images/swiper-6.jpeg'];

img.src = pictures[0];
let position = 0;

const moveRight = () => {
    if (position >= pictures.length - 1) {
        position = 0
        img.src = pictures[position];
        return;
    }
    img.src = pictures[position + 1];
    position++;
}

const moveLeft = () => {
    if (position < 1) {
        position = pictures.length - 1;
        img.src = pictures[position];
        return;
    }
    img.src = pictures[position - 1];
    position--;
}

rightBtn.addEventListener("click", moveRight);
leftBtn.addEventListener("click", moveLeft);




//тема
let switchMode = document.getElementById("btn");
let theme = document.getElementById('theme');
switchMode.onclick = function(){
    let theme = document.getElementById('theme');

    if (theme.getAttribute("href") == "https://github.com/maryshtaida/EWT_PIIS/tree/main/%D0%9A%D0%BE%D0%B4%D0%B8%D0%BA/style/style_light.css"){
        theme.href = "https://github.com/maryshtaida/EWT_PIIS/tree/main/%D0%9A%D0%BE%D0%B4%D0%B8%D0%BA/style/style.css";

    } else{
        theme.href = "https://github.com/maryshtaida/EWT_PIIS/tree/main/%D0%9A%D0%BE%D0%B4%D0%B8%D0%BA/style/style_light.css";

    }
}
