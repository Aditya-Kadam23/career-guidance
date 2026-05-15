import mongoose from 'mongoose';


const responseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
        index: true
    },
    level: {
        type: String,
        required: true
    },
    answers: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Question',
                required: true
            },
            selectedOption: {
                type: String,
                required: true
            },
            weight: {
                type: Number,
                required: true
            },
            category: {
                type: String,
                required: true
            }
        }
    ],
    scores: {
        type: Map,
        of: Number,
        default: {}
    },

    recommendations : [
        {
            career: {
                type: String,
                required: true
            },
            score: {
                type: Number,
                required: true
            },
            category: {
                type: String,
                required: true
            }
        }
    ]
},
{ timestamps: true }
);

export default mongoose.model("Response", responseSchema);