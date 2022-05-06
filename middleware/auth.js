import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
    let token

    if(req.cookies["x-auth-token"]){
        try{
            token = req.cookies["x-auth-token"]


            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = decoded

            next()
        }
        catch (err){
            console.log(err);
        }
    }


    if(!token) res.sendStatus(404);
}





export default auth