// Create a Set to store registered courses
let courses = new Set();

function addCourse() {

    let input = document.getElementById("courseInput");
    let courseName = input.value.trim();
    let output = document.getElementById("output");

    if (courseName === "") {
        output.textContent = "Please enter a course name.";
        return;
    }

    // Add course dynamically
    courses.add(courseName);

    // Attempt to add duplicate (requirement)
    courses.add(courseName);

    // Clear previous display
    output.textContent = "";

    // Display all courses using for...of
    let heading = document.createElement("p");
    heading.textContent = "Registered Courses:";
    output.appendChild(heading);

    for (let course of courses) {
        let p = document.createElement("p");
        p.textContent = "- " + course;
        output.appendChild(p);
    }

    // Display total unique courses using .size
    let total = document.createElement("p");
    total.textContent = "Total Unique Courses: " + courses.size;
    total.style.fontWeight = "bold";
    total.style.marginTop = "10px";
    output.appendChild(total);

    input.value = "";
}