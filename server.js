const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let dataStore = [{ name: "Teacher", message: "API is live!" }];

app.get("/api/messages", (req, res) => {
    res.json(dataStore);
});

app.get("/api/messages/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 0 || id >= dataStore.length) {
        return res.status(404).send({ message: "Message not found" });
    }
    res.json(dataStore[id]);
});

app.post("/api/messages", (req, res) => {
    const { name, message } = req.body || {};

    if (!name || !message) {
        return res.status(400).send({ message: "Missing name or message" });
    }

    dataStore.push({ name, message });
    res.status(201).send({ message: "Received!" });
});

app.put("/api/messages/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, message } = req.body || {};

    if (!Number.isInteger(id) || id < 0 || id >= dataStore.length) {
        return res.status(404).send({ message: "Message not found" });
    }
    if (!name || !message) {
        return res.status(400).send({ message: "Missing name or message" });
    }

    dataStore[id] = { name, message };
    res.send({ message: "Updated!" });
});

app.delete("/api/messages/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 0 || id >= dataStore.length) {
        return res.status(404).send({ message: "Message not found" });
    }

    dataStore.splice(id, 1);
    res.send({ message: "Deleted!" });
});

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
