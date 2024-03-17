const { model, Schema } = require('mongoose');

const providerSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        password: { type: String, required: true },
        phone: { type: String, required: true, trim: true },
        address: { type: Object },
        employment: { type: String, enum: ['Employed', 'Independent'] },
        profileImage: { type: String, default: 'https://cvhrma.org/wp-content/uploads/2015/07/default-profile-photo.jpg' },
        images: [
            { type: String }
        ],
        business: { type: Schema.Types.ObjectId, ref: 'Business' }

    },
    {
        timestamps: true
    }
);

module.exports = model('Provider', providerSchema);