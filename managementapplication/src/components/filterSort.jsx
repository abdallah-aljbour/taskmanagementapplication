import React from "react";
import { useTaskContext } from "../context/TaskContext";

const TaskSort = () => {
  const { dispatch } = useTaskContext();

  const handleSortChange = (e) => {
    const [field, order] = e.target.value.split("-");
    dispatch({
      type: "SET_SORT_ORDER",
      payload: { field, order },
    });
  };

  return (
    <div className="sort">
      <label htmlFor="sortTasks" className="block text-lg font-medium mb-2">
        Sort Tasks
      </label>
      <select
        id="sortTasks"
        onChange={handleSortChange}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="dueDate-asc">Due Date (Earliest First)</option>
        <option value="dueDate-desc">Due Date (Latest First)</option>
        <option value="priority-asc">Priority (Low to High)</option>
        <option value="priority-desc">Priority (High to Low)</option>
      </select>
    </div>
  );
};

export default TaskSort;
