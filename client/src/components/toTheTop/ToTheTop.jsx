import React, { useState } from "react";
import "./to-the-top.css";

export const ToTheTop = () => {
  const [buttonDisplay, setButtonDisplay] = useState("none");
  window.onscroll = function () {
    appear();
  };
  const appear = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setButtonDisplay("block");
    } else {
      setButtonDisplay("none");
    }
  };

  const onHandleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div>
      <button
        className="back-up-button"
        onClick={onHandleClick}
        style={{ display: buttonDisplay }}
      >
        Back up
      </button>
    </div>
  );
};
