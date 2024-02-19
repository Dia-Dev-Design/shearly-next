const { model, Schema } = require('mongoose')

const salonSchema = new Schema({
   
},{
    timestamps: true 
})

module.exports = model("Salon", salonSchema)