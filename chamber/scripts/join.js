
// ==============================
// FORM TIMESTAMP
// ==============================

const timestampField = document.querySelector("#timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}


// ==============================
// MEMBERSHIP MODALS
// ==============================

const modalLinks = document.querySelectorAll(".modal-link");
const closeButtons = document.querySelectorAll(".close-modal");

modalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const modalId = link.getAttribute("href");
        const modal = document.querySelector(modalId);

        if (modal) {
            modal.showModal();
        }
    });
});

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");

        if (modal) {
            modal.close();
        }
    });
});
