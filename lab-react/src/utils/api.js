import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchParks = () => {
  return axios
    .get(`${API_URL}/parks`)
    .then((res) => res.data.parks)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const fetchFilteredParks = (filters = {}, searchQuery = "") => {
  return axios
    .get(`${API_URL}/parks`, {
      params: {
        ...filters,
        search: searchQuery,
      },
    })
    .then((res) => res.data.parks)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const fetchParkById = (id) => {
  return axios
    .get(`${API_URL}/parks/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

