import { Router } from "express";
import { createShortenURL } from "../controllers/shortenController.js";
import { validateUrl } from "../middlewares/urlValidator.js"

const shortenRouter = Router()

shortenRouter.post("/", validateUrl, createShortenURL)

export default shortenRouter
