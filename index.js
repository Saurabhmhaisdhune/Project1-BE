import { MongoClient } from "mongodb";
import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MongoDB is connected Succesfully");
  return client;
}

const client = await createConnection();

app.get("/new", function (req, res) {
  res.send("hello world");
});

//Get operation
app.get("/data", async function (req, res) {
  const data = await client.db("main").collection("sub").findOne({});
  res.send(data);
});

//Post operation
app.post("/register", async function (req, res) {
  const data = req.body;
  const result = await client.db("main").collection("sub").insertOne(data);
  res.send(result);
});

app.listen(PORT, () => console.log(`mongo is running at ${PORT}`));
