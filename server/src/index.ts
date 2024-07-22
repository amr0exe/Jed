import express from "express";
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json())
app.use("/api/v1/user", userRouter)
app.use("/api/v1/blog", blogRouter)


//test server
app.get("/", (req, res) => {
    res.send("Wo Wo")
})
app.listen(3000)
