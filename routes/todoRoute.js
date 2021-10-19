const router = require('express').Router();

const todoController = require('../controller/todoController')

router.get('/get-todo-list' , todoController.getTodos)

router.post('/add-todo' , todoController.addTodo)

router.put('/edit-todo' , todoController.editTodo)

router.delete('/delete-todo' , todoController.deleteTodo)


router.get('/post' ,(req, res)=>{
    res.json({
        posts:{
            title : 'first post'
        }
    })
})


module.exports = router