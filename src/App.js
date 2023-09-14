import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleCheck,faPen,faTrashCan} from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
  const [task, setTask] = useState([
   
  ]);

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
      <h2>Daily To Do List App</h2>
      <br></br>

       {/* Update */}
       {updateData && updateData ? (
      <>
        <div className="row">
          <div className="col">
            <input value={updateData && updateData.title} 
            onChange = {(e) => changeTask(e)}
            className="form-control form-control-lg">

            </input>
          </div>
          <div className="col-auto">
          <button onClick={updateTask}
          className="btn btn-lg btn-success mr-20">

            Update</button>
            <button onClick={cancelUpdate}
            className="btn btn-lg btn-warning">

            Cancel</button>
          </div>
        </div>
        <br/>
      </>
       ) : (

        <>

    <div className="row">
            <div className="col">
              <input className="form-control form-control-lg" value={newTask}onChange={(e) =>setNewTask(e.target.value)} >

              </input>
            </div>
            <div className="col-auto">
            <button onClick={addTask} className="btn btn-lg btn-success mr-20">

              Add Taks</button>
            </div>
          </div>
          <br/>
        </>
       )}
      


       


      
      {task && task.length ? '' : 'No tasks...'}
      {task && task 
      .sort((a,b) => a.id > b.id ? 1 : -1)
      .map( (task,index) => {

      
        return(
      <React.Fragment key={task.id}>
        <div className="col taskBg">
           <div className={task.status ? 'done': ''}>
            <span className="taskNumber">{index+ 1}</span>
             <span className="taskText">{task.title}</span>
          </div>
          <div className="iconsWrap">

            <span title="Completed / Not Completed" onClick={(e) => completeTask(task.id)}>
              <FontAwesomeIcon icon={faCircleCheck}/>
            </span>

            {task.status ? null : (
              <span title="Edit" 
              onClick={() => setUpdateData({
                id: task.id,
                title: task.title, 
                status: task.status ? true : false})}>
              <FontAwesomeIcon icon={faPen}/>
              </span>
            )}
            

            <span title="Delete" onClick={() => deleteTask(task.id)}>
              
            <FontAwesomeIcon icon={faTrashCan}/>
            </span>

          </div>
        </div>
        
      </React.Fragment>
      )
    })}
    </div>
  );
}

export default App;
