import { validationResult } from "express-validator"
import { prisma } from "../lib/prisma.js"
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
            }
        })
        await prisma.accessCount.create({
            data: { url: { connect: { id: newUrl.id } } }
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
            include: { count: true }
        })
        if(!url) throw new CustomError(404, "URL Not Found")
        await prisma.accessCount.update({
            where: { id: url.count[0].id },
            data: { count: { increment: 1 } },
        })
        res.json({
            id: url.id,
            url: url.url,
            shortCode: url.shortCode,
            createdAt: url.createdAt,
            updatedAt: url.updatedAt
        })
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
            include: { count: false }
        })
        res.json(updatedUrl)
    } catch (error) {
        next(error)
    }
}

export const deleteShortUrl = async (req, res, next) => {
    const { shortCode } = req.params
    try {
        const existingUrl = await prisma.shortenUrl.findUnique({ where: { shortCode } })
        if(!existingUrl) throw new CustomError(404, "URL Not Found")
        await prisma.shortenUrl.delete({ where: { shortCode } })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

export const getUrlStats = async (req, res, next) => {
    const { shortCode } = req.params
    try {
        const url = await prisma.shortenUrl.findUnique({ where: { shortCode } })
        if(!url) throw new CustomError(404, "URL Not Found")
        res.json(url)
    } catch (error) {
        next(error)
    }
}
