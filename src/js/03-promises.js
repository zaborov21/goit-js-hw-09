import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

const formRef = document.querySelector("form.form");
const formData = {};

formRef.addEventListener("input", onForm);
formRef.addEventListener("submit", onSubmit);

function onForm(event) {
  formData[event.target.name] = event.target.value;
}
function onSubmit(event) {

  event.preventDefault();

  let inputDelay = Number(formData.delay);
  let inputStep = Number(formData.step);
  let inputAmount = Number(formData.amount);

  for (let i = 1; i <= inputAmount; i += 1) {

    createPromise(i, inputDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`)
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    inputDelay += inputStep;
  }
  event.target.reset();
};


function createPromise(position, delay) {

  return new Promise((resolve, reject) => {

    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
};