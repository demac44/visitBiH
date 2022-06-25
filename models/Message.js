import mongoose from "mongoose";


let messageSchema = mongoose.Schema({
        message: {
            type: String,
            required: true
        }
})



const Message = mongoose.model("Message", messageSchema)
export default Message