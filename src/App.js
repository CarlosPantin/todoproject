import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleCheck,faPen,faTrashCan} from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
  const [task, setTask] = useState([
    {id: 1, title: "Task 1", status: false},
    {id: 2, title: "Task 2", status: false}
  ]);

  const [newTask, setNewTask]= useState('');
  const [updateData, setUpdateData]= useState('');
  //add task
  const addTask = () =>{

  }
  //delete task
  const deleteTask = (id) =>{
    
  }
  //mark task as done
  const completeTask = (id) =>{
    
  }
  //cancel update
  const cancelUpdate = () =>{
    
  }
  //Change task for update
  const changeTask = (e) =>{
    
  }
  //Update task
  const updateTask = () =>{
    
  }



  return (
    <div className="container App">
      <br></br>
      <h2>To List App</h2>
      <br></br>

      {/* Display Tasks */}
      {task && task.length ? '' : 'No tasks...'}
      {task && task 
      .map( (task,index) => {

      
        return(
      <React.Fragment key={task.id}>
        <div className="col taskBg">
           <div className={task.status ? 'done': ''}>
            <span className="taskText">{index+ 1}</span>
             <span className="taskText">{task.title}</span>
          </div>
        </div>
        
      </React.Fragment>
      )
    })}
    </div>
  );
}

export default App;
