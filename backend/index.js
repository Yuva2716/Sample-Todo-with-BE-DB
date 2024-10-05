import express from "express"
import cors from "cors"
// importing mongodb
import { MongoClient, ObjectId } from "mongodb"
import dotenv from "dotenv"

dotenv.config();

// connecting with mongodb atlas
const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
})
let todolists;

const main = async()=>{
    try {
        await client.connect()
        console.log("connected with mongodb");
        todolists = client.db("tododatabase").collection("todolists")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
    
}

const app = express()
app.use(cors())
app.use(express.json())


// CRUD Operations

app.get("/", async (req, res) => {
    try {
        const data = await todolists.find().toArray()
        res.send({
        status: 200,
        data
    })
    } catch (error) {
        res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
})

app.post("/", async(req, res) => {
    try {
        let ipvalue = req.body.ipvalue
        await todolists.insertOne({ipvalue})
        res.status(200).json({ status: true })
    } catch (error) {
        res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
})

app.put("/", async(req, res) => {
    try {
        const { ipvalue } = req.body
        const  index  = req.query.index
        await todolists.updateOne({_id:new ObjectId(index)},{$set:{ipvalue}})
        res.status(200).json({ status: true })
    } catch (error) {
        res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
})

app.delete("/:index", async(req, res) => {
    try {
        const { index } = req.params
        await todolists.deleteOne({_id:new ObjectId(index)})
        res.status(200).json({ status: true })
    } catch (error) {
        res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
    
})

app.listen(5000, () => {
    main()
    console.log("server started on port no 5000");
})


// mongodb+srv://yuvapraba2716:<db_password>@cluster0.mbcun.mongodb.net/