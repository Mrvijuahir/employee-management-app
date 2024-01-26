import {
  START_REGISTER_USER,
  SUCCESS_REGISTER_USER,
  ERROR_REGISTER_USER,
  START_LOGIN_USER,
  SUCCESS_LOGIN_USER,
  ERROR_LOGIN_USER,
  ADD_NEW_NOTIFICATION,
  CLOSE_NOTIFICATION,
  START_GET_USER,
  SUCCESS_GET_USER,
  ERROR_GET_USER,
  START_GET_DASHBOARD,
  ERROR_GET_DASHBOARD,
  SUCCESS_GET_DASHBOARD,
} from "../Actions/AuthAction";

const initialState = {
  token: "",
  registerDetail: {
    isLoading: false,
    data: {},
    error: "",
  },
  loginDetail: {
    isLoading: false,
    data: {},
    error: "",
  },
  notificationDetail: {
    notifications: [],
  },
  userDetail: {
    isLoading: false,
    data: {},
    error: "",
  },
  dashboardData: {
    isLoading: false,
    data: {},
    error: "",
  },
};

const notificationConfig = {
  duration: 4000,
  type: "success",
  open: true,
  url: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_REGISTER_USER: {
      return {
        ...state,
        registerDetail: {
          isLoading: true,
          data: {},
          error: "",
        },
      };
    }
    case SUCCESS_REGISTER_USER: {
      return {
        ...state,
        registerDetail: {
          isLoading: false,
          data: action.payload,
          error: "",
        },
        token: action.payload?.data?.token,
      };
    }
    case ERROR_REGISTER_USER: {
      return {
        ...state,
        registerDetail: {
          isLoading: false,
          data: {},
          error: action.payload,
        },
      };
    }
    case START_LOGIN_USER: {
      return {
        ...state,
        loginDetail: {
          isLoading: true,
          data: {},
          error: "",
        },
      };
    }
    case SUCCESS_LOGIN_USER: {
      return {
        ...state,
        loginDetail: {
          isLoading: false,
          data: action.payload,
          error: "",
        },
        token: action.payload?.data?.token,
      };
    }
    case ERROR_LOGIN_USER: {
      return {
        ...state,
        loginDetail: {
          isLoading: false,
          data: {},
          error: action.payload,
        },
      };
    }
    case START_GET_USER: {
      return {
        ...state,
        userDetail: {
          isLoading: true,
          data: {},
          error: "",
        },
      };
    }
    case SUCCESS_GET_USER: {
      return {
        ...state,
        userDetail: {
          isLoading: false,
          data: action.payload,
          error: "",
        },
      };
    }
    case ERROR_GET_USER: {
      return {
        ...state,
        userDetail: {
          isLoading: false,
          data: {},
          error: action.payload,
        },
      };
    }
    case START_GET_DASHBOARD: {
      return {
        ...state,
        dashboardData: {
          isLoading: true,
          data: {},
          error: "",
        },
      };
    }
    case SUCCESS_GET_DASHBOARD: {
      return {
        ...state,
        dashboardData: {
          isLoading: false,
          data: action.payload,
          error: "",
        },
      };
    }
    case ERROR_GET_DASHBOARD: {
      return {
        ...state,
        dashboardData: {
          isLoading: false,
          data: {},
          error: action.payload,
        },
      };
    }
    case ADD_NEW_NOTIFICATION: {
      const newNotification = {
        ...notificationConfig,
        ...action.payload,
        id: Math.round(new Date().valueOf()),
      };

      const data = [...state.notificationDetail.notifications, newNotification];

      return {
        ...state,
        notificationDetail: {
          notifications: data,
        },
      };
    }

    case CLOSE_NOTIFICATION: {
      let newNotification = state.notificationDetail.notifications.map(
        (item) => {
          if (item.id === action.id) {
            return {
              ...item,
              open: false,
            };
          } else {
            return item;
          }
        }
      );

      return {
        ...state,
        notificationDetail: {
          notifications: newNotification,
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
