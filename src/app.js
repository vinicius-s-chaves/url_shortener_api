import "dotenv/config"
import express from "express"
import { errorHandler, notFound } from "./middlewares/errorHandler.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, err => {
    if(err) {
        console.log(err)
        return
    }
    console.log(`Server listening on: http://localhost:${PORT}`)
})
