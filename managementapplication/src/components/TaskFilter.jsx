import React from "react";
import { useTaskContext } from "../context/TaskContext";

const TaskFilter = () => {
  const { dispatch } = useTaskContext();

  const handlePriorityChange = (e) => {
    dispatch({
      type: "SET_PRIORITY_FILTER",
      payload: e.target.value,
    });
  };

  const handleDueDateFilterChange = (e) => {
    dispatch({
      type: "SET_DUE_DATE_FILTER",
      payload: e.target.value,
    });
  };

  return (
    <div className="filters flex flex-wrap gap-4">
      {/* Filter by Priority */}
      <div className="flex-1 min-w-[200px]">
        <label
          htmlFor="priorityFilter"
          className="block text-lg font-medium mb-2"
        >
          Filter by Priority
        </label>
        <select
          id="priorityFilter"
          onChange={handlePriorityChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Filter by Due Date */}
      <div className="flex-1 min-w-[200px]">
        <label
          htmlFor="dueDateFilter"
          className="block text-lg font-medium mb-2"
        >
          Filter by Due Date
        </label>
        <select
          id="dueDateFilter"
          onChange={handleDueDateFilterChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Dates</option>
          <option value="overdue">Overdue</option>
          <option value="next7days">Next 7 Days</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;
