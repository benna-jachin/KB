import React from "react";
import "../../styles/common.css";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className={props.headingClass}>
          <span className={props.dotClass}></span>
          {props.heading}
        </h4>
        <div className="margin closeInside" onClick={()=>props.deleteItem(props.idx, props.keyName)}>X</div>
      </div>
      <p>
        <b>{props.description}</b>
      </p>
    </div>
  );
};

export default Card;
