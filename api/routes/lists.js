const express = require('express');
const router = express.Router();
const mongoose = require('../db/mongoose');
const List = require('../db/models/List.model');
const Task = require('../db/models/Task.model');

router.get('/', async (req, res) => {
    try {
        const lists = await List.find();
        res.send(lists);
    } catch (error) {
        res.send({ message : error });
    }
});
router.post('/', async (req, res) => {
    try {
        const list = new List({
            title : req.body.title
        });
        const savedList = await list.save();
        res.send(savedList);
    } catch (error) {
        res.send({ message : `Error ${error}` });
    }
})
router.get('/:listId', async (req, res) => {
    try {
        const list = await List.findById(req.params.listId);
        res.send(list);
    } catch (error) {
        res.send({ message : error });
    }
})
router.patch('/:listId', async (req, res) => {
    try {
        const updatedList = await List.updateOne(
            {
                _id : req.params.listId
            },
            {
                $set : {
                    title : req.body.title
                }
            }
        )
        res.send(updatedList);
    } catch (error) {
        res.send({message : error});
    }
});
//delete list
router.delete('/:listId', async (req, res) => {
    try {
        const deletedList = await List.remove({ _id : req.params.listId });
        res.send(deletedList);
    } catch (error) {
        res.send({message : `error ${error}`});
    }
});
//get tasks from specific list
router.get('/:listId/tasks', async(req, res) => {
    try {
        //get tasks with list Id
        const tasks = await Task.find({ _listId : req.params.listId });
        res.send(tasks);
    } catch (error) {
        res.send({message : error});
    }
})
//post task to a specific list
router.post('/:listId/tasks', async(req, res) => {
    try {
        const task = new Task({
            title : req.body.title,
            _listId : req.params.listId
        });
        const savedTask = await task.save();
        res.send(savedTask);
    } catch (error) {
        res.send({ message: error });
    }
});
//patch a task in a list
router.patch('/:listId/tasks/:taskId', async (req, res) => {
    try {
        const updatedTask = await Task.updateOne(
            {
                _listId : req.params.listId,
                _id : req.params.taskId
            },
            {
                $set : req.body
            }
        )
        res.send(updatedTask);
    } catch (error) {
        res.send({message : error});
    }
})
//delete a task
router.delete('/:listId/tasks/:taskId', async(req, res) => {
    try {
        const deletedTask = await Task.remove(
            {
                _listId : req.params.listId,
                _id : req.params.taskId
            }
        )
        res.send(deletedTask);
    } catch (error) {
        res.send({message : error});
    }
});
//get a task with listid
router.get('/:listId/tasks/:taskId', async(req, res) => {
    try {
        //get tasks with list Id
        const tasks = await Task.find(
            { 
                _listId : req.params.listId,
                _id : req.params.taskId 
            });
        res.send(tasks);
    } catch (error) {
        res.send({message : `error ${error}`});
    }
})

module.exports = router;