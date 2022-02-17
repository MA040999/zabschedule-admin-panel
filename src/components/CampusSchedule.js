import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../redux/schedule/scheduleAction";

function CampusSchedule({
  selectedData,
  schedule,
  filteredSchedule,
  campus,
  selectedDay,
  colSpan,
}) {
  const dispatch = useDispatch();
  let campusSchedule = [];
  if (
    selectedData.faculty === "" &&
    selectedData.course === "" &&
    selectedData.class === ""
  ) {
    campusSchedule = schedule.filter((schedule) => schedule.campus === campus);
  } else {
    campusSchedule = filteredSchedule.filter(
      (schedule) => schedule.campus === campus
    );
  }

  const slots = useSelector((state) => state.schedule.slots);
  const role = useSelector((state) => state.auth.user.role);

  const fridayEmptySlot = slots.filter(
    (slot) => slot.friday_slot_timing.length === 0
  );

  const totalSlots = slots.length;

  const roomData = campusSchedule
    .filter((schedule) => schedule.room.includes("Room"))
    .sort((a, b) => a.slot - b.slot)
    .sort((a, b) => a.room.localeCompare(b.room));

  const roomData2 = campusSchedule
    .filter((schedule) => !schedule.room.includes("Room"))
    .sort((a, b) => a.slot - b.slot)
    .sort((a, b) => a.room.localeCompare(b.room));

  const sortedSchedule = [...roomData, ...roomData2];

  if (sortedSchedule.length === 0) {
    return null;
  }

  return (
    <>
      <tr>
        <th colSpan={colSpan}>{campus}</th>
      </tr>
      {sortedSchedule.map((schedule, i) => (
        <Fragment key={schedule._id}>
          {schedule.slot === 1 && (
            <tr>
              <td className="room">{schedule.room}</td>
              {[
                ...Array(
                  selectedDay === "Friday" ? totalSlots - 1 : totalSlots
                ),
              ].map((_, j) => {
                const toggleFunction = () => {
                  const jIndex = j;

                  dispatch(
                    toggleModal(
                      schedule.room,
                      selectedDay,
                      campus,
                      selectedDay === "Friday" &&
                        slots[j].slot >= fridayEmptySlot[0].slot
                        ? slots[jIndex + 1]
                        : slots[jIndex],
                      schedule.room === sortedSchedule[i + jIndex]?.room
                        ? sortedSchedule[i + jIndex]?._id
                        : undefined,
                      sortedSchedule[i + jIndex].teacher.map(
                        (teacher) => teacher._id
                      ),
                      sortedSchedule[i + jIndex].subject.map(
                        (subject) => subject._id
                      ),
                      sortedSchedule[i + jIndex].class.map((cls) => cls._id),
                      sortedSchedule[i + jIndex].Time,
                      sortedSchedule[i + jIndex].subject.length > 0
                    )
                  );
                };
                return (
                  <Fragment key={j}>
                    {selectedDay === "Friday" &&
                      i === 0 &&
                      campus === "100 CAMPUS" &&
                      j + 1 === fridayEmptySlot[0].slot && (
                        <td colSpan={3} rowSpan={56}>
                          NAMAZ BREAK
                        </td>
                      )}
                    <td
                      onClick={() => role === "Admin" && toggleFunction()}
                      style={{ backgroundColor: j % 2 === 0 && "#dadada" }}
                    >
                      {schedule.room === sortedSchedule[i + j]?.room && (
                        <span className="block">
                          {sortedSchedule[i + j]?.teacher.map((teacher, t) => (
                            <span key={t}>{teacher.faculty_name}</span>
                          ))}
                        </span>
                      )}
                    </td>
                    <td
                      onClick={() => role === "Admin" && toggleFunction()}
                      style={{ backgroundColor: j % 2 === 0 && "#dadada" }}
                    >
                      {schedule.room === sortedSchedule[i + j]?.room && (
                        <span className="block">
                          {sortedSchedule[i + j]?.subject.map((subject, s) => (
                            <span key={s}>{subject.course_name}</span>
                          ))}
                        </span>
                      )}
                    </td>
                    <td
                      onClick={() => role === "Admin" && toggleFunction()}
                      style={{ backgroundColor: j % 2 === 0 && "#dadada" }}
                    >
                      {schedule.room === sortedSchedule[i + j]?.room &&
                        sortedSchedule[i + j]?.Time.length === 2 &&
                        sortedSchedule[i + j]?.class.map((cls, k) => (
                          <span key={k} className="class-span">
                            <span>{`${cls.program} ${cls.semester} ${cls.section}`}</span>
                            <span className="start-time">
                              {sortedSchedule[i + j]?.Time[k].split("-")[0]}
                            </span>
                            <span className="end-time">
                              {sortedSchedule[i + j]?.Time[k].split("-")[1]}
                            </span>
                          </span>
                        ))}
                      {schedule.room === sortedSchedule[i + j]?.room &&
                        sortedSchedule[i + j]?.Time.length === 1 && (
                          <span className="class-span">
                            {sortedSchedule[i + j]?.Time.length === 1 &&
                              sortedSchedule[i + j]?.class.map((cls, c) =>
                                sortedSchedule[i + j]?.class.length === 1 ? (
                                  <span
                                    key={c}
                                  >{`${cls.program} ${cls.semester} ${cls.section}`}</span>
                                ) : (
                                  <span
                                    key={c}
                                  >{`${cls.program} ${cls.semester} ${cls.section},`}</span>
                                )
                              )}
                            {sortedSchedule[i + j]?.Time.length === 1 && (
                              <>
                                <span className="start-time">
                                  {sortedSchedule[i + j]?.Time[0].split("-")[0]}
                                </span>
                                <span className="end-time">
                                  {sortedSchedule[i + j]?.Time[0].split("-")[1]}
                                </span>
                              </>
                            )}
                          </span>
                        )}
                    </td>
                  </Fragment>
                );
              })}
            </tr>
          )}
        </Fragment>
      ))}
    </>
  );
}

export default CampusSchedule;
