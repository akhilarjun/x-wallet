const express = require('express');
const app = express();
const expensesRouter = require('./api/expenses');

const path = require('path');

app.use(express.static(path.join(__dirname, '')));

app.use('/api/expenses', expensesRouter);

app.get('/*', (req, res) => {
    const destPath = path.join(__dirname, 'index.html');
    res.sendFile(destPath);
})

app.listen(3000, () => {
    console.log('Server started');
})