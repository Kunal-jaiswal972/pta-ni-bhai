import { Router } from "express";
import { getSign } from "../controllers/signController.js";

const SignRoutes = Router();

SignRoutes.post("", getSign);

export default SignRoutes;
