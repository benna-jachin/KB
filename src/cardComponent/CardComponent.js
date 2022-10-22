import React from "react";
import Card from "../common/Card";

const CardComponent = (props) => {
  return (
    <>
      {Object?.values(props.data)[0]?.map((itx, index) => (
        <>
          <Card
            key={index}
            headingClass={
              itx?.type == "feature"
                ? "featuretext-head"
                : itx?.type == "request"
                ? "request-text-head"
                : "bugtext-head"
            }
            dotClass={
              itx?.type == "feature"
                ? "dot-feature"
                : itx?.type == "request"
                ? "dot-request"
                : "dot-bug"
            }
            heading={itx?.title}
            description={itx?.description}
            idx={index}
            deleteItem={props.delete}
            keyName={props.keyName}
          />
        </>
      ))}
    </>
  );
};

export default CardComponent;
