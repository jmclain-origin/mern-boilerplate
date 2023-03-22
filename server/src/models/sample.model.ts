import { Schema, Document, model } from 'mongoose';

export interface ISample extends Document {
    name: string;
    age: number;
    createdAt: Date;
}

const SampleSchema = new Schema<ISample>({
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

const SampleModel = model<ISample>('Sample', SampleSchema);

export default SampleModel;
