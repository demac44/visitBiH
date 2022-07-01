import mongoose from "mongoose";


let articleSchema = mongoose.Schema({
    title: {
        type: Object,
        required: true
    },
    intro_text: {
        type: Object,
        required: true
    },
    intro_title:{
        type: Object,
        required: true
    },
    banner: {
        type: Object,
        required: true
    },
    sections:{
        type: Array,
        required: true
    },
    card_image:{
        type: String,
        required: true
    },
    reads: {
        type: Number,
        required: true
    },
    searchString: {
        type: String,
        required: true
    },
    ad:{
        image: {
            type: String,
        },
        url:{
            type: String,
        },
        owner: {
            type: String,
        },
        showAd: {
            type: Boolean,
        }
    }
})



const Article = mongoose.model("Article", articleSchema)
export default Article