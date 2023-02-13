"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Books_1 = __importDefault(require("../models/Books"));
const createBook = async (req, res, next) => {
    try {
        const { author, title } = req.body;
        const createBook = await Books_1.default.create({ author, title });
        if (!createBook) {
            return res.status(400).json({ status: false, message: 'bad request' });
        }
        return res.status(201).json({ status: true, message: 'success', data: createBook });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const readBook = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const getBook = await Books_1.default.findById(bookId);
        if (!getBook) {
            return res.status(404).json({ status: false, message: 'not found' });
        }
        return res.status(200).json({ status: true, message: 'success', data: getBook });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const readAll = async (req, res, next) => {
    try {
        const getBook = await Books_1.default.find();
        if (!getBook) {
            return res.status(404).json({ status: false, message: 'not found' });
        }
        return res.status(200).json({ status: true, message: 'success', data: getBook });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const updateBook = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const updateBook = await Books_1.default.findOneAndUpdate({ _id: bookId }, req.body, { new: true });
        if (!updateBook) {
            return res.status(400).json({ status: false, message: 'bad request' });
        }
        return res.status(201).json({ status: true, message: 'success', data: updateBook });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const deleteBook = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const deleteBook = await Books_1.default.findByIdAndDelete(bookId);
        if (!deleteBook) {
            return res.status(404).json({ status: false, message: 'not found' });
        }
        return res.status(200).json({ status: true, message: 'success', data: deleteBook });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.default = { createBook, readBook, readAll, updateBook, deleteBook };
