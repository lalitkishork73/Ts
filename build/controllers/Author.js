"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Author_1 = __importDefault(require("../models/Author"));
const createAuthor = async (req, res, next) => {
    try {
        const { name } = req.body;
        const setAuthor = await Author_1.default.create({ name });
        if (!setAuthor) {
            return res.status(400).json({ status: false, message: 'bad request' });
        }
        return res.status(201).json({ status: true, message: 'Created', data: setAuthor });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const readAuthor = async (req, res, next) => {
    try {
        const authorId = req.params.authorId;
        const findById = await Author_1.default.findById(authorId);
        if (!findById) {
            return res.status(404).json({ status: false, message: 'Not Found' });
        }
        return res.status(200).json({ status: true, message: 'successful', data: findById });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const readAll = async (req, res, next) => {
    try {
        const getAll = await Author_1.default.find();
        if (getAll.length === 0) {
            return res.status(404).json({ status: false, message: 'Not Found' });
        }
        return res.status(200).json({ status: true, message: 'successful', data: getAll });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const updateAuthor = async (req, res, next) => {
    try {
        const authorId = req.params.authorId;
        const name = req.body;
        const updateAuthor = await Author_1.default.findOneAndUpdate({ _id: authorId }, { name }, { new: true });
        if (!updateAuthor) {
            return res.status(400).json({ status: false, message: 'bad request' });
        }
        return res.status(201).json({ status: false, message: 'Author Updated', data: updateAuthor });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const deleteAuthor = async (req, res, next) => {
    try {
        const authorId = req.params.authorId;
        const deleteAuthor = await Author_1.default.findOneAndDelete({ _id: authorId });
        if (!deleteAuthor) {
            return res.status(404).json({ status: false, message: 'not found' });
        }
        return res.status(201).json({ status: true, message: 'deleted successfully', data: deleteAuthor });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.default = { createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor };
