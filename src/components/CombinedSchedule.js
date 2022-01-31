import React from "react";
import { useSelector } from "react-redux";
import { ordinal_suffix_of } from "../common/common";
import CampusSchedule from "./CampusSchedule";
import Loader from "./Loader";

function CombinedSchedule({ selectedData, selectedDay }) {
  const campusArray = ["100 CAMPUS", "154 CAMPUS", "153 CAMPUS", "99 CAMPUS"];
  const schedule = useSelector((state) =>
    state.schedule.schedule.filter((item) => item.day === selectedDay)
  );
  const filteredSchedule = useSelector((state) =>
    state.schedule.filteredSchedule.filter((item) => item.day === selectedDay)
  );
  const slots = useSelector((state) =>
    state.schedule.slots.sort((a, b) => a.slot - b.slot)
  );

  const colSpan = slots.length * 3 + 1;
  if (schedule.length === 0) {
    return <Loader />;
  }

  return (
    <>
      {schedule.length > 0 && (
        <table className="schedule-table">
          <thead>
            <tr>
              <th colSpan={colSpan}>ZabSchedule</th>
            </tr>
            <tr>
              <th colSpan={colSpan}>{selectedDay}</th>
            </tr>
            <tr>
              <th rowSpan={10}>Class Room</th>
              {slots.map((slot) => (
                <th colSpan={3} key={slot._id}>
                  {ordinal_suffix_of(slot.slot) + " Time Slot"}
                </th>
              ))}
            </tr>
            <tr>
              {slots.map((slot) => (
                <th colSpan={3} key={slot._id}>
                  {selectedDay === "Friday"
                    ? slot.friday_slot_timing.length > 0
                      ? slot.friday_slot_timing.map((time, index) => {
                          return `${index !== 0 ? ` - ` : ""}` + time;
                        })
                      : "Namaz Break"
                    : slot.slot_timing.map((time, index) => {
                        return `${index !== 0 ? ` - ` : ""}` + time;
                      })}
                </th>
              ))}
            </tr>
            <tr className="llb-row">
              {slots.map((slot, i) => {
                if (i === 0 && slot.llb_slot_timing.length === 0) {
                  const emptyLlbSlotCount = slots.filter(
                    (item) => item.llb_slot_timing.length === 0
                  ).length;
                  return (
                    <th colSpan={3 * emptyLlbSlotCount} key={slot._id}>
                      LLB Program Timings
                    </th>
                  );
                } else {
                  if (slot.llb_slot_timing.length !== 0) {
                    return (
                      <th colSpan={3} key={slot._id}>
                        {slot.llb_slot_timing.map((llbSlot, j) => {
                          return `${j !== 0 ? ` - ` : ""}` + llbSlot;
                        })}
                      </th>
                    );
                  }
                  return null;
                }
              })}
            </tr>
            <tr>
              {[...Array(slots.length * 3)].map((_, i) => (
                <th key={i}>
                  {i % 3 === 0 ? "Teacher" : i % 3 === 1 ? "Subject" : "Class"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campusArray?.map((campus) => (
              <CampusSchedule
                colSpan={colSpan}
                selectedDay={selectedDay}
                key={campus}
                schedule={schedule}
                selectedData={selectedData}
                filteredSchedule={filteredSchedule}
                campus={campus}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default CombinedSchedule;
