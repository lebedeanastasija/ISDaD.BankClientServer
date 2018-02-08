const Client = require('../../database/models/clients');
function getAll() {
	return Client.findAll({})
	.catch(err => Promise.reject({status: 500, message: err.message}));
}

function getById(id) {
	return Client.find({where: {id}, attributes: ['id', 'name', 'surname', 'patronymic'], include: [{model: Country}]})
	.catch(() => Promise.reject({status: 500, message: 'Error occured'}));
}

function create(name, surname, patronymic) {
	console.log('[Create]');
	if(!name || !surname || !patronymic) {
		return Promise.reject({status: 400, message: 'Invalid client data'});
	}

	return new Promise((resolve, reject) => {
		Client.create({name, surname, patronymic})
		.then(clientResult => {
			const result = Object.assign({}, clientResult.dataValues);
			resolve(result);
		})
		.catch(err => reject({status: 500, message: 'Error occured'}));
	});
}

function remove(id) {
	return new Promise((resolve, reject) => {
		Client.findOne({where: {id}})
		.then(client => {
			client.destroy()
			.then(() => resolve({}));
		})
		.catch(() => Promise.reject({ status: 500}))
	});
}

function update(where, data) {
	return new Promise((resolve, reject) => {
		return Client.findOne({ where })
		.then(client => {
            client.update(data)
			.then(clientResult => resolve(clientResult))
			.catch(err => {
				console.error("Can not update client: \n",err);
				return reject({status: 500, message: err.message});
			})
		})
		.catch(err => {
			console.error("Can not find client: \n",err);
			return reject({status: 500, message: err.message});
		})
	})
}

module.exports = {
    getAll,
    getById,
    create,
    remove,
	update
};