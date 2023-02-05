
import React, { useState } from "react";
import ReactDOM from "react-dom";
import classes from "./PopUp.module.css";
import { useDispatch } from "react-redux";

const Backdrop = ({ action }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(action());
      }}
      className={classes.backdrop}
    ></div>
  );
};

const PopUpOverlay = ({ action, children }) => {
  const [over, setOver] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className={classes.model}>

      <div className="">{children}</div>
    </div>
  );
};
const portalElement = document.getElementById("overlays");
const PopUPModel = ({ action, children }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop action={action} />, portalElement)}
      {ReactDOM.createPortal(
        <PopUpOverlay action={action}>{children}</PopUpOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default PopUPModel;