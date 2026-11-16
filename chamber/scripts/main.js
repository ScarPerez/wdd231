
// ==============================
// FOOTER INFORMATION
// ==============================

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}


// ==============================
// MEMBERS DATA
// ==============================

const membersContainer = document.querySelector("#members-container");
const spotlightsContainer = document.querySelector("#spotlights-container");

async function getMembers() {

    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load members data.");
        }

        const members = await response.json();

        // Display all members on Directory
        if (membersContainer) {
            displayMembers(members);
        }

        // Display random Gold and Silver members on Home
        if (spotlightsContainer) {
            displaySpotlights(members);
        }

    } catch (error) {
        console.error("Error loading members:", error);

        if (membersContainer) {
            membersContainer.textContent =
                "Unable to load business members.";
        }

        if (spotlightsContainer) {
            spotlightsContainer.textContent =
                "Unable to load business spotlights.";
        }
    }
}


// ==============================
// DISPLAY DIRECTORY MEMBERS
// ==============================

function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");
        card.classList.add("member-card");

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} logo`;
        image.loading = "lazy";

        const name = document.createElement("h2");
        name.textContent = member.name;

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone
            ? `Phone: ${member.phone}`
            : "Phone: Not available";

        const membership = document.createElement("p");

        const levels = {
            1: "Member",
            2: "Silver Member",
            3: "Gold Member"
        };

        membership.textContent = levels[member.membership];

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener noreferrer";

        card.append(
            image,
            name,
            address,
            phone,
            membership,
            website
        );

        membersContainer.appendChild(card);
    });
}


// ==============================
// BUSINESS SPOTLIGHTS
// ==============================

function displaySpotlights(members) {

    spotlightsContainer.innerHTML = "";

    // Filter only Gold and Silver members
    const eligibleMembers = members.filter((member) => {
        return member.membership === 2 ||
               member.membership === 3;
    });

    // Randomize the eligible members
    const shuffledMembers = [...eligibleMembers];

    for (let i = shuffledMembers.length - 1; i > 0; i--) {

        const randomIndex = Math.floor(Math.random() * (i + 1));

        [shuffledMembers[i], shuffledMembers[randomIndex]] =
            [shuffledMembers[randomIndex], shuffledMembers[i]];
    }

    // Randomly display 2 or 3 businesses
    const numberOfSpotlights =
        Math.floor(Math.random() * 2) + 2;

    const selectedMembers =
        shuffledMembers.slice(0, numberOfSpotlights);

    // Create spotlight cards
    selectedMembers.forEach((member) => {

        const card = document.createElement("article");
        card.classList.add("spotlight-card");

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} company logo`;
        image.loading = "lazy";

        const name = document.createElement("h3");
        name.textContent = member.name;

        const phone = document.createElement("p");
        phone.textContent = member.phone
            ? `Phone: ${member.phone}`
            : "Phone: Not available";

        const address = document.createElement("p");
        address.textContent = member.address;

        const membership = document.createElement("p");

        membership.textContent =
            member.membership === 3
                ? "Gold Member"
                : "Silver Member";

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener noreferrer";

        card.append(
            image,
            name,
            phone,
            address,
            membership,
            website
        );

        spotlightsContainer.appendChild(card);
    });
}


// ==============================
// GRID AND LIST VIEW
// ==============================

const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

if (gridButton && listButton && membersContainer) {

    gridButton.addEventListener("click", () => {

        membersContainer.classList.add("members-grid");
        membersContainer.classList.remove("members-list");

        gridButton.classList.add("active-view");
        listButton.classList.remove("active-view");

        gridButton.setAttribute("aria-pressed", "true");
        listButton.setAttribute("aria-pressed", "false");
    });

    listButton.addEventListener("click", () => {

        membersContainer.classList.add("members-list");
        membersContainer.classList.remove("members-grid");

        listButton.classList.add("active-view");
        gridButton.classList.remove("active-view");

        listButton.setAttribute("aria-pressed", "true");
        gridButton.setAttribute("aria-pressed", "false");
    });
}


// ==============================
// INITIALIZE MEMBERS
// ==============================

if (membersContainer || spotlightsContainer) {
    getMembers();
}

// OPENWEATHERMAP API
const apiKey = "2b651aa63fd0c68f451a84db2340ac67";

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Retalhuleu,GT&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(weatherUrl);

        if (!response.ok) {
            throw new Error("Weather information is unavailable.");
        }

        const data = await response.json();

        document.querySelector("#current-temp").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.querySelector("#weather-description").textContent =
            data.weather[0].description;

    } catch (error) {
        console.error("Weather error:", error);
        document.querySelector("#weather-description").textContent =
            "Weather information unavailable.";
    }
}

if (document.querySelector("#current-temp")) {
    getWeather();
    getForecast();
}

// 3-DAY WEATHER FORECAST
async function getForecast() {
    const forecastContainer = document.querySelector("#forecast-container");

    try {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Retalhuleu,GT&units=metric&appid=${apiKey}`;

        const response = await fetch(forecastUrl);

        if (!response.ok) {
            throw new Error("Forecast information is unavailable.");
        }

        const data = await response.json();

        // Group forecasts by date
        const dailyForecasts = {};

        data.list.forEach(item => {
            const date = new Date(
                (item.dt + data.city.timezone) * 1000
            );

            const dateKey = date.toISOString().split("T")[0];

            if (!dailyForecasts[dateKey]) {
                dailyForecasts[dateKey] = [];
            }

            dailyForecasts[dateKey].push(item);
        });

        // Get the next three days
        const dates = Object.keys(dailyForecasts).sort().slice(0, 3);

        forecastContainer.innerHTML = "";

        dates.forEach(dateKey => {
            const forecasts = dailyForecasts[dateKey];

            // Select the forecast closest to noon
            const middayForecast = forecasts.reduce((closest, item) => {
                const currentHour = Number(item.dt_txt.split(" ")[1].slice(0, 2));
                const closestHour = Number(closest.dt_txt.split(" ")[1].slice(0, 2));

                return Math.abs(currentHour - 12) < Math.abs(closestHour - 12)
                    ? item
                    : closest;
            });

            const date = new Date(`${dateKey}T12:00:00Z`);

            const dayName = new Intl.DateTimeFormat("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                timeZone: "UTC"
            }).format(date);

            const temperature = Math.round(middayForecast.main.temp);
            const description = middayForecast.weather[0].description;

            const card = document.createElement("div");
            card.classList.add("forecast-card");

            card.innerHTML = `
                <h4>${dayName}</h4>
                <p>${temperature}°C</p>
                <p>${description}</p>
            `;

            forecastContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Forecast error:", error);
        forecastContainer.textContent = "Forecast information unavailable.";
    }
}