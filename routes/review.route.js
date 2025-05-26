import express from "express";

import verifyAuth from "../middlewares/verifyauth.js";
import { addReview, deleteReview, updateReview } from "../controllers/review.controller.js";

const router = express.Router();
router.post('/add/:id',verifyAuth,addReview)
router.put('/update/:id',verifyAuth,updateReview)
router.delete('/delete/:id',verifyAuth,deleteReview)
export default router;
