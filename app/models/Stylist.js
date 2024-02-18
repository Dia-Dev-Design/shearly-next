const { model, Schema } = require('mongoose')

const stylistSchema = new Schema({
   name: {type: String, default: "Test Stylist"}
},{
    timestamps: true 
})

module.exports = model("Stylist", stylistSchema)