import { Request, Response, NextFunction } from 'express';
import Sample from '@server/models/sample.model';

export type BodyI = { name: string; age: number };

/**
 * @param {BodyI} req.body
 * @method POST
 * @returns {Response} 201 - Created
 * @exception {Error} 400 - Bad Request
 */
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

/**
 * @param {String} req.param.id
 * @method GET
 * @returns {Response} 200 - Success
 * @exception {Error} 404 - Not Found
 */
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

/**
 * @returns {Response} 200 - Success
 */
const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const sample = await Sample.find();
        res.status(200).json(sample);
        return;
    } catch (err) {
        next(err);
    }
};

/**
 * @param {String} req.param.id
 * @param {BodyI} req.body
 * @param {ReqParams} req.params.id
 * @returns 200 - Success
 * @exception {Error} 404 - Not Found
 */
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

/**
 * @param {String} req.params.id
 * @param {Request} req.body
 * @returns 200 - success
 * @exception {Error} 404 - Not Found
 */
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
