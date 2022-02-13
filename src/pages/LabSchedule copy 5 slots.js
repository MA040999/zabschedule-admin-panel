import app from "../axiosConfig";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

// import UpdateDialog from "./UpdateDialog";

function LabSchedule() {
  //   const [timing, setTiming] = useState([]);
  const dispatch = useDispatch();

  const slots = useSelector((state) => state.schedule.slots);
  const labSchedule = useSelector((state) => state.schedule.labSchedule).filter(
    (sch) => sch.room === "C-Lab 5(R-308)"
  );

  const schedule = useSelector((state) => state.schedule.schedule);
  //   const [schedule, setSchedule] = useState([]);
  const [open, setOpen] = useState(false);

  const [day, setDay] = useState("");
  const [bool, setBool] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [time, setTime] = useState("");
  const [twoSlots, setTwoSlots] = useState(false);

  //   let getSchedule = () => {
  //       app.get("/api/lab/").then((res) => {
  //         let [timings, sch] = res.data;
  //         setTiming(timings);
  //         setSchedule(sch);
  //       });
  //   };

  // let getCourses = () => {
  //   const class_arr = [];
  //   const course_arr = [];

  //   axios.get("/api/lab/courses").then((res) => {
  //     let courses = res.data;

  //     courses.map((course) => {
  //       Object.keys(course).map((k) => {
  //         if (k === "class") {
  //           if (!class_arr.includes(course.class)) {
  //             class_arr.push(course.class);
  //           }
  //         } else if (k === "name") {
  //           if (!course_arr.includes(course.name)) {
  //             course_arr.push(course.name);
  //           }
  //         }
  //         return null;
  //       });

  //       // if (
  //       //   Object.getOwnPropertyNames(course).includes("class") &&
  //       //   course.class !== null
  //       // ) {
  //       //   if (!class_arr.includes(course.class)) {
  //       //     class_arr.push(course.class);
  //       //   }
  //       // }
  //       return null;
  //     });

  //     setSection(class_arr);

  //     setCourse(course_arr);
  //   });
  // };

  const handleClickOpen = (day, course, faculty, time, isTwo) => {
    setDay(day);
    if (time === undefined) {
      setTime("");
      setSelectedCourse("");
      setSelectedFaculty("");
      setTwoSlots(false);
    } else {
      setTime(time);
      setSelectedCourse(course);
      setSelectedFaculty(faculty);
      setTwoSlots(isTwo);
    }

    setOpen(true);
  };

  const arr = [];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  console.log("labSchedule", labSchedule);

  if (labSchedule.length === 0) {
    return <Loader />;
  }
  return (
    <div className="body-container">
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
          {slots.map((slot, slot_index) => {
            return (
              <tr key={slot._id + slot_index}>
                <th className="time-th">{slot.slot_timing}</th>

                {labSchedule.map((sch) => {
                  console.log("sch", sch);
                  if (arr.includes(sch._id)) return null;
                  if (sch.slot === slot.slot) {
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
                          ? "2"
                          : "1";
                      if (rowSpan === "2") arr.push(sch._id);

                      return (
                        <React.Fragment key={sch._id}>
                          {slot.friday_slot_timing.length === 0 &&
                            sch.day === "Saturday" &&
                            slot.slot === 3 && (
                              <td className="break-td" rowSpan={2}>
                                <pre>{`NAMAZ BREAK\n${slot.slot_timing[0]
                                  .split("to")[0]
                                  .trim()} - ${slot.slot_timing[1]
                                  .split("to")[1]
                                  .trim()}`}</pre>
                              </td>
                            )}
                          <td
                            // onClick={() => {
                            //   handleClickOpen(
                            //     sch.daynumber,
                            //     sch.course.courseid,
                            //     sch.faculty.facultyid,
                            //     sch.timingid,
                            //     isTwo
                            //   );
                            // }}
                            className="lab-td"
                            rowSpan={rowSpan}
                          >
                            <pre>
                              {rowSpan === "1"
                                ? `${sch.class[slot_index].program} ${
                                    sch.class[slot_index].semester
                                  } ${sch.class[slot_index].section}
                                  \n${sch.subject[slot_index].course_name}
                                  \n${sch.teacher[slot_index].faculty_name}
                                  \n${sch.Time[slot_index].substr(
                                    0,
                                    7
                                  )}${sch.Time[slot_index].substr(7)}`
                                : `${sch.class[0].program} ${
                                    sch.class[0].semester
                                  } ${sch.class[0].section}\n${
                                    sch.subject[0].course_name
                                  }\n${
                                    sch.teacher[0].faculty_name
                                  }\n${sch.Time[0].substr(
                                    0,
                                    7
                                  )}${sch.Time[1].substr(7)}`}
                            </pre>
                          </td>
                        </React.Fragment>
                      );
                    } else if (sch.Time.length === 1) {
                      // let rowSpan =
                      //   sch.Time[0].split("-")[0].trim() ===
                      //     s.split("to")[0].trim() &&
                      //   sch.Time[0].split("-")[1].trim() ===
                      //     s.split("to")[1].trim()
                      //     ? "1"
                      //     : "2";
                      // console.log("rowSpan", rowSpan);
                      // if (rowSpan === "2") arr.push(sch._id);
                      return (
                        <React.Fragment key={sch._id}>
                          {slot.friday_slot_timing.length === 0 &&
                            sch.day === "Saturday" &&
                            slot.slot === 3 && (
                              <td className="break-td" rowSpan={2}>
                                <pre>{`NAMAZ BREAK\n${slot.slot_timing[0]
                                  .split("to")[0]
                                  .trim()} - ${slot.slot_timing[1]
                                  .split("to")[1]
                                  .trim()}`}</pre>
                              </td>
                            )}
                          <td
                            // onClick={() => {
                            //   handleClickOpen(
                            //     sch.daynumber,
                            //     sch.course.courseid,
                            //     sch.faculty.facultyid,
                            //     sch.timingid,
                            //     isTwo
                            //   );
                            // }}
                            className="lab-td"
                            // rowSpan={rowSpan}
                          >
                            <pre>
                              {`${sch.class[0].program} ${
                                sch.class[0].semester
                              } ${sch.class[0].section}\n${
                                sch.subject[0].course_name
                              }\n${
                                sch.teacher[0].faculty_name
                              }\n${sch.Time[0].substr(
                                0,
                                7
                              )}${sch.Time[0].substr(7)}`}
                            </pre>
                          </td>
                        </React.Fragment>
                      );
                    } else {
                      let rowSpan = 1;
                      for (const next_oh of labSchedule) {
                        console.log(" next_oh.slot", next_oh.slot);
                        console.log(" sch.slot", sch.slot);
                        console.log(" next_oh.day", next_oh.day);
                        console.log(" sch.day", sch.day);
                        if (
                          next_oh.day === sch.day &&
                          next_oh.slot >= sch.slot
                        ) {
                          if (next_oh.subject.length !== 0) {
                            console.log("break", next_oh);
                            break;
                          }
                          rowSpan++;
                          arr.push(next_oh._id);
                          console.log("rowSpan", rowSpan);
                        }
                      }
                      return (
                        <td
                          rowSpan={
                            rowSpan > 2
                              ? rowSpan > 3
                                ? rowSpan + 2
                                : rowSpan + 1
                              : rowSpan
                          }
                          className="lab-td"
                          key={sch._id}
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
          })}
        </tbody>
      </table>
      {/* <UpdateDialog
        open={open}
        time={time}
        setTime={setTime}
        selectedCourse={selectedCourse}
        selectedFaculty={selectedFaculty}
        setSelectedCourse={setSelectedCourse}
        setSelectedFaculty={setSelectedFaculty}
        setOpen={setOpen}
        bool={bool}
        setBool={setBool}
        timing={timing}
        booked={booked}
        day={day}
        twoSlots={twoSlots}
      /> */}
      {/* <div>
        <pre>{JSON.stringify(selectedCourse, null, 2)}</pre>
      </div> */}
    </div>
  );
}

export default LabSchedule;
