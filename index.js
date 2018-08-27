const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/passwords/:count', (req, res) => {
  let count = parseInt(req.params.count);

  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  );

  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


app.listen(port, () => {
  console.log(`Password generator listening on ${port}`);
});

