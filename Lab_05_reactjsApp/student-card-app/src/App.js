import './App.css';

function StudentCard(props) {
  return (
    <div style={{
      backgroundColor: props.color || '#f0f0f0',
      padding: '20px',
      margin: '15px',
      borderRadius: '10px',
      width: '300px',
      boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
    }}>
      <h2>👤 {props.name}</h2>
      <p><strong>Roll No:</strong> {props.rollNo}</p>
      <p><strong>Department:</strong> {props.department}</p>
      <p><strong>University:</strong> {props.university}</p>
    </div>
  );
}

function App() {
  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>🎓 Student Information Cards</h1>
      <StudentCard
        name="Ali Ahmed"
        rollNo="BSSE-2201"
        department="Software Engineering"
        university="Air University"
        color="#d0e8ff"
      />
      <StudentCard
        name="Sara Khan"
        rollNo="BSSE-2202"
        department="Computer Science"
        university="Air University"
        color="#d0ffd8"
      />
      <StudentCard
        name="Usman Tariq"
        rollNo="BSSE-2203"
        department="AI & ML"
        university="Air University"
        color="#fff0d0"
      />
    </div>
  );
}

export default App;