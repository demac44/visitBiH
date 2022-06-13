import express from "express"
import auth from "../../middleware/auth.js"
import Article from "../../models/Article.js"


const router = express.Router()


router.get("/", async (req, res) => {
    Article.find().limit(3)
    .then(response => res.json(response))
})

router.post("/article", async (req, res) => {
    Article.findOne({_id: req.body.id})
    .then(response => res.json(response))
})

router.get("/all", async (req, res) => {
    Article.find()
    .then(response => res.json(response))
})

router.post("/article/_id", auth, async (req, res) => {
    Article.findOne({_id: req.body.id})
    .then(response => res.json(response))
})

router.post("/article/delete", auth, async (req, res) => {
    await Article.deleteOne({_id: req.body.id})
    .then(() => res.sendStatus(200))
})


router.post("/article/edit", auth, async (req, res) => {
    const { title, intro_text, intro_title, banner, sections, id, card_image, ad} = req.body

    let article ={
        title,
        intro_text,
        intro_title,
        banner,
        sections,
        card_image, 
        ad
    }

    Article.updateOne({_id: id}, article)
    .then(() => res.sendStatus(200))
})

router.post("/", auth, (req, res) => {
    const { title, intro_text, intro_title, banner, sections, card_image, ad} = req.body

    let article = new Article({
        title,
        intro_text,
        intro_title,
        banner,
        sections,
        card_image,
        ad
    })

    article.save()
    .then(() => res.sendStatus(200))

})


export default router