const express = require('express')
const {
    validateAction,
    validateActionId,
} = require('./actions-middlware')
const Action = require('./actions-model')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const result = await Action.get()
        res.json(result)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', validateActionId, async (req, res, next) => {
    try {
        const result = await Action.get(req.params.id)
        res.json(result)
    } catch(err) {
        next(err)
    }
})

router.post('/', validateAction, async (req, res, next) => {
    try {
        const result = await Action.insert(req.body)
        res.status(201).json(result)
    } catch(err) {
        next(err)
    }
})

module.exports = router