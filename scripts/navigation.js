// Store the selected elements that we are going to uses.
const navbutton = document.querySelector("#ham-btn");
const navLinks = document.querySelector('#nav-bar');

// Toggle the show class off and on
navbutton.addEventListener("click", () => {
    navbutton.classList.toggle("show");
    navLinks.classList.toggle("show");
});

