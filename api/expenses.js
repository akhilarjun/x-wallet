const express = require("express");
const router = express.Router();
const expenses = require("./resources/expense.json");

router.get('/', (req, res) => {
    res.send(expenses);
});

module.exports = router;