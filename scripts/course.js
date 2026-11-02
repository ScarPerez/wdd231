const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Programming Building Blocks",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Content Development 1",
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: true
    }
];


// Select the HTML elements
const courseContainer = document.querySelector("#course-container");
const creditTotal = document.querySelector("#credit-total");

const allButton = document.querySelector("#all-btn");
const cseButton = document.querySelector("#cse-btn");
const wddButton = document.querySelector("#wdd-btn");

// Display the courses
function displayCourses(courseList) {
    courseContainer.innerHTML = "";

    courseList.forEach((course) => {
        const card = document.createElement("div");

        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} Credits</p>
        `;

        courseContainer.appendChild(card);
    });

    // Calculate the total credits
    const totalCredits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    creditTotal.textContent =
        `Total credits for courses listed above: ${totalCredits}`;
}

// Filter courses by subject
function filterCourses(subject) {
    let filteredCourses;

    if (subject === "ALL") {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(
            (course) => course.subject === subject
        );
    }

    displayCourses(filteredCourses);
}

// Button events
allButton.addEventListener("click", () => {
    filterCourses("ALL");
});

cseButton.addEventListener("click", () => {
    filterCourses("CSE");
});

wddButton.addEventListener("click", () => {
    filterCourses("WDD");
});

// Display all courses when the page loads
displayCourses(courses);
