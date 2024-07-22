import express from "express"
import authMiddlewawre from "../middlewares/authMIddleware.js"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
const blogRouter = express.Router()

// createBlogpost
blogRouter.post("/", authMiddlewawre, async (req, res) => {
    const { title, content } = req.body
    const authorId = req.body.user.id

    const newBlog = await prisma.blog.create({
        data: {
            title: title,
            content: content,
            authorId: Number(authorId)
        }
    })

    res.json({
        id: Number(newBlog.id)
    })
})

//updateBlogPost
blogRouter.put("/", async (req, res) => {
    const body = await req.body

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        }, 
        data: {
            title: body.title,
            content: body.content
        }
    })

    return res.json({
        id: blog.id
    })
})

//getEveryBlog
blogRouter.get("/bulk", async (req, res) => {
    const blogs = await prisma.blog.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    username: true,
                }
            }

        }
    })

    return res.json({
        blogs
    })
})

//getSingleBlogOnly
blogRouter.get("/:id", async (req, res) => {
    const id = req.params.id

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        username: true,
                    }
                }
            }
        })

        return res.json({
            blog
        })
    } catch(err) {
        res.status(411).json({
            msg: "Error While fetching blogPost", err
        })
    }

})



//check Server
blogRouter.get("/", authMiddlewawre, async(req, res) => {
    console.log("heyy from server!")
})




export default blogRouter