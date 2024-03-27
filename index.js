const express=require('express')
const cors=require('cors')
require('dotenv').config()
const app=express()

//port
const port =process.env.PORT || 5000
//middleware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.25fgudl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });


// Get the database and collection on which to run the operation
const database = client.db("carDoctor");
const services = database.collection("services");

app.get('/services',async(req,res)=>{

    const result=await services.find().toArray()

    res.send(result)
})



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


//root connection
app.get('/',(req,res)=>{
    res.send("server is connecting")
})

//running port
app.listen(port,()=>{
    console.log("running port is:",port)
})