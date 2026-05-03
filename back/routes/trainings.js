const express = require('express')
const router = express.Router()
const { getTrainings, getTrainingById } = require('../controllers/trainingsController')

router.get('/', getTrainings)
router.get('/:id', getTrainingById)

module.exports = router
