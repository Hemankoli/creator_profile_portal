const router = require("express").Router();
const { upload } = require('../services/multer');
const { readData, writeData } = require("../services/file");

router.get('/creators', (req, res) => {
  const { search = '', page = 1, limit = 10, designation = '' } = req.query;
  const data = readData();
  let items = data.creators;
  if (designation) items = items.filter(c => c.designation.toLowerCase() === designation.toLowerCase());
  if (search) {
    const q = search.toLowerCase();
    items = items.filter(c => c.name.toLowerCase().includes(q) || c.designation.toLowerCase().includes(q) || c.about.toLowerCase().includes(q));
  }
  const total = items.length;
  const p = Math.max(1, Number(page));
  const lim = Math.max(1, Number(limit));
  const start = (p - 1) * lim;
  const paged = items.slice(start, start + lim);
  res.json({ items: paged, total, page: p, limit: lim });
});


router.get('/creator/:id', (req, res) => {
  const data = readData();
  const c = data.creators.find(x => String(x.id) === String(req.params.id));
  if (!c) return res.status(404).json({ error: 'Creator not found' });
  res.json(c);
});

// ✅ POST - Create Creator with Media
router.post('/creators', upload.array('media', 10), (req, res) => {
  const data = readData();
  const id = Date.now();
  const files = req.files.map(f => `/uploads/${f.filename}`);

  const newCreator = {
    id,
    name: req.body.name,
    designation: req.body.designation,
    about: req.body.about,
    price: req.body.price,
    userId: req.body.userId,
    media: files,
    createdAt: new Date().toISOString(),
  };

  data.creators.unshift(newCreator);
  writeData(data);
  res.status(201).json(newCreator);
});

// ✅ PUT - Update Creator (with optional media)
router.put('/creators/:id', upload.array('media', 10), (req, res) => {
  const data = readData();
  const idx = data.creators.findIndex(c => String(c.id) === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Creator not found' });
  const updatedCreator = {
    ...data.creators[idx],
    name: req.body.name,
    designation: req.body.designation,
    about: req.body.about,
    price: req.body.price,
    userId: req.body.userId,
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
router.delete('/creators/:id', (req, res) => {
  const data = readData();
  const idx = data.creators.findIndex(c => String(c.id) === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Creator not found' });
  const removed = data.creators.splice(idx, 1)[0];
  writeData(data);
  res.json({ success: true, removed });
});

router.post("/favaritos/:id", (req, res) => {
  const data = readData();
  const productId = req.params.id;
  const existingIndex = data.favaritos.findIndex(
    (fav) => String(fav.productId) === String(productId)
  );

  if (existingIndex !== -1) {
    const removed = data.favaritos.splice(existingIndex, 1);
    writeData(data);
    return res.json({ message: "Removed from favorites", removed: removed[0] });
  } else {
    const newFav = {
      id: Date.now(),
      productId,
    };
    data.favaritos.push(newFav);
    writeData(data);
    return res.json({ message: "Added to favorites", fav: newFav });
  }
});


router.get("/get-favaritos", (req, res) => {
  const data = readData(); 
  res.json(data?.favaritos); 
})

module.exports = router;