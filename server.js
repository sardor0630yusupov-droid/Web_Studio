const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Telegram Bot API
const BOT_TOKEN = "8296204957:AAHo2pSYywpZAfmDz_mxd1-fE_m9Fev7TqE";
const CHAT_ID = "-1003852154101";

app.post('/send-telegram', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        
        const text = `📨 YANGI ZAKAZ!\n\n👤 Ism: ${name}\n📧 Email: ${email}\n📞 Telefon: ${phone}\n\n💬 Xabar:\n${message}`;
        
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        
        const response = await axios.post(url, {
            chat_id: CHAT_ID,
            text: text,
            parse_mode: 'HTML'
        });
        
        res.json({ success: true, message: '✅ Zakaz jo\'natildi!' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: '❌ Xatolik: ' + error.message });
    }
});

app.listen(3000, () => {
    console.log('Server 3000 portida ishlamoqda: http://localhost:3000');
});