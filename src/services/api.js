import axios from "axios";

const API = "https://ai-agent-news-experience.onrender.com";

export async function getNews(type) {
  const response = await axios.get(`${API}/news`, {
    params: { user_type: type }
  });

  return response.data;
}

export async function translateSummary(text, lang) {
  const response = await axios.get(`${API}/news/translate`, {
    params: { text, lang }
  });

  return response.data.translated;
}

export function getVideoUrl(text) {
  const params = new URLSearchParams({ text });
  return `${API}/news/video?${params.toString()}`;
}
