const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()

//port
const port = process.env.PORT || 5000
//middleware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
const BookingServices = database.collection('bookingServices')

//booking
//update
app.patch('/booking/:id',async(req,res)=>{
  const id=req.params.id
  const data=req.body;
  const filter={_id: new ObjectId(id)}
  const updateDoc={
    $set:{
      status:data?.status
    }
  }
  const result=await BookingServices.updateOne(filter,updateDoc)

  res.send(result)
  console.log(result)
})
// delete
app.delete('/booking/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const query = { _id: new ObjectId(id) }
  const result = await BookingServices.deleteOne(query)
  res.send(result)
  // console.log(result)
})
// post booking data
app.post('/booking', async (req, res) => {
  const bookingData = req.body;
  const result = await BookingServices.insertOne(bookingData)
  res.send(result)
  // console.log(bookingData)

})
app.get('/booking', async (req, res) => {
  console.log(req.query)
  let query = {}
  if (req.query.email) {
    query = {
      email: req.query.email
    }
  }
  const result = await BookingServices.find(query).toArray()
  res.send(result)
})
//services
app.get('/services', async (req, res) => {
  const result = await services.find().toArray()
  res.send(result)
})
// get specific service data
app.get('/services/:id', async (req, res) => {
  const id = req.params.id
  const query = { _id: new ObjectId(id) }
  const options = {

    projection: { _id: 1, title: 1, img: 1, price: 1, description: 1 },
  };
  const result = await services.findOne(query, options)
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
app.get('/', (req, res) => {
  res.send("server is connecting")
})

//running port
app.listen(port, () => {
  console.log("running port is:", port)
})