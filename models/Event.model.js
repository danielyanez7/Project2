const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        eventname: {
            type: String,
            required: false,
            unique: true
        },
        description: {
            type: String,
        },
        date: {
            type: Date,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        participants: {
            type: Number,
            max: 10,
        },
        location: {
            type: {
                type: String,
            },
            coordinates: [Number]
        }

    },
    {
        timestamps: true
    }
);

eventSchema.index({ location: '2dsphere' })

const Event = model("Event", eventSchema);

module.exports = Event;
