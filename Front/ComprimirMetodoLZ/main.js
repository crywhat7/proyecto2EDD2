const url = 'http://localhost:3000';

document.querySelector('.comprimir-btn').addEventListener('click', comprimir);
document
  .querySelector('.descomprimir-btn')
  .addEventListener('click', descomprimir);

function comprimir() {
  const resultado = document.querySelector('.resultado-compreso');
  const texto = document.getElementById('texto-comprimir').value;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `${url}/comprimir/lzw?texto=${texto ?? ''}`);
  xhr.send();

  xhr.responseType = 'json';

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = xhr.response;
      resultado.innerText = response.comprimido;
    } else {
      console.log(`Error ${xhr.status}: ${xhr.statusText}`);
      resultado.innerText = 'Error al comprimir';
    }
  };
}

function descomprimir() {
  const resultado = document.querySelector('.resultado-descompreso');
  const texto = document.getElementById('texto-descomprimir').value;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `${url}/descomprimir/lzw?texto=${texto ?? ' '}`);
  xhr.send();

  xhr.responseType = 'json';

  xhr.onload = () => {
    if (xhr.status === 200) {
      const response = xhr.response;
      console.log(response);
      resultado.innerText = response.descompreso;
    } else {
      console.log(`Error ${xhr.status}: ${xhr.statusText}`);
      resultado.innerText = 'Error al descomprimir';
    }
  };
}
