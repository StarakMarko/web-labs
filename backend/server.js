const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');


const app = express();


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});

db.connect(err => {
    if (err) {
        console.error('error', err);
    } else {
        console.log('ok');
    }
});


app.get('/', (req, res) => {
    res.send('ok');
});

app.get('/parks', (req, res) => {
    const q = "SELECT * FROM parks";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);

    })
});

app.post('/parks', (req, res) => {
    const { name, address, length_of_bicycle_path, price } = req.body;
    const q = "INSERT INTO parks (`name`, `address`, `length_of_bicycle_path`, `price`) VALUES (?, ?, ?, ?)";
    const values = [name, address, length_of_bicycle_path, price];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "add new park", id: data.insertId });
    });
});

app.put('/parks/:id', (req, res) => {
    const parkId = req.params.id;
    const { name, address, length_of_bicycle_path, price } = req.body;

    const q = `
        UPDATE parks 
        SET name = ?, address = ?, length_of_bicycle_path = ?, price = ? 
        WHERE id = ?
    `;
    const values = [name, address, length_of_bicycle_path, price, parkId];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "park eddited" });
    });
});

app.delete('/parks/:id', (req, res) => {
    const parkId = req.params.id;
    const q = "DELETE FROM parks WHERE id = ?";
    db.query(q, [parkId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "park deleted" });
    });
});

app.listen(8000, () => console.log(`Server is running on 8000`));
