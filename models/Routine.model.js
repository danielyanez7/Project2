const { Schema, model } = require("mongoose")

const routineSchema = new Schema(
    {
        routinename: {
            type: String,
            required: true,
            trim: true
        },

        weekplan: [{
            day: String,
            exercises: [String],
            time: String
        }],
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: true
    }
)

const Routine = model("Routine", routineSchema)

module.exports = Routine