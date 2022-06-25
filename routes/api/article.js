import express from "express"
import auth from "../../middleware/auth.js"
import Article from "../../models/Article.js"


const router = express.Router()


router.get("/", async (req, res) => {
    Article.find().limit(2)
    .then(response => res.json(response))
})

router.post("/article", async (req, res) => {
    Article.findOne({_id: req.body.id})
    .then(response => {
        Article.updateOne({_id: req.body.id}, {$set: {reads: response?.reads+1}}).then(() => res.json(response))
    })
})

router.get("/all", async (req, res) => {
    Article.find()
    .then(response => res.json(response))
})

router.get("/latest", async (req, res) => {
    Article.find().limit(20)
    .then(response => res.json(response))
})

router.get("/popular", async (req, res) => {
    Article.find().sort([["reads", -1]]).limit(10)
    .then(response => {res.json(response)})
})

router.post("/search", async (req, res) => {
    const { query } = req.body

    Article.find().sort([["reads", -1]])
    .then(response => {
        res.json(response.filter(article => {
            return article?.searchString?.includes(query?.toLowerCase().trim()) || article?.searchString?.toLowerCase().includes(query?.toLowerCase().trim())
        }))
    })
})



router.post("/article/delete", auth, async (req, res) => {
    await Article.deleteOne({_id: req.body.id})
    .then(() => res.sendStatus(200))
})


router.post("/article/edit", auth, async (req, res) => {
    const { title, intro_text, intro_title, banner, sections, id, card_image, ad, searchString} = req.body

    let article ={
        title,
        intro_text,
        intro_title,
        banner,
        sections,
        card_image, 
        ad,
        searchString: searchString?.replace(/\s/g, "").toLowerCase()
    }

    Article.updateOne({_id: id}, article)
    .then(() => res.sendStatus(200))
})

router.post("/", auth, (req, res) => {
    const { title, intro_text, intro_title, banner, sections, card_image, ad, searchString} = req.body

    let article = new Article({
        title,
        intro_text,
        intro_title,
        banner,
        sections,
        card_image,
        reads: 0,
        ad,
        searchString: searchString?.replace(/\s/g, "").toLowerCase()
    })

    article.save()
    .then(() => res.sendStatus(200))

})


export default router