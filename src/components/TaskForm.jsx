const AddTaskForm = ({newTask, setNewTask, addTask}) => {
    return(
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

    )
}

export default AddTaskForm;