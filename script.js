document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById("splash");
    const main = document.getElementById("main");

    setTimeout(() => {
        splash.style.opacity = "0";
        splash.style.transition = "0.8s";

        setTimeout(() => {
            splash.style.display = "none";
            if (main) {
                main.classList.remove("hidden");
            }
        }, 800);

    }, 3000);
});