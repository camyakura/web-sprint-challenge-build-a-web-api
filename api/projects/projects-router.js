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

router.post('/', validateProject, async (req, res, next) => {
    try{
        const result = await Project.insert(req.body)
        res.status(201).json(result)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', validateProject, validateProjectId, async (req, res, next) => {
    try {
        const result = await Project.update(req.params.id, req.valid)
        res.status(200).json(result)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        const result = await Project.remove(req.params.id)
        res.json(result)
    } catch(err) {
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const result = await Project.getProjectActions(req.params.id)
        res.json(result)
    } catch(err) {
        next(err)
    }
})


module.exports = router