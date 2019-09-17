const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const temperatureDiv = document.querySelector('.temperature');
const locationDiv = document.querySelector('.location');
const error = document.querySelector('.error');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = input.value;
    getLocation(location)
        .then((data) => {
            if(data.error) {
                error.innerText = data.error;
            } else {
                locationDiv.innerText = `${data.location.toUpperCase()}`;
                temperatureDiv.innerHTML = ` ${data.temperature} &#8451;`;
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
