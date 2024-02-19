const { model, Schema } = require('mongoose')

const appointmentSchema = new Schema({
   
},{
    timestamps: true 
})

module.exports = model("Appointment", appointmentSchema)
