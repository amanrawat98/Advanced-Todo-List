import React, { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import ThemeMode from "../components/ThemeMode";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const ThemeValue = useSelector((state) => state.todos.ThemeValue);
  const todos = useSelector((state) => state.todos.todos || []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState("low");
  const [updateItemIndex, setUpdateItemIndex] = useState(null);
  const [updateItem, setUpdateItem] = useState(false);

  const notify = (message) => toast(message);

  const propsContainer = {
    title,
    setTitle,
    description,
    setDescription,
    dueDate,
    setDueDate,
    priority,
    setPriority,
    updateItem,
    setUpdateItem,
    updateItemIndex,
    setUpdateItemIndex,
  };

  const minTime = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

  useEffect(() => {
    const checkDueDates = () => {
      if (todos.length > 0 || todos !== undefined) {
        // Run forEach only After Todos are not Empty
        todos.forEach((item) => {
          if (item.dueDate && item.status === "pending") {
            const dueDate = new Date(item.dueDate);
            const timeLeft = dueDate.getTime() - Date.now();
            if (dueDate.getTime() > Date.now() && timeLeft < minTime) {
              // To send DueDate Notification to user If any TodoOtem has Less then 6 Hrs left
              notify(`${item.title} is due soon!`);
            }
          }
        });
      }
    };

    document.documentElement.setAttribute("data-theme", ThemeValue); // For Dark Mode
    checkDueDates();
    setInterval(checkDueDates, 1800000); // Check every 30 minutes
  }, [ThemeValue, todos]); // Add todos to the dependency array

  return (
    <div className="App">
      <ToastContainer /> {/* Notification  */}
      <ThemeMode notify={notify} /> {/* Render Theme and Logout Component  */}
      <h2>Todo List</h2>
      <TodoForm {...propsContainer} />{" "}
      {/* Render Todo Form to Take Value From User  */}
      <TodoList {...propsContainer} /> {/* Render Todo Items  */}
    </div>
  );
};

export default Home;
