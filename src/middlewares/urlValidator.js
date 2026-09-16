import { body } from "express-validator";

export const validateUrl = [
    body("url")
        .trim()
        .notEmpty().withMessage("URL for shortening is required")
        .isURL().withMessage("Url must be valid")
]
