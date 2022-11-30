const url = 'http://localhost:3000';

document.querySelector('.encriptar-btn').addEventListener('click', encriptar);
document.querySelector('.desencriptar-btn').addEventListener('click', desencriptar);

function encriptar() {
  const resultado = document.querySelector('.resultado-encriptado');
  const texto = document.getElementById('texto-encriptar').value;
  const clave = document.getElementById('clave-encriptar').value;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${url}/encriptar?texto=${texto}&clave=${clave}`);
  xhr.send();

  xhr.responseType = 'json';

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = xhr.response;
      resultado.textContent = response.encriptado;
    } else {
      console.log(`Error ${xhr.status}: ${xhr.statusText}`);
      resultado.textContent = 'Error al encriptar';
    }
  };
}

function desencriptar() {
  const resultado = document.querySelector('.resultado-desencriptado');
  const texto = document.getElementById('texto-desencriptar').value;
  const clave = document.getElementById('clave-desencriptar').value;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${url}/desencriptar?texto=${texto}&clave=${clave}`);
  xhr.send();

  xhr.responseType = 'json';

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = xhr.response;
      console.log(response);
      resultado.textContent = response.desencriptado;
    } else {
      console.log(`Error ${xhr.status}: ${xhr.statusText}`);
      resultado.textContent = 'Error al desencriptar';
    }
  };

}


// Path: Front\main.js
