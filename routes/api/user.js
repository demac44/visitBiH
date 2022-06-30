import express from "express"
import User from "../../models/User.js"
import jwt from "jsonwebtoken"
import auth from "../../middleware/auth.js"
import bcrypt from "bcrypt"

const router = express.Router()


const options =  {
    maxAge: 3600000*24*30
}


const generateToken = (username) => {
    return jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

router.get("/all", auth, (req, res) => {
    User.find()
    .then(response => res.json(response))
})

router.post("/user", (req, res) => {
    User.findOne({_id: req.body.id})
    .then(response => res.json(response))
})

router.post("/edit", auth, (req, res) => {
    const {id, username, password, email, passwordChanged} = req.body

    let user


    if(passwordChanged){
        bcrypt.genSalt(10, (_, salt) => {
            bcrypt.hash(password, salt, (err, hashed) => {
                if(err) throw err
                user = {
                    username,
                    email,
                    password: hashed
                }

                User.updateOne({ _id: id}, user)
                .then(() => res.sendStatus(200))
            })
        })    
    } else {
        user = {
            username,
            email
        }
        User.updateOne({ _id: id }, user).then(() => res.sendStatus(200))
    }
})


router.post("/login", async (req, res) => {
    const {username, password} = req.body

    User.find({username: username})
    .then(response => {
        if(response[0]?.username){
            bcrypt.compare(password, response[0].password)
            .then(r => {
                if(!r) res.json({
                    auth: false,
                    message: "Incorrect password!"
                })
                else {
                    const token = generateToken(username)
                    res.cookie("x-auth-token", token, options)
                    .json({
                        token: token,
                        auth: true
                    })
                }
            })
       } else res.json({
            auth: false,
            message: "User does not exist!"
       })
    })
})

router.post("/logout", auth, (req, res) => {
    res.clearCookie("x-auth-token").sendStatus(200)
})

router.post("/delete", auth, (req, res) => {
    const { id } = req.body

    User.deleteOne({ _id: id}).then(() => res.sendStatus(200))
})

router.post("/create", auth, (req, res) => {
    const { username, email, password} = req.body


    bcrypt.genSalt(10, (_, salt) => {
        bcrypt.hash(password, salt, (err, hashed) => {
            if(err) throw err
            const user = new User({
                username: username,
                email: email,
                password: hashed
            })

            
            user.save()
            .then(() => res.sendStatus(200))
        })
    })
})





export default router