/*
=====================================================
MOBILE NAVIGATION MENU
=====================================================

This section controls the menu on tablets and phones.

On a desktop computer, navigation links are displayed normally.
On smaller screens, the links are hidden until the visitor
presses the menu button.
*/

// Find the mobile menu button by its HTML ID.
const menuButton = document.getElementById("menu-button");

// Find the navigation list by its HTML ID.
const navigationLinks = document.getElementById("nav-links");

/*
Only add menu behaviour when both elements exist.

This prevents JavaScript errors if a future page does not
contain a mobile menu.
*/
if (menuButton && navigationLinks) {

    // Listen for a click on the mobile menu button.
    menuButton.addEventListener("click", () => {

        /*
        Add or remove the "open" CSS class.

        When "open" exists, the mobile navigation is visible.
        When "open" is removed, the navigation is hidden.
        */
        navigationLinks.classList.toggle("open");

        /*
        Check whether the navigation currently contains
        the "open" class.
        */
        const menuIsOpen =
            navigationLinks.classList.contains("open");

        /*
        Update aria-expanded for screen readers and
        accessibility tools.
        */
        menuButton.setAttribute(
            "aria-expanded",
            String(menuIsOpen)
        );
    });


    /*
    Close the mobile menu after a visitor selects a link.

    This is useful on small screens because the menu will
    not remain open after moving to another page.
    */
    const individualNavigationLinks =
        navigationLinks.querySelectorAll("a");

    individualNavigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            // Hide the mobile navigation.
            navigationLinks.classList.remove("open");

            // Update the accessibility state.
            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        });
    });
}


/*
=====================================================
AUTOMATIC FOOTER YEAR
=====================================================

This section automatically displays the current year in
the footer so that it does not need to be updated manually.
*/

// Find the span containing id="current-year".
const currentYearElement =
    document.getElementById("current-year");

// Continue only when the element exists on the current page.
if (currentYearElement) {

    // Obtain the current year from the visitor's device.
    const currentYear = new Date().getFullYear();

    // Insert that year into the footer.
    currentYearElement.textContent = currentYear;
}
