import { body } from "express-validator";

const emptyErr = "is required"

export const validateUrl = [
    body("url")
        .trim()
        .notEmpty().withMessage(`URL for shortening ${emptyErr}`)
        .isLength({ min: 5, max: 500 }).withMessage("Url must be between 5 and 500 characters")
]
