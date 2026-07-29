// Select the mobile menu button and navigation links.
const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");

// Confirm that the required menu elements exist.
if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        // Open or close the mobile navigation.
        navLinks.classList.toggle("open");

        // Update the accessibility state.
        const isOpen = navLinks.classList.contains("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });
}

// Automatically display the current year in the footer.
const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}
