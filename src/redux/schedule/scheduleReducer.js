import {
  ADD_CLASS,
  DELETE_CLASS,
  FETCH_COMBINED_SCHEDULE,
  FETCH_SLOTS,
  REMOVE_MODAL_DATA,
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
};

const scheduleReducer = (state = intitalState, action) => {
  switch (action.type) {
    case FETCH_COMBINED_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
      };
    case FETCH_SLOTS:
      return {
        ...state,
        slots: action.payload,
      };
    case ADD_CLASS:
      return {
        ...state,
        schedule: [...state.schedule, action.payload],
      };
    case DELETE_CLASS:
      return {
        ...state,
        schedule: [
          ...state.schedule.map((schedule) =>
            schedule._id !== action.payload
              ? schedule
              : { ...schedule, teacher: [], subject: [], class: [], Time: [] }
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
                ? [undefined, state.modalData?.time[1]]
                : []
              : state.modalData?.time[0] !== undefined
              ? [state.modalData?.time[0], undefined]
              : [],
        },
      };
    default:
      return state;
  }
};

export default scheduleReducer;
