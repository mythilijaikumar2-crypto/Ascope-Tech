const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`🔐 Login Attempt:`, { email });
    res.status(200).json({ 
        token: "mock-jwt-token",
        user: { name: "Test User", email }
    });
});

router.post('/register', (req, res) => {
    const { fullName, email } = req.body;
    console.log(`📝 Register Attempt:`, { fullName, email });
    res.status(201).json({ 
        message: "User registered successfully",
        user: { name: fullName, email }
    });
});

module.exports = router;
