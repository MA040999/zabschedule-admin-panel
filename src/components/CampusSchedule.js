import React, { Fragment } from "react";

function CampusSchedule({ schedule, campus }) {
  const campusSchedule = schedule.filter(
    (schedule) => schedule.campus === campus
  );

  const roomData = campusSchedule
    .filter((schedule) => schedule.room.includes("Room"))
    .sort((a, b) => a.slot - b.slot)
    .sort((a, b) => a.room.localeCompare(b.room));

  const roomData2 = campusSchedule
    .filter((schedule) => !schedule.room.includes("Room"))
    .sort((a, b) => a.slot - b.slot)
    .sort((a, b) => a.room.localeCompare(b.room));

  const sortedSchedule = [...roomData, ...roomData2];

  return (
    <>
      <tr>
        <th colSpan={50}>{campus}</th>
      </tr>
      {sortedSchedule.map((schedule, i) => (
        <tr key={schedule._id}>
          {schedule.slot === 1 && (
            <>
              <td className="room">{schedule.room}</td>
              {[...Array(5)].map((_, j) => (
                <Fragment key={j}>
                  <td style={{ backgroundColor: j % 2 === 0 && "#dadada" }}>
                    <span className="block">
                      {sortedSchedule[i + j].Teacher.map((teacher, t) => (
                        <span key={t}>{teacher}</span>
                      ))}
                    </span>
                  </td>
                  <td style={{ backgroundColor: j % 2 === 0 && "#dadada" }}>
                    <span className="block">
                      {sortedSchedule[i + j].Subject.map((subject, s) => (
                        <span key={s}>{subject}</span>
                      ))}
                    </span>
                  </td>
                  <td style={{ backgroundColor: j % 2 === 0 && "#dadada" }}>
                    {sortedSchedule[i + j].Time.length === 2 &&
                      sortedSchedule[i + j].Class.map((cls, k) => (
                        <span key={k} className="class-span">
                          <span>{cls}</span>
                          <span className="start-time">
                            {sortedSchedule[i + j].Time[k].split("-")[0]}
                          </span>
                          <span className="end-time">
                            {sortedSchedule[i + j].Time[k].split("-")[1]}
                          </span>
                        </span>
                      ))}
                    {sortedSchedule[i + j].Time.length === 1 && (
                      <span className="class-span">
                        {sortedSchedule[i + j].Time.length === 1 &&
                          sortedSchedule[i + j].Class.map((cls, c) =>
                            sortedSchedule[i + j].Class.length === 1 ? (
                              <span key={c}>{cls}</span>
                            ) : (
                              <span key={c}>{`${cls},`}</span>
                            )
                          )}
                        {sortedSchedule[i + j].Time.length === 1 && (
                          <>
                            <span className="start-time">
                              {sortedSchedule[i + j].Time[0].split("-")[0]}
                            </span>
                            <span className="end-time">
                              {sortedSchedule[i + j].Time[0].split("-")[1]}
                            </span>
                          </>
                        )}
                      </span>
                    )}
                  </td>
                </Fragment>
              ))}
            </>
          )}
        </tr>
      ))}
    </>
  );
}

export default CampusSchedule;
