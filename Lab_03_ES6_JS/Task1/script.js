// ── ES6 Student Class ────────────────────────────────────────────────────────

class Student {
  // The constructor is called automatically when `new Student(...)` is used.
  // It initialises the four instance properties for every student object.
  constructor(id, name, semester, courses) {
    this.id       = id;          // unique numeric identifier
    this.name     = name;        // student's full name  (string)
    this.semester = semester;    // current semester     (number 1-8)
    this.courses  = courses;     // enrolled subjects    (array of strings)
  }

  // A helper method that returns a summary string via a template literal.
  getSummary() {
    return `${this.name} | Sem ${this.semester} | Courses: ${this.courses.join(', ')}`;
  }
}

// ── Seed Data (const = won't be reassigned; let = will change) ───────────────

// `const` is used for the initial array reference; elements can still be added.
const students = [
  new Student(1, 'Ayesha Tariq',   3, ['Data Structures', 'OOP', 'Calculus']),
  new Student(2, 'Hassan Raza',    5, ['AI', 'Database Systems', 'Networks']),
  new Student(3, 'Zara Malik',     7, ['Software Engineering', 'Cloud Computing', 'HCI']),
  new Student(4, 'Bilal Chaudhry', 2, ['Programming Fundamentals', 'Physics', 'English']),
];

// Auto-increment ID counter for newly added students.
let nextId = students.length + 1;   // `let` because it will keep incrementing

// ── DOM References ───────────────────────────────────────────────────────────

const grid        = document.getElementById('studentGrid');
const noResults   = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const modal       = document.getElementById('modal');
const addBtn      = document.getElementById('addBtn');
const closeModal  = document.getElementById('closeModal');
const saveBtn     = document.getElementById('saveBtn');
const fName       = document.getElementById('fName');
const fSem        = document.getElementById('fSem');
const fCourses    = document.getElementById('fCourses');

// ── Rendering ────────────────────────────────────────────────────────────────

/**
 * buildCard(student)
 * Converts a Student object into an HTML string using template literals.
 * Each course becomes its own "pill" span.
 */
function buildCard(student) {
  // Map every course name to a small pill element.
  const coursePills = student.courses
    .map(c => `<span class="course-pill">${c}</span>`)
    .join('');

  // Template literal produces the full card markup.
  return `
    <div class="card" data-id="${student.id}">
      <button class="delete-btn" onclick="deleteStudent(${student.id})">✕</button>
      <div class="card-id">ID · ${student.id}</div>
      <div class="card-name">${student.name}</div>
      <span class="semester-badge">Semester ${student.semester}</span>
      <div class="courses-label">Enrolled Courses</div>
      <div class="courses-list">${coursePills}</div>
    </div>
  `;
}

/**
 * render(list)
 * Accepts an array of Student objects and updates the grid via innerHTML.
 * Stagger animation delays so cards appear one after another.
 */
function render(list) {
  if (list.length === 0) {
    grid.innerHTML = '';
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');

  // Build all card strings, then join and assign once (single DOM write).
  grid.innerHTML = list.map(buildCard).join('');

  // Apply staggered fade-up animation delays to each card.
  const cards = grid.querySelectorAll('.card');
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 60}ms`;
  });
}

// Initial render of all seed students.
render(students);

// ── Search ───────────────────────────────────────────────────────────────────

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();   // `const` – not reassigned

  // `let` filter result – array changes based on query
  let filtered = students.filter(s =>
    s.name.toLowerCase().includes(query) ||
    String(s.semester).includes(query)
  );

  render(filtered);
});

// ── Add Student ──────────────────────────────────────────────────────────────

addBtn.addEventListener('click', () => {
  clearForm();
  modal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => modal.classList.add('hidden'));

// Close modal when clicking the backdrop.
modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.add('hidden');
});

saveBtn.addEventListener('click', () => {
  const name    = fName.value.trim();
  const sem     = parseInt(fSem.value);
  const courses = fCourses.value
    .split(',')
    .map(c => c.trim())
    .filter(Boolean);   // remove any empty strings

  // Basic validation
  if (!name || isNaN(sem) || sem < 1 || sem > 8 || courses.length === 0) {
    alert('Please fill all fields correctly.\n• Name: required\n• Semester: 1–8\n• Courses: at least one');
    return;
  }

  // Create a new Student object and push into the shared array.
  const newStudent = new Student(nextId++, name, sem, courses);
  students.push(newStudent);

  modal.classList.add('hidden');
  clearForm();

  // Re-render respecting any active search query.
  const q = searchInput.value.trim().toLowerCase();
  render(q ? students.filter(s => s.name.toLowerCase().includes(q) || String(s.semester).includes(q)) : students);
});

// ── Delete Student ───────────────────────────────────────────────────────────

/**
 * deleteStudent(id)
 * Removes the student with the matching id from the array, then re-renders.
 * Exposed on window so inline onclick attributes can call it.
 */
function deleteStudent(id) {
  // `findIndex` locates the position; splice removes it in-place.
  const idx = students.findIndex(s => s.id === id);
  if (idx !== -1) students.splice(idx, 1);

  const q = searchInput.value.trim().toLowerCase();
  render(q ? students.filter(s => s.name.toLowerCase().includes(q) || String(s.semester).includes(q)) : students);
}

// Make deleteStudent accessible from inline HTML onclick.
window.deleteStudent = deleteStudent;

// ── Utilities ────────────────────────────────────────────────────────────────

function clearForm() {
  fName.value = '';
  fSem.value  = '';
  fCourses.value = '';
}