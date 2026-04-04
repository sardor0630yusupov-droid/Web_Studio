// Slider
var swiper = new Swiper(".mySwiper", {
  loop: true,
  effect: "fade",
  autoplay: {
    delay: 3000,
  },
});

// Login
function openLogin() {
  document.getElementById("loginBox").classList.add("active");
}

function closeLogin() {
  document.getElementById("loginBox").classList.remove("active");
}