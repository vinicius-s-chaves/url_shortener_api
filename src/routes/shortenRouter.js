import { Router } from "express";
import { createShortenURL, getShortUrl } from "../controllers/shortenController.js";
import { validateUrl } from "../middlewares/urlValidator.js"

const shortenRouter = Router()

shortenRouter.post("/", validateUrl, createShortenURL)
shortenRouter.get("/:shortCode", getShortUrl)

export default shortenRouter
