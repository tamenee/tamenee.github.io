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

/*
=====================================================
CONTACT FORM EMAIL PREPARATION
=====================================================

GitHub Pages cannot process server-side contact forms by itself.

This code:
1. Reads the visitor's form information.
2. Builds an email subject and message.
3. Opens the visitor's email application.
4. Does not store or send information through the website.
*/

// Find the Contact page form.
const contactForm = document.getElementById("contact-form");

// Find the form status message.
const formStatus = document.getElementById("form-status");

// Continue only when the Contact form exists.
if (contactForm) {

    /*
    Listen for the form submission.

    preventDefault stops the browser from trying to submit
    the form to a server.
    */
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Read the visitor's name.
        const visitorName =
            document.getElementById("contact-name").value.trim();

        // Read the visitor's email address.
        const visitorEmail =
            document.getElementById("contact-email").value.trim();

        // Read the optional company name.
        const visitorCompany =
            document.getElementById("contact-company").value.trim();

        // Read the selected subject.
        const selectedSubject =
            document.getElementById("contact-subject").value;

        // Read the visitor's message.
        const visitorMessage =
            document.getElementById("contact-message").value.trim();

        /*
        Find the submit button and read the email recipient
        from its data-recipient attribute.
        */
        const submitButton =
            contactForm.querySelector("[data-recipient]");

        const recipientEmail =
            submitButton?.dataset.recipient?.trim();


        /*
        Confirm that all required fields and the recipient
        address are present.
        */
        if (
            !visitorName ||
            !visitorEmail ||
            !selectedSubject ||
            !visitorMessage ||
            !recipientEmail
        ) {
            if (formStatus) {
                formStatus.textContent =
                    "Please complete all required fields.";
            }

            return;
        }


        /*
        Prepare the message body.

        A blank line is created by using \n\n.
        */
        const emailBody = [
            `Name: ${visitorName}`,
            `Email: ${visitorEmail}`,
            `Company: ${visitorCompany || "Not provided"}`,
            "",
            "Message:",
            visitorMessage
        ].join("\n");


        /*
        Encode the subject and body so that spaces,
        punctuation and line breaks work correctly
        inside the mailto link.
        */
        const encodedSubject =
            encodeURIComponent(selectedSubject);

        const encodedBody =
            encodeURIComponent(emailBody);


        /*
        Create the final mailto address.
        */
        const mailtoLink =
            `mailto:${recipientEmail}` +
            `?subject=${encodedSubject}` +
            `&body=${encodedBody}`;


        // Display a short status message.
        if (formStatus) {
            formStatus.textContent =
                "Opening your email application...";
        }


        /*
        Open the visitor's default email application.
        */
        window.location.href = mailtoLink;
    });
}
