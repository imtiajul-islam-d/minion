const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://minion:yfYWH9y6wDfqDIaB@cluster0.ibovumw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const minionCollection = client
      .db("minions")
      .collection("minionsCollection");
    // main
    // post user
    app.post("/minion", async (req, res) => {
      const minion = req.body;
      console.log(minion);
      const result = await minionCollection.insertOne(minion);
      res.send(result);
    });
    // get all minions
    app.get("/minionsCollection", async (req, res) => {
      const query = {};
      const result = await minionCollection.find(query).toArray();
      res.send(result);
    });
    // delete a minion
    app.delete("/minion", async (req, res) => {
      const id = req.query.id;
      const filter = { _id: ObjectId(id) };
      const result = await minionCollection.deleteOne(filter);
      res.send(result);
    });
    // update task status to completed
    app.put("/minion/update", async (req, res) => {
      const id = req.query.id;
      const update = req.body;
      const filter = { _id: ObjectId(id) };
    //   const options = { upsert: true };
      const updatedDocument = {
        $set: {
          minion: update
        },
      };
      const result = await minionCollection.updateOne(
        filter,
        updatedDocument,
        // options
      );
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.log);
// body end

app.get("/", async (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log("Port is running on", port);
});
