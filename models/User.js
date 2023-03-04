import mongoose from "mongoose";
import db from "@root/config/mongodb"

const User = new mongoose.Schema({
    wallet: {
        type: String,
        unique: true
    },
    deviceId: {
        type: String
    }
})

export default db.model('User', User)
