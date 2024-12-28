// src/context/TaskReducer.js

// Action types
export const ADD_TASK = "ADD_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const DELETE_TASK = "DELETE_TASK";

// The reducer function
const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "SET_EDIT_TASK":
      return { ...state, editTask: action.payload };

    case "SORT_TASKS":
      let sortedTasks;
      if (action.payload === "dueDate") {
        sortedTasks = [...state.tasks].sort(
          (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
        );
      } else if (action.payload === "priority") {
        const priorityOrder = { Low: 1, Medium: 2, High: 3 };
        sortedTasks = [...state.tasks].sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );
      }
      return { ...state, tasks: sortedTasks };

    default:
      return state;
  }
};

export default taskReducer;
