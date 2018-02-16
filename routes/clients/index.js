const express = require('express');
const router = express.Router();
const _ = require('lodash');

const clientsService = require('../../services/clients');

router.get('/', (req, res, next) => {
    clientsService.getAll()
	.then(data => {
		res.json({
			data: data
		});
	})
	.catch(err => {
		res.status(err.status);
		res.json({
			data: err.message
		})
	});
});

router.get('/:id', (req, res, next) => {
	let id = req.params.id || null;
	if(!id) {
		res.status(400);
		return res.json({
			data: "Invalid client"
		});
	}

    clientsService.getById(id)
	.then(data => {
		res.status(200);
		res.json({
			data: data
		});
	})
	.catch(err => {
		res.status(err.status);
		res.json({
			data: err.message
		})
	});
});

router.post('/', (req, res, next) => {
	const CLIENT = {
      	surname: req.body.surname,
      	name: req.body.name,
	  	patronymic: req.body.patronymic,
	  	birthDate: req.body.birthDate,
		gender: req.body.gender,
		passportSeries: req.body.passportSeries,
		passportNumber: req.body.passportNumber,
		issuingAuthority: req.body.issuingAuthority,
		issueDate: req.body.issueDate,
		identificationNumber: req.body.identificationNumber,
		birthPlace: req.body.birthPlace,
		residenceAddress: req.body.residenceAddress,
		maritalStatusId: req.body.maritalStatusId,
		citizenship: req.body.citizenship,
		disability: req.body.disability,
		isRetired: req.body.isRetired,
		isReservist: req.body.isReservist,
		// can be null:
		homePhoneNumber: req.body.homePhoneNumber,
		mobilePhoneNumber: req.body.mobilePhoneNumber,
		email: req.body.email,
		monthlyIncome: req.body.monthlyIncome
	};

	if( !CLIENT.surname || !CLIENT.name || !CLIENT.patronymic || !CLIENT.birthDate || !CLIENT.gender ||
		!CLIENT.passportSeries || !CLIENT.passportNumber || !CLIENT.issuingAuthority || !CLIENT.issueDate ||
		!CLIENT.identificationNumber || !CLIENT.birthPlace || !CLIENT.residenceAddress || !CLIENT.maritalStatusId ||
		!CLIENT.citizenship || !CLIENT.disability || !CLIENT.isRetired || !CLIENT.isReservist) {
		res.status(400);
		return res.json({
			data: {
				message: 'Invalid client data',
				invalidFields: {
                    surname: !CLIENT.surname,
                    name: !CLIENT.name,
                    patronymic: !CLIENT.patronymic,
                    birthDate: !CLIENT.birthDate,
                    gender: !CLIENT.gender,
                    passportSeries: !CLIENT.passportSeries,
                    passportNumber: !CLIENT.passportNumber,
                    issuingAuthority: !CLIENT.issuingAuthority,
                    issueDate: !CLIENT.issueDate,
                    identificationNumber: !CLIENT.identificationNumber,
                    birthPlace: !CLIENT.birthPlace,
                    residenceAddress: !CLIENT.residenceAddress,
                    maritalStatusId: !CLIENT.maritalStatusId,
                    citizenship: !CLIENT.citizenship,
                    disability: !CLIENT.disability,
                    isRetired: !CLIENT.isRetired,
                    isReservist: !CLIENT.isReservist
				}
			}
		});
	}

    clientsService.create(CLIENT)
	.then(data => {
		res.status(200);
		res.json({
			data
		});
	})
	.catch(err => {
		res.status(err.status);
		res.json({
			data: err.message
		});
	});
});

router.delete('/:id', (req, res, next) => {
	let id = req.params.id;
	if(!id) {
		res.status(400);
		return res.json({
			data: 'Incorrect clients'
		});
	}

    clientsService.remove(id)
	.then(data => {
		res.status(200);
		res.json({ data });
	})
	.catch(err => {
		res.status(err.status);
		res.json({ data: err.message });
	});
});

module.exports = router;