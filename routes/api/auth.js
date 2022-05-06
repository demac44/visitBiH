import express from "express"
import jwt from "jsonwebtoken"


const router = express.Router()


router.post("/", (req, res) => {
    const { token } = req.body

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = decoded

            res.json({
                auth: true
            })
        }
        catch (err){
            console.log(err);
        }
    }

    if(!token) res.sendStatus(404);
})




export default router