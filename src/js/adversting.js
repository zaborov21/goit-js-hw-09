const rootRef = document.querySelector(".js-container");
const timerRef = document.querySelector(".js-timer");
const btnRef = document.querySelector(".js-btn");
const paragraphRef = document.querySelector(".js-descr");

let counter = 10;
setTimeout(() => {
    rootRef.style.display = "block";
    const intervalId = setInterval(() => {
        counter -= 1;
        timerRef.textContent = counter;
        if (!counter) {
            clearInterval(intervalId);
            paragraphRef.style.display = "none";
            btnRef.style.display = "block";
        }
    }, 1000);
}, 5000);

btnRef.addEventListener("click", handlerClick);
function handlerClick() {
    rootRef.style.display = "none";
}