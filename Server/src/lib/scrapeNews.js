import puppeteer from "puppeteer";
import { scrollPageToBottom } from "puppeteer-autoscroll-down";
import * as cheerio from "cheerio";
import { delay } from "./delay.js";
import { getRandomDelay } from "./random.js";
// import {
//   writeFileOnServer,
//   writeFileOnBackupFolder,
// } from "./writeFileInSystem.js";

import dotenv from "dotenv";
dotenv.config();

export async function scrapeNews(url) {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await delay(3000);
    await page.waitForSelector(".uwU81", { visible: true });

    await scrollPageToBottom(page, {
      size: 500,
      delay: getRandomDelay(200, 300),
    });

    // await page.waitForFunction(() => {
    //   const images = document.querySelectorAll(".uwU81");
    //   const lastImage = images[images.length - 1];
    //   return lastImage && lastImage.complete;
    // });

    await delay(3000);

    const content = await page.content();
    const $ = cheerio.load(content);

    const news = [];
    const newsElem = $(".uwU81");

    newsElem.each((_, element) => {
      const link = $(element).find("a").attr("href");
      const img = $(element).find("img").attr("src");
      const title = $(element).find(".VXBf7 .fHv_i").text().trim();
      const time = $(element).find(".VXBf7 :nth-child(2)").text().trim();
      const article = $(element).find(".VXBf7 p").text().trim();
      // console.log(news);
      news.push({ link, img, title, time, article });
    });

    // if (!process.env.NODE_ENV || process.env.NODE_ENV !== "production") {
    //   writeFileOnBackupFolder(news);
    //   writeFileOnServer(news);
    // }

    return news;
  } catch (error) {
    console.error("Error fetching or parsing the page:", error.message);
    return JSON.stringify(new Error(error.message));
  } finally {
    await browser.close();
  }
}
