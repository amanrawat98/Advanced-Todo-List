import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateThemeMode } from "../features/todoSlice";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { deleteToken } from "../utils/jwtUtils";
import { Navigate, useNavigate } from "react-router-dom";

const ThemeModeChange = () => {
  const ThemeMode = useSelector((state) => state.todos.ThemeMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    deleteToken("token");
    navigate("/login");
  };

  return (
    <>
      {/* theme container */}
      <div className="theme-cont">
        <div>
          <button type="button" className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>

        {ThemeMode ? (
          <button
            type="button"
            className="btn btn-light"
            onClick={() => dispatch(updateThemeMode())}
          >
            <MdOutlineLightMode size={25} className="themebtn-icon" />
            Light
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => dispatch(updateThemeMode())}
          >
            <MdOutlineDarkMode size={25} className="themebtn-icon" />
            Dark
          </button>
        )}
      </div>
    </>
  );
};

export default ThemeModeChange;
