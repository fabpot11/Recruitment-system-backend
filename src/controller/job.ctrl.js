const express = require('express')
const rout = express.Router()
const Job = require('../models/job.model')

rout.post('/',async(req,res)=>{
    try{
        const NewJob = await Job.create(req.body)
        return res.status(201).send(NewJob)
    }catch(e){
        res.status(400).send(e)
    }
})


rout.get('/',async(req,res)=>{
    try{
        const AllJob = await Job.find().populate({ path: "adminSchemaId", select: ["companyName", "userName", "email"] }).lean().exec()
        return res.status(201).send(AllJob)

    }catch(e){
        res.status(400).send(e)
    }
})



rout.delete('/:id',async(req,res)=>{
    try{
        const deleteJob = await Job.findByIdAndDelete(req.params.id)
        return res.status(201).send(deleteJob)

    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = rout