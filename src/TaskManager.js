import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs
import * as XLSX from 'xlsx'; // To export to Excel
import './TaskManager.css'; // Import the CSS file

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Add a task to the list
  const addTask = () => {
    if (newTask.trim() !== '') {
      const task = {
        id: uuidv4(), // Generate a unique ID
        title: newTask,
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  // Update a task's title
  const updateTask = (taskId, newTitle) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title: newTitle };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Delete a task from the list
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Move a task to another list
  const moveTask = (taskId, newList) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, list: newList };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Export tasks to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tasks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
    XLSX.writeFile(workbook, 'tasks.xlsx');
  };

  return (
    <div className="task-manager-container">
      <div className="task-manager-content">
        <h1>Task Management</h1>
        <div className="task-input-container">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task title"
            className="task-input"
          />
          <button onClick={addTask} className="task-button">Add Task</button>
          <button onClick={exportToExcel} className="export-button">Export to Excel</button>
        </div>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-card">
              <input
                type="text"
                value={task.title}
                onChange={(e) => updateTask(task.id, e.target.value)}
                className="task-input"
              />
              <button onClick={() => deleteTask(task.id)} className="action-button">Delete</button>
              <button onClick={() => moveTask(task.id, 'Another List')} className="action-button">Move</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskManager;
