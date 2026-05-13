const express = require('express');

const app = express();

const port = 8000;

app.set('view engine', 'ejs');

app.use(express.urlencoded());

app.use(express.static('public'));


// task array

let tasks = [
    {
        id: 1001,
        title: "Practice Atlist 4Hr A Day",
        description: "Cover All The Topics Which Is Done By Madam",
        priority: "High",
        status: "Pending"
    },
    {
        id: 1002,
        title: "Learn Node",
        description: "Practice CRUD Regulary",
        priority: "Medium",
        status: "In Progress"
    }
];


// dashboard

app.get('/', (req, res) => {

    const totalTasks = tasks.length;

    const pendingTasks = tasks.filter(t => t.status == "Pending").length;

    const completedTasks = tasks.filter(t => t.status == "Completed").length;

    res.render('dashboard', {
        tasks,
        totalTasks,
        pendingTasks,
        completedTasks
    });

});


// add page

app.get('/addTask', (req, res) => {
    return res.render('add-task');
});


// insert tasl

app.post('/insertTask', (req, res) => {

    const newTask = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: "Pending"
    }

    tasks.push(newTask);

    console.log("TASK ADDED SUCCESSFULLY");

    res.redirect('/');

});


// delete task

app.get('/deleteTask/:id', (req, res) => {

    const id = req.params.id;

    tasks = tasks.filter(t => t.id != id);

    console.log("TASK DELETED SUCCESSFULLY");

    res.redirect('/');

});


// edit task

app.get('/editTask/:id', (req, res) => {

    const id = req.params.id;

    const singleTask = tasks.find(t => t.id == id);

    console.log(singleTask);

    return res.render('edit-task', {
        singleTask
    });

});


// update task

app.post('/updateTask', (req, res) => {

    const id = req.body.id;

    tasks = tasks.map((t) => {

        if (t.id == id) {

            t.title = req.body.title;
            t.description = req.body.description;
            t.priority = req.body.priority;
            t.status = req.body.status;

        }

        return t;

    });

    console.log("TASK UPDATED SUCCESSFULLY");

    res.redirect('/');

});


// status change

app.get('/changeStatus/:id', (req, res) => {

    const id = req.params.id;

    tasks = tasks.map((t) => {

        if (t.id == id) {

            if (t.status == "Pending") {
                t.status = "In Progress";
            }
            else if (t.status == "In Progress") {
                t.status = "Completed";
            }

        }

        return t;

    });

    res.redirect('/');

});


app.listen(port, (err) => {

    if (err) {
        console.log(err);
    }
    else {
        console.log(`Server Running On Port ${port}`);
        console.log(`http://localhost:${port}`);
    }

});
