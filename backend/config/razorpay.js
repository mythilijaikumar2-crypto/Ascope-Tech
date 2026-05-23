const Razorpay = require('razorpay');
require('dotenv').config();

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

// Detection logic for Sandbox / Mock Mode
const isMockMode = !keyId || !keySecret || keyId === 'YOUR_KEY_ID_HERE' || keySecret === 'YOUR_SECRET_KEY_HERE' || keyId.trim() === '' || keySecret.trim() === '';

let razorpay = null;

if (!isMockMode) {
    try {
        razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret
        });
        console.log("💳 Razorpay configured in PRODUCTION/TEST live mode.");
    } catch (error) {
        console.error("⚠️ Failed to initialize live Razorpay instance, falling back to mock mode:", error.message);
    }
} else {
    console.log("⚙️ Razorpay configured in MOCK/SANDBOX mode. Dynamic simulation activated.");
}

module.exports = {
    razorpay,
    isMockMode,
    keyId: isMockMode ? 'YOUR_KEY_ID_HERE' : keyId,
    keySecret: isMockMode ? 'YOUR_SECRET_KEY_HERE' : keySecret
};
