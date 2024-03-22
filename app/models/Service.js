const { Schema, model, models } = require("mongoose");

const serviceSchema = new Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, default: 0, min: 0 },
  image: { type: String, default: "", trim: true },
  description: { type: String, default: "", trim: true },
},
{
    timestamps: true
}
);

module.exports = models.Service || model('Service', serviceSchema);

