import React, { useState } from 'react';
import './App.css';
import ModalApp from './Modal';
function App() {
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: '' };

      switch (name) {
        case 'username':
          if (!value) {
            stateObj[name] = 'Please enter Username.';
          }
          break;
        case 'email':
            if (!value) {
              stateObj[name] = 'Please enter Email.';
            }
            break;
        case 'password':
          if (!value) {
            stateObj[name] = 'Please enter Password.';
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj['confirmPassword'] =
              'Password and Confirm Password does not match.';
          } else {
            stateObj['confirmPassword'] = input.confirmPassword
              ? ''
              : error.confirmPassword;
          }
          break;

        case 'confirmPassword':
          if (!value) {
            stateObj[name] = 'Please enter Confirm Password.';
          } else if (input.password && value !== input.password) {
            stateObj[name] = 'Password and Confirm Password does not match.';
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };
 

  return (
    <div className="app">
      <form>
        <input type="text" name="username"
          placeholder="Enter Username"
          value={input.username}
          onChange={onInputChange}
          onBlur={validateInput} required/>
        {error.username && <span className="err">{error.username}</span>}
        <input 
        type="email"
        name="email" 
        placeholder="Email"
        value={input.email}
        onChange={onInputChange}
        onBlur={validateInput} required/>
        {error.email && <span className="err">{error.email}</span>}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={input.password}
          onChange={onInputChange}
          onBlur={validateInput} required  minLength={6}/>
        {error.password && <span className="err">{error.password}</span>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Enter Confirm Password"
          value={input.confirmPassword}
          onChange={onInputChange}
          onBlur={validateInput} required minLength={6}/>
        {error.confirmPassword && (
          <span className="err">{error.confirmPassword}</span>
        )}
        
        
          <ModalApp></ModalApp>
      </form>
      

</div>

  );
}

export default App ;