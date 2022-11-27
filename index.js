const express = require('express');
const cors = require('cors');
const CryptoJS = require('crypto-js');
const colores = require('colors');
const crypto = require('crypto');

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'HOLA A TODOS LOS ESTUDIANTES DE ESTRUCTURA DE DATOS 2!' });
});

app.get('/encriptar', (req, res) => {
  const { texto, clave } = req.query;
  const encriptado = CryptoJS.AES.encrypt(texto, clave).toString();
  res.json({ encriptado });
});

app.get('/desencriptar', (req, res) => {
  const { texto, clave } = req.query;
  const bytes = CryptoJS.AES.decrypt(texto, clave);
  const desencriptado = bytes.toString(CryptoJS.enc.Utf8);
  res.json({ desencriptado });
});

app.get('/encriptar/salt', (req, res) => {
  const { password } = req.query;
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.scryptSync(password, salt, 64).toString('hex');
  res.json({ encriptado: `${salt}:${hashedPassword}` });
});

app.get('/desencriptar/salt', (req, res) => {
  const { cifrado, password } = req.query;
  const [salt, key] = cifrado.split(':');
  const hashedBuffer = crypto.scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, 'hex');

  const match = crypto.timingSafeEqual(hashedBuffer, keyBuffer);
  return res.json({ match })
});

app.listen(port, () => {
  console.log('Server is running on port 3000'.bgMagenta);
});
