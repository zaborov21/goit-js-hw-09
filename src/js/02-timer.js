import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/light.css";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";


window.addEventListener("load", handlerClickStart)

const startBtnRef = document.querySelector("button[data-start]");
const clearBtnRef = document.querySelector("button[data-clear]");
const datetimePickerRef = document.querySelector("#datetime-picker");
const day = document.querySelector(".value[data-days]");
const hours = document.querySelector(".value[data-hours]");
const minutes = document.querySelector(".value[data-minutes]");
const seconds = document.querySelector(".value[data-seconds]");

// let savedData = localStorage.getItem("savedSelectedDates");
let intervalId;

const options = {
    enableTime: true,
    time_24hr: true,
    minuteIncrement: 1,
    onClose(selectedDates) {

        startBtnRef.disabled = true;
        if (selectedDates[0].getTime() < new Date().getTime()) {
            Notiflix.Notify.failure("Please choose a date in the future");
        } else {
            startBtnRef.disabled = false;
            localStorage.setItem("savedSelectedDates", selectedDates[0]);
        }
    },
};
console.log(localStorage.getItem("savedSelectedDates"));
const fp = flatpickr(datetimePickerRef, options);


startBtnRef.addEventListener("click", handlerClickStart);
clearBtnRef.addEventListener("click", handlerClickClear);

function handlerClickStart() {

    if (!localStorage.getItem("savedSelectedDates")) {
        Notiflix.Notify.info("Please select a date to count");
        clearBtnRef.disabled = true;
    } else if (new Date(localStorage.getItem("savedSelectedDates")).getTime() < new Date().getTime()) {
        return;
    } else {
        Notiflix.Notify.success("Countdown is runing");
        clearBtnRef.disabled = false;
        intervalId = setInterval(() => {

            const currentTime = new Date();
            const selectedDate = new Date(localStorage.getItem("savedSelectedDates"));
            const countdown = selectedDate.getTime() - currentTime;

            if (!convertMs(countdown).days &&
                !convertMs(countdown).hours &&
                !convertMs(countdown).minutes &&
                !convertMs(countdown).seconds
            ) {
                localStorage.removeItem("savedSelectedDates");
                clearInterval(intervalId);
                clearBtnRef.disabled = true;
                Notiflix.Notify.info("Please select a new date to count");
            }

            addLeadingZero(convertMs(countdown));
        }, 1000);
    }
}

function handlerClickClear() {
    localStorage.removeItem("savedSelectedDates");
    clearInterval(intervalId);
    clearBtnRef.disabled = true;
    Notiflix.Notify.warning("The countdown has been cleared. Please choose a new date for the countdown!");
    day.textContent = "00";
    hours.textContent = "00";
    minutes.textContent = "00"
    seconds.textContent = "00";
}


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    day.textContent = value.days.toString().padStart(2, '0');
    hours.textContent = value.hours.toString().padStart(2, '0');
    minutes.textContent = value.minutes.toString().padStart(2, '0');
    seconds.textContent = value.seconds.toString().padStart(2, '0');
}