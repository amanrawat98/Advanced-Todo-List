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
    navigate('/');

  }

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={input.email}
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={input.password}
            onChange={(e) =>
              setInput({ ...input, [e.target.name]: e.target.value })
            }
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>

        <button type="submit" className="btn btn-primary extratyle" onClick={()=> navigate('/') } >
          Login
        </button>
      </form>
    </>
  );
};

export default Register;
