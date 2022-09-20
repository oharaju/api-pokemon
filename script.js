const form = document.querySelector('.register');
const input = document.querySelector('.valueInput');

function openConsole() {
  const valueInput = input.value;

  const options = {method: 'GET'};

  fetch('https://pokeapi.co/api/v2/pokemon/' + valueInput, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
})