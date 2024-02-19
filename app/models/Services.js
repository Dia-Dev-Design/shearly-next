const { model, Schema } = require('mongoose')

const servicesSchema = new Schema({
   
},{
    timestamps: true 
})

module.exports = model("Services", servicesSchema)