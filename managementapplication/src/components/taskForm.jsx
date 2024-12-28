import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  validateTaskName,
  validateDueDate,
  validatePriority,
  validateDescription,
} from "../utils/validation";

const TaskForm = () => {
  const { dispatch } = useTaskContext();
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate single field
  const validateField = (fieldName, value) => {
    let error = "";
    switch (fieldName) {
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

  // Handle field changes
  const handleFieldChange = (fieldName, value) => {
    // Update the field value
    switch (fieldName) {
      case "taskName":
        setTaskName(value);
        break;
      case "dueDate":
        setDueDate(value);
        break;
      case "priority":
        setPriority(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }

    // Mark field as touched
    setTouchedFields((prev) => ({
      ...prev,
      [fieldName]: true,
    }));

    // Only validate if field has been touched
    const error = validateField(fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  // Validate all fields
  const validateForm = () => {
    const formErrors = {
      taskName: validateTaskName(taskName),
      dueDate: validateDueDate(dueDate),
      priority: validatePriority(priority),
      description: validateDescription(description),
    };

    setErrors(formErrors);
    return !Object.values(formErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mark all fields as touched
    setTouchedFields({
      taskName: true,
      dueDate: true,
      priority: true,
      description: true,
    });

    if (validateForm()) {
      // Create task preview
      const taskPreview = `
        Task: ${taskName}
        Due: ${new Date(dueDate).toLocaleDateString()}
        Priority: ${priority}
      `;

      // Show confirmation toast with task preview
      toast.info(
        <div className="confirmation-dialog">
          <h4 className="text-lg font-semibold mb-2">Confirm Task Creation</h4>
          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-2 rounded mb-3">
            {taskPreview}
          </pre>
          <p className="mb-3">Are you sure you want to create this task?</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                toast.dismiss();
                setIsSubmitting(false);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          closeButton: false,
          className: "confirm-toast",
          style: { minWidth: "320px" },
        }
      );
    } else {
      toast.error("Please fix the errors in the form", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsSubmitting(false);
    }
  };

  const handleConfirmSubmit = () => {
    try {
      const newTask = {
        id: Date.now(),
        taskName,
        dueDate,
        priority,
        description,
        createdAt: new Date().toISOString(),
        status: "pending",
      };

      dispatch({ type: "ADD_TASK", payload: newTask });

      // Dismiss confirmation toast
      toast.dismiss();

      // Show success toast
      toast.success("✅ Task created successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      });

      // Reset form
      setTaskName("");
      setDueDate("");
      setPriority("Low");
      setDescription("");
      setErrors({});
      setTouchedFields({});
    } catch (error) {
      toast.error("Failed to create task. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid
  const isFormValid =
    taskName &&
    dueDate &&
    priority &&
    !Object.values(errors).some((error) => error !== "") &&
    Object.keys(touchedFields).length >= 3;

  return (
    <>
      <div className="task-form max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add a New Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Name */}
          <div>
            <label htmlFor="taskName" className="block text-lg font-medium">
              Task Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="taskName"
              value={taskName}
              onChange={(e) => handleFieldChange("taskName", e.target.value)}
              onBlur={() => handleFieldChange("taskName", taskName)}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                ${
                  touchedFields.taskName && errors.taskName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              disabled={isSubmitting}
              placeholder="Enter task name"
            />
            {touchedFields.taskName && errors.taskName && (
              <p className="text-red-500 text-sm mt-1">{errors.taskName}</p>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-lg font-medium">
              Due Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => handleFieldChange("dueDate", e.target.value)}
              onBlur={() => handleFieldChange("dueDate", dueDate)}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                ${
                  touchedFields.dueDate && errors.dueDate
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              disabled={isSubmitting}
              min={new Date().toISOString().split("T")[0]}
            />
            {touchedFields.dueDate && errors.dueDate && (
              <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className="block text-lg font-medium">
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => handleFieldChange("priority", e.target.value)}
              onBlur={() => handleFieldChange("priority", priority)}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                ${
                  touchedFields.priority && errors.priority
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              disabled={isSubmitting}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {touchedFields.priority && errors.priority && (
              <p className="text-red-500 text-sm mt-1">{errors.priority}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-lg font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
              onBlur={() => handleFieldChange("description", description)}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                ${
                  touchedFields.description && errors.description
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              maxLength="200"
              rows="4"
              disabled={isSubmitting}
              placeholder="Enter task description (optional)"
            />
            <div className="flex justify-between mt-1">
              {touchedFields.description && errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
              <p className="text-gray-500 text-sm ml-auto">
                {description.length}/200 characters
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full p-3 text-white font-semibold rounded-md transition-colors duration-200
              ${
                !isFormValid || isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
          >
            {isSubmitting ? (
              <span>Creating Task...</span>
            ) : (
              <span>Create Task</span>
            )}
          </button>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default TaskForm;
