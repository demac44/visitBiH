import mongoose from "mongoose";


let articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    intro_text: {
        type: String,
        required: true
    },
    intro_title:{
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    sections:{
        type: Array,
        required: true
    },
    card_image:{
        type: String,
        required: true
    }
})



const Article = mongoose.model("Article", articleSchema)
export default Article