const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const portName = 'COM13'; // Set to your Arduino port
const serialPort = new SerialPort(portName, { baudRate: 9600 });
const parser = serialPort.pipe(new Readline({ delimiter: '\n' }));


let latestTDS = null;
// Listen for data from Arduino
parser.on('data', (data) => {
  latestTDS = data.trim();
  console.log('TDS Reading:', latestTDS);
});

app.get('/api/tds', (req, res) => {
  res.json({ tds: latestTDS });
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
