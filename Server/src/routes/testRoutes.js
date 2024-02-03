import { Router } from "express";
import { test } from "../controllers/testController.js";

const TestRoutes = Router();

TestRoutes.get("/", test);

export default TestRoutes;
