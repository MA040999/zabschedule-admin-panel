import app from "../axiosConfig";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import UpdateDialog from "./UpdateDialog";

function LabSchedule() {
  //   const [timing, setTiming] = useState([]);
  const dispatch = useDispatch();

  const slots = useSelector((state) => state.schedule.slots);
  const labSchedule = useSelector((state) => state.schedule.labSchedule).filter(
    (sch) => sch.room === "C-Lab 3(R-207)"
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
            return slot.slot_timing.map((s, s_index) => {
              return (
                <tr key={slot._id + s_index}>
                  <th className="time-th">{s}</th>

                  {labSchedule.map((sch) => {
                    if (sch.slot === slot.slot) {
                      if (arr.includes(sch._id)) return null;

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
                                  <pre>{`NAMAZ BREAK\n${slot.slot_timing}`}</pre>
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
                                  ? `${sch.class[s_index].program} ${
                                      sch.class[s_index].semester
                                    } ${sch.class[s_index].section}
                                  \n${sch.subject[s_index].course_name}
                                  \n${sch.teacher[s_index].faculty_name}
                                  \n${sch.Time[s_index].substr(0, 7)}${sch.Time[
                                      s_index
                                    ].substr(7)}`
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
                        let rowSpan =
                          sch.Time[0].split("-")[0].trim() ===
                            s.split("to")[0].trim() &&
                          sch.Time[0].split("-")[1].trim() ===
                            s.split("to")[1].trim()
                            ? "1"
                            : "2";
                        if (rowSpan === "2") arr.push(sch._id);
                        return (
                          <React.Fragment key={sch._id}>
                            {slot.friday_slot_timing.length === 0 &&
                              sch.day === "Saturday" &&
                              slot.slot === 3 && (
                                <td className="break-td" rowSpan={2}>
                                  <pre>{`NAMAZ BREAK\n${slot.slot_timing}`}</pre>
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
                        return (
                          <td className="lab-td" key={sch._id}>
                            O-H
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
