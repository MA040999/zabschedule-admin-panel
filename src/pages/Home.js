import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CombinedSchedule from "../components/CombinedSchedule";

import { FILTERED_SCHEDULE } from "../redux/schedule/scheduleTypes";
import Filters from "../components/Filters";
import { toggleModal } from "../redux/schedule/scheduleAction";

function Home({
  setRelevantClasses,
  setRelevantCourses,
  setRelevantFaculty,
  relevantClasses,
  relevantCourses,
  relevantFaculty,
  faculty,
  courses,
  classes,
}) {
  const dispatch = useDispatch();

  const modalState = useSelector((state) => state.schedule.isModalOpen);

  const [selectedData, setSelectedData] = useState({
    faculty: "",
    course: "",
    class: "",
  });

  const handleCourseSelectChange = (e) => {
    if (!e) {
      setSelectedData({ ...selectedData, course: "" });
      setRelevantFaculty(faculty);
      setRelevantClasses(classes);
      dispatch({
        type: FILTERED_SCHEDULE,
        payload: { ...selectedData, course: "" },
      });
      return;
    }
    const { name, value } = e;
    setRelevantClasses(
      classes.filter((cls) => cls.courses.includes(e.course_code))
    );
    setRelevantFaculty(
      faculty.filter((fac) => fac.taught_courses.includes(e.course_code))
    );
    dispatch({
      type: FILTERED_SCHEDULE,
      payload: { ...selectedData, [name]: value },
    });
    setSelectedData({
      ...selectedData,
      [name]: value,
    });
  };

  const handleClassSelectChange = (e) => {
    if (!e) {
      setRelevantCourses(courses);
      setSelectedData({ ...selectedData, class: "" });
      dispatch({
        type: FILTERED_SCHEDULE,
        payload: { ...selectedData, class: "" },
      });
      return;
    }
    const { name, value } = e;
    setRelevantCourses(
      selectedData.faculty
        ? courses
            .filter((course) => e.courses.includes(course.course_code))
            .filter((relCourse) => {
              const teacher = faculty.find(
                (fac) => fac._id === selectedData.faculty
              );
              return teacher.taught_courses.includes(relCourse.course_code);
            })
        : courses.filter((course) => e.courses.includes(course.course_code))
    );
    dispatch({
      type: FILTERED_SCHEDULE,
      payload: { ...selectedData, [name]: value },
    });
    setSelectedData({
      ...selectedData,
      [name]: value,
    });
  };

  const handleFacultySelectChange = (e) => {
    if (!e) {
      setSelectedData({ ...selectedData, faculty: "" });
      setRelevantCourses(courses);
      dispatch({
        type: FILTERED_SCHEDULE,
        payload: { ...selectedData, faculty: "" },
      });
      return;
    }
    const { name, value } = e;
    setRelevantCourses(
      selectedData.class
        ? courses
            .filter((course) => e.taught_courses.includes(course.course_code))
            .filter((relCourse) => {
              const cls = classes.find((cls) => cls._id === selectedData.class);
              return cls.courses.includes(relCourse.course_code);
            })
        : courses.filter((course) =>
            e.taught_courses.includes(course.course_code)
          )
    );

    setSelectedData({
      ...selectedData,
      [name]: value,
    });

    dispatch({
      type: FILTERED_SCHEDULE,
      payload: { ...selectedData, [name]: value },
    });
  };

  const [selectedDay, setSelectedDay] = useState("Monday");

  useEffect(() => {
    if (modalState) {
      dispatch(toggleModal());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Filters
        relevantCourses={relevantCourses}
        relevantClasses={relevantClasses}
        relevantFaculty={relevantFaculty}
        setSelectedDay={setSelectedDay}
        selectedData={selectedData}
        handleClassSelectChange={handleClassSelectChange}
        handleCourseSelectChange={handleCourseSelectChange}
        handleFacultySelectChange={handleFacultySelectChange}
      />
      <CombinedSchedule selectedData={selectedData} selectedDay={selectedDay} />
    </>
  );
}

export default Home;
