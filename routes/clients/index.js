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
			data: "Invalid pupil"
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
    let surname = req.body.surname;
	let name = req.body.name;
	let patronymic = req.body.patronymic;
	let birthDate = req.body.birthDate;
	let gender = req.body.gender;
	let passportSeries = req.body.passportSeries;
	let passportNumber = req.body.passportNumber;
	let issuingAuthority = req.body.issuingAuthority;
	let issueDate = req.body.issueDate;
	let identificationNumber = req.body.identificationNumber;
	let birthPlace = req.body.birthPlace;
	let residenceAddress = req.body.residenceAddress;
    let maritalStatusId = req.body.maritalStatusId;
    let citizenship = req.body.citizenship;
    let disability = req.body.disability;
    let isRetired = req.body.isRetired;
    let isReservist = req.body.isReservist;
    //can be null:
	let homePhoneNumber = req.body.homePhoneNumber;
	let mobilePhoneNumber = req.body.mobilePhoneNumber;
	let email = req.body.email;
    let monthlyIncome = req.body.monthlyIncome;

	if( !surname || !name || !patronymic || !birthDate || !gender || !passportSeries || !passportNumber ||
		!issuingAuthority || !issueDate || !identificationNumber || !birthPlace || !residenceAddress ||
		!maritalStatusId || !citizenship || !disability || !isRetired || !isReservist) {
		res.status(400);
		return res.json({
			data: {
				message: 'Invalid client data',
				invalidFields: {
                    surname: !surname,
                    name: !name,
                    patronymic: !patronymic,
                    birthDate: !birthDate,
                    gender: !gender,
                    passportSeries: !passportSeries,
                    passportNumber: !passportNumber,
                    issuingAuthority: !issuingAuthority,
                    issueDate: !issueDate,
                    identificationNumber: !identificationNumber,
                    birthPlace: !birthPlace,
                    residenceAddress: !residenceAddress,
                    maritalStatusId: !maritalStatusId,
                    citizenship: !citizenship,
                    disability: !disability,
                    isRetired: !isRetired,
                    isReservist: !isReservist
				}
			}
		});
	}

    clientsService.create(name, surname, patronymic)
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