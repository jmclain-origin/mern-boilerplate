import Sample from '../models/sample.model';

const fetchSamples = (): any => Sample.find({});

const fetchSample = (id: string): any => Sample.findOne({ _id: id });

const createSample = (name: string, age: number): any => new Sample({ name, age });

const updateSample = (id: string, name: string, age: number): any => Sample.findByIdAndUpdate(id, { name, age });

const deleteSample = (id: string): any => Sample.findByIdAndDelete(id);

export default { fetchSamples, fetchSample, createSample, updateSample, deleteSample };
