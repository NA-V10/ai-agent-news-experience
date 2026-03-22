import axios from "axios";

const API = "https://ai-agent-news-experience.onrender.com";

export const getNews = async (type) => {
  const res = await axios.get(`${API}/news?user_type=${type}`);
  return res.data;
};