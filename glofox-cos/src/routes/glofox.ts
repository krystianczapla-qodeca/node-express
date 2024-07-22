import { Router } from "express";

import { glofoxApi } from "../controllers/glofox";

const router = Router();

router.get("/", glofoxApi);

export default router;