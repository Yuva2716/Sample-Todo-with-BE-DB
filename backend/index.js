import express from "express"
import cors from "cors"
// importing mongodb
import { MongoClient, ObjectId } from "mongodb"


// connecting with mongodb atlas
const client = new MongoClient("mongodb+srv://yuvapraba2716:2716@cluster0.mbcun.mongodb.net/")
let todolists;
const main = async()=>{
    await client.connect()
    console.log("connected with mongodb");
    todolists = client.db("tododatabase").collection("todolists")
    
}

const app = express()
app.use(cors())
app.use(express.json())


// CRUD Operations

app.get("/", async (req, res) => {
    const data = await todolists.find().toArray()
    res.send({
        status: 200,
        data
    })
})

app.post("/", async(req, res) => {
    let ipvalue = req.body.ipvalue
    await todolists.insertOne({ipvalue})
    res.status(200).json({ status: true })
})

app.put("/", async(req, res) => {
    const { ipvalue } = req.body
    const  index  = req.query.index
    await todolists.updateOne({_id:new ObjectId(index)},{$set:{ipvalue}})
    res.status(200).json({ status: true })
})

app.delete("/:index", async(req, res) => {
    const { index } = req.params
    await todolists.deleteOne({_id:new ObjectId(index)})
    res.status(200).json({ status: true })
})

app.listen(5000, () => {
    main()
    console.log("server started on port no 5000");
})


// mongodb+srv://yuvapraba2716:<db_password>@cluster0.mbcun.mongodb.net/