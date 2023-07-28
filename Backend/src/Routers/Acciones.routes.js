import { Router } from "express";
import {
  getAcciones,
  getAccionID,
  postAcciones,
  putAcciones,
  deleteAcciones,
} from "../Controllers/Acciones.controllers.js";

const router = Router();
const path = `/api/acciones`;

router.get(path, getAcciones);
router.get(`${path}/:id`, getAccionID);
router.post(path, postAcciones);
router.put(`${path}/:id`, putAcciones);
router.delete(`${path}/:id`, deleteAcciones);

export default router;
