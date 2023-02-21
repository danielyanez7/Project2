const { Schema, model } = require("mongoose");

const routineSchema = new Schema(
    {
        routinename: {
            type: String,
        },
        exercises: [{
            exerciseName: String,
            description: String,
            category: String,
            equipment: [String],
            repetitions: String

        }],
        time: {
            type: String,
        },
        owner: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true
    }
);

const Routine = model("Routine", routineSchema);

module.exports = Routine;
