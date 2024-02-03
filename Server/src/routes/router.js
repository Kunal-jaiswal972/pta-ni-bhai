import { Router } from "express";
import NewsRoutes from "./newsRoutes.js";
import TestRoutes from "./testRoutes.js";
import SignRoutes from "./signRoutes.js";

const router = Router();

router.use("/news", NewsRoutes);
router.use("/sign", SignRoutes);
router.use("/test", TestRoutes);

export default router;
