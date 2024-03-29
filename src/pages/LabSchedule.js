import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import LabSelector from "../components/LabSelector";
import { useDispatch } from "react-redux";
import {
  fetchCombinedSchedule,
  removeTimeTableData,
  toggleModal,
} from "../redux/schedule/scheduleAction";
import { useEffect } from "react";

function LabSchedule() {
  const dispatch = useDispatch();
  const rooms = [
    "C-Lab 3(R-207)",
    "C-Lab 5(R-308)",
    "C-Lab 4(R-206)",
    "CS Lab",
    "Smart Lab(205)",
  ];
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);

  const slots = useSelector((state) => state.schedule.slots);
  const modalState = useSelector((state) => state.schedule.isModalOpen);
  const labSchedule = useSelector((state) => state.schedule.labSchedule).filter(
    (sch) => sch.room === selectedRoom
  );
  const role = useSelector((state) => state.auth.user.role);

  const isCancelled = (sch, s_index) => {
    return sch.isCancelled === true &&
      !sch.isMakeUpClass &&
      (sch.isMakeUpClass !== true || sch.normalClassIndex === s_index) &&
      (sch.cancelledClassIndex !== undefined ||
        sch.cancelledClassIndex !== null)
      ? sch?.cancelledClassIndex === s_index ||
        sch?.cancelledClassIndex === 10 ||
        sch?.cancelledClassIndex === null ||
        (sch?.cancelledClassIndex === 1 && sch?.teacher.length === 1)
        ? true
        : false
      : sch.isCancelled === true && sch.isMakeUpClass !== true
      ? true
      : false;
  };

  const handleClickOpen = (
    room,
    selectedDay,
    campus,
    slot,
    id,
    teacher,
    subject,
    cls,
    time,
    slotAssigned,
    isRequestModal
  ) => {
    dispatch(
      toggleModal(
        room,
        selectedDay,
        campus,
        slot,
        id,
        teacher,
        subject,
        cls,
        time,
        slotAssigned,
        isRequestModal
      )
    );
  };

  const arr = [];
  const printOhArr = [];

  const days = [...new Set(labSchedule.map((sch) => sch.day))];

  useEffect(() => {
    if (modalState) {
      dispatch(toggleModal());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(removeTimeTableData());
    dispatch(fetchCombinedSchedule());

    return () => {
      dispatch(removeTimeTableData());
    };

    // eslint-disable-next-line
  }, []);

  if (labSchedule.length === 0) {
    return <Loader />;
  }
  return (
    <>
      <LabSelector
        rooms={rooms}
        setSelectedRoom={setSelectedRoom}
        selectedRoom={selectedRoom}
      />
      <table className="lab-table">
        <thead className="lab-table-thead">
          <tr className="lab-table-tr">
            <th className="time-day-heading">Time/Day</th>
            {days.map((day, i) => (
              <th className="day-th" key={i}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="lab-table-tbody">
          {slots.map((slot) => {
            return slot.slot_timing.map((s, s_index) => {
              let currentDay = 0;
              return (
                <tr key={slot._id + s_index}>
                  <th className="time-th">{s}</th>

                  {labSchedule.map((sch) => {
                    if (arr.includes(sch._id)) {
                      if (sch.slot === 3) currentDay++;
                      return null;
                    }
                    if (sch.slot === slot.slot) {
                      currentDay++;

                      if (
                        printOhArr.some(
                          (x) => x.day === sch.day && x.slot === sch.slot
                        )
                      ) {
                        let rowSpan = 1;

                        for (const next_oh of labSchedule) {
                          let shouldBreak = false;
                          for (let i = 0; i < 2; i++) {
                            if (
                              next_oh.day === sch.day &&
                              next_oh.slot > sch.slot
                            ) {
                              if (next_oh.subject.length !== 0) {
                                shouldBreak = true;
                                break;
                              }

                              // rowSpan++;
                              // arr.push(next_oh._id);
                            }
                          }
                          if (shouldBreak) break;
                        }
                        if (
                          slot.friday_slot_timing.length === 0 &&
                          s_index !== 1 &&
                          currentDay === 5
                        ) {
                          return (
                            <React.Fragment key={sch._id}>
                              <td className="break-td" rowSpan={2}>
                                <pre>{`NAMAZ BREAK\n${slot.slot_timing[0]
                                  .split("to")[0]
                                  .trim()} - ${slot.slot_timing[1]
                                  .split("to")[1]
                                  .trim()}`}</pre>
                              </td>
                              <td
                                rowSpan={rowSpan}
                                className="lab-td"
                                onClick={() =>
                                  role === "Faculty" &&
                                  handleClickOpen(
                                    selectedRoom,
                                    sch.day,
                                    sch.campus,
                                    {
                                      ...slot,
                                      slot_timing: [slot.slot_timing[1]],
                                      friday_slot_timing: [
                                        slot.friday_slot_timing[1],
                                      ],
                                    },
                                    sch._id,
                                    [],
                                    [],
                                    [],

                                    sch.day === "Friday"
                                      ? [
                                          `${slot.friday_slot_timing[1]
                                            .split("to")[0]
                                            .trim()} - ${slot.friday_slot_timing[1]
                                            .split("to")[1]
                                            .trim()}`,
                                        ]
                                      : [
                                          `${slot.slot_timing[1]
                                            .split("to")[0]
                                            .trim()} - ${slot.slot_timing[1]
                                            .split("to")[1]
                                            .trim()}`,
                                        ],
                                    false,
                                    true
                                  )
                                }
                              >
                                <pre>O-H</pre>
                              </td>
                            </React.Fragment>
                          );
                        }
                        return (
                          <td
                            rowSpan={rowSpan}
                            className="lab-td"
                            key={sch._id}
                            onClick={() =>
                              role === "Faculty" &&
                              handleClickOpen(
                                selectedRoom,
                                sch.day,
                                sch.campus,
                                {
                                  ...slot,
                                  slot_timing: [slot.slot_timing[1]],
                                  friday_slot_timing: [
                                    slot.friday_slot_timing[1],
                                  ],
                                },
                                sch._id,
                                [],
                                [],
                                [],

                                sch.day === "Friday"
                                  ? [
                                      `${slot.friday_slot_timing[1]
                                        .split("to")[0]
                                        .trim()} - ${slot.friday_slot_timing[1]
                                        .split("to")[1]
                                        .trim()}`,
                                    ]
                                  : [
                                      `${slot.slot_timing[1]
                                        .split("to")[0]
                                        .trim()} - ${slot.slot_timing[1]
                                        .split("to")[1]
                                        .trim()}`,
                                    ],
                                false,
                                true
                              )
                            }
                          >
                            <pre>O-H</pre>
                          </td>
                        );
                      }
                      if (sch.Time.length === 2) {
                        let rowSpan =
                          sch.class.every(
                            (cls) => cls._id === sch.class[0]._id
                          ) &&
                          sch.subject.every(
                            (sub) => sub._id === sch.subject[0]._id
                          ) &&
                          sch.teacher.every(
                            (fac) => fac._id === sch.teacher[0]._id
                          )
                            ? 2
                            : 1;
                        if (rowSpan === 2) arr.push(sch._id);

                        return (
                          <React.Fragment key={sch._id}>
                            {slot.friday_slot_timing.length === 0 &&
                              s_index !== 1 &&
                              currentDay === 5 && (
                                <td className="break-td" rowSpan={2}>
                                  <pre>{`NAMAZ BREAK\n${slot.slot_timing[0]
                                    .split("to")[0]
                                    .trim()} - ${slot.slot_timing[1]
                                    .split("to")[1]
                                    .trim()}`}</pre>
                                </td>
                              )}
                            <td
                              onClick={() =>
                                role === "Faculty" &&
                                isCancelled(sch, s_index) &&
                                handleClickOpen(
                                  selectedRoom,
                                  sch.day,
                                  sch.campus,
                                  {
                                    ...slot,
                                    slot_timing:
                                      sch.teacher[0]._id ===
                                        sch.teacher[1]._id &&
                                      sch.subject[0]._id ===
                                        sch.subject[1]._id &&
                                      sch.class[0]._id === sch.class[1]._id
                                        ? slot.slot_timing
                                        : [slot.slot_timing[s_index]],
                                    friday_slot_timing: [
                                      slot.friday_slot_timing[s_index],
                                    ],
                                  },
                                  sch._id,
                                  [],
                                  [],
                                  [],

                                  sch.day === "Friday"
                                    ? [
                                        `${slot.friday_slot_timing[s_index]
                                          ?.split("to")[0]
                                          .trim()} - ${slot.friday_slot_timing[
                                          s_index
                                        ]
                                          ?.split("to")[1]
                                          .trim()}`,
                                      ]
                                    : [
                                        `${slot.slot_timing[s_index]
                                          ?.split("to")[0]
                                          .trim()} - ${slot.slot_timing[s_index]
                                          ?.split("to")[1]
                                          .trim()}`,
                                      ],
                                  false,
                                  true
                                )
                              }
                              className={`lab-td 
                              ${
                                isCancelled(sch, s_index)
                                  ? "lab-td-cancelled"
                                  : ""
                              }`}
                              rowSpan={rowSpan}
                            >
                              <pre>
                                {rowSpan === 1
                                  ? `${sch.class[s_index]?.program} ${
                                      sch.class[s_index]?.semester
                                    } ${sch.class[s_index]?.section}
                                  \n${sch.subject[s_index]?.course_name}
                                  \n${sch.teacher[s_index]?.faculty_name}
                                  \n${sch.Time[s_index]?.substr(
                                    0,
                                    7
                                  )}${sch.Time[s_index]?.substr(7)}`
                                  : `${sch.class[0]?.program} ${
                                      sch.class[0]?.semester
                                    } ${sch.class[0]?.section}\n${
                                      sch.subject[0]?.course_name
                                    }\n${
                                      sch.teacher[0]?.faculty_name
                                    }\n${sch.Time[0]?.substr(
                                      0,
                                      7
                                    )}${sch.Time[1]?.substr(7)}`}
                              </pre>
                            </td>
                          </React.Fragment>
                        );
                      } else if (sch.Time.length === 1) {
                        let rowSpan = 0;
                        if (sch.day === "Friday" && sch.slot <= 4) {
                          if (
                            sch.Time[0].split("-")[0].trim() ===
                              slot.friday_slot_timing[s_index]
                                ?.split("to")[0]
                                .trim() &&
                            sch.Time[0].split("-")[1].trim() ===
                              slot.friday_slot_timing[s_index]
                                ?.split("to")[1]
                                .trim()
                          ) {
                            if (s_index !== 1) {
                              printOhArr.push({ day: sch.day, slot: sch.slot });
                            }
                            rowSpan = 1;
                          } else if (
                            sch.Time[0].split("-")[0].trim() ===
                              slot.friday_slot_timing[s_index]
                                ?.split("to")[0]
                                .trim() &&
                            sch.Time[0].split("-")[1].trim() !==
                              slot.friday_slot_timing[s_index]
                                ?.split("to")[1]
                                .trim()
                          ) {
                            rowSpan = 2;
                          } else if (
                            sch.Time[0].split("-")[0].trim() !==
                              slot.friday_slot_timing[s_index]
                                ?.split("to")[0]
                                .trim() &&
                            sch.Time[0].split("-")[0].trim() ===
                              slot.friday_slot_timing[s_index]
                                ?.split("to")[1]
                                .trim()
                          ) {
                            return (
                              <td
                                className="lab-td"
                                key={sch._id}
                                onClick={() =>
                                  role === "Faculty" &&
                                  handleClickOpen(
                                    selectedRoom,
                                    sch.day,
                                    sch.campus,
                                    {
                                      ...slot,
                                      slot_timing: [slot.slot_timing[0]],
                                      friday_slot_timing: [
                                        slot.friday_slot_timing[0],
                                      ],
                                    },
                                    sch._id,
                                    [],
                                    [],
                                    [],

                                    sch.day === "Friday"
                                      ? [
                                          `${slot.friday_slot_timing[0]
                                            .split("to")[0]
                                            .trim()} - ${slot.friday_slot_timing[0]
                                            .split("to")[1]
                                            .trim()}`,
                                        ]
                                      : [
                                          `${slot.slot_timing[0]
                                            .split("to")[0]
                                            .trim()} - ${slot.slot_timing[0]
                                            .split("to")[1]
                                            .trim()}`,
                                        ],
                                    false,
                                    true
                                  )
                                }
                              >
                                <pre>O-H</pre>
                              </td>
                            );
                          } else if (
                            sch.Time[0].split("-")[0].trim() !==
                              slot.friday_slot_timing[s_index]
                                ?.split("to")[0]
                                .trim() &&
                            sch.Time[0].split("-")[1].trim() ===
                              slot.friday_slot_timing[s_index]
                                ?.split("to")[1]
                                .trim()
                          ) {
                            return (
                              <td
                                className="lab-td"
                                key={sch._id}
                                onClick={() =>
                                  role === "Faculty" &&
                                  handleClickOpen(
                                    selectedRoom,
                                    sch.day,
                                    sch.campus,
                                    slot,
                                    sch._id,
                                    [],
                                    [],
                                    [],
                                    sch.Time,
                                    false,
                                    true
                                  )
                                }
                              >
                                <pre>O-H</pre>
                              </td>
                            );
                          }
                        } else if (
                          sch.Time[0].split("-")[0].trim() ===
                            s.split("to")[0].trim() &&
                          sch.Time[0].split("-")[1].trim() ===
                            s.split("to")[1].trim()
                        ) {
                          if (s_index !== 1) {
                            printOhArr.push({ day: sch.day, slot: sch.slot });
                          }
                          rowSpan = 1;
                        } else if (
                          sch.Time[0].split("-")[0].trim() ===
                            s.split("to")[0].trim() &&
                          sch.Time[0].split("-")[1].trim() !==
                            s.split("to")[1].trim()
                        )
                          rowSpan = 2;
                        else if (
                          sch.Time[0].split("-")[0].trim() !==
                            s.split("to")[0].trim() &&
                          sch.Time[0].split("-")[0].trim() ===
                            s.split("to")[1].trim()
                        ) {
                          return (
                            <td
                              className="lab-td"
                              key={sch._id}
                              onClick={() =>
                                role === "Faculty" &&
                                handleClickOpen(
                                  selectedRoom,
                                  sch.day,
                                  sch.campus,
                                  {
                                    ...slot,
                                    slot_timing: [slot.slot_timing[0]],
                                    friday_slot_timing: [
                                      slot.friday_slot_timing[0],
                                    ],
                                  },
                                  sch._id,
                                  [],
                                  [],
                                  [],

                                  sch.day === "Friday"
                                    ? [slot.friday_slot_timing[0]]
                                    : [
                                        `${slot.slot_timing[0]
                                          .split("to")[0]
                                          .trim()} - ${slot.slot_timing[0]
                                          .split("to")[1]
                                          .trim()}`,
                                      ],

                                  false,
                                  true
                                )
                              }
                            >
                              <pre>O-H</pre>
                            </td>
                          );
                        }

                        if (rowSpan === 2) arr.push(sch._id);
                        return (
                          <React.Fragment key={sch._id}>
                            {slot.friday_slot_timing.length === 0 &&
                              s_index !== 1 &&
                              currentDay === 5 && (
                                <td className="break-td" rowSpan={2}>
                                  <pre>{`NAMAZ BREAK\n${slot.slot_timing[0]
                                    .split("to")[0]
                                    .trim()} - ${slot.slot_timing[1]
                                    .split("to")[1]
                                    .trim()}`}</pre>
                                </td>
                              )}
                            <td
                              className={`lab-td 
                              ${
                                isCancelled(sch, s_index)
                                  ? "lab-td-cancelled"
                                  : ""
                              }`}
                              onClick={() => {
                                const index =
                                  sch.selectedDay === "Friday"
                                    ? slot.friday_slot_timing.indexOf(
                                        sch.Time[0].replace("-", "to")
                                      )
                                    : slot.slot_timing.indexOf(
                                        sch.Time[0].replace("-", "to")
                                      );
                                role === "Faculty" &&
                                  isCancelled(sch, s_index) &&
                                  handleClickOpen(
                                    selectedRoom,
                                    sch.day,
                                    sch.campus,
                                    {
                                      ...slot,
                                      slot_timing:
                                        index === -1
                                          ? slot.slot_timing
                                          : [slot.slot_timing[index]],
                                      friday_slot_timing:
                                        index === -1
                                          ? slot.slot_timing
                                          : [slot.friday_slot_timing[index]],
                                    },
                                    sch._id,
                                    [],
                                    [],
                                    [],

                                    sch.day === "Friday"
                                      ? [slot.friday_slot_timing[index]]
                                      : [
                                          `${slot.slot_timing[
                                            index === -1 ? 0 : index
                                          ]
                                            .split("to")[0]
                                            .trim()} - ${slot.slot_timing[
                                            index === -1 ? 0 : index
                                          ]
                                            .split("to")[1]
                                            .trim()}`,
                                        ],

                                    false,
                                    true
                                  );
                              }}
                              rowSpan={rowSpan}
                            >
                              <pre>
                                {sch.class.map((cls, index) => {
                                  return `${cls.program} ${cls.semester} ${
                                    cls.section
                                  }${
                                    index !== sch.class.length - 1 ? "," : ""
                                  }\n`;
                                })}
                                {`${sch.subject[0]?.course_name}\n${
                                  sch.teacher[0]?.faculty_name
                                }\n${sch.Time[0]?.substr(
                                  0,
                                  7
                                )}${sch.Time[0]?.substr(7)}`}
                              </pre>
                            </td>
                          </React.Fragment>
                        );
                      } else {
                        let rowSpan = 0;
                        for (const next_oh of labSchedule) {
                          let shouldBreak = false;
                          for (let index = 0; index < 2; index++) {
                            if (
                              next_oh.day === sch.day &&
                              next_oh.slot === sch.slot
                            ) {
                              if (next_oh.subject.length !== 0) {
                                shouldBreak = true;
                                break;
                              }
                              rowSpan++;
                              arr.push(next_oh._id);
                            }
                          }
                          if (shouldBreak) break;
                        }
                        if (
                          slot.friday_slot_timing.length === 0 &&
                          s_index !== 1 &&
                          currentDay === 5
                        ) {
                          return (
                            <React.Fragment key={sch._id}>
                              <td className="break-td" rowSpan={2}>
                                <pre>{`NAMAZ BREAK\n${slot.slot_timing[0]
                                  .split("to")[0]
                                  .trim()} - ${slot.slot_timing[1]
                                  .split("to")[1]
                                  .trim()}`}</pre>
                              </td>
                              <td
                                rowSpan={rowSpan}
                                className="lab-td"
                                key={sch._id}
                                onClick={() =>
                                  role === "Faculty" &&
                                  handleClickOpen(
                                    selectedRoom,
                                    sch.day,
                                    sch.campus,
                                    slot,
                                    sch._id,
                                    [],
                                    [],
                                    [],
                                    sch.Time,
                                    false,
                                    true
                                  )
                                }
                              >
                                <pre>O-H</pre>
                              </td>
                            </React.Fragment>
                          );
                        }
                        return (
                          <td
                            rowSpan={rowSpan}
                            className="lab-td"
                            key={sch._id}
                            onClick={() =>
                              role === "Faculty" &&
                              handleClickOpen(
                                selectedRoom,
                                sch.day,
                                sch.campus,
                                slot,
                                sch._id,
                                [],
                                [],
                                [],
                                sch.Time,
                                false,
                                true
                              )
                            }
                          >
                            <pre>O-H</pre>
                          </td>
                        );
                      }
                    }
                    return null;
                  })}
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </>
  );
}

export default LabSchedule;
