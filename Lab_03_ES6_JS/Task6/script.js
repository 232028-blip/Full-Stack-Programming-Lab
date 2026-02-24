// Class for Student
class Student {
    constructor(name, age, id) {
        this.name = name;
        this.age = age;
        this.id = id;
    }
}

// Map to store students
const studentsMap = new Map();

// Set to store courses
const coursesSet = new Set();

// Button references
const addStudentBtn = document.getElementById('addStudentBtn');
const addCourseBtn = document.getElementById('addCourseBtn');
const saveDataBtn = document.getElementById('saveDataBtn');

// Event Listeners
addStudentBtn.addEventListener('click', addStudent);
addCourseBtn.addEventListener('click', addCourse);
saveDataBtn.addEventListener('click', saveData);

// Add Student
function addStudent() {
    const name = document.getElementById('studentName').value.trim();
    const age = document.getElementById('studentAge').value;
    const id = document.getElementById('studentId').value.trim();

    if(!name || !age || !id){
        alert("Please fill all fields!");
        return;
    }

    const student = new Student(name, age, id);
    studentsMap.set(id, student);
    displayStudents();

    document.getElementById('studentName').value = '';
    document.getElementById('studentAge').value = '';
    document.getElementById('studentId').value = '';
}

// Display Students
function displayStudents() {
    const studentsList = document.getElementById('studentsList');
    studentsList.innerHTML = '';
    studentsMap.forEach(student => {
        const div = document.createElement('div');
        div.className = 'student-card';
        div.textContent = `${student.name} (Age: ${student.age}, ID: ${student.id})`;
        studentsList.appendChild(div);
    });
}

// Add Course
function addCourse() {
    const course = document.getElementById('courseName').value.trim();
    if(course) {
        coursesSet.add(course);
        displayCourses();
        document.getElementById('courseName').value = '';
    }
}

// Display Courses
function displayCourses() {
    const coursesList = document.getElementById('coursesList');
    coursesList.innerHTML = '';
    coursesSet.forEach(course => {
        const li = document.createElement('li');
        li.textContent = course;
        coursesList.appendChild(li);
    });
}

// Simulate Saving Data using Promise
function saveData() {
    document.getElementById('saveStatus').textContent = 'Saving...';
    simulateSave(studentsMap, coursesSet)
        .then(message => {
            document.getElementById('saveStatus').textContent = message;
        })
        .catch(error => {
            document.getElementById('saveStatus').textContent = error;
        });
}

function simulateSave(students, courses) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(students.size > 0 && courses.size > 0) {
                resolve('Data saved successfully!');
            } else {
                reject('Cannot save. Add students and courses first.');
            }
        }, 1500);
    });
}