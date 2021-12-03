const Task = require('../models/taskModel.js')

const addTask = async (req, res) => {
    try{
        const task = await new Task(req.body).save()
        res.send(task)
    }catch(err){
        console.info(err)
        res.send(err)
    }
}

const getTasks = async (req, res) => {
    try{
        const tasks = await Task.find()
        res.send(tasks)
    }catch(err){
        res.send(err).json({ 'message' : 'Product created' })
    }
}

const updateTask = async (req, res) => {
    try{
        const task = await Task.findOneAndUpdate(
            {_id : req.params.id},
            req.body
        )
         res.send(task)
    }catch(err){
        res.send(err)
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        res.send(task)
    } catch (error) {
        res.send(error)
    }
}

module.exports = {getTasks, addTask, updateTask, deleteTask}
