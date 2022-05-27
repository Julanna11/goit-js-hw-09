import Notiflix from 'notiflix';

const form = document.querySelector('.form');




form.addEventListener('submit', (event) => {
  event.preventDefault();
  let firstDelay = event.currentTarget.elements.delay.value;
  let amount = event.currentTarget.elements.amount.value;
  let delayStep = event.currentTarget.elements.step.value;
  
  for ( let i = 1; i <= amount; i+=1) {
    let totalDelay = (Number(firstDelay) + Number(delayStep * i)); 
  console.log('promise ' + totalDelay);
    createPromise(i,totalDelay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);
    });
  }
  });


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}