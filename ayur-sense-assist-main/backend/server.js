// Moved from project root

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const portName = 'COM13'; // Set to your Arduino port
const serialPort = new SerialPort({ path: portName, baudRate: 9600 });
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));


let latestTDS = null;
// Listen for data from Arduino and extract numeric TDS value
parser.on('data', (data) => {
  const match = data.match(/([\d.]+)/); // extract first number
  if (match) {
    latestTDS = match[1];
  } else {
    latestTDS = null;
  }
  console.log('TDS Reading:', data.trim());
});

app.get('/api/tds', (req, res) => {
  res.json({ tds: latestTDS });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
