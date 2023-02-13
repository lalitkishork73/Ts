import { NextFunction, Request, Response } from 'express';

import Author from '../models/Author';

const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const setAuthor = await Author.create({ name });
        if (!setAuthor) {
            return res.status(400).json({ status: false, message: 'bad request' });
        }
        return res.status(201).json({ status: true, message: 'Created', data: setAuthor });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

const readAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorId = req.params.authorId;
        const findById = await Author.findById(authorId);
        if (!findById) {
            return res.status(404).json({ status: false, message: 'Not Found' });
        }
        return res.status(200).json({ status: true, message: 'successful', data: findById });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getAll = await Author.find();
        if (getAll.length === 0) {
            return res.status(404).json({ status: false, message: 'Not Found' });
        }
        return res.status(200).json({ status: true, message: 'successful', data: getAll });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
const updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorId = req.params.authorId;
        const name = req.body;
        const updateAuthor = await Author.findOneAndUpdate({ _id: authorId }, { name }, { new: true });

        if (!updateAuthor) {
            return res.status(400).json({ status: false, message: 'bad request' });
        }

        return res.status(201).json({ status: false, message: 'Author Updated', data: updateAuthor });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorId = req.params.authorId;
        const deleteAuthor = await Author.findOneAndDelete({ _id: authorId });
        if (!deleteAuthor) {
            return res.status(404).json({ status: false, message: 'not found' });
        }
        return res.status(201).json({ status: true, message: 'deleted successfully', data: deleteAuthor });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export default { createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor };
