// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Form validation
function validateForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        alert('Iltimos, barcha maydonlarni to\'ldiring!');
        return false;
    }
    
    if (!email.includes('@')) {
        alert('To\'g\'ri email kiriting!');
        return false;
    }
    
    alert('Rahmat! Tez orada siz bilan bog\'lanamiz.');
    return false;
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
    }
});

// Counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 50);
}
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
    
    // Telegram Bot Token va Chat ID
    const BOT_TOKEN = "YOUR_BOT_TOKEN"; // O'zingizning bot tokenini qo'ying
    const CHAT_ID = "YOUR_CHAT_ID";     // Kanalingizning chat ID'sini qo'ying
    
    const text = `📨 YANGI ZAKAZ!\n\n👤 Ism: ${name}\n📧 Email: ${email}\n📞 Telefon: ${phone}\n\n💬 Xabar:\n${message}`;
    
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}`;
    
    fetch(url)
        .then(response => {
            if (response.ok) {
                alert('✅ Zakaz muvaffaqiyatli jo\'natildi! Tez orada siz bilan bog\'lanamiz.');
                document.querySelector('form').reset();
            } else {
                alert('❌ Xatolik yuz berdi. Qayta urinib ko\'ring.');
            }
        })
        .catch(error => {
            alert('❌ Xatolik: ' + error);
        });
}