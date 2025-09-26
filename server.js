require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

const url = process.env.MONGO_URI;
const dbName = "smartlights";
let collection;
let client;

async function connectDB() {
    client = await MongoClient.connect(url);
    const db = client.db(dbName);
    collection = db.collection("deviceStates");
    return client;
}


app.post("/api/v1/device/state", async (req, res) => {
    try {
        const payload = req.body;
        const result = await collection.insertOne(payload);
        res.json({ success: true, saved: payload });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get("/api/v1/device/state", async (req, res) => {
    try {
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post("/api/v1/reset", async (req, res) => {
    try {
        await collection.deleteMany({});
        res.json({ success: true, message: "All logs cleared" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Only start server if not testing
if (process.env.NODE_ENV !== "test") {
    connectDB().then(() => {
        app.listen(3000, () => console.log("API running on http://localhost:3000"));
    });
}

// Close DB helper for Jest
async function closeDB() {
    if (client) {
        await client.close();
    }
}

module.exports = { app, connectDB, closeDB };
