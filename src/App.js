
import React, {useState,useEffect} from 'react';
import AddTaskForm from './components/TaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  
  const [task, setTask] = useState([]);
  const [newTask, setNewTask]= useState('');
  const [updateData, setUpdateData]= useState('');
  //add task
  const addTask = () =>{
    if(newTask){
      let num = task.length + 1;
      let newEntry = {id: num, title: newTask, status: false}
      setTask([...task, newEntry])
      setNewTask('');
    }
  }
  //delete task
  const deleteTask = (id) =>{
    let newTasks = task.filter(task => task.id !== id)
    setTask(newTasks);
  }
  //mark task as done
  const completeTask = (id) =>{
    const newTask = task.map(task => {
      if(task.id === id){
        return({...task, status: !task.status})
      }
      return task;
    })
    setTask(newTask);

  }
  //cancel update
  const cancelUpdate = () =>{
    setUpdateData('');
  }
  //Change task for update
  const changeTask = (e) =>{
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }
  //Update task
  const updateTask = () =>{
    let filterRecords = [...task].filter(task => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData]
    setTask(updatedObject);
    setUpdateData('');
  }



  return (
    <div className="container App">
      <br></br>
      <h2>Daily To Do List App!!</h2>
      <br></br>

       
       {updateData && updateData  ? (
        <UpdateForm 
        updateData ={updateData}
        changeTask ={changeTask} 
        updateTask ={updateTask}
        cancelUpdate ={cancelUpdate}
        />
       ) : (
      
        <AddTaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        />
       )}
      


       


      
      {task && task.length ? '' : 'No tasks...'}
     <ToDo
      task={task}
      completeTask={completeTask}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
     />

    </div>
  );
}

export default App;
