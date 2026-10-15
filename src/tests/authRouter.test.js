import "dotenv/config"
import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import request from "supertest"
import { prisma } from "../lib/prisma.js";
import app from "../app.js"

beforeAll(() => {
    process.env.NODE_ENV = "test"
})

beforeEach(async () => {
    await prisma.user.deleteMany()
})

describe("Auth Router", () => {
    describe("sign up", () => {
        it("creates a new user", async () => {
            const response = await request(app)
                .post("/auth/signup")
                .send({
                    name: "vinicius",
                    email: "vinicius@email.com",
                    password: "12345678",
                    confirmPassword: "12345678"
                })

            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty("name")
            expect(response.body).toHaveProperty("email")
            expect(response.body).not.toHaveProperty("password")
        })
        
        it("rejects empty name input", async () => {
            const response = await request(app)
                .post("/auth/signup")
                .send({
                    email: "vinicius@email.com",
                    password: "12345678",
                    confirmPassword: "12345678"
                })

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors).toHaveLength(2)
        })

        it("rejects empty email input", async () => {
            const response = await request(app)
                .post("/auth/signup")
                .send({
                    name: "vinicius",
                    password: "12345678",
                    confirmPassword: "12345678"
                })

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors).toHaveLength(3)
        })

        it("rejects empty passwords input", async () => {
            const response = await request(app)
                .post("/auth/signup")
                .send({
                    name: "vinicius",
                    email: "vinicius@email.com"
                })

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors).toHaveLength(3)
        })

        it("rejects unmatched passwords", async () => {
            const response = await request(app)
                .post("/auth/signup")
                .send({
                    name: "vinicius",
                    email: "vinicius@email.com",
                    password: "123456789",
                    confirmPassword: "12345678"
                })

            expect(response.status).toBe(400)
            expect(response.body).toHaveProperty("errors")
            expect(response.body.errors).toHaveLength(1)
        })
    })
})
