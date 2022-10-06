const container = document.querySelector('.container');
const form = document.querySelector('.register');
const input = document.querySelector('.valueInput');

function clearInput() {
  input.value = '';
}

async function fetchPokemon() {
  const valueInput = input.value;

  if (valueInput.length != null && valueInput.length > 0) {
    const options = {method: 'GET'};

    const returnApi = await fetch('https://pokeapi.co/api/v2/pokemon/' + valueInput, options)
    const response = await returnApi.json();

    return response;
  }
}

async function generatePokemon() {

  try {
    const response = await fetchPokemon();

    const div = document.createElement("div");
    div.classList.add('pokemon')
    const namePokemon = document.createElement("p");
    div.appendChild(namePokemon);
    container.appendChild(div);

    namePokemon.innerHTML = `Nome: ${response.name} `;

  } catch {
    generateMsgError();
  }
}

function clearNamePokemon() {
  const pokemon = document.querySelector('.pokemon');

  if(pokemon) {
    pokemon.remove();
  }
}

function generateMsgError() {
  const msgError = document.createElement("p");
  const textError = "Pokemon não encontrado, tente novamente!";
  form.appendChild(msgError);
  msgError.innerHTML = textError;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  generatePokemon();
  clearNamePokemon()
  clearInput();
})
