import puppeteer from "puppeteer";
// import * as cheerio from "cheerio";
import { delay } from "./delay.js";
// import { getRandomDelay } from "./random.js";

import dotenv from "dotenv";
dotenv.config();

export async function scrapeSign(text) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    // args: [
    //   "--disable-setuid-sandbox",
    //   "--no-sandbox",
    //   "--single-process",
    //   "--no-zygote",
    // ],
    // executablePath:
    //   process.env.NODE_ENV === "production"
    //     ? process.env.PUPPETEER_EXECUTABLE_PATH
    //     : puppeteer.executablePath(),
  });

  const url = "https://lingojam.com/SignLanguageTranslator";

  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await delay(1500);

    const textAreaSelector = "textarea";
    await page.waitForSelector(textAreaSelector, { visible: true });
    await page.type(textAreaSelector, text);

    const flagsSelector = "#flags > img";
    await page.waitForSelector(flagsSelector, { visible: true });

    await delay(3000);

    // const content = await page.content();
    // const $ = cheerio.load(content);

    // const DisplayElem = $(flagsSelector);
    // const sign = [];

    // DisplayElem.each((_, element) => {
    //   console.log(element);
    //   const img = "https://lingojam.com" + $(element).find("img").attr("src");
    //   sign.push(img);
    // });

    const sign = await page.evaluate((selector) => {
      const images = Array.from(document.querySelectorAll(selector));
      return images.map(
        (img) => "https://lingojam.com" + img.getAttribute("src")
      );
    }, flagsSelector);

    console.log(sign);

    return sign;
  } catch (error) {
    console.error("Error fetching or parsing the page:", error.message);
    return JSON.stringify(new Error(error.message));
  } finally {
    await browser.close();
  }
}
