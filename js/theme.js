const toggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    if (theme === "light") {
        toggle.textContent = "🌙";
        toggle.setAttribute("aria-label", "Toggle dark theme");
    } else {
        toggle.textContent = "☀️";
        toggle.setAttribute("aria-label", "Toggle light theme");
    }
}

const saved = localStorage.getItem("theme") || "dark";
applyTheme(saved);

toggle.addEventListener("click", function () {
    const current = document.documentElement.getAttribute("data-theme");
    let next;
    if (current === "light") {
        next = "dark";
    } else {
        next = "light";
    }
    localStorage.setItem("theme", next);
    applyTheme(next);
});