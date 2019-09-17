const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');



form.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = input.value;
    getLocation(location)
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        })
    input.value = '';
})


const getLocation = async (location) => {
    const res = await fetch(`http://localhost:3000/api/weather?location=${location}`);
    return await res.json();
}
