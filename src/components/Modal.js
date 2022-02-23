import React, { useEffect, useState } from "react";
import { FiTrash, FiX, FiCheck, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { ordinal_suffix_of } from "../common/common";
import { addNotificationMsg } from "../redux/auth/authActions";
import {
  addMakeUpClass,
  removeModalData,
  removeModalDataTime,
  requestForClass,
  toggleConfirmationModal,
  toggleModal,
} from "../redux/schedule/scheduleAction";
import ConfirmationModal from "./ConfirmationModal";
import CustomSelect from "./CustomSelect";

function Modal({ faculty, courses, classes }) {
  const [rows, setRows] = useState(1);

  const modalState = useSelector((state) => state.schedule.isModalOpen);
  const modalData = useSelector((state) => state.schedule.modalData);
  const user = useSelector((state) => state.auth.user);

  const [relevantCoursesRow1, setRelevantCoursesRow1] = useState(
    user.role === "Faculty"
      ? courses.filter((course) =>
          user.taught_courses.includes(course.course_code)
        )
      : courses
  );
  const [relevantCoursesRow2, setRelevantCoursesRow2] = useState(
    user.role === "Faculty"
      ? courses.filter((course) =>
          user.taught_courses.includes(course.course_code)
        )
      : courses
  );

  const [relevantClassesRow1, setRelevantClassesRow1] = useState(classes);
  const [relevantClassesRow2, setRelevantClassesRow2] = useState(classes);

  const [relevantFacultyRow1, setRelevantFacultyRow1] = useState(
    user.role === "Faculty"
      ? faculty.filter((fac) => fac._id === user.id)
      : faculty
  );
  const [relevantFacultyRow2, setRelevantFacultyRow2] = useState(
    user.role === "Faculty"
      ? faculty.filter((fac) => fac._id === user.id)
      : faculty
  );

  const [selectedData, setSelectedData] = useState({
    Time: [],
    campus: modalData?.campus,
    class: [],
    day: modalData?.selectedDay,
    room: modalData?.room,
    slot: modalData?.slot?.slot,
    subject: [],
    teacher: user.role === "Faculty" ? [user.faculty_id] : [],
    _id: modalData?.id,
  });

  const dispatch = useDispatch();
  const handleAddRow = () => {
    setRows(2);
    setSelectedData({
      ...selectedData,
      teacher:
        user.role === "Faculty"
          ? [user.faculty_id, user.faculty_id]
          : selectedData.teacher,
      class: [selectedData.class[0]],
      Time:
        selectedData.day === "Friday"
          ? [
              `${modalData?.slot?.friday_slot_timing[0]
                ?.split("to")[0]
                .trim()} - ${modalData?.slot?.friday_slot_timing[0]
                ?.split("to")[1]
                .trim()}`,
              `${modalData?.slot?.friday_slot_timing[1]
                ?.split("to")[0]
                .trim()} - ${modalData?.slot?.friday_slot_timing[1]
                ?.split("to")[1]
                .trim()}`,
            ]
          : [
              `${modalData?.slot?.slot_timing[0]
                ?.split("to")[0]
                .trim()} - ${modalData?.slot?.slot_timing[0]
                ?.split("to")[1]
                .trim()}`,
              `${modalData?.slot?.slot_timing[1]
                ?.split("to")[0]
                .trim()} - ${modalData?.slot?.slot_timing[1]
                ?.split("to")[1]
                .trim()}`,
            ],
    });
  };

  const handleUnscheduleBtnClick = () => {
    dispatch(toggleConfirmationModal());
  };

  const handleTrashClick = (i) => {
    if (i === 0) {
      if (modalData?.subject.length > 0) {
        dispatch(removeModalData(i));
      }
      setSelectedData({
        ...selectedData,
        Time:
          rows === 1
            ? selectedData.Time[1]
              ? [undefined, selectedData.Time[1]]
              : []
            : selectedData.Time,
        class:
          rows === 1
            ? []
            : selectedData.class[1]
            ? [undefined, selectedData.class[1]]
            : [],
        subject: selectedData.subject[1]
          ? [undefined, selectedData.subject[1]]
          : [],
        teacher:
          user.role === "Faculty"
            ? selectedData.teacher
            : selectedData.teacher[1]
            ? [undefined, selectedData.teacher[1]]
            : [],
      });
      setRelevantCoursesRow1(
        user.role === "Faculty"
          ? courses.filter((course) =>
              user.taught_courses.includes(course.course_code)
            )
          : courses
      );
      setRelevantClassesRow1(classes);
      setRelevantFacultyRow1(
        user.role === "Faculty" ? relevantFacultyRow1 : faculty
      );
      // document.getElementById(`from${i}`).value = "";
      // document.getElementById(`to${i}`).value = "";
    } else {
      if (modalData?.subject[i] !== undefined) {
        dispatch(removeModalData(i));
      } else if (modalData?.time[i] !== undefined) {
        dispatch(removeModalDataTime(i));
      }
      if (
        // selectedData.Time[1] === undefined &&
        selectedData.class[1] === undefined &&
        selectedData.subject[1] === undefined &&
        selectedData.teacher[1] === undefined
      ) {
        setSelectedData({
          ...selectedData,
          Time: [selectedData.Time[0]],
        });
        setRows(1);
      } else {
        setSelectedData({
          ...selectedData,
          Time:
            rows === 1
              ? selectedData.Time.filter((_, index) => index !== i)
              : selectedData.Time,
          class: selectedData.class.filter((_, index) => index !== i),
          subject: selectedData.subject.filter((_, index) => index !== i),
          teacher:
            user.role === "Faculty"
              ? selectedData.teacher
              : selectedData.teacher.filter((_, index) => index !== i),
        });
        setRelevantCoursesRow2(
          user.role === "Faculty"
            ? courses.filter((course) =>
                user.taught_courses.includes(course.course_code)
              )
            : courses
        );
        setRelevantClassesRow2(classes);
        setRelevantFacultyRow2(
          user.role === "Faculty" ? relevantFacultyRow2 : faculty
        );
        // document.getElementById(`from${i}`).value = "";
        // document.getElementById(`to${i}`).value = "";
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
      } else if (e.name === "from") {
        if (
          e.value === modalData.slot?.slot_timing[0]?.split("to")[1]?.trim() ||
          e.value ===
            modalData.slot?.friday_slot_timing[0]?.split("to")[1]?.trim()
        ) {
          setSelectedData({
            ...selectedData,
            Time: selectedData.Time[index + 1]
              ? [
                  `${e.value} - ${
                    modalData?.selectedDay === "Friday"
                      ? modalData.slot?.friday_slot_timing[1]
                          ?.split("to")[1]
                          ?.trim()
                      : modalData.slot?.slot_timing[1]?.split("to")[1]?.trim()
                  }`,
                  selectedData.Time[index + 1],
                ]
              : [
                  `${e.value} - ${
                    modalData?.selectedDay === "Friday"
                      ? modalData.slot?.friday_slot_timing[1]
                          ?.split("to")[1]
                          ?.trim()
                      : modalData.slot?.slot_timing[1]?.split("to")[1]?.trim()
                  }`,
                ],
          });
          return;
        }
        setSelectedData({
          ...selectedData,
          Time: selectedData.Time[index + 1]
            ? [
                `${e.value} - ${selectedData.Time[index]
                  ?.split("-")[1]
                  .trim()}`,
                selectedData.Time[index + 1],
              ]
            : [
                `${e.value} - ${selectedData.Time[index]
                  ?.split("-")[1]
                  .trim()}`,
              ],
        });
        return;
      } else if (e.name === "to") {
        setSelectedData({
          ...selectedData,
          Time: selectedData.Time[index + 1]
            ? [
                `${selectedData.Time[index].split("-")[0].trim()} - ${e.value}`,
                selectedData.Time[index + 1],
              ]
            : [
                `${selectedData.Time[index]?.split("-")[0].trim()} - ${
                  e.value
                }`,
              ],
        });
        return;
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
      // else if (e.name === "from") {
      //   setSelectedData({
      //     ...selectedData,
      //     Time: selectedData.Time[index - 1]
      //       ? [
      //           selectedData.Time[index - 1],
      //           `${tConvert(e.value)} - ${selectedData.Time[index]
      //             ?.split("-")[1]
      //             .trim()}`,
      //         ]
      //       : [
      //           undefined,
      //           `${tConvert(e.value)} - ${selectedData.Time[index]
      //             ?.split("-")[1]
      //             .trim()}`,
      //         ],
      //   });
      //   return;
      // } else if (e.name === "to") {
      //   setSelectedData({
      //     ...selectedData,
      //     Time: selectedData.Time[index - 1]
      //       ? [
      //           selectedData.Time[index - 1],
      //           `${tConvert(e.value)} - ${selectedData.Time[index]
      //             ?.split("-")[1]
      //             .trim()}`,
      //         ]
      //       : [
      //           undefined,
      //           `${tConvert(e.value)} - ${selectedData.Time[index]
      //             ?.split("-")[1]
      //             .trim()}`,
      //         ],
      //   });
      //   return;
      // }

      setSelectedData({
        ...selectedData,
        [e.name]: [selectedData[e.name][index - 1], e.value],
      });
    }
  };

  // const handleTimeChange = (e, index) => {
  //   const time = e.target.value.split(":");
  //   if (Number(time[0]) < 8) {
  //     setSelectedData({
  //       ...selectedData,
  //       Time:
  //         index === 0
  //           ? e.target.name === "to"
  //             ? [
  //                 `${selectedData.Time[index]
  //                   ?.split("-")[0]
  //                   .trim()} - undefined`,
  //                 selectedData.Time[1],
  //               ]
  //             : [
  //                 `undefined - ${selectedData.Time[index]
  //                   ?.split("-")[1]
  //                   .trim()}`,
  //                 selectedData.Time[1],
  //               ]
  //           : [
  //               selectedData.Time[0],
  //               `${
  //                 e.target.name === "to"
  //                   ? `${selectedData.Time[index]
  //                       ?.split("-")[0]
  //                       .trim()} - undefined`
  //                   : `undefined - ${selectedData.Time[index]
  //                       ?.split("-")[1]
  //                       .trim()}`
  //               }`,
  //             ],
  //     });
  //     document.getElementById(`${e.target.name}${index}`).value = "";
  //     return dispatch(
  //       addNotificationMsg("Time should be after 8:00 AM", "error")
  //     );
  //   }
  //   if (Number(time[0]) >= 22) {
  //     if (Number(time[0]) === 22 && Number(time[1]) === 0) {
  //       //do nothing and continue
  //     } else {
  //       setSelectedData({
  //         ...selectedData,
  //         Time:
  //           index === 0
  //             ? e.target.name === "to"
  //               ? [
  //                   `${selectedData.Time[index]
  //                     ?.split("-")[0]
  //                     .trim()} - undefined`,
  //                   selectedData.Time[1],
  //                 ]
  //               : [
  //                   `undefined - ${selectedData.Time[index]
  //                     ?.split("-")[1]
  //                     .trim()}`,
  //                   selectedData.Time[1],
  //                 ]
  //             : [
  //                 selectedData.Time[0],
  //                 `${
  //                   e.target.name === "to"
  //                     ? `${selectedData.Time[index]
  //                         ?.split("-")[0]
  //                         .trim()} - undefined`
  //                     : `undefined - ${selectedData.Time[index]
  //                         ?.split("-")[1]
  //                         .trim()}`
  //                 }`,
  //               ],
  //       });
  //       document.getElementById(`${e.target.name}${index}`).value = "";
  //       return dispatch(
  //         addNotificationMsg("Time should be before 10:00 PM", "error")
  //       );
  //     }
  //   }
  //   if (index === 0) {
  //     if (e.target.name === "to") {
  //       setSelectedData({
  //         ...selectedData,
  //         Time: selectedData.Time[index + 1]
  //           ? [
  //               `${selectedData.Time[index].split("-")[0].trim()} - ${tConvert(
  //                 e.target.value
  //               )}`,
  //               selectedData.Time[index + 1],
  //             ]
  //           : [
  //               `${selectedData.Time[index]?.split("-")[0].trim()} - ${tConvert(
  //                 e.target.value
  //               )}`,
  //             ],
  //       });
  //     } else {
  //       setSelectedData({
  //         ...selectedData,
  //         Time: selectedData.Time[index + 1]
  //           ? [
  //               `${tConvert(e.target.value)} - ${selectedData.Time[index]
  //                 ?.split("-")[1]
  //                 .trim()}`,
  //               selectedData.Time[index + 1],
  //             ]
  //           : [
  //               `${tConvert(e.target.value)} - ${selectedData.Time[index]
  //                 ?.split("-")[1]
  //                 .trim()}`,
  //             ],
  //       });
  //     }
  //   } else {
  //     if (e.target.name === "to") {
  //       setSelectedData({
  //         ...selectedData,
  //         Time: selectedData.Time[index - 1]
  //           ? [
  //               selectedData.Time[index - 1],
  //               `${selectedData.Time[index].split("-")[0].trim()} - ${tConvert(
  //                 e.target.value
  //               )}`,
  //             ]
  //           : [
  //               undefined,
  //               `${selectedData.Time[index].split("-")[0].trim()} - ${tConvert(
  //                 e.target.value
  //               )}`,
  //             ],
  //       });
  //     } else {
  //       setSelectedData({
  //         ...selectedData,
  //         Time: selectedData.Time[index - 1]
  //           ? [
  //               selectedData.Time[index - 1],
  //               `${tConvert(e.target.value)} - ${selectedData.Time[index]
  //                 ?.split("-")[1]
  //                 .trim()}`,
  //             ]
  //           : [
  //               undefined,
  //               `${tConvert(e.target.value)} - ${selectedData.Time[index]
  //                 ?.split("-")[1]
  //                 .trim()}`,
  //             ],
  //       });
  //     }
  //   }
  // };

  const handleSubmit = () => {
    // if (
    //   modalData?.time.length !== 0 &&
    //   modalData?.time.join(",") === selectedData.Time.join(",")
    // ) {
    //   if (
    //     modalData?.subject.length > 1 &&
    //     modalData?.subject[1] === undefined
    //   ) {
    //   } else {
    //     return dispatch(addNotificationMsg("No changes detected", "error"));
    //   }
    // }
    if (
      selectedData.subject.length === 0 ||
      selectedData.class.length === 0 ||
      selectedData.teacher.length === 0 ||
      selectedData.Time.length === 0
    )
      return dispatch(
        addNotificationMsg("Please fill all the fields", "error")
      );

    if (
      selectedData.Time[0].split("-")[0].trim() === "undefined" ||
      selectedData.Time[0].split("-")[0].trim() === "" ||
      selectedData.Time[0].split("-")[1].trim() === "undefined" ||
      selectedData.Time[0].split("-")[1].trim() === ""
    )
      return dispatch(
        addNotificationMsg("Please fill all the fields", "error")
      );

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
        return dispatch(
          addNotificationMsg("Please fill all the fields", "error")
        );
    }
    if (modalData?.isRequestModal) {
      dispatch(requestForClass(selectedData));
      return;
    }
    // dispatch(addClass(selectedData));
    dispatch(addMakeUpClass(selectedData));
  };
  useEffect(() => {
    setRows(modalData?.time?.length || 1);
    setSelectedData({
      Time: modalData?.time || [],
      campus: modalData?.campus,
      class: modalData?.cls || [],
      day: modalData?.selectedDay,
      room: modalData?.room,
      slot: modalData?.slot?.slot,
      subject: modalData?.subject || [],
      teacher:
        user.role === "Faculty" ? [user.faculty_id] : modalData?.teacher || [],
      _id: modalData?.id,
    });

    setRelevantCoursesRow1(
      user.role === "Faculty"
        ? courses.filter((course) =>
            user.taught_courses.includes(course.course_code)
          )
        : courses
    );
    setRelevantCoursesRow2(
      user.role === "Faculty"
        ? courses.filter((course) =>
            user.taught_courses.includes(course.course_code)
          )
        : courses
    );

    setRelevantClassesRow1(classes);
    setRelevantClassesRow2(classes);

    setRelevantFacultyRow1(
      user.role === "Faculty"
        ? faculty.filter((fac) => fac.userId === user.userId)
        : faculty
    );
    setRelevantFacultyRow2(
      user.role === "Faculty"
        ? faculty.filter((fac) => fac.userId === user.userId)
        : faculty
    );
    // eslint-disable-next-line
  }, [modalState, modalData]);

  if (!modalState) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <ConfirmationModal />
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
                // defaultValue={selectedData.teacher[index]}
                value={
                  index === 0
                    ? relevantFacultyRow1.map((teacher) => {
                        if (
                          teacher._id === selectedData.teacher[index] ||
                          teacher.userId === user.userId
                        )
                          return {
                            value: teacher._id,
                            label: teacher.faculty_name,
                            name: "teacher",
                            taught_courses: teacher.taught_courses,
                          };
                        return null;
                      })
                    : relevantFacultyRow2.map((teacher) => {
                        if (
                          teacher._id === selectedData.teacher[index] ||
                          teacher.userId === user.userId
                        )
                          return {
                            value: teacher._id,
                            label: teacher.faculty_name,
                            name: "teacher",
                            taught_courses: teacher.taught_courses,
                          };
                        return null;
                      })
                }
                onChange={(e) => handleSelectChange(e, index)}
                controlShouldRenderValue={
                  selectedData.teacher[index] !== undefined
                }
                isDisabled={
                  user.role === "Faculty"
                    ? true
                    : modalData?.subject?.length > 0
                    ? modalData?.subject[index] === undefined
                      ? false
                      : true
                    : false
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
                value={
                  index === 0
                    ? relevantCoursesRow1.map((course) => {
                        if (course._id === selectedData.subject[index])
                          return {
                            value: course._id,
                            label: course.course_name,
                            name: "subject",
                            course_code: course.course_code,
                          };
                        return null;
                      })
                    : relevantCoursesRow2.map((course) => {
                        if (course._id === selectedData.subject[index])
                          return {
                            value: course._id,
                            label: course.course_name,
                            name: "subject",
                            course_code: course.course_code,
                          };
                        return null;
                      })
                }
                // value={selectedData.subject[index]}
                onChange={(e) => handleSelectChange(e, index)}
                controlShouldRenderValue={
                  selectedData.subject[index] !== undefined
                }
                isDisabled={
                  modalData?.subject?.length > 0
                    ? modalData?.subject[index] === undefined
                      ? false
                      : true
                    : false
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
                // defaultValue={
                //   rows === 1 ? selectedData.class : selectedData.class[index]
                // }
                value={
                  index === 0
                    ? rows === 1
                      ? relevantClassesRow1.map((cls) => {
                          // if (cls._id === selectedData.class[index])
                          if (selectedData.class.includes(cls._id))
                            return {
                              value: cls._id,
                              label: `${cls.program} ${cls.semester} ${cls.section}`,
                              name: "class",
                              courses: cls.courses,
                            };
                          return null;
                        })
                      : relevantClassesRow1.map((cls) => {
                          if (cls._id === selectedData.class[index])
                            return {
                              value: cls._id,
                              label: `${cls.program} ${cls.semester} ${cls.section}`,
                              name: "class",
                              courses: cls.courses,
                            };
                          return null;
                        })
                    : relevantClassesRow2.map((cls) => {
                        if (cls._id === selectedData.class[index])
                          return {
                            value: cls._id,
                            label: `${cls.program} ${cls.semester} ${cls.section}`,
                            name: "class",
                            courses: cls.courses,
                          };
                        return null;
                      })
                }
                onChange={
                  rows === 1
                    ? (e) => handleMultiSelectChange(e, index)
                    : (e) => handleSelectChange(e, index)
                }
                controlShouldRenderValue={
                  selectedData.class[index] !== undefined
                }
                isDisabled={
                  modalData?.subject?.length > 0
                    ? modalData?.subject[index] === undefined
                      ? false
                      : true
                    : false
                }
              />
              <CustomSelect
                placeholder="From..."
                options={
                  modalData?.selectedDay === "Friday"
                    ? [
                        ...modalData.slot.friday_slot_timing.map((slot) => ({
                          value: slot.split("to")[0].trim(),
                          label: slot.split("to")[0].trim(),
                          name: "from",
                        })),
                      ]
                    : [
                        ...modalData.slot.slot_timing.map((slot) => ({
                          value: slot.split("to")[0].trim(),
                          label: slot.split("to")[0].trim(),
                          name: "from",
                        })),
                      ]
                }
                value={
                  selectedData.Time[index]?.split("-")[0].trim() !==
                    "undefined" && selectedData.Time.length !== 0
                    ? {
                        value: selectedData.Time[index]?.split("-")[0].trim(),
                        label: selectedData.Time[index]?.split("-")[0].trim(),
                        name: "from",
                      }
                    : null
                  // : selectedData.Time[index]?.split("to")[0].trim()
                  // ? {
                  //     value: selectedData.Time[index]?.split("to")[0].trim(),
                  //     label: selectedData.Time[index]?.split("to")[0].trim(),
                  //     name: "from",
                  //   }
                  // : null
                }
                onChange={(e) =>
                  index === 0 ? handleSelectChange(e, index) : ""
                }
                isMulti={false}
                isSearchable={false}
                isDisabled={rows === 2 ? true : false}
              />
              <CustomSelect
                placeholder="To..."
                options={
                  modalData?.selectedDay === "Friday"
                    ? [
                        ...modalData.slot.friday_slot_timing.map((slot) => ({
                          value: slot.split("to")[1].trim(),
                          label: slot.split("to")[1].trim(),
                          name: "to",
                        })),
                      ]
                    : [
                        ...modalData.slot.slot_timing.map((slot) => ({
                          value: slot.split("to")[1].trim(),
                          label: slot.split("to")[1].trim(),
                          name: "to",
                        })),
                      ]
                }
                value={
                  (index === 0 &&
                    selectedData.Time[0]?.split("-")[0].trim() ===
                      modalData.slot?.slot_timing[0]?.split("to")[1]?.trim()) ||
                  (modalData.slot?.friday_slot_timing[0]
                    ?.split("to")[1]
                    ?.trim() === selectedData.Time[0]?.split("-")[0].trim() &&
                    modalData.slot?.friday_slot_timing[0] !== undefined)
                    ? modalData?.selectedDay === "Friday"
                      ? {
                          value: modalData.slot?.friday_slot_timing[1]
                            ?.split("to")[1]
                            ?.trim(),
                          label: modalData.slot?.friday_slot_timing[1]
                            ?.split("to")[1]
                            ?.trim(),
                          name: "to",
                        }
                      : {
                          value: modalData.slot?.slot_timing[1]
                            ?.split("to")[1]
                            ?.trim(),
                          label: modalData.slot?.slot_timing[1]
                            ?.split("to")[1]
                            ?.trim(),
                          name: "to",
                        }
                    : selectedData.Time[index]?.split("-")[1].trim() !==
                        "undefined" && selectedData.Time.length !== 0
                    ? {
                        value: selectedData.Time[index]?.split("-")[1].trim(),
                        label: selectedData.Time[index]?.split("-")[1].trim(),
                        name: "to",
                      }
                    : null
                  // : selectedData.Time[index]?.split("to")[1].trim()
                  // ? {
                  //     value: selectedData.Time[index]?.split("to")[1].trim(),
                  //     label: selectedData.Time[index]?.split("to")[1].trim(),
                  //     name: "to",
                  //   }
                  // : null
                }
                onChange={(e) =>
                  index === 0 ? handleSelectChange(e, index) : ""
                }
                isMulti={false}
                isSearchable={false}
                isDisabled={
                  rows === 2 ||
                  (index === 0 &&
                    selectedData.Time[0]?.split("-")[0].trim() ===
                      modalData.slot?.slot_timing[0]?.split("to")[1]?.trim()) ||
                  (modalData.slot?.friday_slot_timing[0]
                    ?.split("to")[1]
                    ?.trim() === selectedData.Time[0]?.split("-")[0].trim() &&
                    modalData.slot?.friday_slot_timing[0] !== undefined)
                    ? true
                    : false
                }
              />
              {/* <input
                type="time"
                name="from"
                id={`from${index}`}
                defaultValue={
                  selectedData.Time[index] &&
                  convertTime12to24(
                    selectedData.Time[index]?.split("-")[0].trim()
                  )
                }
                onChange={(e) => handleTimeChange(e, index)}
                // disabled={modalData?.subject.length > 0 ? true : false}
                required
              /> */}

              {/* <input
                type="time"
                name="to"
                id={`to${index}`}
                defaultValue={
                  selectedData.Time[index] &&
                  convertTime12to24(
                    selectedData.Time[index]?.split("-")[1].trim()
                  )
                }
                onChange={(e) => handleTimeChange(e, index)}
                // disabled={modalData?.subject.length > 0 ? true : false}
                required
              /> */}

              <div
                onClick={() => handleTrashClick(index)}
                className="icon-container"
              >
                <FiTrash color="white" size="20px" />
              </div>
            </div>
          ))}

          {rows !== 2 && modalData?.slot?.slot_timing?.length !== 1 ? (
            <div
              onClick={() => handleAddRow()}
              className="modal-btn add-class-btn"
            >
              <FiPlus className="icon" color="white" size="25px" />

              <span>Add another class</span>
            </div>
          ) : (
            <div></div>
          )}
          {modalData?.slotAssigned ? (
            <div
              className="modal-btn delete-class-btn"
              onClick={() => handleUnscheduleBtnClick()}
            >
              <FiTrash className="icon" color="white" size="25px" />

              <span>Unschedule class</span>
            </div>
          ) : (
            <div></div>
          )}
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

              <span>
                {modalData?.isRequestModal ? `Submit Request` : `Submit`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
