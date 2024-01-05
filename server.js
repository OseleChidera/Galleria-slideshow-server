const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = 4000
const fs = require('fs');
path = require('path');

app.get('/', (req, res) => {
    try {
        res.json("Welcome to galleria api");
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});

app.get('/data', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
});


app.get('/data/:id', (req, res) => {
    const id = req.params.id;

    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).send('Error reading JSON file');
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            const item = jsonData.find(obj => obj.id === Number(id));
            if (!item) {
                res.status(404).send('Item not found');
                return;
            }
            res.json(item);
        } catch (err) {
            console.error('Error parsing JSON data:', err);
            res.status(500).send('Error parsing JSON data');
        }
    });
});



app.listen(port, () => {
    console.log(`You are running on port ${port}`);
})

