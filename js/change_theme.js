document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
        darkModeToggle.checked = document.body.classList.contains("dark-mode");
    }

    function applyDarkModePreference() {
        if (JSON.parse(localStorage.getItem("darkMode"))) {
            document.body.classList.add("dark-mode");
            darkModeToggle.checked = true;
        }
    }

    darkModeToggle.addEventListener("change", toggleDarkMode);
    applyDarkModePreference();
});