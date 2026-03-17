import { useState } from 'react';
import './Actions.css';

function Actions() {
  const [message, setMessage] = useState('');
  const [bgColor, setBgColor] = useState('#0f0f0f');
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const colors = ['#1a3a2a', '#1a1a3a', '#3a1a2a', '#2a2a1a', '#1a2a3a'];

  const handleShowMessage = () => {
    setMessage('Hello! You clicked the Show Message button.');
  };

  const handleChangeBackground = () => {
    const random = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(random);
  };

  const handleShowAlert = () => {
    alert('This is an alert from the Actions component!');
  };

  const buttons = [
    { id: 'msg',   label: 'Show Message',        handler: handleShowMessage },
    { id: 'bg',    label: 'Change Background',    handler: handleChangeBackground },
    { id: 'alert', label: 'Show Alert',           handler: handleShowAlert },
  ];

  return (
    <div className="page" style={{ backgroundColor: bgColor }}>
      <div className="card">
        <h1 className="title">Event Handling</h1>
        <p className="subtitle">Click the buttons to trigger different events</p>

        <div className="btn-group">
          {buttons.map((btn) => (
            <button
              key={btn.id}
              className="action-btn"
              onClick={btn.handler}
              onMouseOver={() => setHoveredBtn(btn.id)}
              onMouseOut={() => setHoveredBtn(null)}
              style={{
                color: hoveredBtn === btn.id ? '#f4c542' : '#ffffff',
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {message && (
          <div className="message-box">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Actions;