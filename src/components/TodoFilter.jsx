import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../features/todoSlice';



const TodoFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.todos.filters);

  const handleStatusChange = (e) => {
    dispatch(setFilters({ status: e.target.value }));
  };

  const handlePriorityChange = (e) => {
    dispatch(setFilters({ priority: e.target.value }));
  };

  const handleDueDateChange = (e) => {
    dispatch(setFilters({ dueDate: e.target.value }));
  };

  return (
    <div className="todo-filter">
      <label>Status:</label>
      <select value={filters.status} onChange={handleStatusChange}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <label>Priority:</label>
      <select value={filters.priority} onChange={handlePriorityChange}>
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <label>Due Date:</label>
      <input
        type="date"
        value={filters.dueDate}
        onChange={handleDueDateChange}
      />
    </div>
  );
};

export default TodoFilter;
