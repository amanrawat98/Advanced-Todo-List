import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, updateValue } from "../features/todoSlice";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { decodeJWT } from "../utils/jwtUtils";

const TodoForm = ({
  title,
  setTitle,
  description,
  setDescription,
  dueDate,
  setDueDate,
  priority,
  setPriority,
  updateItemIndex,
  setUpdateItemIndex,
}) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos || []);
  const StateUpdate = useSelector((state) => state.todos.StateUpdate);
  const [cols, setcols] = useState(40);
  const [userEmail, setUserEmail] = useState("");

  const handleDateTime = (value) => {
    if (value && value._isValid) {
      // Check if value is a moment object

      setDueDate(value.toDate()); // Convert moment object to Date object
    } else {
      setDueDate(new Date()); // If no Date is Selected Then use Current date
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("token"); //get token from local storage
    if (!userToken) return;
    try {
      let value = decodeJWT(userToken);
      const { email } = value;
      console.log(value);
      setUserEmail(email);
    } catch (error) {
      console.log(error);
    }

    const windowResizing = () => {
      if (window.innerWidth < 768) {
        setcols(25);
      } else if (window.innerWidth < 480) {
        setcols(18);
      } else {
        setcols(40);
      }
    };

    window.addEventListener("resize", windowResizing);
    windowResizing();

    return () => window.removeEventListener("resize", windowResizing); //CleanUp Function for Resize Event
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDate = dueDate
      ? new Date(dueDate).toString()
      : new Date().toString();

    if (StateUpdate) {
      const updatedValue = {
        title, // To Handle Todo Update
        description,
        dueDate: formattedDate,
        priority,
      };

      dispatch(
        updateTodo({
          updateItemIndex,
          updatedValue,
        })
      );

      dispatch(updateValue());
      setUpdateItemIndex(null); // Reset update index
    } else {
      const newTodo = {
        id: new Date().toISOString(),
        title,
        description,
        dueDate: formattedDate,
        priority,
        status: "pending",
        userEmail
      };
      dispatch(addTodo(newTodo));
    }

    // Clear form fields
    setTitle("");
    setDescription("");
    setDueDate(null);
    setPriority("low");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group formArea">
        <label>Description</label>
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
          cols={cols}
        />
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <Datetime
          value={dueDate ? new Date(dueDate) : null} //  initial value
          onChange={handleDateTime}
          dateFormat="MM/DD/YYYY"
          timeFormat="HH:mm:ss"
        />
      </div>
      <div className="form-group">
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button className="addTodoButton" type="submit">
        {StateUpdate ? "Edit Todo" : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
