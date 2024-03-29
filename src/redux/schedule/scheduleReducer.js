import {
  ADD_CLASS,
  CANCEL_CLASS,
  DELETE_CLASS,
  FETCH_COMBINED_SCHEDULE,
  FETCH_SLOTS,
  FILTERED_SCHEDULE,
  REMOVE_MODAL_DATA,
  REMOVE_MODAL_DATA_TIME,
  REMOVE_TIME_TABLE_DATA,
  SET_LAB_SCHEDULE,
  TOGGLE_CONFIRMATION_MODAL,
  TOGGLE_MODAL,
  UPDATE_CLASS,
} from "./scheduleTypes";

const intitalState = {
  schedule: [],
  slots: [],
  isModalOpen: false,
  modalData: {},
  isConfirmationModalOpen: false,
  confirmationModalIndex: undefined,
  filteredSchedule: [],
  labSchedule: [],
};

const scheduleReducer = (state = intitalState, action) => {
  switch (action.type) {
    case FETCH_COMBINED_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
      };
    case REMOVE_TIME_TABLE_DATA:
      return {
        ...state,
        schedule: [],
        labSchedule: [],
      };
    case SET_LAB_SCHEDULE:
      const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      return {
        ...state,
        labSchedule: state.schedule
          .filter(
            (sch) => sch.campus === "100 CAMPUS" && sch.room.includes("Lab")
          )
          .sort((a, b) => {
            let c = days.indexOf(a.day);
            let d = days.indexOf(b.day);
            return c < d ? -1 : 1;
          })
          .sort((a, b) => a.slot - b.slot)
          .sort((a, b) => a.room.localeCompare(b.room)),
      };
    case FILTERED_SCHEDULE:
      return {
        ...state,
        filteredSchedule: state.schedule.map((sch) => {
          if (sch.teacher.length === 0 && sch.subject.length === 0) return sch;
          if (
            action.payload.faculty !== "" &&
            action.payload.course !== "" &&
            action.payload.class !== ""
          ) {
            if (
              sch.teacher.some((t) => t._id === action.payload.faculty) &&
              sch.subject.some((sub) => sub._id === action.payload.course) &&
              sch.class.some((cls) => cls._id === action.payload.class)
            )
              return sch;
          } else if (
            action.payload.faculty !== "" &&
            action.payload.course !== ""
          ) {
            if (
              sch.teacher.some((t) => t._id === action.payload.faculty) &&
              sch.subject.some((sub) => sub._id === action.payload.course)
            )
              return sch;
          } else if (
            action.payload.faculty !== "" &&
            action.payload.class !== ""
          ) {
            if (
              sch.teacher.some((t) => t._id === action.payload.faculty) &&
              sch.class.some((cls) => cls._id === action.payload.class)
            )
              return sch;
          } else if (
            action.payload.course !== "" &&
            action.payload.class !== ""
          ) {
            if (
              sch.subject.some((sub) => sub._id === action.payload.course) &&
              sch.class.some((cls) => cls._id === action.payload.class)
            )
              return sch;
          } else if (action.payload.faculty !== "") {
            if (sch.teacher.some((t) => t._id === action.payload.faculty))
              return sch;
          } else if (action.payload.course !== "") {
            if (sch.subject.some((sub) => sub._id === action.payload.course))
              return sch;
          } else if (action.payload.class !== "") {
            if (sch.class.some((cls) => cls._id === action.payload.class))
              return sch;
          }

          return { ...sch, teacher: [], subject: [], Time: [], class: [] };
        }),
      };

    case FETCH_SLOTS:
      return {
        ...state,
        slots: action.payload.sort((a, b) => a.slot - b.slot),
      };
    case ADD_CLASS:
      return {
        ...state,
        schedule: [...state.schedule, action.payload],
        filteredSchedule: [...state.filteredSchedule, action.payload],
      };
    case DELETE_CLASS:
      return {
        ...state,
        schedule: [
          ...state.schedule.map((schedule) =>
            schedule._id !== action.payload.id
              ? schedule
              : {
                  ...schedule,
                  teacher: action.payload.index
                    ? [schedule.teacher[action.payload.index === 1 ? 0 : 1]]
                    : [],
                  subject: action.payload.index
                    ? [schedule.subject[action.payload.index === 1 ? 0 : 1]]
                    : [],
                  class: action.payload.index
                    ? [schedule.class[action.payload.index === 1 ? 0 : 1]]
                    : [],
                  Time: action.payload.index
                    ? [schedule.Time[action.payload.index === 1 ? 0 : 1]]
                    : [],
                }
          ),
        ],
        filteredSchedule: [
          ...state.filteredSchedule.map((schedule) =>
            schedule._id !== action.payload.id
              ? schedule
              : {
                  ...schedule,
                  teacher: action.payload.index
                    ? [schedule.teacher[action.payload.index === 1 ? 0 : 1]]
                    : [],
                  subject: action.payload.index
                    ? [schedule.subject[action.payload.index === 1 ? 0 : 1]]
                    : [],
                  class: action.payload.index
                    ? [schedule.class[action.payload.index === 1 ? 0 : 1]]
                    : [],
                  Time: action.payload.index
                    ? [schedule.Time[action.payload.index === 1 ? 0 : 1]]
                    : [],
                }
          ),
        ],
      };
    case CANCEL_CLASS:
      return {
        ...state,
        schedule: [
          ...state.schedule.map((schedule) =>
            schedule._id !== action.payload.id
              ? schedule
              : {
                  ...schedule,
                  cancelledClassIndex:
                    action.payload.index === undefined
                      ? null
                      : action.payload.index,
                  isCancelled: true,
                  // teacher:
                  //   action.payload.index !== undefined
                  //     ? [schedule.teacher[action.payload.index === 1 ? 0 : 1]]
                  //     : [],
                  // subject:
                  //   action.payload.index !== undefined
                  //     ? [schedule.subject[action.payload.index === 1 ? 0 : 1]]
                  //     : [],
                  // class:
                  //   action.payload.index !== undefined
                  //     ? [schedule.class[action.payload.index === 1 ? 0 : 1]]
                  //     : [],
                  // Time:
                  //   action.payload.index !== undefined
                  //     ? [schedule.Time[action.payload.index === 1 ? 0 : 1]]
                  //     : [],
                }
          ),
        ],
        filteredSchedule: [
          ...state.filteredSchedule.map((schedule) =>
            schedule._id !== action.payload.id
              ? schedule
              : {
                  ...schedule,
                  cancelledClassIndex:
                    action.payload.index === undefined
                      ? null
                      : action.payload.index,
                  isCancelled: true,
                  // teacher:
                  //   action.payload.index !== undefined
                  //     ? [schedule.teacher[action.payload.index === 1 ? 0 : 1]]
                  //     : [],
                  // subject:
                  //   action.payload.index !== undefined
                  //     ? [schedule.subject[action.payload.index === 1 ? 0 : 1]]
                  //     : [],
                  // class:
                  //   action.payload.index !== undefined
                  //     ? [schedule.class[action.payload.index === 1 ? 0 : 1]]
                  //     : [],
                  // Time:
                  //   action.payload.index !== undefined
                  //     ? [schedule.Time[action.payload.index === 1 ? 0 : 1]]
                  //     : [],
                }
          ),
        ],
      };
    case UPDATE_CLASS:
      return {
        ...state,
        schedule: [
          ...state.schedule.map((schedule) =>
            schedule._id !== action.payload._id ? schedule : action.payload
          ),
        ],
        filteredSchedule: [
          ...state.filteredSchedule.map((schedule) =>
            schedule._id !== action.payload._id ? schedule : action.payload
          ),
        ],
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
        modalData: !state.isModalOpen ? action.payload : {},
      };
    case TOGGLE_CONFIRMATION_MODAL:
      return {
        ...state,
        isConfirmationModalOpen: !state.isConfirmationModalOpen,
        confirmationModalIndex: action.payload,
      };
    case REMOVE_MODAL_DATA_TIME:
      return {
        ...state,
        modalData: {
          ...state.modalData,
          time:
            action.payload === 0
              ? state.modalData?.time[1] !== undefined
                ? [state.modalData?.time[0], state.modalData?.time[1]]
                : []
              : state.modalData?.time[0] !== undefined &&
                state.modalData?.cls[1] === undefined &&
                state.modalData?.subject[1] === undefined &&
                state.modalData?.teacher[1] === undefined
              ? [state.modalData?.time[0]]
              : [state.modalData?.time[0], state.modalData?.time[1]],
        },
      };
    case REMOVE_MODAL_DATA:
      return {
        ...state,
        modalData: {
          ...state.modalData,
          teacher:
            action.payload === 0
              ? state.modalData?.teacher[1] !== undefined
                ? [undefined, state.modalData?.teacher[1]]
                : []
              : state.modalData?.teacher[0] !== undefined
              ? [state.modalData?.teacher[0], undefined]
              : [],
          subject:
            action.payload === 0
              ? state.modalData?.subject[1] !== undefined
                ? [undefined, state.modalData?.subject[1]]
                : []
              : state.modalData?.subject[0] !== undefined
              ? [state.modalData?.subject[0], undefined]
              : [],
          cls:
            action.payload === 0
              ? state.modalData?.cls[1] !== undefined
                ? [undefined, state.modalData?.cls[1]]
                : []
              : state.modalData?.cls[0] !== undefined
              ? [state.modalData?.cls[0], undefined]
              : [],
          time:
            action.payload === 0
              ? state.modalData?.time[1] !== undefined
                ? [state.modalData?.time[0], state.modalData?.time[1]]
                : []
              : state.modalData?.time[0] !== undefined && [
                  state.modalData?.time[0],
                  state.modalData?.time[1],
                ],
        },
      };
    default:
      return state;
  }
};

export default scheduleReducer;
