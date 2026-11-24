
// Get the submitted information from the URL
const params = new URLSearchParams(window.location.search);

// Display the submitted information
document.querySelector("#first-name").textContent =
    params.get("first") || "Not provided";

document.querySelector("#last-name").textContent =
    params.get("last") || "Not provided";

document.querySelector("#email").textContent =
    params.get("email") || "Not provided";

document.querySelector("#phone").textContent =
    params.get("phone") || "Not provided";

document.querySelector("#business").textContent =
    params.get("business") || "Not provided";

// Format and display the application timestamp
const timestamp = params.get("timestamp");
const timestampElement = document.querySelector("#timestamp");

if (timestamp && !Number.isNaN(Date.parse(timestamp))) {
    timestampElement.textContent = new Date(timestamp).toLocaleString();
} else {
    timestampElement.textContent = "Not available";
}
