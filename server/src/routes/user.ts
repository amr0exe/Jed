import express from "express"
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"

const userRouter = express.Router()
const prisma = new PrismaClient() 


userRouter.post("/signup", async (req, res) => {
    const { email, username, password}= await req.body;


    try {
    //check for userExistence
    const checkUser = await prisma.user.findFirst({
        where: {
            email: email
        }
    })

    if(checkUser) {
        return res.status(409).json({
            msg: "user already exist!"
        })
    }

    //create user
        const user = await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: password
            }
        })
        
        //token creation
        const token = jwt.sign({ id: user.id }, "mysecret", { expiresIn: "1h"})

        res.json( token )

    } catch(err) {
        res.status(500).json({
            msg: "Failed, user creation!",
        })
    }
})

userRouter.post("/signin", async (req, res) => {
    const { username, password} = await req.body

    try {
        //find user
        const user = await prisma.user.findFirst({
            where: {
                username: username,
                password: password
            }
        })

        if(!user) {
            return res.status(401).json({
                msg: "user doesn't exist"
            })
        }

        //token creation
        const token = jwt.sign({ id: user.id }, "mysecret", { expiresIn: "1h"})
        res.json( token )

    } catch(err) {
        res.status(500).json({
            msg: "user doesn't exists!"
        })
    }
})



export default userRouter