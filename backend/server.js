const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7002',
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

app.get('/parks/:id', (req, res) => {
    const parkId = req.params.id;
    const q = "SELECT * FROM parks WHERE id = ?";

    db.query(q, [parkId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json({ message: "Park not found" });
        return res.json(data[0]);
    });
});

app.get('/parks', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 1));

    let { search = '', sortBy = '', sortDesc = 'false', price = '', length = '', word_count = '' } = req.query;

    let q = "SELECT * FROM parks WHERE 1";
    const values = [];

    if (search) {
        q += " AND name LIKE ?";
        values.push(`%${search}%`);
    }

    if (price === "low") {
        q += " AND price <= 5";
    } else if (price === "medium") {
        q += " AND price > 5";
    }

    if (length === "short") {
        q += " AND length_of_bicycle_path < 10";
    } else if (length === "medium") {
        q += " AND length_of_bicycle_path >= 10";
    }

    if (word_count === "low") {
        q += " AND (LENGTH(description) - LENGTH(REPLACE(description, ' ', '')) + 1) < 30";
    } else if (word_count === "medium") {
        q += " AND (LENGTH(description) - LENGTH(REPLACE(description, ' ', '')) + 1) >= 30";
    }

    if (sortBy) {
        const order = sortDesc === 'true' ? 'DESC' : 'ASC';

        if (['price', 'length_of_bicycle_path', 'name'].includes(sortBy)) {
            q += ` ORDER BY ${sortBy} ${order}`;
        }
    }

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);

        const totalLength = data.reduce((sum, park) => sum + parseFloat(park.length_of_bicycle_path || 0), 0);

        return res.json({ parks: data, totalLength });
    });
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
