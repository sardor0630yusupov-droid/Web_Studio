// Animation
gsap.from(".login-card", {
  y: 100,
  opacity: 0,
  duration: 1
});

// Login
document.querySelector(".login-btn").onclick = () => {
  document.querySelector(".login-container").style.display = "none";
  document.querySelector(".dashboard").classList.remove("hidden");

  gsap.from(".card", {
    scale: 0,
    duration: 0.5,
    stagger: 0.2
  });
};
// Telegram WebApp
let tg = window.Telegram.WebApp;
tg.expand();

// User data
let user = tg.initDataUnsafe.user;

if (user) {
  document.querySelector(".login-container").style.display = "none";
  document.querySelector(".dashboard").classList.remove("hidden");

  document.querySelector(".dashboard h1").innerText =
    "Welcome " + user.first_name;

  gsap.from(".card", {
    scale: 0,
    duration: 0.5,
    stagger: 0.2
  });
}