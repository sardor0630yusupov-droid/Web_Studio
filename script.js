// script.js

const token = '8296204957:AAHo2pSYYwpzAfmDz_mxdI-fE_m9Fev7TqE';
const chatId = '-1003852154101';

// Function to send message
function sendMessage(message) {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const data = {
        chat_id: chatId,
        text: message,
    };

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log('Message sent:', data))
    .catch(error => console.error('Error:', error));
}

// Smooth animations
const form = document.getElementById('contact-form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);
    const message = `Name: ${formData.get('name')} \nMessage: ${formData.get('message')}`;

    sendMessage(message);

    // Smooth animation for the form
    form.style.transition = 'opacity 0.5s ease';
    form.style.opacity = '0';

    setTimeout(() => {
        form.reset();
        form.style.opacity = '1';
    }, 500);
});
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
}// Telegram Bot Function
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