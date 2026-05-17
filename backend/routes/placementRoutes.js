const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json([
        { id: 1, studentName: "Rahul S.", company: "Google", role: "Software Engineer" },
        { id: 2, studentName: "Priya K.", company: "Amazon", role: "Data Analyst" }
    ]);
});

module.exports = router;
