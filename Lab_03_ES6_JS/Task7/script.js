// 1. Create 3 student objects
const student1 = {
    name: "Ali",
    age: 20,
    semester: 4,
    courses: ["Math", "Physics", "Computer Science"]
};

const student2 = {
    name: "Sara",
    age: 19,
    semester: 3,
    courses: ["English", "Biology", "Chemistry"]
};

const student3 = {
    name: "Hassan",
    age: 21,
    semester: 5,
    courses: ["History", "Math", "Economics"]
};

// Store all students in an array
const studentsArray = [student1, student2, student3];

// 2. Convert objects to JSON
const studentsJSON = JSON.stringify(studentsArray);
console.log("JSON String:", studentsJSON);

// 3. Convert JSON back to objects
const studentsObj = JSON.parse(studentsJSON);
console.log("Parsed Objects:", studentsObj);

// 4 & 6. Destructuring and loop through students
function displayStudents() {
    const container = document.getElementById('studentContainer');
    container.innerHTML = '';

    studentsObj.forEach(student => {
        // Destructuring
        const {name, age, semester, courses} = student;

        const div = document.createElement('div');
        div.className = "student-card";
        div.innerHTML = `
            <h3>${name}</h3>
            <p>Age: ${age}</p>
            <p>Semester: ${semester}</p>
            <p>Courses: ${courses.join(", ")}</p>
        `;
        container.appendChild(div);
    });
}

// Button click to show data
document.getElementById('showDataBtn').addEventListener('click', displayStudents);