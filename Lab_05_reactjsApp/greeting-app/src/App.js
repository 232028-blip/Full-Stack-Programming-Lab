import './App.css';

function Greeting(props) {
  let message = '';
  let emoji = '';

  if (props.timeOfDay === 'morning') {
    message = `Good Morning, ${props.name}! Have a productive day!`;
    emoji = '🌅';
  } else if (props.timeOfDay === 'afternoon') {
    message = `Good Afternoon, ${props.name}! Keep going!`;
    emoji = '🌞';
  } else if (props.timeOfDay === 'evening') {
    message = `Good Evening, ${props.name}! Time to relax!`;
    emoji = '🌆';
  } else {
    message = `Hello, ${props.name}!`;
    emoji = '👋';
  }

  return (
    <div style={{
      backgroundColor: props.bgColor || '#f9f9f9',
      padding: '20px',
      margin: '15px',
      borderRadius: '10px',
      fontSize: '18px',
      boxShadow: '1px 1px 6px rgba(0,0,0,0.15)'
    }}>
      <span style={{ fontSize: '30px' }}>{emoji}</span>
      <p>{message}</p>
      <small>Time of Day: <strong>{props.timeOfDay}</strong></small>
    </div>
  );
}

function App() {
  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>👋 Dynamic Greeting App</h1>
      <Greeting name="Ali" timeOfDay="morning" bgColor="#fff9c4" />
      <Greeting name="Sara" timeOfDay="afternoon" bgColor="#c8e6c9" />
      <Greeting name="Usman" timeOfDay="evening" bgColor="#bbdefb" />
    </div>
  );
}

export default App;