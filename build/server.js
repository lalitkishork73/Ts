"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const Author_1 = __importDefault(require("./routes/Author"));
const Book_1 = __importDefault(require("./routes/Book"));
const app = (0, express_1.default)();
/*connect Mongoose*/
mongoose_1.default.set('strictQuery', false);
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    Logging_1.default.info('Mongodb connected');
    StartServer();
})
    .catch((err) => console.log(err));
const StartServer = () => {
    app.use((req, res, next) => {
        /* Log the request */
        Logging_1.default.info(`Incoming -> method: [${req.method}] -Url:[${req.url}] -IP[${req.socket.remoteAddress}]`);
        res.on(`finish`, () => {
            Logging_1.default.info(`Incoming -> method: [${req.method}] -Url:[${req.url}] -IP[${req.socket.remoteAddress}] -Status:[${res.statusCode}]`);
        });
        next();
    });
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    /** Rules of our API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    /* Routes */
    app.use('/authors', Author_1.default);
    app.use('/books', Book_1.default);
    app.use('*', (req, res) => {
        return res.status(400).json({ status: false, message: 'bad url' });
    });
    /* HealthCheck */
    app.get('/ping', (req, res, next) => {
        return res.status(200).json({ message: 'pong' });
    });
    /* Error Handling  */
    app.use((req, res, next) => {
        const error = new Error('not found');
        Logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(app).listen(config_1.config.server.port, () => {
        Logging_1.default.info(`Server listening on port ${config_1.config.server.port}`);
    });
};
// app.listen(config.server.port,()=>{
//     Logging.info(`Server listening on port ${config.server.port}`);
// })
