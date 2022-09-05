const express = require('express');
const app = express();
const fs = require('fs/promises');
const Container = require('./Contenedor');


const PORT = process.env.PORT || 8080;

const productos = new Container('productos.txt');

async function getFile() {
	try {
		const string = await fs.readFile('./productos.txt', 'utf-8');
		const file = JSON.parse(string);
		return file;

	}
	catch (error) {
		console.log(error)
	}
}

app.get('/productos', async (req, res) => {
	const file = await productos.getFile();
	res.send(file);
})

app.get('/productoRandom', async (req, res) => {
	const arrayProductos = await productos.getFile();
	const numeroRandom = Math.floor(Math.random() * (arrayProductos.length));
	console.log(numeroRandom);
	res.send(arrayProductos[numeroRandom]);
})


app.listen(PORT, () => {
	console.log(`app is listening on port ${PORT}`)
})