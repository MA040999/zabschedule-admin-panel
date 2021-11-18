import React from "react";
import { useSelector } from "react-redux";
import { ordinal_suffix_of } from "../common/common";
import CampusSchedule from "./CampusSchedule";

function CombinedSchedule({ selectedDay }) {
  // const campusArray = ["100 CAMPUS"];
  const campusArray = ["100 CAMPUS", "154 CAMPUS", "153 CAMPUS", "99 CAMPUS"];
  const schedule = useSelector((state) =>
    state.schedule.schedule.filter((item) => item.day === selectedDay)
  );
  const slots = useSelector((state) =>
    state.schedule.slots.sort((a, b) => a.slot - b.slot)
  );

  return (
    <>
      {schedule.length > 0 && (
        <table className="schedule-table">
          <thead>
            <tr>
              <th colSpan={50}>ZabSchedule</th>
            </tr>
            <tr>
              <th colSpan={50}>{selectedDay}</th>
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
                    : // slot.friday_slot_timing[0] +
                      //   `
                      // ${
                      //   slot.friday_slot_timing[1]
                      //     ? ` - ` + slot.friday_slot_timing[1]
                      //     : ""
                      // }`
                      slot.slot_timing.map((time, index) => {
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
                        {/* {slot.llb_slot_timing.length > 0 &&
                          slot.llb_slot_timing[0] +
                            " - " +
                            slot.llb_slot_timing[1]} */}
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
                selectedDay={selectedDay}
                key={campus}
                schedule={schedule}
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
