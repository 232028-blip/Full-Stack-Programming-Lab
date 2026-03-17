import { useState } from 'react';
import './UserForm.css';

function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = () => {
    if (name.trim() === '' || email.trim() === '') return;
    setSubmittedData({ name, email });
    setName('');
    setEmail('');
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">User Form</h1>
        <p className="subtitle">Fill in your details below</p>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>

        {submittedData && (
          <div className="result-box">
            <h3>Submitted Details</h3>
            <p><span>Name:</span> {submittedData.name}</p>
            <p><span>Email:</span> {submittedData.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserForm;