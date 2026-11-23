
const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Programming Building Blocks",
        credits: 2,
        completed: true,
        description: "Learn the fundamentals of programming, including variables, expressions, decisions, and loops. Develop problem-solving skills by writing simple programs.",
        certificate: "Web and Computer Programming",
        technology: ["Python", "VS Code"]
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true,
        description: "Learn the foundations of web development by creating web pages with HTML and CSS. Explore web standards, accessibility, and responsive design.",
        certificate: "Web and Computer Programming",
        technology: ["HTML", "CSS", "VS Code"]
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true,
        description: "Develop programming skills using functions, lists, files, and exception handling. Practice writing organized and reusable Python programs.",
        certificate: "Web and Computer Programming",
        technology: ["Python", "VS Code"]
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true,
        description: "Explore dynamic web development using JavaScript, HTML, and CSS. Learn how to manipulate the DOM and create interactive web experiences.",
        certificate: "Web and Computer Programming",
        technology: ["HTML", "CSS", "JavaScript", "VS Code"]
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Content Development 1",
        credits: 2,
        completed: false,
        description: "Learn to build responsive and accessible websites using modern web development practices. Work with JavaScript, APIs, and dynamic web content.",
        certificate: "Web and Computer Programming",
        technology: ["HTML", "CSS", "JavaScript", "JSON", "VS Code"]
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: true,
        description: "Learn object-oriented programming principles, including classes, objects, encapsulation, and inheritance. Develop structured programs using C#.",
        certificate: "Web and Computer Programming",
        technology: ["C#", "Visual Studio"]
    }
];


// Select the HTML elements
const courseContainer = document.querySelector("#course-container");
const creditTotal = document.querySelector("#credit-total");

const allButton = document.querySelector("#all-btn");
const cseButton = document.querySelector("#cse-btn");
const wddButton = document.querySelector("#wdd-btn");

const courseDetails = document.querySelector("#course-details");


// Display the courses
function displayCourses(courseList) {
    courseContainer.innerHTML = "";

    courseList.forEach((course) => {
        const card = document.createElement("button");

        card.type = "button";
        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} Credits</p>
        `;

        // Open modal when clicking a course card
        card.addEventListener("click", () => {
            displayCourseDetails(course);
        });

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


// Display course details in the modal
function displayCourseDetails(course) {
    courseDetails.innerHTML = `
        <button id="closeModal" type="button" aria-label="Close dialog">
            &times;
        </button>

        <h2>${course.subject} ${course.number}</h2>

        <h3>${course.title}</h3>

        <p><strong>Credits:</strong> ${course.credits}</p>

        <p><strong>Certificate:</strong> ${course.certificate}</p>

        <p>${course.description}</p>

        <p>
            <strong>Technologies:</strong>
            ${course.technology.join(", ")}
        </p>
    `;

    courseDetails.showModal();

    // Close modal with the close button
    courseDetails.querySelector("#closeModal").addEventListener("click", () => {
        courseDetails.close();
    });
}


// Close modal when clicking outside the dialog content
courseDetails.addEventListener("click", (event) => {
    if (event.target === courseDetails) {
        courseDetails.close();
    }
});


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
