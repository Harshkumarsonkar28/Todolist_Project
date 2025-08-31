const express = require('express');
const bodyparser = require('body-parser');
const app = express();

app.use(express.urlencoded({ extended:true }));
app.set("view engine", "ejs");
app.use(express.static("public"))

let todos = []

app.get('/',function(req,res){
   let filter = req.query.filter || "all";
   let filtertodo = todos;
   if(filter !== "all"){
    filtertodo = todos.filter(todo => todo.priority === filter);
   }
   res.render("list",{ todos : filtertodo ,filter});

})


// add

app.post('/add',function(req,res){
    let task = req.body.task.trim();
    let priority = req.body.priority;
    if(task === ""){
         return res.send('<script>alert("Task cannot be empty!"); window.location.href="/";</script>');
    }
    todos.push({task,priority});
    res.redirect("/");
    

})
// edit

app.post("/edit",function(req,res){
    let index = req.body.index;
    let updatetext = req.body.updatetext.trim();
    let updatepriority = req.body.updatepriority;

    if(updatetext === ""){
        return res.send('<script>alert("Task cannot be empty!"); window.location.href ="/"; </script>');
    }
  todos[index] = {task : updatetext , priority : updatepriority};
  res.redirect("/");
})

// delete

app.post("/delete",function(req,res){
    let index = req.body.index;
    todos.splice(index,1);
    res.redirect("/");
})

app.listen(3000,function(){
    console.log('server start');
})