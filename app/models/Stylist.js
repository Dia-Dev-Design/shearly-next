const { model, Schema } = require('mongoose')

const stylistSchema = new Schema({
   
},{
    timestamps: true 
})

module.exports = model("Stylist", stylistSchema)