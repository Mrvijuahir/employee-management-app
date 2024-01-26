import API from "../service";

export const getLeavesApi = () => {
  return API.get("/leave");
};

export const addLEaveApi = (payload) => {
  return API.post("/leave", payload);
};

export const takeLeaveAction = (id, payload) => {
  return API.post(`/leave/${id}`, payload);
};

export const deleteLeaveAction = (id) => {
  return API.deleteM(`/leave/${id}`);
};

export const editLeaveAPi = (id, payload) => {
  return API.put(`/leave/${id}`, payload);
};
