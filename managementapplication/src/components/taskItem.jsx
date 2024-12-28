import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { toast } from "react-toastify";
import {
  validateTaskName,
  validateDueDate,
  validatePriority,
  validateDescription,
} from "../utils/validation";

const TaskItem = ({ task }) => {
  const { dispatch } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [errors, setErrors] = useState({});

  const handleDelete = () => {
    dispatch({ type: "DELETE_TASK", payload: task.id });
    toast.success("Task deleted successfully!");
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "taskName":
        error = validateTaskName(value);
        break;
      case "dueDate":
        error = validateDueDate(value);
        break;
      case "priority":
        error = validatePriority(value);
        break;
      case "description":
        error = validateDescription(value);
        break;
      default:
        break;
    }
    return error;
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });

    // Live validation
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const isFormValid = () => {
    return (
      editedTask.taskName &&
      editedTask.dueDate &&
      editedTask.priority &&
      Object.values(errors).every((error) => !error)
    );
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {
      taskName: validateTaskName(editedTask.taskName),
      dueDate: validateDueDate(editedTask.dueDate),
      priority: validatePriority(editedTask.priority),
      description: validateDescription(editedTask.description),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      dispatch({ type: "EDIT_TASK", payload: editedTask });
      setIsEditing(false);
      toast.success("Task updated successfully!");
    }
  };

  return (
    <li className="task-item p-4 bg-white shadow-lg rounded-md">
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label htmlFor="taskName" className="block text-lg font-medium">
              Task Name
            </label>
            <input
              type="text"
              name="taskName"
              value={editedTask.taskName}
              onChange={handleEditChange}
              className={`w-full p-3 border rounded-md ${
                errors.taskName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.taskName && (
              <p className="text-red-500 text-sm mt-1">{errors.taskName}</p>
            )}
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-lg font-medium">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={editedTask.dueDate}
              onChange={handleEditChange}
              className={`w-full p-3 border rounded-md ${
                errors.dueDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
            )}
          </div>

          <div>
            <label htmlFor="priority" className="block text-lg font-medium">
              Priority
            </label>
            <select
              name="priority"
              value={editedTask.priority}
              onChange={handleEditChange}
              className={`w-full p-3 border rounded-md ${
                errors.priority ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {errors.priority && (
              <p className="text-red-500 text-sm mt-1">{errors.priority}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleEditChange}
              className={`w-full p-3 border rounded-md ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              maxLength="200"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`p-2 rounded-md ${
                isFormValid()
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setErrors({});
              }}
              className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3 className="text-xl font-semibold">{task.taskName}</h3>
          <p className="text-gray-600">Due Date: {task.dueDate}</p>
          <p
            className={`inline-block px-2 py-1 rounded-full text-sm ${
              task.priority === "High"
                ? "bg-red-100 text-red-800"
                : task.priority === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {task.priority}
          </p>
          <p className="mt-2 text-gray-700">{task.description}</p>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;
