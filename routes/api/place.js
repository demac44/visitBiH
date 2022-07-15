import express from "express"
import auth from "../../middleware/auth.js"
import redisClient from "../../middleware/redis.js"
import Place from "../../models/Place.js"

const router = express.Router()

router.get("/",  async (req, res) => {

    const all_places = await redisClient.get("all_places")

    if(all_places){
        res.json(JSON.parse(all_places))
    }
    else {
        await Place.find()
        .then(response => {
            redisClient.setEx("all_places", 3600 * 24, JSON.stringify(response))
            res.json(response)
        }) 
    }
})


router.post("/place", async (req, res) => {
    const { id } = req.body

    const place = await redisClient.get("place"+id)

    if(place){
        res.json(JSON.parse(place))
    }
    else {
        Place.find({_id: id})
        .then(response => {
            redisClient.setEx("place"+id, 3600 * 24 * 7, JSON.stringify(response))
            res.json(response)
        })
    }
})

router.post("/region", async (req, res) => {
    const { region } = req.body

    const places = await redisClient.get("region_"+region)
    
    if(places){
        res.json(JSON.parse(places))
    } else {
        Place.find({region: req.body.region})
        .then(response => {
            redisClient.setEx("region_"+region, 3600 * 24 * 7, JSON.stringify(response))
            res.json(response)
        })
    }
})

router.post("/delete", auth, async (req, res) =>  {
    await Place.deleteOne({_id: req.body.id})
    .then(() => res.sendStatus(200))
})

router.post("/edit", auth, async (req, res) => {
    const { id, name, region, city, card_img, description, images, gm_iframe, gm_link, ad} = req.body

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
        },
        ad
    }
    Place.updateOne({_id: id}, place)
    .then(() => res.sendStatus(200))
})

router.post("/", auth, (req, res) => {
    const { name, region, city, card_img, description, images, gm_iframe, gm_link, ad} = req.body

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
        }, 
        ad
    })

    place.save()
    .then(() => res.sendStatus(200))

})


export default router