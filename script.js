const container = document.querySelector('.container');
const form = document.querySelector('.container__register');
const input = document.querySelector('.container__formInput');

function clearInput() {
  input.value = '';
}

async function fetchPokemon() {
  const formInput = input.value;

  if (formInput.length != null && formInput.length > 0) {
    const options = {method: 'GET'};

    const returnApi = await fetch('https://pokeapi.co/api/v2/pokemon/' + formInput, options)
    const response = await returnApi.json();

    return response;
  }
}

async function generatePokemon() {

  try {
    const response = await fetchPokemon();

    const div = document.createElement("div");
    div.classList.add('pokemon');

    const namePokemon = document.createElement("p");
    namePokemon.classList.add('namePokemon');

    div.appendChild(createImgPokemon(response.id));
    div.appendChild(namePokemon);
    namePokemon.innerHTML = `Nome: ${response.name} `;

    container.appendChild(div);
  } catch {
    generateMsgError();
  }
}

function createImgPokemon(id) {
  const imgPokemon = document.createElement("img");

  const baseImageUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';
  const numbersCharactersId = String(id).length;
  const numberMaxId = 3;
  const numberZerosBeforeId = "0".repeat(numberMaxId - numbersCharactersId);
  const parseId =  numberZerosBeforeId + id;

  imgPokemon.src = baseImageUrl + parseId + ".png";
  
  return imgPokemon;
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
  clearNamePokemon();
  clearInput();
})
