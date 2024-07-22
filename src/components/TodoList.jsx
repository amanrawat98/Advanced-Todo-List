// src/components/TodoList.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";


import { updateTodoPosition } from "../features/todoSlice";

const TodoList = (props) => {
  

  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [filteredTodos, setFilteredTodos] = useState([]);

  const [localFilters, setLocalFilters] = useState({
    status: "all",
    priority: "all",
    dueDate: "",
  });

  useEffect(() => {
    const filtered = todos?.filter((todo) => {
      const { status, priority, dueDate } = localFilters;

      if (status !== "all" && todo.status !== status) {
        return false;
      }
      if (priority !== "all" && todo.priority !== priority) {
        return false;
      }
      if (dueDate && todo.dueDate !== dueDate) {
        return false;
      }
      return true;
    });

    setFilteredTodos(filtered);
  }, [localFilters, todos]);

  const handleClearFilters = () => {
    setLocalFilters({
      status: "all",
      priority: "all",
      dueDate: "",
    });
  };

  const getTodoesPosition = (id) => {
    return todos.findIndex((i) => i.id === id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;            // active is the element that is being dragged
                                                  // mover is the element where the item is being dragged
    const originalPos = getTodoesPosition(active.id);
    const newPos = getTodoesPosition(over.id);
    dispatch(updateTodoPosition({ originalPos, newPos }));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );


  return (
    <div>
      <div className="filter-controls">
        <select
          value={localFilters.status}
          onChange={(e) =>
            setLocalFilters({ ...localFilters, status: e.target.value })
          }
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={localFilters.priority}
          onChange={(e) =>
            setLocalFilters({ ...localFilters, priority: e.target.value })
          }
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          value={localFilters.dueDate}
          onChange={(e) =>
            setLocalFilters({ ...localFilters, dueDate: e.target.value })
          }
        />

        <button onClick={handleClearFilters}  className="filterBtn">Clear Filters</button>
      </div>

      <div className="todo-list">
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext
            items={filteredTodos?.map((todo) => todo.id)}
            strategy={verticalListSortingStrategy}
          >
            {filteredTodos?.length > 0 ? (   //check if filteredTodos array is empty or not
              filteredTodos?.map((todo) => (
                <TodoItem key={todo.id} todo={todo} {...props} />   // todoitems
              ))
            ) : (
              <p>No todos found!!</p>
            )}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default TodoList;
