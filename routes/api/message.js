import express from "express"
import Message from "../../models/Message.js"


const router = express.Router()



router.get("/", (req, res) => {
    Message.find()
    .then(response => res.json(response))
})

router.post("/new", async (req, res) => {
    const { msg } = req.body

    let message = new Message({
        message: msg
    })

    message.save()
    .then(() => res.sendStatus(200))
})

router.post("/delete", async (req, res) => {
    Message.deleteOne({_id: req.body.id}).then(() => res.sendStatus(200))
})


export default router