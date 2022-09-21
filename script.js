const form = document.querySelector('.register');
const input = document.querySelector('.valueInput');

function clearInput() {
  input.value = '';
}

function openConsole() {
  const valueInput = input.value;

  if (valueInput.length != null && valueInput.length > 0) {
    const options = {method: 'GET'};

    fetch('https://pokeapi.co/api/v2/pokemon/' + valueInput, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => generateMsgError());
  }
}

function generateMsgError() {
  const msgError = document.createElement("p");
  const textError = "URL não encontrada, tente novamente!";
  form.appendChild(msgError);
  msgError.innerHTML = textError;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  clearInput()
})