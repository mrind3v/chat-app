// express is the first package that provides us with features to build our api
import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import { connectDb } from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
// cors is a middleware that allows us to make requests from the frontend to the backend

dotenv.config() // you'll be able to use process.env.smth after running this function


const app = express()

const PORT = process.env.PORT

// route handler at /
app.get("/", (req,res)=>{
    res.send("Welcome to chat app api")
})

// adding a middleware to be able to get data from the user 
app.use(express.json())

// this middleware is attached to incoming HTTP request and reads the Cookie header
// then populates the req.cookies. Will allow me to decode the cookie
// (gibberish text to understandable)
// will allow me the extract token from cookie (pars)
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173", // allow requests from this URL
    credentials: true, // allow cookies to be sent in requests
}))


// whenever we get HTTP requests at /api/auth (or requests related to authentication),
// we'll use the  authRoutes (app.use() --> helps add middleware) 
app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.listen(PORT, ()=>{
    // right when the app starts listening, connect to the database
    connectDb()
    console.log("Server is running on port: "+ PORT)
})