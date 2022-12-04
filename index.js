// SERVER
const express = require('express');
const cors = require('cors');

// CRYPTOJS AND CRYPTO
const CryptoJS = require('crypto-js');
const crypto = require('crypto');

// EXTRA
const colores = require('colors');

// ARCHIVES
const fs = require('fs');
const archive = require('archiver')('zip');
const formidable = require('formidable');

// COMPRIMIR
const huffman = require('huffman-javascript');
let ultimoTextoComprimido = '';
const lzString = require('lz-string');

// CREAR EL SERVER
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
    let { texto, clave } = req.query;
    if (texto && clave) {
      const bytes = CryptoJS.AES.decrypt(texto.trim(), clave);
      const desencriptado = bytes.toString(CryptoJS.enc.Utf8);
      res.json({ desencriptado });
    } else {
      res.json({ desencriptado: 'Debe escribir algo en los campos XD' });
    }
  } catch (error) {
    res.json({ desencriptado: 'Error al desencriptar' });
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

app.get('/comprimir/huffman', (req, res) => {
  try {
    const { texto } = req.query;
    ultimoTextoComprimido = texto;
    const codes = huffman.getCodesFromText(texto);
    const comprimido = huffman.encode(texto, codes);
    return res.json({ comprimido: comprimido });
  } catch (error) {
    console.log(error);
  }
});

app.get('/descomprimir/huffman', (req, res) => {
  try {
    const { texto } = req.query;
    const codes = huffman.getCodesFromText(ultimoTextoComprimido);
    const descompreso = huffman.decode(texto.split(','), codes);

    return res.json({ descompreso });
  } catch (error) {
    console.log(error);
  }
});

app.get('/comprimir/lzw', (req, res) => {
  try {
    const { texto } = req.query;
    const comprimido = lzString.compress(texto);
    return res.json({ comprimido });
  } catch (error) {}
});

app.get('/descomprimir/lzw', (req, res) => {
  try {
    const { texto } = req.query;
    console.log(texto);
    const descompreso = lzString.decompress(texto);
    return res.json({ descompreso });
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto: ${port}`.bgMagenta);
});
