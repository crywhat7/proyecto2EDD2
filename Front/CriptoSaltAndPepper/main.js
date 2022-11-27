const url = 'http://localhost:3000';

document.querySelector('.encriptar-btn').addEventListener('click', encriptar);
document
  .querySelector('.desencriptar-btn')
  .addEventListener('click', desencriptar);
document.querySelector('.copy').addEventListener('click', copySaltPepper);

function encriptar() {
  const resultado = document.querySelector(
    '.resultado-encriptado .salt-pepper'
  );
  const texto = document.getElementById('texto-encriptar').value;
  // const clave = document.getElementById('clave-encriptar').value;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${url}/encriptar/salt?password=${texto}`);
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
  const resultado = document.querySelector('.r-pepper');
  const texto = document.getElementById('texto-desencriptar').value;
  const clave = document.getElementById('clave-desencriptar').value;

  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    `${url}/desencriptar/salt?password=${texto}&cifrado=${clave}`
  );
  xhr.send();

  xhr.responseType = 'json';

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = xhr.response;
      console.log('response', response);
      console.log(resultado);
      if (response.match) {
        resultado.textContent = '¡COINCIDE!';
        resultado.classList.remove('r-pepper-wrong');
        resultado.classList.add('r-pepper-nice');
      }
      if (!response.match) {
        resultado.textContent = '¡NO COINCIDE!';
        resultado.classList.remove('r-pepper-nice');
        resultado.classList.add('r-pepper-wrong');
      }
    } else {
      console.log(`Error ${xhr.status}: ${xhr.statusText}`);
      resultado.textContent = 'Error al desencriptar';
    }
  };
}

function copySaltPepper() {
  const resultado = document.querySelector(
    '.resultado-encriptado .salt-pepper'
  );
  navigator.clipboard.writeText(resultado.textContent);
}

// Path: Front\main.js
