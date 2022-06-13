import mongoose from "mongoose";


let adSchema = mongoose.Schema({
        image: {
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        },
        owner: {
            type: String,
            required: true
        },
        region: {
            type: String,
        },
        type:{
            type: String,
            required: true
        }
})



const Ad = mongoose.model("Ad", adSchema)
export default Ad