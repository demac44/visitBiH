import mongoose from "mongoose";


let placeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    card_img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images:{
        type: Array,
        required: true,
        image: {
            type: String,
            required: true
        }
    },
    location:{
        google_maps_iframe: {
            type: String,
            required: true
        },
        google_maps_link:{
            type: String,
            required: true
        }
    }
})



const Place = mongoose.model("Place", placeSchema)
export default Place