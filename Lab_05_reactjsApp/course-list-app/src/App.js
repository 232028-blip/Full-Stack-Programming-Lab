import './App.css';

const courses = [
  { courseName: "Full Stack Programming", instructor: "Mr. Sharif Hussain", duration: "16 Weeks", type: "Offline" },
  { courseName: "Machine Learning", instructor: "Dr. Ayesha", duration: "12 Weeks", type: "Online" },
  { courseName: "Web Development", instructor: "Mr. Bilal", duration: "10 Weeks", type: "Online" },
  { courseName: "Database Systems", instructor: "Dr. Kamran", duration: "14 Weeks", type: "Offline" },
  { courseName: "Data Structures", instructor: "Mr. Hamza", duration: "8 Weeks", type: "Offline" },
];

function CourseItem(props) {
  return (
    <div style={{
      backgroundColor: props.type === 'Online' ? '#e8f5e9' : '#e3f2fd',
      padding: '15px',
      margin: '10px',
      borderRadius: '8px',
      borderLeft: '5px solid #1565c0'
    }}>
      <h3>📚 {props.courseName}</h3>
      <p><strong>Instructor:</strong> {props.instructor}</p>
      <p><strong>Duration:</strong> {props.duration}</p>
      <p><strong>Type:</strong> <span style={{ color: props.type === 'Online' ? 'green' : 'blue' }}>{props.type}</span></p>
    </div>
  );
}

function App() {
  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>📋 Course List</h1>
      {courses.map((course, index) => (
        <CourseItem
          key={index}
          courseName={course.courseName}
          instructor={course.instructor}
          duration={course.duration}
          type={course.type}
        />
      ))}
    </div>
  );
}

export default App;