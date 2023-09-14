const bodyRef = document.querySelector("body");
const startBtnRef = document.querySelector("button[data-start]");
const stopBtnRef = document.querySelector("button[data-stop]");

let intervalId = 0;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startBtnRef.addEventListener("click", handlerStartBtnClick);
stopBtnRef.addEventListener("click", handlerStoptBtnClick);

function handlerStartBtnClick() {

    startBtnRef.disabled = true;
    stopBtnRef.disabled = false;

    intervalId = setInterval(() => {
        bodyRef.style.backgroundColor = getRandomHexColor();
    }, 1000);
}
function handlerStoptBtnClick() {
    clearInterval(intervalId);
    startBtnRef.disabled = false;
    stopBtnRef.disabled = true;
}

