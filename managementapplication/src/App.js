// App.js
import React from "react";
import { TaskProvider } from "./context/TaskContext";
import TaskList from "./components/taskList";
import TaskForm from "./components/taskForm";

const App = () => {
  return (
    <TaskProvider>
      <div className="App">
        <h1 className="text-4xl font-semibold text-center mt-8">
          Task Management
        </h1>
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
};

export default App;
