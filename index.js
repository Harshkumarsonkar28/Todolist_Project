const express = require('express');
const bodyparser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

app.use(express.urlencoded({ extended:true }));
app.use(methodOverride('_method'));
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

app.put("/todos/:index",function(req,res){
    let index = req.params.index;
    let updatetext = req.body.updatetext.trim();
    let updatepriority = req.body.updatepriority;

    if(updatetext === ""){
        return res.send('<script>alert("Task cannot be empty!"); window.location.href ="/"; </script>');
    }
  todos[index] = {task : updatetext , priority : updatepriority};
  res.redirect("/");
})

// delete

app.delete("/todos/:index",function(req,res){
    let index = req.params.index;
    todos.splice(index,1);
    res.redirect("/");
})

app.listen(3000,function(){
    console.log(`Server is running on http://localhost:3000`);
})