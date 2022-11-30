const express = require('express');
const cors = require('cors');
const CryptoJS = require('crypto-js');
const colores = require('colors');
const crypto = require('crypto');

const fs = require('fs');
const zlib = require('zlib');
const formidable = require('formidable');

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (_req, res) => {
  res.json({
    message: 'HOLA A TODOS LOS ESTUDIANTES DE ESTRUCTURA DE DATOS 2!',
  });
});

app.get('/encriptar', (req, res) => {
  try {
    const { texto, clave } = req.query;
    const encriptado = CryptoJS.AES.encrypt(texto, clave).toString();
    res.json({ encriptado });
  } catch (error) {
    res.json({ encripado: 'Error al encriptar' });
  }
});

app.get('/desencriptar', (req, res) => {
  try {
    const { texto, clave } = req.query;
    const bytes = CryptoJS.AES.decrypt(texto, clave);
    const desencriptado = bytes.toString(CryptoJS.enc.Utf8);
    res.json({ desencriptado });
  } catch (error) {
    res.json({ desencriptado: 'Error al encriptar' });
    console.log(error);
  }
});

app.get('/encriptar/salt', (req, res) => {
  try {
    const { password } = req.query;
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto
      .scryptSync(password, salt, 64)
      .toString('hex');
    res.json({ encriptado: `${salt}:${hashedPassword}` });
  } catch (error) {
    res.json({ encriptado: 'Error al encriptar' });
  }
});

app.get('/desencriptar/salt', (req, res) => {
  try {
    const { cifrado, password } = req.query;
    const [salt, key] = cifrado.split(':');
    const hashedBuffer = crypto.scryptSync(password, salt, 64);
    const keyBuffer = Buffer.from(key, 'hex');

    const match = crypto.timingSafeEqual(hashedBuffer, keyBuffer);
    return res.json({ match });
  } catch (error) {
    res.json({ match: false });
  }
});

app.post('/comprimir', (req, res) => {
  try {
    const formulario = new formidable.IncomingForm();
    formulario.uploadDir = __dirname + '/archivos';

    formulario.parse(req, (err, fields, archivo) => {
      const escritura = fs.createWriteStream(__dirname + '/archivos/' + archivo.upload.name + '.gz');
    });
  } catch (error) {}
});

app.listen(port, () => {
  console.log('Server is running on port 3000'.bgMagenta);
});
