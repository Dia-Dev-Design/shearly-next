
const { model, Schema } = require('mongoose')

const calendarSchema = new Schema({
   
},{
    timestamps: true 
})

module.exports = model("Calendar", calendarSchema)