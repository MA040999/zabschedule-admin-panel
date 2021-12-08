import React from "react";
import { FaTrashAlt } from "react-icons/fa";
function Modal() {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-heading">
          <div className="modal-main-heading">
            <h3>Room-104</h3>
            <h3>Saturday</h3>
            <h3>100 Campus</h3>
          </div>
          <div className="line-break"></div>
          <div className="modal-time-heading">
            <h3>1st Time Slot (08:15AM to 09:30AM - 09:30AM to 10:45AM)</h3>
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-row">
            <select name="asdas" id="">
              <option value="asdasd">adasd</option>
            </select>
            <select name="" id="">
              <option value="asdasd">adasd</option>
            </select>
            <select name="" id="">
              <option value="asdasd">adasd</option>
            </select>
            <select name="" id="">
              <option value="asdasd">adasd</option>
            </select>
            <select name="" id="">
              <option value="asdasd">adasd</option>
            </select>
            <FaTrashAlt style={{ cursor: "pointer" }} color="red" size="30px" />
          </div>
          <div className="buttons-container">
            <button className="modal-btn add-class-btn">
              Add another class
            </button>
            <button className="modal-btn delete-class-btn">
              Unschedule Class
            </button>
            <div className="btn-container">
              <button className="modal-btn cancel-btn">Cancel</button>
              <button className="modal-btn submit-btn">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
