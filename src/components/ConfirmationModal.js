import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteClass,
  toggleConfirmationModal,
} from "../redux/schedule/scheduleAction";
import { FiX, FiCheck } from "react-icons/fi";

function ConfirmationModal() {
  const dispatch = useDispatch();
  const confirmationModalState = useSelector(
    (state) => state.schedule.isConfirmationModalOpen
  );
  const modalData = useSelector((state) => state.schedule.modalData);

  if (!confirmationModalState) return null;

  return (
    <div className="confiramtion-modal-container">
      <div className="confirmation-modal-content">
        <div className="confirmation-modal-header">
          <h3>Are you sure you want to delete this schedule?</h3>
        </div>
        <div className="confirmation-modal-body">
          <div className="btn-container">
            <div
              onClick={() => dispatch(toggleConfirmationModal())}
              className="modal-btn cancel-btn"
            >
              <FiX className="icon" color="white" size="25px" />

              <span>No</span>
            </div>
            <div
              className="modal-btn submit-btn"
              onClick={() => dispatch(deleteClass(modalData?.id))}
            >
              <FiCheck className="icon" color="white" size="25px" />

              <span>Yes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
