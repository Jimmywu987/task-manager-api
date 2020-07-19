const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require("../models/task")


router.post('/tasks', auth, async function(req, res){
   

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.send(task)
    } catch (err) {
        res.status(400).send(err)
    }

})
//GET /tasks?
router.get('/tasks', auth, async function( req, res) {

     const match = {}
     const sort = {}
     if(req.query.completed){
        match.completed = req.query.completed === 'true'
     }

     if(req.query.sortBy){
         const parts = req.query.sortBy.split(':')
         sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
     }
    try {
        // const task = await Task.find({ owner: req.user._id})
        await req.user.populate({
            path: 'tasks',
            match,
            option: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        if(!task){
            return res.status(404).send()
         }
         res.send(req.user.task)
    } catch (e) {
        res.status(500).send()
    }
})


router.delete('/tasks/:id', auth, async function(req, res){
    try {
        const task = await Task.findByIdAndDelete({_id: req.params.id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})



router.patch('/tasks/:id', auth, async function(req, res){
    const body = Object.keys(req.body)
    const allowedUpdates = ['task', 'completed']
   const checking = body.every((e)=>{
        return allowedUpdates.includes(e)
    })
    if(!checking){
        return res.status(404).send()
    }


    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        
       

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        if(!task){
            return res.status(404).send({error: "Invalid updates"})
        }
        body.forEach((e)=> task[e] = req.body[e])

        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})




router.get('/tasks/:id', auth, async function(req , res){
    const _id = req.params.id
    try {
        
        const task = await Task.findOne({ _id, owner: req.user._id })
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
   
})





module.exports = router