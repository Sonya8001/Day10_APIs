const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let dataStore = [{ name: "Teacher", message: "API is live!" }];

app.get("/api/messages", (req, res) => {
    console.log("datastore: " + dataStore);
    res.json(dataStore);
});

// Get one message by index (for edit pre-fill)  // FIXED
app.get("/api/messages/:id", (req, res) => {
    const id = Number(req.params.id); // FIXED
    if (!Number.isInteger(id) || id < 0 || id >= dataStore.length) {
        return res.status(404).send({ message: "Message not found" }); // FIXED
    }
    res.json(dataStore[id]); // FIXED
});

app.post("/api/messages", (req, res) => {
    const { name, message } = req.body || {};

    console.log("sending message");

    if (!name || !message) {
        return res.status(400).send({ message: "Missing name or message" });
    }

    dataStore.push({ name, message });
    res.status(201).send({ message: "Received!" });
});

// Update existing message by index (PUT) // FIXED
app.put("/api/messages/:id", (req, res) => {
    const id = Number(req.params.id); // FIXED
    const { name, message } = req.body || {};

    if (!Number.isInteger(id) || id < 0 || id >= dataStore.length) {
        return res.status(404).send({ message: "Message not found" }); // FIXED
    }
    if (!name || !message) {
        return res.status(400).send({ message: "Missing name or message" }); // FIXED
    }

    dataStore[id] = { name, message }; // FIXED
    res.send({ message: "Updated!" }); // FIXED
});

// Delete message by index (DELETE) // FIXED
app.delete("/api/messages/:id", (req, res) => {
    const id = Number(req.params.id); // FIXED
    if (!Number.isInteger(id) || id < 0 || id >= dataStore.length) {
        return res.status(404).send({ message: "Message not found" }); // FIXED
    }

    dataStore.splice(id, 1); // FIXED
    res.send({ message: "Deleted!" }); // FIXED
});

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
