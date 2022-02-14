import React from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

function LabSelector({ selectedRoom, setSelectedRoom, rooms }) {
  const handleLeftArrowClick = () => {
    const index = rooms.indexOf(selectedRoom);
    if (index === 0) {
      setSelectedRoom(rooms[rooms.length - 1]);
      return;
    }
    setSelectedRoom(rooms[index - 1]);
  };
  const handleRightArrowClick = () => {
    const index = rooms.indexOf(selectedRoom);
    if (index === rooms.length - 1) {
      setSelectedRoom(rooms[0]);
      return;
    }
    setSelectedRoom(rooms[index + 1]);
  };
  return (
    <div className="lab-selector-container">
      <div className="lab-selector-content-container">
        <HiOutlineChevronLeft
          onClick={() => handleLeftArrowClick()}
          className="lab-selector-arrows"
          size={50}
        />
        <span>{selectedRoom}</span>
        <HiOutlineChevronRight
          onClick={() => handleRightArrowClick()}
          className="lab-selector-arrows"
          size={50}
        />
      </div>
    </div>
  );
}

export default LabSelector;
