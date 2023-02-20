const { Schema, model } = require("mongoose");

const routineSchema = new Schema(
    {
        routinename: {
            type: String,
        },
        exercises: [{
            name: String,
            description: String,
            category: String,
            equipment: [String],

        }],
        time: {
            type: String,
        },
        owner: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        repetitionUnit: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

const Routine = model("Routine", routineSchema);

module.exports = Routine;
