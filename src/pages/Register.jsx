import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddNewUser } from "../features/userSlice";


const Register = () => {
  const navigate = useNavigate();
 const dispatch = useDispatch();
  const [input, setInput] = useState(
    {
      email: "",
      password: "",
    },
  );


  const handleSubmit = (e)=> {
    e.preventDefault();
    dispatch(AddNewUser(input))
    navigate('/login');

  }

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>

        <div class="mb-3">
          <label htmlFor="email" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={input.email}
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
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
            value={input.password}
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>

        <button type="submit" class="btn btn-primary extratyle" onClick={()=> navigate('/login') } >
          Login
        </button>
      </form>
    </>
  );
};

export default Register;
