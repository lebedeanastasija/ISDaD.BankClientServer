const express = require('express');
const router = express.Router();
const _ = require('lodash');

const clientsService = require('../../services/clients');
const fileService = require('../../services/files');

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
	let name = req.body.name;
	let surname = req.body.surname;
	let patronymic = req.body.patronymic;

	if(!name || !surname) {
		res.status(400);
		return res.json({
			data: 'Invalid client data'
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