import { body } from "express-validator";

const emptyErr = "is required"

export const validateUser = [
    body("name")
        .trim()
        .notEmpty().withMessage(`User's name ${emptyErr}`)
        .isLength({ min: 1, max: 100 }).withMessage(`User's name must have between 1 and 100 characters`),
    body("email")
        .trim()
        .notEmpty().withMessage(`User's email ${emptyErr}`)
        .isEmail().withMessage(`User's email must be valid`)
        .isLength({ min: 1, max: 100 }).withMessage(`User's email must have between 1 and 100 characters`),
    body("password")
        .trim()
        .notEmpty().withMessage(`User's password ${emptyErr}`)
        .isLength({ min: 8, max: 100 }).withMessage(`User's password must have between 8 and 100 characters`),
    body("confirmPassword")
        .trim()
        .notEmpty().withMessage(`You need to confirm password`)
]

export const validateLogin = [
    body("email")
        .trim()
        .notEmpty().withMessage(`User's email ${emptyErr}`)
        .isEmail().withMessage(`User's email must be valid`)
        .isLength({ min: 1, max: 100 }).withMessage(`User's email must have between 1 and 100 characters`),
    body("password")
        .trim()
        .notEmpty().withMessage(`User's password ${emptyErr}`)
        .isLength({ min: 8, max: 100 }).withMessage(`User's password must have between 8 and 100 characters`),
]
