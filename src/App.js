import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Task({ task, onDelete, onEdit }) {
  return (
    <div className="task">
      <div className="task-caption">
        <h4>{task.title}</h4>
        <p>{task.description}</p>
      </div>
      <div className="task-actions">
        <button className="btn btn-primary" onClick={() => onEdit(task)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setNewTask({ title: task.title, description: task.description });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingTask) {
      const updatedTasks = tasks.map(task =>
        task.id === editingTask.id ? { ...task, ...newTask } : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
      setNewTask({ title: '', description: '' });
    } else {
      const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
      setTasks([...tasks, { id: newId, ...newTask }]);
      setNewTask({ title: '', description: '' });
    }
    setShowModal(false);
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setNewTask({ title: '', description: '' });
    setShowModal(true);
  };

  return (
    <div className="container">
      <h1 className="mt-5 mb-4">Task Manager</h1>
      <button className="btn btn-primary mb-3" onClick={handleCreateTask}>Create Task</button>
      <div className="modal" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{editingTask ? 'Edit Task' : 'Create Task'}</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      </div>
      {tasks.map(task => (
        <Task key={task.id} task={task} onDelete={handleDelete} onEdit={handleEdit} />
      ))}
    </div>
  );
}

export default App;
