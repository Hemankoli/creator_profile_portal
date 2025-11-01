const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data.json');

exports.readData = () => {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      creators: parsed.creators || [],
      users: parsed.users || [],
      logs: parsed.logs || [],
    };
  } catch (e) {
    return { creators: [], users: [], logs: [] };
  }
};

exports.writeData = (data) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data));
}