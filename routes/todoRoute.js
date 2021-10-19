const router = require('express').Router();


router.get('/post' ,(req, res)=>{
    res.json({
        posts:{
            title : 'first post'
        }
    })
})


module.exports = router