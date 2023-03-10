import * as mongoose from 'mongoose';
declare const SampleModel: mongoose.Model<{
    name: string;
    age: number;
    createdAt: Date;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    age: number;
    createdAt: Date;
}>>;
export default SampleModel;
