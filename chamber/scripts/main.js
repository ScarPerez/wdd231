
// ==============================
// FOOTER INFORMATION
// ==============================

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;


// ==============================
// MEMBERS DIRECTORY
// ==============================

const membersContainer = document.querySelector("#members-container");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load members data.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error("Error loading members:", error);
        membersContainer.textContent = "Unable to load business members.";
    }
}


// ==============================
// DISPLAY MEMBERS
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
// GRID AND LIST VIEW
// ==============================

const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

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


// ==============================
// INITIALIZE DIRECTORY
// ==============================

getMembers();
