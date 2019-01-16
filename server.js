const express = require('express');
const app = express();

app.get('/', (req, res) => res.sendFile('./index.html', { root: __dirname }));
app.get('/GetSkillsAsync', (req, res) => res.sendFile('./skills.html', { root: __dirname }));
app.get('/static/*', (req, res) => res.sendFile(req.path, { root: __dirname }));

app.listen(process.env.PORT || 5000);