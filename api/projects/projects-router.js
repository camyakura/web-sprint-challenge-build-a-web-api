const express = require('express')
const {
    validateProjectId,
    validateProject,
} = require('./projects-middleware')
const Project = require('./projects-model')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const result = await Project.get()
        res.json(result)
    } catch(err){
        next(err)
    }
})

router.get('/:id', validateProjectId, async (req, res, next) => {
    try {
        const result = await Project.get(req.params.id)
        res.json(result)
    } catch(err) {
        next(err)
    }
})


module.exports = router