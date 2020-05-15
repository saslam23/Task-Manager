require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/task.schema');
const List = require('./models/list.schema');

const app = express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080

mongoose.connect("mongodb://localhost:27017/todoDB",{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })


app.post('/lists', (req, res) =>{
const title = req.body.title

const newList = new List({
    title
});

newList.save()
.then((data) =>{res.json(data)})
.catch(err => res.statusCode(400).json('something went wrong :('))

})

// GETS  THE LIST OF TASKS
app.get('/lists', (req, res) =>{
List.find()
.then(list =>{res.json(list)})
.catch(err =>{res.status(200).json({message:'successfully retrieved Lists'})
        console.log(err)
})
})

app.delete('/:id', (req, res) =>{
    List.findByIdAndDelete(req.params.id)
    .then(res.json({message:'successfully deleted List'}))
    .catch(res.status(500).json({error: 'something went wrong'}))
})

// TASK ROUTES

app.get('/lists/:listId', (req, res) =>{
    Task.find({
        _listId: req.params.listId
    })
    .then(tasks =>{res.json(tasks)})
    .catch(err =>{res.status(500).json({error: "Something went wrong :("})})
})

app.post('/lists/:listId/tasks', (req, res) =>{
    //First we have to find the list Id for the specified area in which the task will be added
    List.findOne({
        _id:req.params.listId
    })
    .then((list) =>{
        if(list){
            return true
        }else{
            return false
        }
    })//Once we have found the list and it exists, we will go ahead and create a task for that list. The tasks will be match
    // via req.params.listId 
    .then((createTask) =>{
        if(createTask){
        const newTask = new Task({
            task: req.body.task,
            _listId: req.params.listId
        })
        newTask.save()
        .then(data =>res.json(data))
        .catch((err) =>{res.status(500).json(err)})
    }

    })
    })



app.listen(PORT, () =>{
    console.log(`successfully running on ${PORT}`)
})