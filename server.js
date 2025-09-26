require('dotenv').config(); // Load environment variables

const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

app.use(express.json());

// MongoDB connection from environment variables
const url = process.env.MONGO_URI;
const dbName = process.env.DB_NAME || "smartlights";
const port = process.env.PORT || 3000;
let collection;

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log("Connected to MongoDB Atlas");
        const db = client.db(dbName);
        collection = db.collection("deviceStates");
    })
    .catch(err => console.error("MongoDB connection error:", err));

// POST device state
app.post("/api/v1/device/state", async (req, res) => {
    try {
        const payload = req.body;
        const result = await collection.insertOne(payload);
        res.json({ success: true, saved: payload });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET all device states
app.get("/api/v1/device/state", async (req, res) => {
    try {
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Reset all device states
app.post("/api/v1/reset", async (req, res) => {
    try {
        await collection.deleteMany({});
        res.json({ success: true, message: "All logs cleared" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Start server
app.listen(port, () => console.log(`API running on http://localhost:${port}`));

