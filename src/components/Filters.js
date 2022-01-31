import React from "react";
import CustomSelect from "./CustomSelect";
import DayFilter from "./DayFilter";

function Filters({
  relevantFaculty,
  relevantCourses,
  relevantClasses,
  setSelectedDay,
  selectedData,
  handleFacultySelectChange,
  handleClassSelectChange,
  handleCourseSelectChange,
}) {
  return (
    <div className="filters-container">
      <DayFilter setSelectedDay={setSelectedDay} />
      <CustomSelect
        placeholder={"Faculty"}
        options={[
          ...relevantFaculty.map((fac) => {
            return {
              value: fac._id,
              label: fac.faculty_name,
              name: "faculty",
              taught_courses: fac.taught_courses,
            };
          }),
        ]}
        value={relevantFaculty.map((teacher) => {
          if (selectedData.faculty.includes(teacher._id))
            return {
              value: teacher._id,
              label: teacher.faculty_name,
              name: "faculty",
              taught_courses: teacher.taught_courses,
            };
          return null;
        })}
        onChange={(e) => handleFacultySelectChange(e)}
        isClearable={true}
      />
      <CustomSelect
        placeholder={"Course"}
        options={[
          ...relevantCourses.map((course) => {
            return {
              value: course._id,
              label: course.course_name,
              name: "course",
              course_code: course.course_code,
            };
          }),
        ]}
        value={relevantCourses.map((course) => {
          if (selectedData.course.includes(course._id))
            return {
              value: course._id,
              label: course.course_name,
              name: "course",
              course_code: course.course_code,
            };
          return null;
        })}
        onChange={(e) => handleCourseSelectChange(e)}
        isClearable={true}
      />
      <CustomSelect
        placeholder={"Class"}
        options={[
          ...relevantClasses.map((cls) => {
            return {
              value: cls._id,
              label: `${cls.program} ${cls.semester} ${cls.section}`,
              name: "class",
              courses: cls.courses,
            };
          }),
        ]}
        value={relevantClasses.map((cls) => {
          if (selectedData.class.includes(cls._id))
            return {
              value: cls._id,
              label: `${cls.program} ${cls.semester} ${cls.section}`,
              name: "class",
              courses: cls.courses,
            };
          return null;
        })}
        onChange={(e) => handleClassSelectChange(e)}
        isClearable={true}
      />
    </div>
  );
}

export default Filters;
