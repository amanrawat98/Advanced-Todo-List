import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MatchUserDetails } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const dispatch =  useDispatch();
const navigate = useNavigate();

const notify = () => toast.error("Email or Password Incorrect!");


  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(MatchUserDetails({email, password}))
      navigate('/home');
    } catch(error) {
      notify();
    }
    
  };
  return (
    <>

<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>


      <h2>Login </h2>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label htmlFor="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label htmlFor="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>

        <button type="submit" class="btn btn-primary extratyle " onClick={()=> navigate('/register') } >
          Register
        </button>
      </form>
    </>
  );
};

export default Login;
