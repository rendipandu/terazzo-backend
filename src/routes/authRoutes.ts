import express from "express";
import { Login } from "../controller/Auth";

const router = express.Router();

router.post('/login', Login);

export default router;