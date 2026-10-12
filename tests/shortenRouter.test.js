import "dotenv/config"
import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import request from "supertest"
import app from "../src/app.js"
import { prisma } from "../src/lib/prisma.js";

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
    describe.skip("Get shorten URL", () => {
        it("gets url's data", async () => {
            const url = await request(app)
                .post("/shorten")
                .send({ url: "https://roadmap.sh/projects/url-shortening-service" })

            const response = await request(app)
                .get(`/shorten/${url.body.shortCode}`)

            expect(response.status).toBe(200)
            expect(response.body).toBe(url.body)
        })
    })
})
