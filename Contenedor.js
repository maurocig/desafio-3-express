const fs = require('fs/promises');

module.exports = class Container {
	constructor(name) {
		this.name = name;
	}

	async getFile() {
		try {
			let content = await fs.readFile(`./${this.name}`, 'utf-8');
			return JSON.parse(content);
		}
		catch (error) {
			console.log(error);
		}
	}

	async save(obj) {
		try {
			let file = await this.getFile();
			let lastIndex = file.length - 1;
			let lastId = file[lastIndex].id;
			obj.id = lastId + 1;
			file.push(obj);
			await fs.writeFile('./products.json', JSON.stringify(file));
			return obj.id;
		}
		catch (error) {
			console.log(error);
		}

	}

	async getById(id) {
		try {
			let file = await this.getFile();

			let array = file.filter((product) => product.id === id);
			if (array.length === 0) {
				return null
			} else {
				return array[0];
			}
		}
		catch (error) {
			console.log(error);
		}
	}

	async getAll() {
		try {
			let file = await this.getFile();
			return file;
		}
		catch (error) {
			console.log(error)
		}
	}

	async deleteById(id) {
		try {
			let file = await this.getFile();

			let filteredArray = file.filter((product) => product.id != id);
			if (filteredArray.length === file.length) {
				return null
			} else {
				await fs.writeFile('./products.json', JSON.stringify(filteredArray));
				return;
			}
		}
		catch (error) {
			console.log(error);
		}
	}

	async deleteAll() {
		try {
			let empty = [];
			await fs.writeFile('./products.json', JSON.stringify(empty));
		}
		catch (error) {
			console.log(error);
		}
	}
}