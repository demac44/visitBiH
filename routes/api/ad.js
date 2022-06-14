import express from "express"
import auth from "../../middleware/auth.js"
import Ad from "../../models/Ad.js"


const router = express.Router()


router.get("/", async (req, res) => {
    Ad.find()
    .then(response => res.json(response))
})

router.post("/ad/id", auth,  async (req, res) => {
    Ad.findOne({_id: req.body.id})
    .then(response => res.json(response))
})

router.post("/ad/region", async (req, res) => {
    Ad.findOne({region: req.body.region})
    .then(response => res.json(response))
})

router.post("/ad/article", async (req, res) => {
    Ad.findOne({type: "articles-ad"})
    .then(response => res.json(response))
})

router.post("/add", auth, async (req, res) => {
    const { image, owner, region, url, type} = req.body

    let ad = new Ad({
        image,
        owner,
        region,
        url, 
        type
    })

    ad.save()
    .then(() => res.sendStatus(200))})

router.post("/delete", auth, async (req, res) => {
    Ad.deleteOne({_id: req.body.id}).then(() => res.sendStatus(200))
})

router.post("/edit", auth,  async (req, res) => {
    const { image, owner, region, url, type, id} = req.body

    let ad ={
        image,
        owner,
        region,
        url, 
        type
    }

    Ad.updateOne({_id: id}, ad)
    .then(() => res.sendStatus(200))
})

export default router