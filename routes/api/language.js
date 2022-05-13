import express from "express"
import Place from  "../../models/Place.js"

const router = express.Router()



router.post("/", (req, res) => {
    const { lang } = req.body

    if(lang) res.cookie("lang", lang).sendStatus(200)
    else res.cookie("lang", "english").sendStatus(200)

})



export default router