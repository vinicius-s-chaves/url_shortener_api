import { validationResult } from "express-validator"
import { prisma } from "../lib/prisma.js"
import bcrypt from "bcrypt"

export const singup = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json(errors)
    const { name, email, password, confirmPassword } = req.body
    if(password !== confirmPassword) return res.status(400).json({ errors: ["Passwords do not match"] })

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hash
            },
            include: { password: false }
        })

        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}
