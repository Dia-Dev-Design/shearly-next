const { model, Schema } = require('mongoose');

const businessSchema = new Schema(
    {
        businessImage: { type: String, default: '', trim: true },
        images: [ 
            { type: String } 
        ],
        name: { type: String, required: true, trim: true },
        phone: { type: String, default: '', trim: true },
        address: { type: Object },
        owner: { type: Schema.Types.ObjectId, ref: 'Provider' },
        employees: [
            { type: Schema.Types.ObjectId, ref: 'Provider' }
        ],
        appointments: [
            { type: Schema.Types.ObjectId, ref: 'Appointment' }
        ],
        transactions: [
            { type: Schema.Types.ObjectId, ref: 'Transaction' }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = model('Business', businessSchema);