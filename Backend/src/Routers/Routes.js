import { Router } from "express";

import routerAcciones from "./Acciones.routes.js";
import routerDineros from "./Dineros.routes.js";
import routerTraders from "./Traders.routes.js";

const router = Router();

router.use(routerAcciones);
router.use(routerDineros);
router.use(routerTraders);

export default router;
