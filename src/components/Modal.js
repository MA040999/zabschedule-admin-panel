import React, { useEffect, useState } from "react";
import { FiTrash, FiX, FiCheck, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../redux/schedule/scheduleAction";
import CustomSelect from "./CustomSelect";

function Modal() {
  const [rows, setRows] = useState(1);
  const [selectedData, setSelectedData] = useState({
    Time: [],
    campus: "",
    class: [],
    day: "",
    room: "",
    slot: null,
    subject: [],
    teacher: [],
    _id: "",
  });
  console.log(selectedData);

  const modalState = useSelector((state) => state.schedule.isModalOpen);
  const dispatch = useDispatch();
  const handleAddRow = () => {
    setRows(2);
  };
  const handleTrashClick = (i) => {
    if (i === 0) {
      setSelectedData({
        Time: selectedData.Time[1] ? [undefined, selectedData.Time[1]] : [],
        campus: "",
        class: selectedData.class[1] ? [undefined, selectedData.class[1]] : [],
        day: "",
        room: "",
        slot: null,
        subject: selectedData.subject[1]
          ? [undefined, selectedData.subject[1]]
          : [],
        teacher: selectedData.teacher[1]
          ? [undefined, selectedData.teacher[1]]
          : [],
        _id: "",
      });
    } else {
      if (
        selectedData.Time[1] === undefined &&
        selectedData.class[1] === undefined &&
        selectedData.subject[1] === undefined &&
        selectedData.teacher[1] === undefined
      ) {
        setRows(1);
      } else {
        setSelectedData({
          Time: selectedData.Time.filter((_, index) => index !== i),
          campus: "",
          class: selectedData.class.filter((_, index) => index !== i),
          day: "",
          room: "",
          slot: null,
          subject: selectedData.subject.filter((_, index) => index !== i),
          teacher: selectedData.teacher.filter((_, index) => index !== i),
          _id: "",
        });
      }
    }
  };

  const handleSelectChange = (e, index) => {
    if (index === 0) {
      setSelectedData({
        ...selectedData,
        [e.name]: selectedData[e.name][index + 1]
          ? [e.value, selectedData[e.name][index + 1]]
          : [e.value],
      });
    } else {
      setSelectedData({
        ...selectedData,
        [e.name]: [selectedData[e.name][index - 1], e.value],
      });
    }
  };

  useEffect(() => {
    setRows(1);
    setSelectedData({
      Time: [],
      campus: "",
      class: [],
      day: "",
      room: "",
      slot: null,
      subject: [],
      teacher: [],
      _id: "",
    });
  }, [modalState]);

  if (!modalState) return null;

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
          {[...Array(rows)].map((_, index) => (
            <div key={index} className="modal-row">
              <CustomSelect
                placeholder="Faculty..."
                options={[
                  { name: "teacher", value: "chocolate", label: "Chocolate" },
                  { name: "teacher", value: "strawberry", label: "Strawberry" },
                  { name: "teacher", value: "vanilla", label: "Vanilla" },
                ]}
                defaultValue={selectedData.teacher[index]}
                onChange={(e) => handleSelectChange(e, index)}
                controlShouldRenderValue={
                  selectedData.teacher[index] !== undefined
                }
              />
              <CustomSelect
                placeholder="Subject..."
                options={[
                  { name: "subject", value: "chocolate", label: "Chocolate" },
                  { name: "subject", value: "strawberry", label: "Strawberry" },
                  { name: "subject", value: "vanilla", label: "Vanilla" },
                ]}
                defaultValue={selectedData.subject[index]}
                onChange={(e) => handleSelectChange(e, index)}
                controlShouldRenderValue={
                  selectedData.subject[index] !== undefined
                }
              />
              <CustomSelect
                placeholder="Class..."
                options={[
                  { name: "class", value: "chocolate", label: "Chocolate" },
                  { name: "class", value: "strawberry", label: "Strawberry" },
                  { name: "class", value: "vanilla", label: "Vanilla" },
                ]}
                defaultValue={selectedData.class[index]}
                onChange={(e) => handleSelectChange(e, index)}
                controlShouldRenderValue={
                  selectedData.class[index] !== undefined
                }
              />

              <CustomSelect placeholder="From..." />
              <CustomSelect placeholder="To..." />

              <div
                onClick={() => handleTrashClick(index)}
                className="icon-container"
              >
                <FiTrash color="white" size="20px" />
              </div>
            </div>
          ))}

          {rows !== 2 && (
            <div
              onClick={() => handleAddRow()}
              className="modal-btn add-class-btn"
            >
              <FiPlus className="icon" color="white" size="25px" />

              <span>Add another class</span>
            </div>
          )}
          <div className="modal-btn delete-class-btn">
            <FiTrash className="icon" color="white" size="25px" />

            <span>Unschedule class</span>
          </div>
          <div className="btn-container">
            <div
              onClick={() => dispatch(toggleModal())}
              className="modal-btn cancel-btn"
            >
              <FiX className="icon" color="white" size="25px" />

              <span>Cancel</span>
            </div>
            <div className="modal-btn submit-btn">
              <FiCheck className="icon" color="white" size="25px" />

              <span>Submit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
