import { Router } from "express";
import {
  getBenefitsNews,
  getEducationNews,
  getGeneralNews,
} from "../controllers/newsController.js";

const NewsRoutes = Router();

NewsRoutes.get("/general", getGeneralNews);
NewsRoutes.get("/education", getEducationNews);
NewsRoutes.get("/benefits", getBenefitsNews);

export default NewsRoutes;
