import express from "express"
import auth from "../../middleware/auth.js"
import Place from "../../models/Place.js"

const router = express.Router()

router.get("/",  async (req, res) => {
    let data = []

    await Place.find()
    .then(response => data = response)

    res.json(data)
})


router.post("/place", async (req, res) => {
    let data = []

    await Place.find({_id: req.body.id})
    .then(response => data = response)

    res.json(data)
})


router.post("/place/_id", auth, async (req, res) => {
    await Place.find({_id: req.body.id})
    .then(response => res.json(response))
})


router.post("/region", async (req, res) => {
    let data = []

    await Place.find({region: req.body.region})
    .then(response => data = response)

    res.json(data)
})

router.post("/delete", auth, async (req, res) =>  {
    await Place.deleteOne({_id: req.body.id})
    .then(() => res.sendStatus(200))
})

router.post("/edit", auth, async (req, res) => {
    const { id, name, region, city, card_img, description, images, gm_iframe, gm_link} = req.body

    let place = {
        name: name,
        region: region,
        city: city,
        card_img: card_img,
        description: description,
        images: images,
        location:{
            google_maps_iframe: gm_iframe,
            google_maps_link: gm_link
        }
    }
    Place.updateOne({_id: id}, place)
    .then(() => res.sendStatus(200))
})

router.post("/", auth, (req, res) => {
    const { name, region, city, card_img, description, images, gm_iframe, gm_link} = req.body

    let place = new Place({
        name: name,
        region: region,
        city: city,
        card_img: card_img,
        description: description,
        images: images,
        location:{
            google_maps_iframe: gm_iframe,
            google_maps_link: gm_link
        }
    })

    place.save()
    .then(() => res.sendStatus(200))

})


export default router