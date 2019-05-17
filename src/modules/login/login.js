import React from 'react';
import superagent from 'superagent';
import './login.css';

import useForm from '../../hooks/useForm';

const API_URL = 'https://canvas-server.herokuapp.com';
// const API_URL = 'http://localhost:3001';

function Login() {
  const _login = (inputs) => {
    superagent.post(`${API_URL}/login`)
      .send(inputs)
      .then(result => localStorage.setItem('token', result.body.token));
  };
  const { inputs, handleInputChange, handleSubmit } = useForm(_login);
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name
        <input type="text" name="name" onChange={handleInputChange} value={inputs.name} required />
      </label>
      <label htmlFor="password">
        Password
        <input type="text" name="password" onChange={handleInputChange} value={inputs.password} required />
      </label>
        
      <input type="submit" value="login" />
    </form>
  );
}


export default Login;
