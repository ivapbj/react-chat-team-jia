import React from 'react';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
export default function RegisterForm() {
  //instaniate variables to declare password etc, and the functions to allow interaction with inputs
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    //make  a handle submit function call upon in  order to allow our button to have all the logic
    e.preventDefault(); //every form has prevent default functionality essentailly disabling functionality of  the default button and allowing our code to hanle the submit

    try {
      const response = await fetch(`http://localhost:8080/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //allow our inputs to be passed through as string because we need string instead of objects
          firstName,
          lastName,
          email,
          password,
        }),
      });
      if (response.ok) {
        //conditional handling all the positive outcomes of the server response
        const data = await response.json(); //parsing our data and returning it as a string
        setFirstName('');
        setLastName('');
        setPassword('');
        setEmail('');
        console.log('registration successful');
        console.log(data);

        navigate('/login'); //after a successful register we navigate user to login
      }
    } catch (error) {
      console.error('Error during registration:', error); //error handling for this entire registration process
    }
  };

  return (
    <div className='FormWrapper'>
      <h1 className='h1'>Register</h1>
      <form className='container' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='First Name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type='text'
          placeholder='Last Name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input id='registerBtn' type='submit' value='Register' />
      </form>
    </div>
  );
}

