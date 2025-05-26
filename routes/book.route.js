import express from "express";

import verifyAuth from "../middlewares/verifyauth.js";
import { addBook, getBookById, getBooks } from "../controllers/book.controller.js";
const router = express.Router();
router.post('/',verifyAuth,addBook)
router.get('/',verifyAuth,getBooks)
router.get('/:id',verifyAuth,getBookById)
export default router;
