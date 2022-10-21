const container = document.querySelector('.container');
const form = document.querySelector('.container__register');
const input = document.querySelector('.container__formInput');

function clearInput() {
  input.value = '';
}

async function fetchPokemon(pokemon) {
  const valuePokemon = input.value || pokemon;

  if (valuePokemon.length != null && valuePokemon.length > 0 || valuePokemon > 0) {
    const options = {method: 'GET'};

    const returnApi = await fetch('https://pokeapi.co/api/v2/pokemon/' + valuePokemon, options)
    const response = await returnApi.json();

    return response;
  }
}

async function generatePokemon(pokemon) {

  try {
    response = await fetchPokemon(pokemon);
    const { name, id } = response;

    const div = document.createElement("div");
    div.classList.add('card-pokemon');

    const divSpace = document.createElement("div");
    divSpace.classList.add('card-img');

    div.appendChild(divSpace);

    const namePokemon = document.createElement("h3");
    namePokemon.classList.add('name-pokemon');

    divSpace.appendChild(createImgPokemon(id));
    divSpace.appendChild(namePokemon);

    namePokemon.innerHTML = `Nome: ${name} `;

    container.appendChild(div);

    const boxBtn = document.createElement("div");
    boxBtn.classList.add('box-btn');

    boxBtn.appendChild(createBtnBack(id));
    boxBtn.appendChild(createBtnNext(id));

    container.appendChild(boxBtn);
  } catch {
    generateMsgError();
  } 
}

function createBtnBack(id) {
  const buttonVoltar = document.createElement("button");
  buttonVoltar.classList.add('btn-actions');
  buttonVoltar.innerHTML = 'voltar';

  const btnVoltarId = id - 1;

  if(btnVoltarId > 0) {
    buttonVoltar.addEventListener('click', () => {
      clearPokemon();
      generatePokemon(btnVoltarId);
    })
  } else {
    buttonVoltar.disabled = true;
    buttonVoltar.style.background = '#ffcc01a8';
  }
    
  return buttonVoltar;
}

function createBtnNext (id) {
  const buttonProximo = document.createElement("button");
  buttonProximo.classList.add('btn-actions');
  buttonProximo.innerHTML = 'próximo';

  const btnProximoId = id + 1;

  if(btnProximoId < 905) {
    buttonProximo.addEventListener("click", () => {
      clearPokemon();
      generatePokemon(btnProximoId);
    });
  } else {
    buttonProximo.disabled = true;
    buttonProximo.style.background = '#ffcc01a8';
  }

  return buttonProximo;
}

function createImgPokemon(id) {
  const imgPokemon = document.createElement("img");
  imgPokemon.classList.add('img-pokemon');

  const baseImageUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/';
  const numbersCharactersId = String(id).length;
  const numberMaxId = 3;
  const numberZerosBeforeId = "0".repeat(numberMaxId - numbersCharactersId);
  const parseId =  numberZerosBeforeId + id;

  imgPokemon.src = baseImageUrl + parseId + ".png";
  
  return imgPokemon;
}

function clearPokemon() {
  const pokemon = document.querySelector('.card-pokemon');
  const boxBtn = document.querySelector('.box-btn');

  if(pokemon) {
    pokemon.remove();
    boxBtn.remove();
  }
}

function generateMsgError() {
  const msgError = document.createElement("p");
  msgError.classList.add('msg-error');
  const textError = "Pokemon não encontrado, tente novamente!";
  container.appendChild(msgError);
  msgError.innerHTML = textError;
}

function clearMsgError() {
  const msgError = document.querySelector('.msg-error');

  if(msgError) {
    msgError.remove();
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  generatePokemon();
  clearPokemon();
  clearMsgError();
  clearInput();
})
