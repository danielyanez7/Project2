const { Schema, model } = require("mongoose")

const routineSchema = new Schema(
    {
        routinename: {
            type: String,
        },

        weekplan: [{
            day: String,
            exercises: [{
                exerciseName: String,
                description: String,
                category: String,
                equipment: [String],
                repetitions: String
            }],
            time: String
        }],
        owner: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        timestamps: true
    }
)

const Routine = model("Routine", routineSchema)

module.exports = Routine