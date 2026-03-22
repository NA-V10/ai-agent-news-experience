import axios from "axios";

const API = "http://localhost:8000";

export const getNews = async (type) => {
  const res = await axios.get(`${API}/news?user_type=${type}`);
  return res.data;
};