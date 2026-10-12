import "dotenv/config"
import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import request from "supertest"
import app from "../app.js"
import { prisma } from "../lib/prisma.js";

beforeAll(async () => {
    process.env.NODE_ENV = "test"
})

beforeEach(async () => {
    await prisma.shortenUrl.deleteMany()
})

describe("Shorten Router", () => {
    describe("Create new shorten URL", () => {
        it("creates URL and returns its data", async () => {
            const response = await request(app)
                .post("/shorten")
                .send({ url: "https://roadmap.sh/projects/url-shortening-service" })
    
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty("url")
            expect(response.body).toHaveProperty("shortCode")
            expect(response.body).not.toHaveProperty("accessCount")
        })
    
        it("reject an invalid URL", async () => {
            const response = await request(app)
                .post("/shorten")
                .send({ url: "daojdnsaojdnsa" })
    
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("errors")
        })
        
        it("rejects an empty URL", async () => {
            const response = await request(app)
            .post("/shorten")
            .send({})
            
            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("errors")
        })
    })
    describe("Get shorten URL", () => {
        it("gets url's data", async () => {
            const url = await request(app)
                .post("/shorten")
                .send({ url: "https://roadmap.sh/projects/url-shortening-service" })

            const response = await request(app)
                .get(`/shorten/${url.body.shortCode}`)

            expect(response.status).toBe(200)
            expect(response.body).toEqual(url.body)
        })

        it("returns 404 if url does not exist", async () => {
            const response = await request(app).get("/shorten/asdasd")

            expect(response.status).toBe(404)
        })
    })

    describe("Update shorten URL", () => {
        it("updates an existing url", async () => {
            const url = await request(app)
            .post("/shorten")
            .send({ url: "https://roadmap.sh/projects/url-shortening-service" })
            
            const newUrl = "https://open.spotify.com/intl-pt/"
            const response = await request(app)
                .put(`/shorten/${url.body.shortCode}`)
                .send({ url: newUrl })

            expect(response.status).toBe(200)
            expect(response.body.url).toBe(newUrl)
        })

        it("returns 404 if url does not exist", async () => {
            const response = await request(app)
                .put(`/shorten/asdasd`)
                .send({ url: "http://url.com" })

            expect(response.status).toBe(404)
        })

        it("rejects invalid request", async () => {
            const url = await request(app)
            .post("/shorten")
            .send({ url: "https://roadmap.sh/projects/url-shortening-service" })
            
            const response = await request(app)
                .put(`/shorten/${url.body.shortCode}`)

            expect(response.status).toBe(400)
        })

        it("rejects invalid url", async () => {
            const url = await request(app)
            .post("/shorten")
            .send({ url: "https://roadmap.sh/projects/url-shortening-service" })
            
            const response = await request(app)
                .put(`/shorten/${url.body.shortCode}`)
                .send({ url: "a" })

            expect(response.status).toBe(400)
        })
    })

    describe("Get URL status", () => {
        it("gets url access count", async () => {
            const url = await request(app)
                .post("/shorten")
                .send({ url: "https://roadmap.sh/projects/url-shortening-service" })

            const response = await request(app)
                .get(`/shorten/${url.body.shortCode}/stats`)

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty("count")
            expect(response.body.count).toBe(0)
        })

        it("increments url access count", async () => {
            const url = await request(app)
                .post("/shorten")
                .send({ url: "https://roadmap.sh/projects/url-shortening-service" })

            await request(app).get(`/shorten/${url.body.shortCode}`)
            const response = await request(app)
                .get(`/shorten/${url.body.shortCode}/stats`)

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty("count")
            expect(response.body.count).toBe(1)
        })
    })
})
