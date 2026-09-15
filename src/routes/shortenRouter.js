import { Router } from "express";
import { createShortenURL, deleteShortUrl, getShortUrl, getUrlStats, updateShortUrl } from "../controllers/shortenController.js";
import { validateUrl } from "../middlewares/urlValidator.js"

const shortenRouter = Router()

shortenRouter.post("/", validateUrl, createShortenURL)
shortenRouter.get("/:shortCode", getShortUrl)
shortenRouter.put("/:shortCode", validateUrl, updateShortUrl)
shortenRouter.delete("/:shortCode", deleteShortUrl)
shortenRouter.get("/:shortCode/stats", getUrlStats)

export default shortenRouter
