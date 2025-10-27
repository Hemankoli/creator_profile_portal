const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { upload } = require('./services/multer');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

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
  const lim = Math.max(1, Number(limit)); 20
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

// ✅ POST - Create Creator with Media
app.post('/creators', upload.array('media', 10), (req, res) => {
  const data = readData();
  const id = Date.now();
  const files = req.files.map(f => `/uploads/${f.filename}`);

  const newCreator = {
    id,
    name: req.body.name,
    designation: req.body.designation,
    about: req.body.about,
    price: req.body.price,
    media: files,
    createdAt: new Date().toISOString(),
  };

  data.creators.unshift(newCreator);
  writeData(data);
  res.status(201).json(newCreator);
});

// ✅ PUT - Update Creator (with optional media)
app.put('/creators/:id', upload.array('media', 10), (req, res) => {
  const data = readData();
  const idx = data.creators.findIndex(c => String(c.id) === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Creator not found' });
  const updatedCreator = {
    ...data.creators[idx],
    name: req.body.name,
    designation: req.body.designation,
    about: req.body.about,
    price: req.body.price,
    updatedAt: new Date().toISOString(),
  };

  if (req.files && req.files.length > 0) {
    updatedCreator.media = req.files.map(f => `/uploads/${f.filename}`);
  }

  data.creators[idx] = updatedCreator;
  writeData(data);
  res.json(updatedCreator);
});

// ✅ DELETE - Remove Creator
app.delete('/creators/:id', (req, res) => {
  const data = readData();
  const idx = data.creators.findIndex(c => String(c.id) === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Creator not found' });
  const removed = data.creators.splice(idx, 1)[0];
  writeData(data);
  res.json({ success: true, removed });
});

// ✅ Start Server
app.listen(4000, () => console.log('✅ Server running on http://localhost:4000'));