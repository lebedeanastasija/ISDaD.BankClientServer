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
        surname: req.body.surname.trim(),
        name: req.body.name.trim(),
        patronymic: req.body.patronymic.trim(),
        birthDate: req.body.birthDate.trim(),
        gender: req.body.gender.trim(),
        passportSeries: req.body.passportSeries.trim(),
        passportNumber: req.body.passportNumber.trim(),
        issuingAuthority: req.body.issuingAuthority.trim(),
        issueDate: req.body.issueDate.trim(),
        identificationNumber: req.body.identificationNumber.trim(),
        birthPlace: req.body.birthPlace.trim(),
        residenceCity: req.body.residenceCity,
        residenceAddress: req.body.residenceAddress.trim(),
        maritalStatusId: req.body.maritalStatusId,
        citizenship: req.body.citizenship,
        disability: req.body.disability,
        isRetired: req.body.isRetired,
        isReservist: req.body.isReservist,
        // can be null:
        homePhoneNumber: req.body.homePhoneNumber && req.body.homePhoneNumber.trim(),
        mobilePhoneNumber: req.body.mobilePhoneNumber && req.body.mobilePhoneNumber.trim(),
        email: req.body.email && req.body.email.trim(),
        monthlyIncome: req.body.monthlyIncome
    };

	if( !CLIENT.surname || !CLIENT.name || !CLIENT.patronymic || !CLIENT.birthDate || !CLIENT.gender ||
		!CLIENT.passportSeries || !CLIENT.passportNumber || !CLIENT.issuingAuthority || !CLIENT.issueDate ||
		!CLIENT.identificationNumber || !CLIENT.birthPlace || CLIENT.residenceCity === undefined ||
        !CLIENT.residenceAddress || CLIENT.maritalStatusId === undefined || CLIENT.citizenship === undefined ||
        CLIENT.disability === undefined || !(typeof CLIENT.isRetired === "boolean") || !(typeof CLIENT.isReservist === "boolean")) {
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
                    residenceCity: !Number.isInteger(CLIENT.residenceCity),
                    residenceAddress: !CLIENT.residenceAddress,
                    maritalStatusId: !Number.isInteger(CLIENT.maritalStatusId),
                    citizenship: !Number.isInteger(CLIENT.citizenship),
                    disability: !Number.isInteger(CLIENT.disability),
                    isRetired: !(typeof CLIENT.isRetired === "boolean"),
                    isReservist: !(typeof CLIENT.isReservist === "boolean")
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

router.post('/:id', (req, res, next) => {
    const CLIENT_ID = req.params.id;
    console.log("empty surname length: ", req.body.surname);
    console.log("trimed surname length: ", req.body.surname.trim().length);
    const CLIENT = {
        surname: req.body.surname.trim(),
        name: req.body.name.trim(),
        patronymic: req.body.patronymic.trim(),
        birthDate: req.body.birthDate.trim(),
        gender: req.body.gender.trim(),
        passportSeries: req.body.passportSeries.trim(),
        passportNumber: req.body.passportNumber.trim(),
        issuingAuthority: req.body.issuingAuthority.trim(),
        issueDate: req.body.issueDate.trim(),
        identificationNumber: req.body.identificationNumber.trim(),
        birthPlace: req.body.birthPlace.trim(),
        residenceCity: req.body.residenceCity,
        residenceAddress: req.body.residenceAddress.trim(),
        maritalStatusId: req.body.maritalStatusId,
        citizenship: req.body.citizenship,
        disability: req.body.disability,
        isRetired: req.body.isRetired,
        isReservist: req.body.isReservist,
        // can be null:
        homePhoneNumber: req.body.homePhoneNumber.trim(),
        mobilePhoneNumber: req.body.mobilePhoneNumber.trim(),
        email: req.body.email.trim(),
        monthlyIncome: req.body.monthlyIncome
    };

    if( !CLIENT.surname || !CLIENT.name || !CLIENT.patronymic || !CLIENT.birthDate || !CLIENT.gender ||
        !CLIENT.passportSeries || !CLIENT.passportNumber || !CLIENT.issuingAuthority || !CLIENT.issueDate ||
        !CLIENT.identificationNumber || !CLIENT.birthPlace || !Number.isInteger(CLIENT.residenceCity) ||
        !CLIENT.residenceAddress || !Number.isInteger(CLIENT.maritalStatusId) || !Number.isInteger(CLIENT.citizenship) ||
        !Number.isInteger(CLIENT.disability) || !(typeof CLIENT.isRetired === "boolean") || !(typeof CLIENT.isReservist === "boolean")) {
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
                    residenceCity: !Number.isInteger(CLIENT.residenceCity),
                    residenceAddress: !CLIENT.residenceAddress,
                    maritalStatusId: !Number.isInteger(CLIENT.maritalStatusId),
                    citizenship: !Number.isInteger(CLIENT.citizenship),
                    disability: !Number.isInteger(CLIENT.disability),
                    isRetired: !(typeof CLIENT.isRetired === "boolean"),
                    isReservist: !(typeof CLIENT.isReservist === "boolean")
                }
            }
        });
    }

    clientsService.update({ id: CLIENT_ID }, CLIENT)
    .then(data => {
        console.log("Updated pupil: ", data);
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