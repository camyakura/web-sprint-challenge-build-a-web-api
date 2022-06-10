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

module.exports = router