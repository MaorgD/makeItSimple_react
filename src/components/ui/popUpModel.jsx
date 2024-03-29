
import React, { useState } from "react";
import ReactDOM from "react-dom";
// import ExitFill from "./../icons/exitFill";
// import ExitNoFill from "./../icons/exitNoFill";
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
      {/* <h2
          className=" exit w-full md:hidden flex justify-end "
          onMouseOver={() => setOver(true)}
          onMouseLeave={() => setOver(false)}
          onClick={() => {
            dispatch(action());
          }}
        >
          {over ? (
            <ExitFill className="icon" width={32} height={32} />
          ) : (
            <ExitNoFill className="icon" width={32} height={32} />
          )}
        </h2> */}

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