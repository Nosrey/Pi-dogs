import React from 'react';
import { useState } from 'react';

export default function CreaRaza() {
    let errors = {};
    if (!input.username) {
      errors.username = 'Username is required';
    } else if (!/\S+@\S+\.\S+/.test(input.username)) {
      errors.username = 'Username is invalid';
    }
    if (!input.password) {
      errors.password = 'Password is required';
    } else if (!/(?=.*[0-9])/.test(input.password)) {
      errors.password = 'Password is invalid';
    }
    return errors;
  };
  
  export default function Form() {
    const [input, setInput] = useState({
      username: '',
      password: ''
    })
    const [errors, setErrors] = useState({});
  
  
    const handleInputChange = (e) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      })
      setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
      }));
    }
  
    return (
      <form>
        <div>
          <label>Name:</label>
          <input className={errors.username ? 'danger': null} type="text" name="username" onChange={handleInputChange} value={input.username} placeholder="ingresa tu correo"></input>
          <p>{errors.username}</p>
        </div>
        <div>
          <label>Password:</label>
          <input className={errors.password ? 'danger': null} type="password" name="password" onChange={handleInputChange} value={input.password} placeholder="contraseña"></input>
          <p>{errors.password}</p>
        </div>
        <input type="submit" value="Listo" />
      </form>
    )
  }
  