import { Request, Response, NextFunction } from 'express';
import Sample from '@models/sample.model';

type BodyI = { name: string; age: number };

const createOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, age }: BodyI = req.body;
        if (!name || !age) {
            res.status(400).json({ message: 'name and age are required' });
            return;
        } else {
            const newSample = new Sample({ name, age });
            await newSample.save();
            res.status(201).json({ message: 'Sample created' });
            return;
        }
    } catch (err) {
        next(err);
    }
};

const getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const sample = await Sample.findById(id);
        if (!sample) {
            res.status(404).json({ message: 'Sample not found' });
            return;
        } else {
            res.status(200).json(sample);
            return;
        }
    } catch (err) {
        next(err);
    }
};

const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const sample = await Sample.find();
        res.status(200).json(sample);
        return;
    } catch (err) {
        next(err);
    }
};

const updateOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const { name, age }: BodyI = req.body;
        const sample = await Sample.findById(id);
        if (!sample) {
            res.status(404).json({ message: 'Sample not found' });
            return;
        } else {
            if (name) sample.name = name;
            if (age) sample.age = age;
            await sample.save();
            res.status(200).json({ message: 'Sample updated' });
        }
    } catch (err) {
        next(err);
    }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const sample = await Sample.findById(id);
        if (!sample) {
            res.status(404).json({ message: 'Sample not found' });
            return;
        } else {
            await sample.remove();
            res.status(200).json({ message: 'Sample deleted' });
            return;
        }
    } catch (err) {
        next(err);
    }
};

export default { createOne, getOne, getAll, updateOne, deleteOne };
