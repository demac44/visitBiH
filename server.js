import { config } from "dotenv"

if (process.env.NODE_ENV !== 'production') {
    config()
  }


import express from 'express'
import { join, resolve } from 'path'
import cors from "cors"
import cookieParser from "cookie-parser"

import place from "./routes/api/place.js"
import article from "./routes/api/article.js"
import user from "./routes/api/user.js"
import auth from "./routes/api/auth.js"
import lang from "./routes/api/language.js"



import mongoose from 'mongoose'


mongoose.connect(process.env.MONGODB_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))

const app = express()

const __dirname = resolve()
app.use(express.static(join(__dirname, "client", "build")))


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET","PUT","POST","DELETE","UPDATE","OPTIONS"]
}))

app.use(cookieParser())



app.use("/api/places", place)
app.use("/api/articles", article)
app.use("/api/users", user)
app.use("/api/auth", auth)
app.use("/api/lang", lang)

app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "client", "build", "index.html"))
})    

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log('Server started!'))



