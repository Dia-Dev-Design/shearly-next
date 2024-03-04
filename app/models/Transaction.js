
const { model, Schema } = require('mongoose')

const transactionSchema = new Schema({
   
},{
    timestamps: true 
})

module.exports = model("Transaction", transactionSchema)