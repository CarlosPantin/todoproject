import React, { useState, useEffect } from 'react';
import AddTaskForm from './components/TaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';


function App() {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      console.log('Loaded tasks from local storage:', storedTasks);
      setTask(storedTasks);
    } catch (error) {
      console.error('Error loading tasks from local storage:', error);
    }
  }, []);
  

  useEffect(() => {
    console.log('Saving tasks to local storage:', task);
    localStorage.setItem('tasks', JSON.stringify(task));
  }, [task]);

  const addTask = () => {
    if (newTask) {
      const num = task.length + 1;
      const newEntry = { id: num, title: newTask, status: false };
      setTask([...task, newEntry]);
      setNewTask('');
    }
  }

  const deleteTask = (id) => {
    const newTasks = task.filter(taskItem => taskItem.id !== id);
    setTask(newTasks);
  }

  const completeTask = (id) => {
    const newTasks = task.map(taskItem => {
      if (taskItem.id === id) {
        return { ...taskItem, status: !taskItem.status };
      }
      return taskItem;
    });
    setTask(newTasks);
  }

  const cancelUpdate = () => {
    setUpdateData('');
  }

  const changeTask = (e) => {
    const newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  }

  const updateTask = () => {
    const updatedObject = task.map((t) =>
      t.id === updateData.id ? updateData : t
    );
    setTask(updatedObject);
    setUpdateData('');
  };

  return (
    <div className="container App">
      <br />
      <h2>Daily To Do List App!!</h2>
      <br />
  
      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )}
  
  {task.length === 0 ? (
  <p>No tasks...</p>
) : (
  <div>
    {task
      .sort((a, b) => (a.id > b.id ? 1 : -1))
      .map((task, index) => {
        console.log('Rendering task:', task); // Add this line
        return (
          <div key={task.id} className="col taskBg">
            <div className={task.status ? 'done' : ''}>
              <span className="taskNumber">{index + 1}</span>
              <span className="taskText">{task.title}</span>
            </div>
            <div className="iconsWrap">
              <span title="Completed / Not Completed" onClick={() => completeTask(task.id)}>
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
              {task.status ? null : (
                <span
                  title="Edit"
                  onClick={() =>
                    setUpdateData({
                      id: task.id,
                      title: task.title,
                      status: task.status ? true : false,
                    })
                  }
                >
                  <FontAwesomeIcon icon={faPen} />
                </span>
              )}
              <span title="Delete" onClick={() => deleteTask(task.id)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
            </div>
          </div>
        );
      })}
  </div>
)}
    </div>
  );
  
}

export default App;
