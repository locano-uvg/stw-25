
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE users (username TEXT, password TEXT)");
});

app.post('/validateUser', (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ exists: !!row });
    });
});

app.post('/registerUser', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);

    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
