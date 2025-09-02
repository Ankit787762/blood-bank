import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// ✅ Master Router import
import apiRoutes from "./routes/index.js"

// ✅ Routes declaration
app.use("/api/v1", apiRoutes)

// ✅ Health Check
app.get("/", (req, res) => {
    res.send("Blood Bank API is running ✅");
})

export { app }
