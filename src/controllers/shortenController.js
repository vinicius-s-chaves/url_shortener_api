import { validationResult } from "express-validator"
import { prisma } from "../../lib/prisma.js"

export const createShortenURL = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json(errors)
    const { url } = req.body
    try {
        const newUrl = await prisma.shortenUrl.create({
            data: {
                url,
                shortCode: Date.now().toString(36)
            },
            include: {
                accessCount: false
            }
        })
        res.status(201).json(newUrl)
    } catch (error) {
        next(error)
    }
}