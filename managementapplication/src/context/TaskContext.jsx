import React, { createContext, useReducer, useContext } from "react";

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case "SET_PRIORITY_FILTER":
      return { ...state, priorityFilter: action.payload };
    case "SET_DUE_DATE_FILTER":
      return { ...state, dueDateFilter: action.payload };
    case "SET_SORT_ORDER":
      return {
        ...state,
        sortField: action.payload.field,
        sortOrder: action.payload.order,
      };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    priorityFilter: "",
    dueDateFilter: "",
    sortField: "dueDate",
    sortOrder: "asc",
  });

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
