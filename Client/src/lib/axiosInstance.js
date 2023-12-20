import axios from "axios";

export const instance = axios.create({
  baseURL: "https://disability-news-scraper.onrender.com/api/v1/news",
});

