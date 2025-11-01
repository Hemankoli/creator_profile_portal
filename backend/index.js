const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const creatorRoute = require("./controllers/creator");
const authRoute = require("./controllers/auth");
const logRoute = require("./controllers/logs");


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/", creatorRoute)
app.use("/", authRoute)
app.use("/", logRoute)


// ✅ Start Server
app.listen(4000, () => console.log('✅ Server running on http://localhost:4000'));