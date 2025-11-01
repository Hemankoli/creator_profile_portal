const router = require("express").Router();
const { readData, writeData } = require("../services/file")

router.post("/logs", (req, res) => {
    const data = readData();
    const id = Date.now();
    const logs = {
        id,
        name: req.body.name,
        changes: req.body.changes,
        createdAt: new Date().toISOString(),
    };
    data.logs.push(logs);
    writeData(data);
    res.json(logs);
});

router.get("/all-logs", (req, res) => {
    const data = readData();
    const allLogs = data.logs;
    res.json(allLogs);
})

module.exports = router;