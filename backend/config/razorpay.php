<?php
// backend/config/razorpay.php

$keyId = getenv('RAZORPAY_KEY_ID');
$keySecret = getenv('RAZORPAY_KEY_SECRET');

// Detection logic for Sandbox / Mock Mode
$isMockMode = !$keyId || !$keySecret || 
              $keyId === 'YOUR_KEY_ID_HERE' || $keySecret === 'YOUR_SECRET_KEY_HERE' || 
              trim($keyId) === '' || trim($keySecret) === '';

return [
    'keyId' => $isMockMode ? 'YOUR_KEY_ID_HERE' : $keyId,
    'keySecret' => $isMockMode ? 'YOUR_SECRET_KEY_HERE' : $keySecret,
    'isMockMode' => $isMockMode
];
