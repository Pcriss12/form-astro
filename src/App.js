import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Row } from 'react-bootstrap';

import './App.css';



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
          } else if(input.password.length  <= 6 ){
            stateObj[name] = 'Please enter 6 or more characters.';
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
            stateObj[name] = 'Confirm Password and Password does not match.';
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    

    setValidated(true);
  };
  
  return (
    <div className="app">
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="withCenter">
        <Row>
        <Form.Group as={Col} md="12" controlId="validationCustom01" >
          <Form.Label>User name</Form.Label>
          <Form.Control
            required
            type="text"
            name="username"
            placeholder="User name"
            value={input.username}
            onChange={onInputChange}
            onBlur={validateInput}
          />
          <Form.Control.Feedback type="invalid">{error.username && <span className="err">{error.username}</span>}</Form.Control.Feedback>
          
        </Form.Group>

        
        <Form.Group as={Col} md="12" controlId="validationCustom02" className="margin-top-20">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            placeholder="Email"
            value={input.email}
            onChange={onInputChange}
            onBlur={validateInput}
          />
          <Form.Control.Feedback type="invalid">{error.email && <span className="err">{error.email}</span>}</Form.Control.Feedback>
          
        </Form.Group>

        <Form.Group as={Col} md="12" controlId="validationCustom03" className="margin-top-20">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type={passwordShown ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            value={input.password}
            onChange={onInputChange}
            onBlur={validateInput}
            minLength={6}
          />
          <Form.Control.Feedback type="invalid">{error.password && <span className="err">{error.password}</span>}</Form.Control.Feedback>
          
        </Form.Group>

        <Form.Group className="mb-3 margin-top-20">
          <Form.Check
              onClick={togglePassword}
                label="Show Password"
              />
         </Form.Group>

        
        <Form.Group as={Col} md="12" controlId="validationCustom04" >
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={input.confirmPassword}
            onChange={onInputChange}
            onBlur={validateInput}
            minLength={6}
          />
          <Form.Control.Feedback type="invalid">{error.confirmPassword && (<span className="err">{error.confirmPassword}</span>)}</Form.Control.Feedback>
          
        </Form.Group>
        <Form.Group as={Col} md="12" className="margin-top-40">
          <Button type="submit"  value="Submit" className="with100">
            Submit
          </Button>
        </Form.Group>
        
        </Row>
        
      </Form>
      

</div>

  );
}

export default App;