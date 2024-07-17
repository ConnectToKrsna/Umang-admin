import { useState } from 'react';

const PasswordInput = ({ onPasswordSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onPasswordSubmit(password);
  };

  return (
    <form onSubmit={handleSubmit}>
    <h1>Hare Krishna Please Enter The Password:</h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PasswordInput;