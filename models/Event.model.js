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
        // location: {
        //     type: {
        //         type: String,
        //     },
        //     coordinates: [Number]
        // },
        imageUrl: {
            type: String,
            default: "https://ih1.redbubble.net/image.2595320116.9420/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
        }

    },
    {
        timestamps: true
    }
);

eventSchema.index({ location: '2dsphere' })

const Event = model("Event", eventSchema);

module.exports = Event;
