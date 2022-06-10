const Action = require('./actions-model')

async function validateActionId (req, res, next) {
    try {
        const action = await Action.get(req.params.id)
        if(action) {
            next()
        } else {
            res.status(404).json({message: 'Action not found'})
        }
    } catch(err) {
        next(err)
    }
}

async function validateAction (req, res, next) {
    const {project_id, description, notes, completed} = req.body
    try{
        if(!project_id || !description || !notes || typeof completed === 'undefined') {
            next({status: 400, message: 'Name and Description required'})
        } else {
            req.valid = {project_id, description, notes, completed}
            next()
        }
    } catch(err) {
        next(err)
    }
}

module.exports = {validateAction, validateActionId}