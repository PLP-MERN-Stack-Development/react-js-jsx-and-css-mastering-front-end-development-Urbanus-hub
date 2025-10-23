import React, { useState, useEffect, useMemo } from "react";
import Button from "./Button";
import { Sun, Moon, CheckCircle2, Circle, Trash2, ListTodo, Clock } from "lucide-react";

/**
 * Custom hook for managing dark mode preference
 */
const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
};

/**
 * Custom hook for managing tasks with localStorage persistence
 */
const useLocalStorageTasks = () => {
  // Initialize state from localStorage or with empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Update localStorage when tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (text) => {
    if (text.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  // Toggle task completion status
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Clear all completed tasks
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return { tasks, addTask, toggleTask, deleteTask, clearCompleted };
};

/**
 * TaskManager component for managing tasks
 */
const TaskManager = () => {
  const { tasks, addTask, toggleTask, deleteTask, clearCompleted } =
    useLocalStorageTasks();
  const [newTaskText, setNewTaskText] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useDarkMode();

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // 'all' filter
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    addTask(newTaskText);
    setNewTaskText("");
  };

  // Derived counts
  const remainingCount = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks]
  );
  const completedCount = useMemo(
    () => tasks.filter((t) => t.completed).length,
    [tasks]
  );

  // Friendly relative time for createdAt
  const formatRelative = (iso) => {
    try {
      const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
      if (diff < 60) return `${diff}s ago`;
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
      return `${Math.floor(diff / 86400)}d ago`;
    } catch (e) {
      return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 pt-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800 p-6 relative">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ListTodo className="h-8 w-8 text-white" />
                <h2 className="text-2xl font-bold text-white">Task Manager</h2>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 hover:scale-110"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="h-6 w-6 text-yellow-300" />
                ) : (
                  <Moon className="h-6 w-6 text-gray-200" />
                )}
              </button>
            </div>
            <div className="mt-4 flex justify-between text-white/80 text-sm">
              <span className="flex items-center gap-1">
                <Circle className="h-4 w-4" />
                {remainingCount} tasks remaining
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                {completedCount} completed
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Task input form */}
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="Add a new task..."
                  aria-label="New task"
                  className="grow px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-200 shadow-sm"
                />
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!newTaskText.trim()}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setNewTaskText("")}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </form>

            {/* Filter buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex gap-2" role="tablist" aria-label="Task filters">
                <Button
                  variant={filter === "all" ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => setFilter("all")}
                  aria-pressed={filter === "all"}
                >
                  All
                </Button>
                <Button
                  variant={filter === "active" ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => setFilter("active")}
                  aria-pressed={filter === "active"}
                >
                  Active
                </Button>
                <Button
                  variant={filter === "completed" ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => setFilter("completed")}
                  aria-pressed={filter === "completed"}
                >
                  Completed
                </Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={clearCompleted}
                disabled={completedCount === 0}
              >
                Clear Completed
              </Button>
            </div>

            {/* Task list */}
            <ul className="space-y-3">
              {filteredTasks.length === 0 ? (
                <li className="text-gray-500 dark:text-gray-400 text-center py-12">
                  <div className="inline-block p-8 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <ListTodo className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <p className="mb-2 font-medium text-gray-600 dark:text-gray-300">
                      No tasks found
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Try adding your first task using the box above.
                    </p>
                  </div>
                </li>
              ) : (
                filteredTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-white dark:bg-gray-700 hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-500"
                  >
                    <div className="flex items-start sm:items-center gap-3 flex-1">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="mt-1 transition-transform duration-200 hover:scale-110"
                        aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                      >
                        {task.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400" />
                        )}
                      </button>
                      <div className="flex-1">
                        <span
                          className={`block text-gray-800 dark:text-gray-200 ${
                            task.completed ? "line-through opacity-60" : ""
                          }`}
                        >
                          {task.text}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mt-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            Added {task.createdAt ? formatRelative(task.createdAt) : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3 sm:mt-0">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteTask(task.id)}
                        aria-label="Delete task"
                        className="hover:scale-105 transition-transform"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))
              )}
            </ul>

            {/* Task stats */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{tasks.length} total tasks</span>
                <span>{Math.round((completedCount / tasks.length) * 100) || 0}% completed</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.round((completedCount / tasks.length) * 100) || 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;