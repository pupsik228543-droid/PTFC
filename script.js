// Год в подвале
document.getElementById("year").textContent = new Date().getFullYear();

// Тема (по умолчанию — тёмная, как и задумано в Liquid Glass)
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("tfc-theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    themeToggle.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("tfc-theme", isLight ? "light" : "dark");
});

// Активная ссылка в меню
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
    });
});

// Ссылки на Discord (все кнопки "Наш Discord сервер")
const DISCORD_URL = "https://discord.gg/bBPyuYfzf";

document.querySelectorAll('a[href*="discord.gg"]').forEach((btn) => {
    btn.setAttribute("href", DISCORD_URL);
});

// Появление секций при скролле
const revealTargets = document.querySelectorAll(".panel, .card, .cta-panel, .hero > *");

if ("IntersectionObserver" in window) {
    revealTargets.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        el.style.transition = "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)";
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach((el, i) => {
        el.style.transitionDelay = `${Math.min(i * 60, 360)}ms`;
        observer.observe(el);
    });
}
