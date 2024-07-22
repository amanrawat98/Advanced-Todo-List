// src/components/TodoItem.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  updateTodo,
  deleteTodo,
  updateValue,
  updateTodoStatus,
} from "../features/todoSlice";

const TodoItem = ({
  todo,
  setTitle,
  setDescription,
  setDueDate,
  setPriority,
  setUpdateItemIndex,
  updateItemIndex,
}) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const handleUpdate = (userItemId) => {
    const valueIndex = todos.findIndex((item) => {
      return item.id === userItemId;
    });

    setUpdateItemIndex(valueIndex);
    const { title, description, dueDate, priority, status } = todos[valueIndex];

    setTitle(title);
    setDescription(description);
    setDueDate(dueDate);
    setPriority(priority);

    dispatch(updateValue());
  };

  const { id, title, description, dueDate, priority, status } = todo;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });
  {
    /* DND KIT properties */
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleComplete = () => {
    console.log("clicked");
    dispatch(
      updateTodoStatus({
        id: todo.id,
        updatedData: { status: "completed" }, // handle todo status update
      })
    );
  };

  const handlePending = () => {
    dispatch(
      updateTodoStatus({
        id: todo.id,
        updatedData: { status: "pending" }, // handle todo status update
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id)); // handle todo delete
  };

  return (
    <div
      className={`todo-item`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="todo-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <small>Due: {dueDate}</small>

        <small>Priority: {priority}</small>
        <small>Status: {status}</small>
      </div>
      <div className="todo-actions">
        {status === "pending" ? (
          <button className="complete" onClick={handleComplete}>
            Mark as Complete
          </button>
        ) : (
          <button className="pending" onClick={handlePending}>
            Mark as Pending
          </button>
        )}
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
        <button className=" delete update" onClick={() => handleUpdate(id)}>
          {" "}
          Update
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
