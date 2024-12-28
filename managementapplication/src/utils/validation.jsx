export const validateTaskName = (taskName) => {
  if (taskName.trim().length < 3) {
    return "Task name must be at least 3 characters long.";
  }
  return "";
};

export const validateDueDate = (dueDate) => {
  if (!dueDate) {
    return "Due date is required.";
  }
  if (new Date(dueDate) < new Date()) {
    return "Due date cannot be in the past.";
  }
  return "";
};

export const validatePriority = (priority) => {
  if (!priority) {
    return "Priority is required.";
  }
  return "";
};

export const validateDescription = (description) => {
  if (description.length > 200) {
    return "Description cannot exceed 200 characters.";
  }
  return "";
};
