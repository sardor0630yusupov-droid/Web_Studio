// Formani yuborish hodisasini ushlash
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', sendToTelegram);
    }
});

// Telegram Bot Function
function sendToTelegram(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const submitBtn = event.target.querySelector('button[type="submit"]');
    
    if (!name || !email || !phone || !message) {
        alert('Iltimos, barcha maydonlarni to\'ldiring!');
        return;
    }
    
    // Tugmani yuklanish holatiga o'tkazish
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Jo\'natilmoqda... <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Telegram Bot Token va Chat ID
    const BOT_TOKEN = "8296204957:AAHo2pSYywpZAfmDz_mxd1-fE_m9Fev7TqE"; 
    const CHAT_ID = "-1003852154101";
    
    const text = `📨 <b>YANGI ZAKAZ! (Web Studio)</b>\n\n👤 <b>Ism:</b> ${name}\n📧 <b>Email:</b> ${email}\n📞 <b>Telefon:</b> ${phone}\n\n💬 <b>Xabar:</b>\n${message}`;
    
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    // Telegramga so'rov yuborish
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text,
            parse_mode: 'HTML'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('✅ Xabaringiz muvaffaqiyatli jo\'natildi! Tez orada siz bilan bog\'lanamiz.');
            event.target.reset(); // Formani tozalash
        } else {
            alert('❌ Xatolik yuz berdi. Iltimos keyinroq qayta urinib ko\'ring.');
            console.error(data);
        }
    })
    .catch(error => {
        alert('❌ Tarmoq xatoligi yuz berdi!');
        console.error('Error:', error);
    })
    .finally(() => {
        // Tugmani asl holatiga qaytarish
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    });
}