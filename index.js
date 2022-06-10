const express = require('express')
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000


app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ey28t.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log('database connected');
        const projectCollection = client.db("warej-portfolio").collection("projects");



        //For get service 
        app.get('/project', async (req, res) => {
            const query = {};
            const cursor = projectCollection.find(query);
            const projects = await cursor.toArray();
            res.send(projects)
        })


        app.get('/project/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const project = await projectCollection.findOne(query)
            res.send(project)
        })


    }
    finally {

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Portfolio website ${port}`)
})