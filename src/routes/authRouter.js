import { Router } from "express";
import { singup } from "../controllers/authController.js";
import { validateUser } from "../middlewares/userValidator.js"

const authRouter = Router()

authRouter.post("/signup", validateUser, singup)

export { authRouter }
