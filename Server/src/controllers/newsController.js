import { scrapeNews } from "../lib/scrapeNews.js";
import { CacheSchema } from "../models/cacheSchema.js";

const getNews = async (url, page) => {
  const fullUrl = `${url}/${page}`;

  const existingNews = await CacheSchema.findOne({
    url: fullUrl,
  });

  // Implement time function
  if (existingNews) {
    console.log(`Data for ${fullUrl} already exists in the database.`);
    return existingNews;
  }

  const scrapedNews = await scrapeNews(fullUrl);

  await CacheSchema.create({
    url: fullUrl,
    news: scrapedNews,
  });

  return { url: fullUrl, news: scrapedNews };
};

export const getGeneralNews = async (req, res) => {
  const { page = 1, newsPerPage = 10 } = req.query;
  const url = "https://timesofindia.indiatimes.com/topic/disability/news";

  const generalNews = await getNews(url, page);

  return res.status(200).json(generalNews);
};

export const getEducationNews = async (req, res) => {
  const { page = 1, newsPerPage = 10 } = req.query;
  const url =
    "https://timesofindia.indiatimes.com/topic/education-for-disabled-child-in-india";

  const educationNews = await getNews(url, page);

  return res.status(200).json(educationNews);
};

export const getBenefitsNews = async (req, res) => {
  const { page = 1, newsPerPage = 10 } = req.query;
  const url =
    "https://timesofindia.indiatimes.com/topic/schemes-for-disabled-in-india";

  const benefitNews = await getNews(url, page);

  return res.status(200).json(benefitNews);
};
