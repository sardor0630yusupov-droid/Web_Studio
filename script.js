// Telegram Bot Function
function sendToTelegram(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !phone || !message) {
        alert('Iltimos, barcha maydonlarni to\'ldiring!');
        return;
    }
    
    fetch('http://localhost:3000/send-telegram', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, message })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('✅ Zakaz muvaffaqiyatli jo\'natildi!');
            document.querySelector('form').reset();
        } else {
            alert('❌ ' + data.message);
        }
    })
    .catch(error => alert('❌ Xatolik: ' + error));
}
    
  // Telegram Bot Token va Chat ID
const BOT_TOKEN = "8296204957:AAHo2pSYywpZAfmDz_mxd1-fE_m9Fev7TqE"; 
const CHAT_ID = "-1003852154101";
    
    const text = `📨 YANGI ZAKAZ!\n\n👤 Ism: ${name}\n📧 Email: ${email}\n📞 Telefon: ${phone}\n\n💬 Xabar:\n${message}`;
    
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`;
    