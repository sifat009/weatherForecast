const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const temperatureDiv = document.querySelector('.temperature');
const locationDiv = document.querySelector('.location');
const detailsDiv = document.querySelector('.details');
const error = document.querySelector('.error');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    temperatureDiv.innerHTML = '';
    error.innerText = '';
    locationDiv.innerText = 'Observing weather... 🕵🏻‍♂️';
    detailsDiv.innerText = '';

    const location = input.value;
    getLocation(location)
        .then((data) => {
            console.log(data)
            if(data.error) {
                locationDiv.innerText = '';
                detailsDiv.innerText = '';
                error.innerText = data.error;
            } else {
                const details = `Summary: ${data.summary} and ${data.precipProbability}% possibility to Rain`;
                locationDiv.innerText = `${data.location.toUpperCase()}`;
                temperatureDiv.innerHTML = ` ${data.temperature} &#8451;`;
                detailsDiv.innerText = details;
            }
        })
        .catch((error) => {
            error.innerText = error;
        })
    input.value = '';
})


const getLocation = async (location) => {
    const res = await fetch(`http://localhost:3000/api/weather?location=${location}`);
    return await res.json();
}
