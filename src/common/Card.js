import React from "react";
import "../../styles/common.css";

const Card = (props) => {
  return (
    <div className="card">
      <h4 className={props.headingClass}>
        <span className={props.dotClass}></span>Head
      </h4>
      <p>
        <b>desc</b>
      </p>
    </div>
  );
};

export default Card;
