const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_PATH = path.join(__dirname, 'data.json');

function readData() {
    try {
        const raw = fs.readFileSync(DATA_PATH);
        return JSON.parse(raw);
    } catch (e) {
        return { creators: [] };
    }
}

function writeData(data) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

app.get('/creators', (req, res) => {
    const { search = '', page = 1, limit = 10, designation = '' } = req.query;
    const data = readData();
    let items = data.creators;
    if (designation) items = items.filter(c => c.designation.toLowerCase() === designation.toLowerCase());
    if (search) {
        const q = search.toLowerCase();
        items = items.filter(c => c.name.toLowerCase().includes(q) || c.about.toLowerCase().includes(q));
    }
    const total = items.length;
    const p = Math.max(1, Number(page));
    const lim = Math.max(1, Number(limit));
    const start = (p - 1) * lim;
    const paged = items.slice(start, start + lim);
    res.json({ items: paged, total, page: p, limit: lim });
});

app.get('/creator/:id', (req, res) => {
    const data = readData();
    const c = data.creators.find(x => String(x.id) === String(req.params.id));
    if (!c) return res.status(404).json({ error: 'Creator not found' });
    res.json(c);
});
app.post('/creators', (req, res) => {
    const payload = req.body;
    const data = readData();
    const id = Date.now();
    const newC = { id, ...payload, createdAt: new Date().toISOString() };
    data.creators.unshift(newC);
    writeData(data);
    res.status(201).json(newC);
});
app.put('/creators/:id', (req, res) => {
    const data = readData();
    const idx = data.creators.findIndex(x => String(x.id) === String(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'Creator not found' });
    data.creators[idx] = { ...data.creators[idx], ...req.body, updatedAt: new Date().toISOString() };
    writeData(data);
    res.json(data.creators[idx]);
});
app.delete('/creators/:id', (req, res) => {
    const data = readData();
    const idx = data.creators.findIndex(x => String(x.id) === String(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'Creator not found' });
    const removed = data.creators.splice(idx, 1)[0];
    writeData(data);
    res.json({ success: true, removed });
});
app.post('/seed', (req, res) => {
    const sample = require('./data.json');
    writeData(sample);
    res.json({ seeded: true });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Backend listening on', PORT));