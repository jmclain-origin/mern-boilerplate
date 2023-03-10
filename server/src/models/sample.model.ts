import * as mongoose from 'mongoose';

const SampleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const SampleModel = mongoose.model('Sample', SampleSchema);

export default SampleModel;
