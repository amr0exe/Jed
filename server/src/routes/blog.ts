import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
const blogRouter = express.Router()

// createBlogpost
blogRouter.post("/", authMiddleware, async (req, res) => {
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
blogRouter.put("/", authMiddleware, async (req, res) => {
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
blogRouter.get("/bulk", authMiddleware,async (req, res) => {
    const blogs = await prisma.blog.findMany({
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    username: true,
                }
            },
            comments: {
                select: {
                    id: true,
                    content: true,
                    user: {
                        select: {
                            username: true
                        }
                    }
                }
            }
        }
    })

    return res.json({
        blogs
    })
})

//getSingleBlogOnly
blogRouter.get("/:id", authMiddleware, async (req, res) => {
    const id = req.params.id

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            include: { 
                author: {
                    select: {
                        username: true,
                    }
                },
                comments: {
                    include: {
                        user: {
                            select: {
                                username: true,
                            }
                        }
                    }
                }
            },
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

//createComment
blogRouter.post("/:id/comment", authMiddleware ,async (req, res) => {
    const blogId = parseInt(req.params.id)
    const authorId = req.body.user.id
    const { content } = req.body

    if(isNaN(blogId)) {
        return res.status(404).json({ error: "invalid blogId" })
    }
    if(!content || !authorId) {
        return res.status(400).json({ error: "content and authorid are required" })
    }

    try {
        const comment = await prisma.comments.create({
            data: {
                content: content,
                blogId: blogId,
                userId: authorId
            }
        })
        res.status(201).json({ msg: "sucess", comment})
    } catch(err) {
        res.status(500).json({ error: "Error: failed to create comment..."})
    }
})


//check Server
blogRouter.get("/", authMiddleware, async(req, res) => {
    console.log("heyy from server!")
})




export default blogRouter
