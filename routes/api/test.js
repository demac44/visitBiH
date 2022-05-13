import express from "express"
import Place from  "../../models/Place.js"

const router = express.Router()



router.get("/", async (req, res) => {
    let places
    let filtered = []
    await Place.find()
    .then(resp => places = resp)

    for(let i=1;i < places.length; i++){
        
        filtered.push(places[i].description.english)

    }


    res.send(filtered)
})





export default router