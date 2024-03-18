const { model, Schema } = require('mongoose');

const appointmentSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        scheduledAt: {
            date: { type: String },
            time: { type: String }
        },
        status: { type: String, enum: ['Pending', 'Completed', 'Canceled'] },
        deposit: { type: Number },
        subtotal: { type: Number },
        client: { type: Schema.Types.ObjectId, ref: 'Client' },
        bussiness: { type: Schema.Types.ObjectId, ref: 'Bussiness' },
        services: [
            { type: Schema.Types.ObjectId, ref: 'Service' }
        ],
        transaction: { type: Schema.Types.ObjectId, ref: 'Transaction' }
    },
    {
        timestamps: true
    }
);

module.exports = model('Appointment', appointmentSchema);