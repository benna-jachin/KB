import React, { useState, useEffect } from "react";
import "../../styles/common.css";
import CardComponent from "../cardComponent/CardComponent";

const Board = () => {
  const getUsers = () => {
    const data = localStorage.getItem("lanes");

    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  const [showForm, setShowForm] = useState(false);
  const [laneTitle, setLaneTitle] = useState("");
  const [error, setError] = useState("");
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [task, setTask] = useState({});
  const [laneId, setLaneId] = useState("");
  const [lns, setLns] = useState([]);
  const [lnsDummy, setLnsDummy] = useState(getUsers());
  const [taskCreated, setTaskCreated] = useState(false);

  useEffect(() => {
    setLns(getUsers());
  }, []);

  const handleLane = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    setLaneTitle(e.target.value);
  };
  const handleCreate = () => {
    setShowCreateTask(false);
    setShowForm(false);
    let uniqueTitle =
      lns && lns.some((it) => Object.keys(it).toString() == laneTitle);
    if (!uniqueTitle) {
      let existingLanes = [...lns];
      existingLanes.push({ [laneTitle]: [] });
      setLns(existingLanes);
      setLaneTitle("");
      setError("");
    } else {
      setError("Lane already Exists");
      setLaneTitle("");
    }
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

  const handleCreateTasks = (title) => {
    lns.map((item) => {
      if (Object.keys(item).toString() == title[0])
        return item[title].push(task);
    });
    setTask({});
    setShowCreateTask(false);
    setLns(lns);
    setTaskCreated(!taskCreated);
    localStorage.setItem("lanes", JSON.stringify(lns));
  };

  const handleDelete = (id, keyName) => {
    let oldAr = lnsDummy;
    let name = keyName.toString();
    oldAr.map((itx, index) => {
      if (Object.keys(itx).toString() == keyName.toString()) {
        delete itx[name][id];
        itx[name] = itx[name].filter((ig) => ig != null);
        return itx[name];
      }
    });
    setLns(oldAr);
    setTaskCreated(!taskCreated);
    localStorage.setItem("lanes", JSON.stringify(lns));
  };
  const deleteLane = (lane) => {
    let exis = lnsDummy;
    exis = exis.filter((hj) => Object.keys(hj).toString() != lane);
    setLns(exis);
    setTaskCreated(!taskCreated);
    localStorage.setItem("lanes", JSON.stringify(lns));
  };

  useEffect(() => {
    setLnsDummy(lns);
  }, [taskCreated, lns]);

  useEffect(() => {
    localStorage.setItem("lanes", JSON.stringify(lnsDummy));
  }, [lnsDummy]);

  return (
    <>
      <div className="container">
        {lnsDummy.map((itx, index) => (
          <>
            <div key={index}>
              <div className="card-header">
                <div className="title">{Object.keys(itx).toString()}</div>
                <div
                  className="close"
                  onClick={() => deleteLane(Object.keys(itx).toString())}
                >
                  X
                </div>
              </div>
              {Object.values(itx) && (
                <CardComponent
                  data={Object.values(itx)}
                  delete={handleDelete}
                  keyName={Object.keys(itx)}
                />
              )}
              {showCreateTask && laneId == Object.keys(itx).toString() ? (
                <>
                  <div className="margin">
                    <label>
                      <b>Title</b>
                    </label>
                    <div className="margin">
                      <input
                        type="text"
                        placeholder="Eg.Task "
                        name="title"
                        onChange={handleChangeTask}
                      />
                    </div>
                    <label>
                      <b>Description</b>
                    </label>
                    <div className="margin">
                      <input
                        type="text"
                        placeholder="Eg.Status Update..."
                        name="description"
                        onChange={handleChangeTask}
                      />
                    </div>
                  </div>
                  <div className="margin">
                    <label>
                      <b>Type</b>
                    </label>
                  </div>
                  <div className="selectWrapper margin">
                    <select
                      className="selectBox"
                      name="type"
                      id="option"
                      placeholder="Type"
                      onChange={handleChangeTask}
                    >
                      <option value="" disabled selected>
                        Select Type
                      </option>
                      <option value="feature">Feature</option>
                      <option value="request">Request</option>
                      <option value="bug">Bug</option>
                    </select>
                  </div>
                  <div className="btn">
                     <input
                        type="button"
                        className={
                          Object.values(task).length == 3 ? "" : "disable"
                        }
                        disabled={Object.values(task).length != 3}
                        value="Create"
                        onClick={() => handleCreateTasks(Object.keys(itx))}
                      />
                  </div>
                </>
              ) : (
                <div
                  className="card add"
                  onClick={() => addTask(Object.keys(itx).toString())}
                >
                  Add Tasks
                </div>
              )}
            </div>
          </>
        ))}
        <div>
          <h3>Create Lane</h3>
          {showForm ? (
            <div className="card">
              <label>
                <b>Lanetitle</b>
              </label>
              <input
                className="margin"
                type="text"
                onChange={handleChange}
                placeholder="Eg. To-Do-List"
                value={laneTitle}
              />
              <div className="btn margin">
                <input
                  type="button"
                  className={laneTitle.length == 0 ? "disable" : ""}
                  disabled={laneTitle.length == 0}
                  value="ADD"
                  onClick={handleCreate}
                />
              </div>
            </div>
          ) : (
            <div onClick={handleLane} className="card add">
              +
            </div>
          )}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </>
  );
};
export default Board;
