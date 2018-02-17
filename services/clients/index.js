const Client = require('../../database/models/clients');
function getAll() {
	return Client.findAll({})
	.catch(err => Promise.reject({status: 500, message: err.message}));
}

function getById(id) {
	return Client.find({where: {id}})
	.catch(() => Promise.reject({status: 500, message: 'Error occured'}));
}

function create(client) {
	console.log('[Create pupil]');
	if(!client.surname || !client.name || !client.patronymic || !client.birthDate || !client.gender ||
        !client.passportSeries || !client.passportNumber || !client.issuingAuthority || !client.issueDate ||
        !client.identificationNumber || !client.birthPlace || client.residenceCity === undefined ||
        !client.residenceAddress || client.maritalStatusId === undefined || client.citizenship === undefined ||
        client.disability === undefined || !(typeof client.isRetired === "boolean") || !(typeof client.isReservist === "boolean")) {
		return Promise.reject({status: 400, message: 'Invalid client data'});
	}
    client.maritalStatus = client.maritalStatusId;
	delete client.maritalStatusId;

	client.birthDate = client.birthDate.split(' ')[0];
	client.issueDate = client.issueDate.split(' ')[0];
	return new Promise((resolve, reject) => {
		Client.create(client)
		.then(clientResult => {
			const result = Object.assign({}, clientResult.dataValues);
			resolve(result);
		})
		.catch(err => {
		    console.error(err);
		    return reject({status: 500, message: err.message || 'Error occured'})
        });
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

function update(where, client) {
    console.log('[Update pupil]');
    if(!client.surname || !client.name || !client.patronymic || !client.birthDate || !client.gender ||
        !client.passportSeries || !client.passportNumber || !client.issuingAuthority || !client.issueDate ||
        !client.identificationNumber || !client.birthPlace || !Number.isInteger(client.residenceCity) ||
        !client.residenceAddress || !Number.isInteger(client.maritalStatusId) || !Number.isInteger(client.citizenship) ||
        !Number.isInteger(client.disability) || !(typeof client.isRetired === "boolean") || !(typeof client.isReservist === "boolean")) {
        return Promise.reject({status: 400, message: 'Invalid client data'});
    }

    client.maritalStatus = client.maritalStatusId;
    delete client.maritalStatusId;

    client.birthDate = client.birthDate.split(' ')[0];
    client.issueDate = client.issueDate.split(' ')[0];
    console.log('before promise');
	return new Promise((resolve, reject) => {
		return Client.findOne({ where })
		.then(old_client => {
            old_client.update(client)
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