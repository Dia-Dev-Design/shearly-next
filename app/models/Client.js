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
        appointment: [
            { type: Schema.Types.ObjectId, ref: 'Appointments' }
        ],
        transaction: [
            { type: Schema.Types.ObjectId, ref: 'Transactions' }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = model('Client', clientSchema);