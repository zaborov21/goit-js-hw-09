import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/light.css";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";


const startBtnRef = document.querySelector("button[data-start]");
const datetimePickerRef = document.querySelector("#datetime-picker");
const day = document.querySelector(".value[data-days]");
const hours = document.querySelector(".value[data-hours]");
const minutes = document.querySelector(".value[data-minutes]");
const seconds = document.querySelector(".value[data-seconds]");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        startBtnRef.disabled = true;
        if (selectedDates[0].getTime() < new Date().getTime()) {
            Notiflix.Notify.failure("Please choose a date in the future");
        } else {
            startBtnRef.disabled = false;
        }
    },
};
const fp = flatpickr(datetimePickerRef, options);


startBtnRef.addEventListener("click", handlerClick);
function handlerClick() {
    Notiflix.Notify.success("Countdown is runing");
    const intervalId = setInterval(() => {
        const currentTime = new Date();
        const countdown = fp.selectedDates[0] - currentTime;
        if (!convertMs(countdown).days &&
            !convertMs(countdown).hours &&
            !convertMs(countdown).minutes &&
            !convertMs(countdown).seconds) {
            clearInterval(intervalId);
        }
        function addLeadingZero(value) {
            day.textContent = value.days.toString().padStart(2, '0');
            hours.textContent = value.hours.toString().padStart(2, '0');
            minutes.textContent = value.minutes.toString().padStart(2, '0');
            seconds.textContent = value.seconds.toString().padStart(2, '0');
        }

        addLeadingZero(convertMs(countdown));
    }, 1000);
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