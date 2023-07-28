import { Router } from "express";
import {
  getTraders,
  getTraderID,
  postTrader,
  putTrader,
  deleteTrader,
} from "../Controllers/Traders.controllers.js";

const router = Router();
const path = `/api/traders`;

router.get(path, getTraders);
router.get(`${path}/:id`, getTraderID);
router.post(path, postTrader);
router.put(`${path}/:id`, putTrader);
router.delete(`${path}/:id`, deleteTrader);

export default router;
