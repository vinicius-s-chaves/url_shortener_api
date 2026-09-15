import { Router } from "express";
import { createShortenURL, deleteShortUrl, getShortUrl, updateShortUrl } from "../controllers/shortenController.js";
import { validateUrl } from "../middlewares/urlValidator.js"

const shortenRouter = Router()

shortenRouter.post("/", validateUrl, createShortenURL)
shortenRouter.get("/:shortCode", getShortUrl)
shortenRouter.put("/:shortCode", validateUrl, updateShortUrl)
shortenRouter.delete("/:shortCode", deleteShortUrl)

export default shortenRouter
