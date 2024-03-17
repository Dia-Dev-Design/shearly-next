const { model, Schema } = require('mongoose');

const clientSchema = new Schema(
    {
        image: { type: String, default: 'https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg' },
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        password: { type: String, required: true },
        phone: { type: String, default: '' },
        address: { type: Object },
        specialCare: { type: Object },
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

module.exports = model('Client', clientSchema);