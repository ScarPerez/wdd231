
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

// Display the current year
currentYear.textContent = new Date().getFullYear();

// Display the last modified date
lastModified.textContent = document.lastModified;
