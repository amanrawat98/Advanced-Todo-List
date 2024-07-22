import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todoSlice';
import userReducer from '../features/userSlice';

// Loading the state from localStorage
const loadState = () => {
  try {
    const stringState = localStorage.getItem('currentState');
    if (stringState === null) return undefined;  // Return undefined if no state is found , Will return null when run first time
    return JSON.parse(stringState);
  } catch (err) {
    console.error('Could not load state', err);
    return undefined;
  }
};

// Store the current state to localStorage
const saveCurrentState = (currentState) => {
  try {
    const stringState = JSON.stringify(currentState);  //first convert current object state to string 
    localStorage.setItem('currentState', stringState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

export const store = configureStore({
  reducer: {
    todos: todoReducer,  // TodoSlice
    user: userReducer,  // userSlice
  },
  preloadedState: loadState(),  // Use preloadedState to load initial state
});


store.subscribe(() => {   //subscribe to store so whenever anything changes in store this function is called
  saveCurrentState(store.getState());   //getState gives current store state
});  
