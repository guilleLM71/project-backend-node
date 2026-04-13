require('dotenv').config();

const path = require('path');
const express = require('express');
const createServer = require('./infrastructure/webserver/server');
const config = require('./config');

const app = createServer();

// Archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(config.port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${config.port}`);
  console.log(`🩺 Health check: http://localhost:${config.port}/api/health`);
  console.log(`📁 Archivos estáticos: http://localhost:${config.port}/uploads`);
});
