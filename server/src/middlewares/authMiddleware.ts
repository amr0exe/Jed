import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    //console.log(authHeader)

    //check if token exists or it's in proper format
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            msg: "access denied, invalid token"
        })
    }
    
    //separate Bearer from token
    const token = authHeader?.split(" ")[1]

    try {
        const decoded = jwt.verify(token, "mysecret")
        req.body.user = decoded
        next()
    } catch(err: any) {
        //check for token's expiration
        if(err.name === "TokenExpiredError") {
            return res.status(401).json({
                msg: "Token expired!"
            })
        }

        return res.status(401).json({
            msg: "invalid token!"
        })
    }
}

export default authMiddleware
