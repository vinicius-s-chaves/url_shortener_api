import "dotenv/config"
import express from "express"
import { errorHandler, notFound } from "./middlewares/errorHandler.js"
import shortenRouter from "./routes/shortenRouter.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use("/shorten", shortenRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, err => {
    if(err) {
        console.log(err)
        return
    }
    console.log(`Server listening on: http://localhost:${PORT}`)
})

export default app
