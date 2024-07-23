import { arrayMove } from "@dnd-kit/sortable";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  todoItem: [{}],
  StateUpdate: false,
  ThemeMode: false,
  ThemeValue: "light",
  userEmail: '',
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    updateTodo: (state, action) => {
      const { updateItemIndex, updatedValue } = action.payload;
      console.log(updateItemIndex);
      state.todos[updateItemIndex] = {
        ...state.todos[updateItemIndex],
        ...updatedValue,
      };
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    clearFilters: (state) => {
      state.filters = {
        status: "all",
        priority: "all",
        dueDate: "",
      };
    },

    updateValue: (state, action) => {
      state.StateUpdate = !state.StateUpdate;
    },

    updateTodoPosition: (state, action) => {
      const { originalPos, newPos } = action.payload;
      state.todos = arrayMove(state.todos, originalPos, newPos);
    },

    updateThemeMode: (state, action) => {
      state.ThemeMode = !state.ThemeMode;
      state.ThemeValue = state.ThemeMode ? "dark" : "light";   //Hanlde dark and light mode
    },

    updateThemeValue: (state, action) => {
      state.ThemeMode = action.payload;      // handle ThemeMode value 
    },

    updateTodoStatus: (state,action)=> {

      const {id, updatedData} = action.payload;
     const matchTodoItemIndex = state.todos.findIndex((item)=> item.id === id);
     state.todos[matchTodoItemIndex] = {
      ...state.todos[matchTodoItemIndex], ...updatedData         
     }
    },

    handleUserEmail: (state, action)=> {
    state.userEmail = action.payload;
    },

   
  },
});

export const {
  addTodo,
  deleteTodo,
  updateTodo,
  setFilters,
  clearFilters,
  handleUpdate,
  updateTodoPosition,
  updateThemeMode,
  updateThemeValue,
  updateValue,
  updateTodoStatus,
  handleUserEmail,
} = todoSlice.actions;

export default todoSlice.reducer;
