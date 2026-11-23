
// Get the query string from the URL
const params = new URLSearchParams(window.location.search);

// Get the form values
const firstName = params.get('first');
const lastName = params.get('last');
const phone = params.get('phone');
const email = params.get('email');
const ordinance = params.get('ordinance');
const date = params.get('date');
const location = params.get('location');

// Select the results container
const results = document.querySelector('#results');

// Create an array with the appointment information
const appointmentDetails = [
    ['First Name', firstName],
    ['Last Name', lastName],
    ['Cell Phone', phone],
    ['Email', email],
    ['Ordinance', ordinance],
    ['Date', date],
    ['Location', location]
];

// Display the information on the page
appointmentDetails.forEach((detail) => {
    const paragraph = document.createElement('p');

    paragraph.textContent = `${detail[0]}: ${detail[1] || 'Not provided'}`;

    results.appendChild(paragraph);
});
