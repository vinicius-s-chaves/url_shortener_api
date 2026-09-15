import { validationResult } from "express-validator"
import { prisma } from "../../lib/prisma.js"
import CustomError from "../utils/CustomError.js"

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

export const getShortUrl = async (req, res, next) => {
    const { shortCode } = req.params
    try {
        const url = await prisma.shortenUrl.findUnique({
            where: { shortCode },
            include: { accessCount: false }
        })
        if(!url) throw new CustomError(404, "URL Not Found")
        res.json(url)
    } catch (error) {
        next(error)
    }
}

export const updateShortUrl = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json(errors)
    const { shortCode } = req.params
    const { url } = req.body
    try {
        const existingUrl = await prisma.shortenUrl.findUnique({ where: { shortCode } })
        if(!existingUrl) throw new CustomError(404, "URL Not Found")
        const updatedUrl = await prisma.shortenUrl.update({
            where: { shortCode },
            data: { url },
            include: { accessCount: false }
        })
        res.json(updatedUrl)
    } catch (error) {
        next(error)
    }
}
