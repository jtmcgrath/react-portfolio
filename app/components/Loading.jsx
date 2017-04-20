import React from "react";

const Loading = props => {
  let style = {
    display: "block",
    margin: "20px auto",
    width: "auto"
  };

  return (
    <img src="/images/loading.gif" alt="Loading" style={style} />
  );
}; // Loading Component

export default Loading;
