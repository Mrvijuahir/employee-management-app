import axios from "axios";

const baseURL = "http://localhost:5000/api";

export const instance = axios.create({
  baseURL,
  timeout: 90000,
  responseType: "json",
  validateStatus: false,
  headers: {
    "Content-Type": "application/json",
  },
});

function setAccessTokenInLocalStorage(token) {
  const { localStorage } = window;
  try {
    return localStorage.setItem("token", token);
  } catch (e) {
    return undefined;
  }
}
function getAccessTokenFromLocalStorage() {
  const { localStorage } = window;
  const token = localStorage.getItem("token");
  return token;
}

function get(url, paramObj = {}, headers = {}) {
  instance.defaults.headers.common["Authorization"] =
    "Bearer " + getAccessTokenFromLocalStorage();
  return instance
    .get(url, { params: paramObj })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else if (response.status === 201) {
        return response.data;
      } else if (response.status === 401) {
        return {
          ...response.data,
          status: false,
          response_status: response.status,
          unauthenticated: true,
          redirect_to_login: true,
        };
      }
      return {
        success: false,
        message: response.message || "Ill formed response!",
        redirect_to_login: true,
      };
    })
    .then((response) => {
      if (response.success) {
        return response;
      } else {
        return response;
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error.message || "Something went wrong! Try again later",
      };
    });
}

function post(url, paramObj, token) {
  instance.defaults.headers.common["Authorization"] =
    "Bearer " + getAccessTokenFromLocalStorage();
  if (token) {
    instance.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
  return instance
    .post(url, paramObj)
    .then((response) => {
      return response.data;
    })
    .then((response) => {
      if (response?.success) {
        return response;
      } else {
        return (
          response || {
            success: false,
            message: "Something went wrong, Please try again after sometime!",
          }
        );
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error.message || "Something went to wrong! Try again later",
      };
    });
}

function update(url, paramObj) {
  instance.defaults.headers.common["Authorization"] =
    "Bearer " + getAccessTokenFromLocalStorage();
  return instance
    .put(url, paramObj)
    .then((response) => {
      switch (response.status) {
        case 200:
          return { success: true, data: response.data };
        case 201:
          return { success: true, data: response.data };
        case 401:
          return { success: false, unauthenticated: true };
        case 422:
          return {
            success: false,
            data: response.data,
          };
        default:
          return { success: false, message: response };
      }
    })
    .then((response) => {
      if (response.success) {
        return {
          ...response.data,
          success: true,
        };
      } else {
        return {
          ...response.data,
          success: false,
        };
      }
    })
    .catch((error) => {
      const { message } = error;
      return {
        status: false,
        message,
      };
    });
}

function put(url, paramObj, headers = {}) {
  instance.defaults.headers.common["Authorization"] =
    "Bearer " + getAccessTokenFromLocalStorage();
  return instance
    .put(url, paramObj)
    .then((response) => {
      return response.data;
    })
    .then((response) => {
      if (response.success) {
        return response;
      } else {
        return response;
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error.message || "Something went to wrong! Try again later",
      };
    });
}

function deleteM(url, paramObj) {
  instance.defaults.headers.common["Authorization"] =
    "Bearer " + getAccessTokenFromLocalStorage();
  return instance
    .delete(url, {
      data: paramObj,
      responseType: "json",
      validateStatus: false,
    })
    .then((response) => {
      return response.data;
    })
    .then((response) => {
      if (response.success) {
        return response;
      } else {
        return response;
      }
    })
    .catch((error) => {
      const { message } = error;
      return {
        status: false,
        message,
      };
    });
}

export default {
  instance,
  get,
  post,
  update,
  deleteM,
  put,
  getAccessTokenFromLocalStorage,
  setAccessTokenInLocalStorage,
  baseURL,
};
