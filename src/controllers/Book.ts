import { NextFunction, Request, Response } from 'express';
import Book from '../models/Books';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { author, title } = req.body;
        const createBook = await Book.create({ author, title });
        if (!createBook) {
            return res.status(400).json({ status: false, message: 'bad request' });
        }
        return res.status(201).json({ status: true, message: 'success', data: createBook });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
const readBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        const getBook = await Book.findById(bookId);
        if (!getBook) {
            return res.status(404).json({ status: false, message: 'not found' });
        }
        return res.status(200).json({ status: true, message: 'success', data: getBook });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getBook = await Book.find();
        if (!getBook) {
            return res.status(404).json({ status: false, message: 'not found' });
        }
        return res.status(200).json({ status: true, message: 'success', data: getBook });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        const updateBook = await Book.findOneAndUpdate({ _id: bookId }, req.body, { new: true });
        if (!updateBook) {
            return res.status(400).json({ status: false, message: 'bad request' });
        }
        return res.status(201).json({ status: true, message: 'success', data: updateBook });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;
        const deleteBook = await Book.findByIdAndDelete(bookId);
        if (!deleteBook) {
            return res.status(404).json({ status: false, message: 'not found' });
        }
        return res.status(200).json({ status: true, message: 'success', data: deleteBook });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export default { createBook, readBook, readAll, updateBook, deleteBook };
