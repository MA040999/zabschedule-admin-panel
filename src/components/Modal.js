import React, { useEffect, useState } from "react";
import { FiTrash, FiX, FiCheck, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { ordinal_suffix_of, tConvert } from "../common/common";
import { addNotificationMsg } from "../redux/auth/authActions";
import { addClass, toggleModal } from "../redux/schedule/scheduleAction";
import CustomSelect from "./CustomSelect";

function Modal({ faculty, courses, classes }) {
  const [rows, setRows] = useState(1);

  const modalState = useSelector((state) => state.schedule.isModalOpen);
  const modalData = useSelector((state) => state.schedule.modalData);

  const [relevantCoursesRow1, setRelevantCoursesRow1] = useState(courses);
  const [relevantCoursesRow2, setRelevantCoursesRow2] = useState(courses);

  const [relevantClassesRow1, setRelevantClassesRow1] = useState(classes);
  const [relevantClassesRow2, setRelevantClassesRow2] = useState(classes);

  const [relevantFacultyRow1, setRelevantFacultyRow1] = useState(faculty);
  const [relevantFacultyRow2, setRelevantFacultyRow2] = useState(faculty);

  const [selectedData, setSelectedData] = useState({
    Time: [],
    campus: modalData?.campus,
    class: [],
    day: modalData?.selectedDay,
    room: modalData?.room,
    slot: modalData?.slot?.slot,
    subject: [],
    teacher: [],
    _id: modalData?.id,
  });
  console.log(selectedData);

  const dispatch = useDispatch();
  const handleAddRow = () => {
    setRows(2);
    setSelectedData({
      ...selectedData,
      class: [selectedData.class[0]],
    });
  };
  const handleTrashClick = (i) => {
    if (i === 0) {
      setSelectedData({
        ...selectedData,
        Time: selectedData.Time[1] ? [undefined, selectedData.Time[1]] : [],
        class:
          rows === 1
            ? []
            : selectedData.class[1]
            ? [undefined, selectedData.class[1]]
            : [],
        subject: selectedData.subject[1]
          ? [undefined, selectedData.subject[1]]
          : [],
        teacher: selectedData.teacher[1]
          ? [undefined, selectedData.teacher[1]]
          : [],
      });
      setRelevantCoursesRow1(courses);
      setRelevantClassesRow1(classes);
      setRelevantFacultyRow1(faculty);
      document.getElementById(`from${i}`).value = "";
      document.getElementById(`to${i}`).value = "";
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
          ...selectedData,
          Time: selectedData.Time.filter((_, index) => index !== i),
          class: selectedData.class.filter((_, index) => index !== i),
          subject: selectedData.subject.filter((_, index) => index !== i),
          teacher: selectedData.teacher.filter((_, index) => index !== i),
        });
        setRelevantCoursesRow2(courses);
        setRelevantClassesRow2(classes);
        setRelevantFacultyRow2(faculty);
        document.getElementById(`from${i}`).value = "";
        document.getElementById(`to${i}`).value = "";
      }
    }
  };

  const handleMultiSelectChange = (e, index) => {
    const taughtCourses = e.map((item) => item.courses);
    const relevantCourses = [];

    if (selectedData.teacher[index]) {
      courses.map((course) => {
        if (taughtCourses.every((crs) => crs.includes(course.course_code))) {
          relevantCourses.push(course);
        }
        return null;
      });
      setRelevantCoursesRow1(
        relevantCourses.filter((relCourse) => {
          const teacher = faculty.find(
            (fac) => fac._id === selectedData.teacher[index]
          );
          return teacher.taught_courses.includes(relCourse.course_code);
        })
      );
    } else {
      courses.map((course) => {
        if (taughtCourses.every((crs) => crs.includes(course.course_code))) {
          relevantCourses.push(course);
        }
        return null;
      });
      setRelevantCoursesRow1(relevantCourses);
    }

    if (e.at(-1) === undefined) {
      setSelectedData({
        ...selectedData,
        class: [],
      });
    } else {
      setSelectedData({
        ...selectedData,
        class: e.map((item) => item.value),
      });
    }
  };

  const handleSelectChange = (e, index) => {
    if (index === 0) {
      if (e.name === "teacher") {
        setRelevantCoursesRow1(
          selectedData.class[index]
            ? courses
                .filter((course) =>
                  e.taught_courses.includes(course.course_code)
                )
                .filter((relCourse) => {
                  const cls = classes.find(
                    (cls) => cls._id === selectedData.class[index]
                  );
                  return cls.courses.includes(relCourse.course_code);
                })
            : courses.filter((course) =>
                e.taught_courses.includes(course.course_code)
              )
        );
      } else if (e.name === "subject") {
        console.log("e", e);
        setRelevantClassesRow1(
          classes.filter((cls) => cls.courses.includes(e.course_code))
        );
        setRelevantFacultyRow1(
          faculty.filter((fac) => fac.taught_courses.includes(e.course_code))
        );
      } else if (e.name === "class") {
        setRelevantCoursesRow1(
          selectedData.teacher[index]
            ? courses
                .filter((course) => e.courses.includes(course.course_code))
                .filter((relCourse) => {
                  const teacher = faculty.find(
                    (fac) => fac._id === selectedData.teacher[index]
                  );
                  return teacher.taught_courses.includes(relCourse.course_code);
                })
            : courses.filter((course) => e.courses.includes(course.course_code))
        );
      }

      setSelectedData({
        ...selectedData,
        [e.name]: selectedData[e.name][index + 1]
          ? [e.value, selectedData[e.name][index + 1]]
          : [e.value],
      });
    } else {
      if (e.name === "teacher") {
        setRelevantCoursesRow2(
          selectedData.class[index]
            ? courses
                .filter((course) =>
                  e.taught_courses.includes(course.course_code)
                )
                .filter((relCourse) => {
                  const cls = classes.find(
                    (cls) => cls._id === selectedData.class[index]
                  );
                  return cls.courses.includes(relCourse.course_code);
                })
            : courses.filter((course) =>
                e.taught_courses.includes(course.course_code)
              )
        );
      } else if (e.name === "subject") {
        setRelevantClassesRow2(
          classes.filter((cls) => cls.courses.includes(e.course_code))
        );
        setRelevantFacultyRow2(
          faculty.filter((fac) => fac.taught_courses.includes(e.course_code))
        );
      } else if (e.name === "class") {
        setRelevantCoursesRow2(
          selectedData.teacher[index]
            ? courses
                .filter((course) => e.courses.includes(course.course_code))
                .filter((relCourse) => {
                  const teacher = faculty.find(
                    (fac) => fac._id === selectedData.teacher[index]
                  );
                  return teacher.taught_courses.includes(relCourse.course_code);
                })
            : courses.filter((course) => e.courses.includes(course.course_code))
        );
      }

      setSelectedData({
        ...selectedData,
        [e.name]: [selectedData[e.name][index - 1], e.value],
      });
    }
  };

  const handleTimeChange = (e, index) => {
    const time = e.target.value.split(":");
    if (time[0] < 8 || (time[0] >= 22 && time[1] > 0)) {
      document.getElementById(`${e.target.name}${index}`).value = "";
      return dispatch(addNotificationMsg("Time should be greater than 8"));
    }
    if (index === 0) {
      if (e.target.name === "to") {
        setSelectedData({
          ...selectedData,
          Time: selectedData.Time[index + 1]
            ? [
                `${selectedData.Time[index].split("-")[0].trim()} - ${tConvert(
                  e.target.value
                )}`,
                selectedData.Time[index + 1],
              ]
            : [
                `${selectedData.Time[index]?.split("-")[0].trim()} - ${tConvert(
                  e.target.value
                )}`,
              ],
        });
      } else {
        setSelectedData({
          ...selectedData,
          Time: selectedData.Time[index + 1]
            ? [
                `${tConvert(e.target.value)} - ${selectedData.Time[index]
                  ?.split("-")[1]
                  .trim()}`,
                selectedData.Time[index + 1],
              ]
            : [
                `${tConvert(e.target.value)} - ${selectedData.Time[index]
                  ?.split("-")[1]
                  .trim()}`,
              ],
        });
      }
    } else {
      if (e.target.name === "to") {
        setSelectedData({
          ...selectedData,
          Time: selectedData.Time[index - 1]
            ? [
                selectedData.Time[index - 1],
                `${selectedData.Time[index].split("-")[0].trim()} - ${tConvert(
                  e.target.value
                )}`,
              ]
            : [
                undefined,
                `${selectedData.Time[index].split("-")[0].trim()} - ${tConvert(
                  e.target.value
                )}`,
              ],
        });
      } else {
        setSelectedData({
          ...selectedData,
          Time: selectedData.Time[index - 1]
            ? [
                selectedData.Time[index - 1],
                `${tConvert(e.target.value)} - ${selectedData.Time[index]
                  ?.split("-")[1]
                  .trim()}`,
              ]
            : [
                undefined,
                `${tConvert(e.target.value)} - ${selectedData.Time[index]
                  ?.split("-")[1]
                  .trim()}`,
              ],
        });
      }
    }
  };

  const handleSubmit = () => {
    if (
      selectedData.subject.length === 0 ||
      selectedData.class.length === 0 ||
      selectedData.teacher.length === 0 ||
      selectedData.Time.length === 0
    )
      return dispatch(addNotificationMsg("Please fill all the fields"));

    if (
      selectedData.Time[0].split("-")[0].trim() === "undefined" ||
      selectedData.Time[0].split("-")[0].trim() === "" ||
      selectedData.Time[0].split("-")[1].trim() === "undefined" ||
      selectedData.Time[0].split("-")[1].trim() === ""
    )
      return dispatch(addNotificationMsg("Please fill all the fields"));

    if (rows === 2) {
      if (
        selectedData.subject.length < 2 ||
        selectedData.class.length < 2 ||
        selectedData.teacher.length < 2 ||
        selectedData.Time.length < 2 ||
        selectedData.subject.includes(undefined) ||
        selectedData.class.includes(undefined) ||
        selectedData.teacher.includes(undefined) ||
        selectedData.Time.includes(undefined) ||
        selectedData.Time[1].split("-")[0].trim() === "undefined" ||
        selectedData.Time[1].split("-")[0].trim() === "" ||
        selectedData.Time[1].split("-")[1].trim() === "undefined" ||
        selectedData.Time[1].split("-")[1].trim() === ""
      )
        return dispatch(addNotificationMsg("Please fill all the fields"));
    }
    dispatch(addClass(selectedData));
  };
  useEffect(() => {
    setRows(1);
    setSelectedData({
      Time: [],
      campus: modalData?.campus,
      class: [],
      day: modalData?.selectedDay,
      room: modalData?.room,
      slot: modalData?.slot?.slot,
      subject: [],
      teacher: [],
      _id: modalData?.id,
    });
    setRelevantCoursesRow1(courses);
    setRelevantCoursesRow2(courses);

    setRelevantClassesRow1(classes);
    setRelevantClassesRow2(classes);

    setRelevantFacultyRow1(faculty);
    setRelevantFacultyRow2(faculty);
    // eslint-disable-next-line
  }, [modalState, modalData]);

  if (!modalState) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-heading">
          <div className="modal-main-heading">
            <h3>{modalData.room}</h3>
            <h3>{modalData.selectedDay}</h3>
            <h3>{modalData.campus}</h3>
          </div>
          <div className="line-break"></div>
          <div className="modal-time-heading">
            <h3>{ordinal_suffix_of(modalData.slot.slot) + " Time Slot"}</h3>
            <h3>
              {"("}
              {modalData.selectedDay === "Friday"
                ? modalData.slot.friday_slot_timing.map((time, index) => {
                    return `${index !== 0 ? ` - ` : ""}` + time;
                  })
                : modalData.slot.slot_timing.map((time, index) => {
                    return `${index !== 0 ? ` - ` : ""}` + time;
                  })}
              {")"}
            </h3>
          </div>
        </div>
        <div className="modal-body">
          {[...Array(rows)].map((_, index) => (
            <div key={index} className="modal-row">
              <CustomSelect
                placeholder="Faculty..."
                options={
                  index === 0
                    ? [
                        ...relevantFacultyRow1.map((teacher) => ({
                          value: teacher._id,
                          label: teacher.faculty_name,
                          name: "teacher",
                          taught_courses: teacher.taught_courses,
                        })),
                      ]
                    : [
                        ...relevantFacultyRow2.map((teacher) => ({
                          value: teacher._id,
                          label: teacher.faculty_name,
                          name: "teacher",
                          taught_courses: teacher.taught_courses,
                        })),
                      ]
                }
                defaultValue={selectedData.teacher[index]}
                onChange={(e) => handleSelectChange(e, index)}
                controlShouldRenderValue={
                  selectedData.teacher[index] !== undefined
                }
              />
              <CustomSelect
                placeholder="Subject..."
                options={
                  index === 0
                    ? [
                        ...relevantCoursesRow1.map((course) => ({
                          value: course._id,
                          label: course.course_name,
                          name: "subject",
                          course_code: course.course_code,
                        })),
                      ]
                    : [
                        ...relevantCoursesRow2.map((course) => ({
                          value: course._id,
                          label: course.course_name,
                          name: "subject",
                          course_code: course.course_code,
                        })),
                      ]
                }
                defaultValue={selectedData.subject[index]}
                onChange={(e) => handleSelectChange(e, index)}
                controlShouldRenderValue={
                  selectedData.subject[index] !== undefined
                }
              />
              <CustomSelect
                placeholder="Class..."
                options={
                  index === 0
                    ? [
                        ...relevantClassesRow1.map((cls) => ({
                          value: cls._id,
                          label: `${cls.program} ${cls.semester} ${cls.section}`,
                          name: "class",
                          courses: cls.courses,
                        })),
                      ]
                    : [
                        ...relevantClassesRow2.map((cls) => ({
                          value: cls._id,
                          label: `${cls.program} ${cls.semester} ${cls.section}`,
                          name: "class",
                          courses: cls.courses,
                        })),
                      ]
                }
                isMulti={rows === 1 ? true : false}
                defaultValue={
                  rows === 1 ? selectedData.class : selectedData.class[index]
                }
                onChange={
                  rows === 1
                    ? (e) => handleMultiSelectChange(e, index)
                    : (e) => handleSelectChange(e, index)
                }
                controlShouldRenderValue={
                  selectedData.class[index] !== undefined
                }
              />
              {/* <CustomSelect
                placeholder="Class..."
                options={
                  index === 0
                    ? [
                        ...relevantClassesRow1.map((cls) => ({
                          value: cls._id,
                          label: `${cls.program} ${cls.semester} ${cls.section}`,
                          name: "class",
                          courses: cls.courses,
                        })),
                      ]
                    : [
                        ...relevantClassesRow2.map((cls) => ({
                          value: cls._id,
                          label: `${cls.program} ${cls.semester} ${cls.section}`,
                          name: "class",
                          courses: cls.courses,
                        })),
                      ]
                }
                defaultValue={selectedData.class[index]}
                onChange={(e) => handleSelectChange(e, index)}
                controlShouldRenderValue={
                  selectedData.class[index] !== undefined
                }
              /> */}
              <input
                type="time"
                name="from"
                id={`from${index}`}
                defaultValue={selectedData.Time[index]?.split("-")[0].trim()}
                onChange={(e) => handleTimeChange(e, index)}
                required
              />
              <input
                type="time"
                name="to"
                id={`to${index}`}
                defaultValue={selectedData.Time[index]?.split("-")[1].trim()}
                onChange={(e) => handleTimeChange(e, index)}
                required
              />
              {/* <CustomSelect
                placeholder="From..."
                options={
                  modalData.selectedDay !== "Friday"
                    ? modalData?.slot?.slot_timing.map((time) => ({
                        value: `${time.split("to")[0].trim()}`,
                        label: `${time.split("to")[0].trim()}`,
                        name: "Time",
                      }))
                    : modalData?.slot?.friday_slot_timing.map((time) => ({
                        value: `${time.split("to")[0].trim()}`,
                        label: `${time.split("to")[0].trim()}`,
                        name: "Time",
                      }))
                }
                defaultValue={selectedData.Time[index]}
                onChange={(e) => handleSelectChange(e, index)}
                controlShouldRenderValue={
                  selectedData.Time[index] !== undefined
                }
              /> */}
              {/* <CustomSelect
                placeholder="To..."
                options={
                  modalData.selectedDay !== "Friday"
                    ? modalData?.slot?.slot_timing.map((time) => ({
                        value: `${time.split("to")[1].trim()}`,
                        label: `${time.split("to")[1].trim()}`,
                        name: "to",
                      }))
                    : modalData?.slot?.friday_slot_timing.map((time) => ({
                        value: `${time.split("to")[1].trim()}`,
                        label: `${time.split("to")[1].trim()}`,
                        name: "to",
                      }))
                }
                defaultValue={selectedData.Time[index]}
                onChange={(e) => handleSelectChange(e, index)}
                controlShouldRenderValue={
                  selectedData.Time[index] !== undefined
                }
              /> */}

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
            <div
              className="modal-btn submit-btn"
              onClick={() => handleSubmit()}
            >
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
