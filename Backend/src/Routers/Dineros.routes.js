import { Router } from "express";
import {
  getDineros,
  getDineroID,
  postDineros,
  putDineros,
  deleteDineros,
} from "../Controllers/Dineros.controllers.js";

const router = Router();
const path = `/api/dineros`;

router.get(path, getDineros);
router.get(`${path}/:id`, getDineroID);
router.post(path, postDineros);
router.put(`${path}/:id`, putDineros);
router.delete(`${path}/:id`, deleteDineros);

export default router;
