import { Router } from "express";
import { login, singup } from "../controllers/authController.js";
import { validateLogin, validateUser } from "../middlewares/userValidator.js"

const authRouter = Router()

authRouter.post("/signup", validateUser, singup)
authRouter.post("/login", validateLogin, login)

export { authRouter }
