
import React, { useState, useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import logo from '../assets/images/CFGMotors.png';

function Login() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const nav = useNavigate();

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const email = process.env.REACT_APP_CFG_ADMIN_EMAIL;
    const pass = process.env.REACT_APP_CFG_ADMIN_PASS

    let hardcodedCred = {
      email: email,
      password: pass
    }

    if ((emailInput == hardcodedCred.email) && (passwordInput == hardcodedCred.password)) {
      const token = '123456abcdef';
      window.sessionStorage.setItem('auth-token', token);

      nav("/cars");
    } else {
      alert('wrong email or password combination');
    }
  }
  return (
    <div className=" bg-neutral-200 h-screen w-screen">
      <div className=' w-1/2 h-1/3 flex mx-auto'>
        <img
          src={logo}
          alt="logo"
          className=' mx-auto' />
      </div>
      <div className=' p-4 bg-white rounded-xl mx-96'>
        <h2 className=' text-center text-4xl font-sans font-bold mb-3'>Log in</h2>
        <form autoComplete="off" onSubmit={handleLoginSubmit}>
          <div className=" text-center text-lg font-sans p-2 font-semibold">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              class="p-2"
              value={emailInput}
              onChange={handleEmailChange}
              placeholder="Enter email"
            />
          </div>
          <div className=" text-center text-lg font-sans p-2 font-semibold">
            <input
              type="password"
              autoComplete="new-password"
              className="form-control"
              id="exampleInputPassword1"
              value={passwordInput}
              onChange={handlePasswordChange}
              placeholder="Password"
              class=" p-2"
            />
          </div>
          <div className=" flex">
            <button type="submit" className=" mx-auto text-center text-xl bg-sky-700 text-white pt-3 pb-3 pl-5 pr-5 rounded-lg" onSubmit={handleLoginSubmit}>
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;