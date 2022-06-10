const Project = require('./projects-model')

async function validateProjectId (req, res, next) {
    try {
        const project = await Project.get(req.params.id)
        if(project) {
            req.project = project
            next()
        } else {
            res.status(404).json({message: 'Project not found'})
        }
    } catch (err) {
        next(err)
    }
}

async function validateProject (req, res, next) {
    const {name, description, completed} = req.body
    try {
        if(!name || !description || typeof completed === 'undefined') {
            next({status: 400, message: 'Name and description required'})
        } else {
            req.valid = {name, description, completed}
            next()
        }
    } catch(err) {
        next()
    }
}

module.exports ={
    validateProjectId,
    validateProject,
}
