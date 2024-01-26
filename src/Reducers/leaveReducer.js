import {
  ERROR_ADD_LEAVE,
  ERROR_EDIT_LEAVE,
  ERROR_GET_LEAVES,
  START_ADD_LEAVE,
  START_EDIT_LEAVE,
  START_GET_LEAVES,
  SUCCESS_ADD_LEAVE,
  SUCCESS_EDIT_LEAVE,
  SUCCESS_GET_LEAVES,
} from "../Actions/LeaveAction";

const initialState = {
  leaveData: {
    isLoading: false,
    data: {},
    error: "",
  },
  addLeaveData: {
    isLoading: false,
    data: {},
    error: "",
  },
  editLeaveData: {
    isLoading: false,
    data: {},
    error: "",
  },
};

export const leaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_GET_LEAVES: {
      return {
        ...state,
        leaveData: {
          isLoading: true,
          data: {},
          error: "",
        },
      };
    }
    case SUCCESS_GET_LEAVES: {
      return {
        ...state,
        leaveData: {
          isLoading: false,
          data: action.payload,
          error: "",
        },
      };
    }
    case ERROR_GET_LEAVES: {
      return {
        ...state,
        leaveData: {
          isLoading: false,
          data: {},
          error: action.payload,
        },
      };
    }
    case START_ADD_LEAVE: {
      return {
        ...state,
        addLeaveData: {
          isLoading: true,
          data: {},
          error: "",
        },
      };
    }
    case SUCCESS_ADD_LEAVE: {
      return {
        ...state,
        addLeaveData: {
          isLoading: false,
          data: action.payload,
          error: "",
        },
      };
    }
    case ERROR_ADD_LEAVE: {
      return {
        ...state,
        addLeaveData: {
          isLoading: false,
          data: {},
          error: action.payload,
        },
      };
    }
    case START_EDIT_LEAVE: {
      return {
        ...state,
        editLeaveData: {
          isLoading: true,
          data: {},
          error: "",
        },
      };
    }
    case SUCCESS_EDIT_LEAVE: {
      return {
        ...state,
        editLeaveData: {
          isLoading: false,
          data: action.payload,
          error: "",
        },
      };
    }
    case ERROR_EDIT_LEAVE: {
      return {
        ...state,
        editLeaveData: {
          isLoading: false,
          data: {},
          error: action.payload,
        },
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};
