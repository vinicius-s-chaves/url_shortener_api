import { validationResult } from "express-validator"
import { prisma } from "../lib/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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

export const login = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json(errors)
    const { email, password } = req.body
    try {
        const user = await prisma.user.findUnique({ where: { email } })
        if(!user) return res.status(400).json({ message: "Invalid Credentials" })

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({ message: "Invalid Credentials" })

        const token = jwt.sign({ name: user.name, email: user.email }, process.env.ACCESS_TOKEN_SECRET)
        res.json({ token })
    } catch (error) {
        next(error)
    }
}
