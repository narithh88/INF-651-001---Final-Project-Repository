import axios from "axios";

const BASE_URL = "https://api.exchangerate-api.com/v4/latest";

export const fetchRates = async (base = "USD") => {
  const response = await axios.get(`${BASE_URL}/${base}`);
  return response.data;
};