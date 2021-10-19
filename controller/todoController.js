const fs = require('firebase-admin');


exports.getTodos = async (req, res) => {

    let todoArray = []
    try {
        const todoRef = fs.firestore().collection('todos');
        const snapshot = await todoRef.get();
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            todoArray.push(doc.data())
        });
        return res.status(200).json({ status: 200, success: 'true', todoArray, message: 'Todo Retrive Sucessfully' })
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Todo Retrive Failed" })
    }

}

exports.addTodo = async (req, res) => {



    const res1 = await fs.firestore().collection('todos').doc()

    const data = {
        id: res1.id,
        title: req.body.title,
        desc: req.body.desc
    }

    try {
        const todoResult = await res1.set(data);
        return res.status(200).json({ status: 200, success: 'true', message: 'Todo Added Sucessfully' })
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Todo Added Failed" })
    }

}


exports.editTodo = async (req, res) => {

    console.log(req.query.id);

    const todoData = await fs.firestore().collection('todos').doc(`${req.query.id}`)

     console.log((await todoData.get()).exists);

     let isTodoAvailabe = (await todoData.get()).exists
     
     if(isTodoAvailabe){
        const data = {
            title: req.body.title,
            desc: req.body.desc
        }
    
        try {
            const todoResult = await todoData.set(data, { merge: true });
            return res.status(200).json({ status: 200, success: 'true', message: 'Todo Edited Sucessfully' })
        } catch (e) {
            return res.status(400).json({ status: 400, message: "Todo Edit Failed" })
        }
     }else{
        return res.status(400).json({ status: 400, message: "Todo Edit Failed Not Such Todo" })
     }

  

}


exports.deleteTodo = async (req, res) => {

    console.log(req.query.id);

    const todoData = await fs.firestore().collection('todos').doc(`${req.query.id}`)

    //  console.log((await todoData.get()).data());


    try {
        const todoResult = await todoData.delete()
        return res.status(200).json({ status: 200, success: 'true', message: 'Todo Edited Sucessfully' })
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Todo Edit Failed" })
    }

}