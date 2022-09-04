const express = require('express');
const app = express();
const archivo = './productos.txt';

const PORT = process.env.PORT || 8080;

app.get('/productos', () => {
	console.log(archivo[0])
})

app.listen(PORT, () => {
	console.log(`app is listening on port ${PORT}`)
})