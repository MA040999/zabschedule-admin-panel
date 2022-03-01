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
                  if (sortedSchedule[i + jIndex]?.Time.length === 1) {
                    const tempSchedule = sortedSchedule[i + jIndex];
                    if (
                      (tempSchedule.selectedDay !== "Friday" &&
                        tempSchedule.Time[0].replace("-", "to") ===
                          slots[jIndex].slot_timing[1]) ||
                      (tempSchedule.selectedDay === "Friday" &&
                        tempSchedule.Time[0].replace("-", "to") ===
                          slots[jIndex].friday_slot_timing[1])
                    ) {
                      const newSchedule = {
                        ...schedule,
                        class: [undefined, tempSchedule?.class[0]],
                        subject: [undefined, tempSchedule?.subject[0]],
                        teacher: [undefined, tempSchedule?.teacher[0]],
                        Time: [
                          tempSchedule.selectedDay !== "Friday"
                            ? slots[jIndex].slot_timing[0].replace("to", "-")
                            : slots[jIndex].friday_slot_timing[0].replace(
                                "to",
                                "-"
                              ),
                          tempSchedule?.Time[0],
                        ],
                      };
                      dispatch(
                        toggleModal(
                          schedule.room,
                          selectedDay,
                          campus,
                          selectedDay === "Friday" &&
                            slots[j].slot >= fridayEmptySlot[0].slot
                            ? slots[jIndex + 1]
                            : slots[jIndex],
                          schedule.room === newSchedule.room
                            ? newSchedule._id
                            : undefined,
                          !newSchedule.isCancelled ||
                            newSchedule.isMakeUpClass ||
                            (newSchedule.cancelledClassIndex !== undefined &&
                              newSchedule.cancelledClassIndex !== null &&
                              newSchedule.cancelledClassIndex !== 10)
                            ? newSchedule.teacher
                                .filter(
                                  (teacher, tIndex) =>
                                    sortedSchedule[i + jIndex]
                                      ?.cancelledClassIndex !== tIndex ||
                                    (typeof sortedSchedule[i + jIndex]
                                      ?.cancelledClassIndex === "number" &&
                                      typeof sortedSchedule[i + jIndex]
                                        ?.normalClassIndex === "number" &&
                                      sortedSchedule[i + jIndex]
                                        ?.cancelledClassIndex !==
                                        sortedSchedule[i + jIndex]
                                          ?.normalClassIndex &&
                                      sortedSchedule[i + jIndex]?.isCancelled &&
                                      sortedSchedule[i + jIndex]
                                        ?.isMakeUpClass) ||
                                    teacher === undefined
                                )
                                .map((teacher) =>
                                  teacher ? teacher._id : undefined
                                )
                            : [],
                          !newSchedule.isCancelled ||
                            newSchedule.isMakeUpClass ||
                            (newSchedule.cancelledClassIndex !== undefined &&
                              newSchedule.cancelledClassIndex !== null &&
                              newSchedule.cancelledClassIndex !== 10)
                            ? newSchedule.subject
                                .filter(
                                  (_, sIndex) =>
                                    sortedSchedule[i + jIndex]
                                      ?.cancelledClassIndex !== sIndex ||
                                    (typeof sortedSchedule[i + jIndex]
                                      ?.cancelledClassIndex === "number" &&
                                      typeof sortedSchedule[i + jIndex]
                                        ?.normalClassIndex === "number" &&
                                      sortedSchedule[i + jIndex]
                                        ?.cancelledClassIndex !==
                                        sortedSchedule[i + jIndex]
                                          ?.normalClassIndex &&
                                      sortedSchedule[i + jIndex]?.isCancelled &&
                                      sortedSchedule[i + jIndex]?.isMakeUpClass)
                                )
                                .map((subject) =>
                                  subject ? subject._id : undefined
                                )
                            : [],
                          !newSchedule.isCancelled ||
                            newSchedule.isMakeUpClass ||
                            (newSchedule.cancelledClassIndex !== undefined &&
                              newSchedule.cancelledClassIndex !== null &&
                              newSchedule.cancelledClassIndex !== 10)
                            ? newSchedule.class
                                .filter(
                                  (_, cIndex) =>
                                    sortedSchedule[i + jIndex]
                                      ?.cancelledClassIndex !== cIndex ||
                                    (typeof sortedSchedule[i + jIndex]
                                      ?.cancelledClassIndex === "number" &&
                                      typeof sortedSchedule[i + jIndex]
                                        ?.normalClassIndex === "number" &&
                                      sortedSchedule[i + jIndex]
                                        ?.cancelledClassIndex !==
                                        sortedSchedule[i + jIndex]
                                          ?.normalClassIndex &&
                                      sortedSchedule[i + jIndex]?.isCancelled &&
                                      sortedSchedule[i + jIndex]?.isMakeUpClass)
                                )
                                .map((cls) => (cls ? cls._id : undefined))
                            : [],
                          !newSchedule.isCancelled ||
                            newSchedule.isMakeUpClass ||
                            (newSchedule.cancelledClassIndex !== undefined &&
                              newSchedule.cancelledClassIndex !== null &&
                              newSchedule.cancelledClassIndex !== 10)
                            ? newSchedule.Time.filter(
                                (_, timeIndex) =>
                                  sortedSchedule[i + jIndex]
                                    ?.cancelledClassIndex !== timeIndex ||
                                  (typeof sortedSchedule[i + jIndex]
                                    ?.cancelledClassIndex === "number" &&
                                    typeof sortedSchedule[i + jIndex]
                                      ?.normalClassIndex === "number" &&
                                    sortedSchedule[i + jIndex]
                                      ?.cancelledClassIndex !==
                                      sortedSchedule[i + jIndex]
                                        ?.normalClassIndex &&
                                    sortedSchedule[i + jIndex]?.isCancelled &&
                                    sortedSchedule[i + jIndex]?.isMakeUpClass)
                              )
                            : [],
                          (!newSchedule.isCancelled ||
                            newSchedule.isMakeUpClass) &&
                            sortedSchedule[i + jIndex].subject.length > 0,
                          false,
                          sortedSchedule[i + jIndex].isMakeUpClass,
                          sortedSchedule[i + jIndex].isCancelled,
                          sortedSchedule[i + jIndex].cancelledClassIndex,
                          sortedSchedule[i + jIndex].normalClassIndex
                        )
                      );
                      return;
                    }
                  }
                  console.log(
                    "sortedSchedule[i + jIndex]",
                    sortedSchedule[i + jIndex]
                  );
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
                      !sortedSchedule[i + j]?.isCancelled ||
                        sortedSchedule[i + j]?.isMakeUpClass ||
                        (sortedSchedule[i + j]?.cancelledClassIndex !==
                          undefined &&
                          sortedSchedule[i + j]?.cancelledClassIndex !== null &&
                          sortedSchedule[i + j]?.cancelledClassIndex !== 10)
                        ? sortedSchedule[i + jIndex].teacher
                            .filter(
                              (_, tIndex) =>
                                sortedSchedule[i + jIndex]?.normalClassIndex ===
                                  10 ||
                                (sortedSchedule[i + jIndex].teacher.length ===
                                  2 &&
                                  typeof sortedSchedule[i + jIndex]
                                    ?.cancelledClassIndex === "number") ||
                                sortedSchedule[i + jIndex]
                                  ?.cancelledClassIndex !== tIndex ||
                                (typeof sortedSchedule[i + jIndex]
                                  ?.cancelledClassIndex === "number" &&
                                  typeof sortedSchedule[i + jIndex]
                                    ?.normalClassIndex === "number" &&
                                  sortedSchedule[i + jIndex]
                                    ?.cancelledClassIndex !==
                                    sortedSchedule[i + jIndex]
                                      ?.normalClassIndex &&
                                  sortedSchedule[i + jIndex]?.isCancelled &&
                                  sortedSchedule[i + jIndex]?.isMakeUpClass)
                            )
                            .map((teacher, index) =>
                              sortedSchedule[i + jIndex].teacher.length === 2 &&
                              sortedSchedule[i + jIndex]
                                ?.cancelledClassIndex === index &&
                              sortedSchedule[i + jIndex]?.isMakeUpClass &&
                              sortedSchedule[i + jIndex]?.normalClassIndex ===
                                index
                                ? sortedSchedule[i + jIndex]
                                    ?.normalClassIndex === 10
                                  ? teacher._id
                                  : undefined
                                : teacher._id
                            )
                        : [],
                      !sortedSchedule[i + j]?.isCancelled ||
                        sortedSchedule[i + j]?.isMakeUpClass ||
                        (sortedSchedule[i + j]?.cancelledClassIndex !==
                          undefined &&
                          sortedSchedule[i + j]?.cancelledClassIndex !== null &&
                          sortedSchedule[i + j]?.cancelledClassIndex !== 10)
                        ? sortedSchedule[i + jIndex].subject
                            .filter(
                              (_, sIndex) =>
                                sortedSchedule[i + jIndex]?.normalClassIndex ===
                                  10 ||
                                (sortedSchedule[i + jIndex].teacher.length ===
                                  2 &&
                                  typeof sortedSchedule[i + jIndex]
                                    ?.cancelledClassIndex === "number") ||
                                sortedSchedule[i + jIndex]
                                  ?.cancelledClassIndex !== sIndex ||
                                (typeof sortedSchedule[i + jIndex]
                                  ?.cancelledClassIndex === "number" &&
                                  typeof sortedSchedule[i + jIndex]
                                    ?.normalClassIndex === "number" &&
                                  sortedSchedule[i + jIndex]
                                    ?.cancelledClassIndex !==
                                    sortedSchedule[i + jIndex]
                                      ?.normalClassIndex &&
                                  sortedSchedule[i + jIndex]?.isCancelled &&
                                  sortedSchedule[i + jIndex]?.isMakeUpClass)
                            )
                            .map((subject, index) =>
                              sortedSchedule[i + jIndex].subject.length === 2 &&
                              sortedSchedule[i + jIndex]
                                ?.cancelledClassIndex === index &&
                              sortedSchedule[i + jIndex]?.isMakeUpClass &&
                              sortedSchedule[i + jIndex]?.normalClassIndex ===
                                index
                                ? sortedSchedule[i + jIndex]
                                    ?.normalClassIndex === 10
                                  ? subject._id
                                  : undefined
                                : subject._id
                            )
                        : [],
                      !sortedSchedule[i + j]?.isCancelled ||
                        sortedSchedule[i + j]?.isMakeUpClass ||
                        (sortedSchedule[i + j]?.cancelledClassIndex !==
                          undefined &&
                          sortedSchedule[i + j]?.cancelledClassIndex !== null &&
                          sortedSchedule[i + j]?.cancelledClassIndex !== 10)
                        ? sortedSchedule[i + jIndex].class
                            .filter(
                              (_, cIndex) =>
                                sortedSchedule[i + jIndex]?.normalClassIndex ===
                                  10 ||
                                (sortedSchedule[i + jIndex].teacher.length ===
                                  2 &&
                                  typeof sortedSchedule[i + jIndex]
                                    ?.cancelledClassIndex === "number") ||
                                sortedSchedule[i + jIndex]
                                  ?.cancelledClassIndex !== cIndex ||
                                (typeof sortedSchedule[i + jIndex]
                                  ?.cancelledClassIndex === "number" &&
                                  typeof sortedSchedule[i + jIndex]
                                    ?.normalClassIndex === "number" &&
                                  sortedSchedule[i + jIndex]
                                    ?.cancelledClassIndex !==
                                    sortedSchedule[i + jIndex]
                                      ?.normalClassIndex &&
                                  sortedSchedule[i + jIndex]?.isCancelled &&
                                  sortedSchedule[i + jIndex]?.isMakeUpClass)
                            )
                            .map((cls, index) =>
                              sortedSchedule[i + jIndex].class.length === 2 &&
                              sortedSchedule[i + jIndex]
                                ?.cancelledClassIndex === index &&
                              sortedSchedule[i + jIndex]?.isMakeUpClass &&
                              sortedSchedule[i + jIndex]?.normalClassIndex ===
                                index
                                ? sortedSchedule[i + jIndex]
                                    ?.normalClassIndex === 10
                                  ? cls._id
                                  : undefined
                                : cls._id
                            )
                        : [],
                      !sortedSchedule[i + j]?.isCancelled ||
                        sortedSchedule[i + j]?.isMakeUpClass ||
                        (sortedSchedule[i + j]?.cancelledClassIndex !==
                          undefined &&
                          sortedSchedule[i + j]?.cancelledClassIndex !== null &&
                          sortedSchedule[i + j]?.cancelledClassIndex !== 10)
                        ? sortedSchedule[i + jIndex].Time.filter(
                            (_, timeIndex) =>
                              sortedSchedule[i + jIndex]?.normalClassIndex ===
                                10 ||
                              (sortedSchedule[i + jIndex].teacher.length ===
                                2 &&
                                typeof sortedSchedule[i + jIndex]
                                  ?.cancelledClassIndex === "number") ||
                              sortedSchedule[i + jIndex]
                                ?.cancelledClassIndex !== timeIndex ||
                              (typeof sortedSchedule[i + jIndex]
                                ?.cancelledClassIndex === "number" &&
                                typeof sortedSchedule[i + jIndex]
                                  ?.normalClassIndex === "number" &&
                                sortedSchedule[i + jIndex]
                                  ?.cancelledClassIndex !==
                                  sortedSchedule[i + jIndex]
                                    ?.normalClassIndex &&
                                sortedSchedule[i + jIndex]?.isCancelled &&
                                sortedSchedule[i + jIndex]?.isMakeUpClass)
                          )
                        : [],
                      (!sortedSchedule[i + j]?.isCancelled ||
                        sortedSchedule[i + j]?.isMakeUpClass) &&
                        sortedSchedule[i + jIndex].subject.length > 0,
                      false,
                      sortedSchedule[i + jIndex].isMakeUpClass,
                      sortedSchedule[i + jIndex].isCancelled,
                      sortedSchedule[i + jIndex].cancelledClassIndex,
                      sortedSchedule[i + jIndex].normalClassIndex
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
                            <span
                              className={`${
                                sortedSchedule[i + j]?.isMakeUpClass === true &&
                                (sortedSchedule[i + j]?.normalClassIndex !==
                                  t ||
                                  sortedSchedule[i + j]?.cancelledClassIndex ===
                                    10 ||
                                  sortedSchedule[i + j]?.normalClassIndex ===
                                    10)
                                  ? `makeup`
                                  : ""
                              } ${
                                sortedSchedule[i + j]?.isCancelled === true &&
                                (sortedSchedule[i + j]?.isMakeUpClass !==
                                  true ||
                                  sortedSchedule[i + j]?.normalClassIndex ===
                                    t) &&
                                (sortedSchedule[i + j]?.cancelledClassIndex !==
                                  undefined ||
                                  sortedSchedule[i + j]?.cancelledClassIndex !==
                                    null)
                                  ? sortedSchedule[i + j]
                                      ?.cancelledClassIndex === t ||
                                    sortedSchedule[i + j]
                                      ?.cancelledClassIndex === 10 ||
                                    sortedSchedule[i + j]
                                      ?.cancelledClassIndex === null
                                    ? `cancelled`
                                    : ""
                                  : sortedSchedule[i + j]?.isCancelled ===
                                      true &&
                                    sortedSchedule[i + j]?.isMakeUpClass !==
                                      true
                                  ? `cancelled`
                                  : ""
                              }`}
                              key={t}
                            >
                              {teacher.faculty_name}
                            </span>
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
                            <span
                              className={`${
                                sortedSchedule[i + j]?.isMakeUpClass === true &&
                                (sortedSchedule[i + j]?.normalClassIndex !==
                                  s ||
                                  sortedSchedule[i + j]?.cancelledClassIndex ===
                                    10 ||
                                  sortedSchedule[i + j]?.normalClassIndex ===
                                    10)
                                  ? `makeup`
                                  : ""
                              } ${
                                sortedSchedule[i + j]?.isCancelled === true &&
                                (sortedSchedule[i + j]?.isMakeUpClass !==
                                  true ||
                                  sortedSchedule[i + j]?.normalClassIndex ===
                                    s) &&
                                (sortedSchedule[i + j]?.cancelledClassIndex !==
                                  undefined ||
                                  sortedSchedule[i + j]?.cancelledClassIndex !==
                                    null)
                                  ? sortedSchedule[i + j]
                                      ?.cancelledClassIndex === s ||
                                    sortedSchedule[i + j]
                                      ?.cancelledClassIndex === 10 ||
                                    sortedSchedule[i + j]
                                      ?.cancelledClassIndex === null
                                    ? `cancelled`
                                    : ""
                                  : sortedSchedule[i + j]?.isCancelled ===
                                      true &&
                                    sortedSchedule[i + j]?.isMakeUpClass !==
                                      true
                                  ? `cancelled`
                                  : ""
                              }`}
                              key={s}
                            >
                              {subject.course_name}
                            </span>
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
                          <span className="class-span" key={k}>
                            <span
                              className={`${
                                sortedSchedule[i + j]?.isMakeUpClass === true &&
                                (sortedSchedule[i + j]?.normalClassIndex !==
                                  k ||
                                  sortedSchedule[i + j]?.cancelledClassIndex ===
                                    10 ||
                                  sortedSchedule[i + j]?.normalClassIndex ===
                                    10)
                                  ? `makeup`
                                  : ""
                              } ${
                                sortedSchedule[i + j]?.isCancelled === true &&
                                (sortedSchedule[i + j]?.isMakeUpClass !==
                                  true ||
                                  sortedSchedule[i + j]?.normalClassIndex ===
                                    k) &&
                                (sortedSchedule[i + j]?.cancelledClassIndex !==
                                  undefined ||
                                  sortedSchedule[i + j]?.cancelledClassIndex !==
                                    null)
                                  ? sortedSchedule[i + j]
                                      ?.cancelledClassIndex === k ||
                                    sortedSchedule[i + j]
                                      ?.cancelledClassIndex === 10 ||
                                    sortedSchedule[i + j]
                                      ?.cancelledClassIndex === null
                                    ? `cancelled`
                                    : ""
                                  : sortedSchedule[i + j]?.isCancelled ===
                                      true &&
                                    sortedSchedule[i + j]?.isMakeUpClass !==
                                      true
                                  ? `cancelled`
                                  : ""
                              }`}
                            >{`${cls.program} ${cls.semester} ${cls.section}`}</span>
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
                                    className={`${
                                      sortedSchedule[i + j]?.isMakeUpClass ===
                                        true &&
                                      (sortedSchedule[i + j]
                                        ?.normalClassIndex !== c ||
                                        sortedSchedule[i + j]
                                          ?.cancelledClassIndex === 10 ||
                                        sortedSchedule[i + j]
                                          ?.normalClassIndex === 10)
                                        ? `makeup`
                                        : ""
                                    } ${
                                      sortedSchedule[i + j]?.isCancelled ===
                                        true &&
                                      (sortedSchedule[i + j]?.isMakeUpClass !==
                                        true ||
                                        sortedSchedule[i + j]
                                          ?.normalClassIndex === c) &&
                                      (sortedSchedule[i + j]
                                        ?.cancelledClassIndex !== undefined ||
                                        sortedSchedule[i + j]
                                          ?.cancelledClassIndex !== null)
                                        ? sortedSchedule[i + j]
                                            ?.cancelledClassIndex === c ||
                                          sortedSchedule[i + j]
                                            ?.cancelledClassIndex === 10 ||
                                          sortedSchedule[i + j]
                                            ?.cancelledClassIndex === null
                                          ? `cancelled`
                                          : ""
                                        : sortedSchedule[i + j]?.isCancelled ===
                                            true &&
                                          sortedSchedule[i + j]
                                            ?.isMakeUpClass !== true
                                        ? `cancelled`
                                        : ""
                                    }`}
                                    key={c}
                                  >{`${cls.program} ${cls.semester} ${cls.section}`}</span>
                                ) : (
                                  <span
                                    key={c}
                                    className={`${
                                      sortedSchedule[i + j]?.isMakeUpClass ===
                                        true &&
                                      (sortedSchedule[i + j]
                                        ?.normalClassIndex !== c ||
                                        sortedSchedule[i + j]
                                          ?.cancelledClassIndex === 10 ||
                                        sortedSchedule[i + j]
                                          ?.normalClassIndex === 10)
                                        ? `makeup`
                                        : ""
                                    } ${
                                      sortedSchedule[i + j]?.isCancelled ===
                                        true &&
                                      (sortedSchedule[i + j]?.isMakeUpClass !==
                                        true ||
                                        sortedSchedule[i + j]
                                          ?.normalClassIndex === c) &&
                                      (sortedSchedule[i + j]
                                        ?.cancelledClassIndex !== undefined ||
                                        sortedSchedule[i + j]
                                          ?.cancelledClassIndex !== null)
                                        ? sortedSchedule[i + j]
                                            ?.cancelledClassIndex === c ||
                                          sortedSchedule[i + j]
                                            ?.cancelledClassIndex === 10 ||
                                          sortedSchedule[i + j]
                                            ?.cancelledClassIndex === null
                                          ? `cancelled`
                                          : ""
                                        : sortedSchedule[i + j]?.isCancelled ===
                                            true &&
                                          sortedSchedule[i + j]
                                            ?.isMakeUpClass !== true
                                        ? `cancelled`
                                        : ""
                                    }`}
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
