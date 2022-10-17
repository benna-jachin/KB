import React, { useState } from "react";
import Card from "../common/Card";
import "../../styles/common.css";

const Board = () => {
  const [showForm, setShowForm] = useState(false);
  const [laneTitle, setLaneTitle] = useState("");
  const [lane, setLane] = useState([]);
  const [error, setError] = useState("");
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [task, setTask] = useState({});
  const [taskDetails, setTaskDetails] = useState([]);
  const [laneId, setLaneId] = useState("");

  const handleLane = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    setLaneTitle(e.target.value);
  };
  const handleCreate = () => {
    let uniqueTitle = lane && lane.some((it) => it.title == laneTitle);
    if (!uniqueTitle) {
      let newData = { title: laneTitle, id: laneTitle };
      let existingLanes = [...lane];
      existingLanes.push(newData);
      setLane(existingLanes);
      setLaneTitle("");
      setError("");
    } else {
      setError("Lane already Exists");
      setLaneTitle("");
    }
    setShowCreateTask(false);
  };

  const addTask = (e) => {
    setShowCreateTask(true);
    setLaneId(e);
  };

  const handleChangeTask = (e) => {
    const { name, value } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateTask = (title) => {
    // let existingTasks = [...taskDetails];
    // existingTasks.push(task);
    // setTaskDetails(existingTasks);
    // console.log(existingTasks);

    // if(taskDetails.some(item => item.hasOwnProperty(lane))){
    //   existingTasks= [...taskDetails]
    // }
    //  let array=[];
    //     array[lane]=[task];
    //     console.log(array);

    // let arr = [];
    // if (taskDetails.length > 0) {
    //   arr[lane] = [taskDetails[lane]];
    //   arr[lane].push(task);
    //   console.log("if", arr);
    // } else {
    //   arr[lane] = [...taskDetails];
    //   arr[lane].push(task);
    //   console.log("else", arr);
    // }

    let oldArr = [...taskDetails];

    lane.map((name) => {
      if (name.id == title) {
        if (oldArr.length > 0) {
          // oldArr=oldArr[title];
          var a = oldArr.filter((itx) => {
            return itx[title] && itx;
            //  if(itx[title]){
            //   return itx[title].push(task)
            //  }else{
            //   return oldArr.push({[title]:[task]})
            //  }
          });
          console.log("createeeee", a);
          if(a.length==0){
            oldArr.push({ [title]: [task] });
          }else{
            oldArr[title].push(task)
          }
          console.log("createeeeeold", oldArr);
        } else {
          oldArr.push({ [title]: [task] });
        }

        setTaskDetails(oldArr);
        // console.log(oldArr,"createeeee",oldArr);
      }
      // console.log("create",arr);
    });
  };
  return (
    <>
      <div className="container">
        {/* <div>
          <div>To do list</div>
          <Card headingClass="featuretext-head" dotClass="dot-feature" />
        </div>
        <div>
          <div>To do list</div>
          <Card headingClass="bugtext-head" dotClass="dot-bug" />
        </div>
        <div>
          <div>To do list</div>
          <Card headingClass="request-text-head" dotClass="dot-request" />
        </div>
        <div>
          <div>To do list</div>
          <Card />
        </div> */}
        {lane &&
          lane.map((item, index) => {
            return (
              <div key={index}>
                <div> {item.title}</div>
                {showCreateTask && laneId == item.title ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Title"
                      name="title"
                      onChange={handleChangeTask}
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      name="description"
                      onChange={handleChangeTask}
                    />
                    <select name="type" id="option" onChange={handleChangeTask}>
                      <option value="feature">Feature</option>
                      <option value="report">Report</option>
                      <option value="bug">Bug</option>
                    </select>
                    <input
                      type="button"
                      // disabled={laneTitle.length == 0}
                      value="Create"
                      onClick={() => handleCreateTask(item.title)}
                    />
                  </div>
                ) : (
                  <div className="card add" onClick={() => addTask(item.title)}>
                    {" "}
                    Add Items
                  </div>
                )}
                {/* <Card /> */}
              </div>
            );
          })}
        <div>
          Create Lane
          {showForm ? (
            <div className="wrap card">
              <input
                type="text"
                onChange={handleChange}
                placeholder="Lanetitle"
                value={laneTitle}
              />
              <input
                type="button"
                disabled={laneTitle.length == 0}
                value="ADD"
                onClick={handleCreate}
              />
            </div>
          ) : (
            <div onClick={handleLane} className="card add">
              +
            </div>
          )}
          {error && <p>{error}</p>}
        </div>
      </div>
    </>
  );
};
export default Board;
