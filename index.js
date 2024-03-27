const express=require('express')
const cors=require('cors')
const app=express()

//port
const port =process.env.PORT || 5000
//middleware
app.use(cors())
app.use(express.json())


//root connection
app.get('/',(req,res)=>{
    res.send("server is connecting")
})

//running port
app.listen(port,()=>{
    console.log("running port is:",port)
})