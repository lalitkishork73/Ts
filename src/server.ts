import express, { Application, Response, Request, NextFunction } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import authorRoutes from './routes/Author';
import bookRoutes from './routes/Book';

const app: Application = express();

/*connect Mongoose*/

mongoose.set('strictQuery', false);
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Mongodb connected');
        StartServer();
    })
    .catch((err) => console.log(err));

const StartServer = () => {
    app.use((req, res, next) => {
        /* Log the request */
        Logging.info(`Incoming -> method: [${req.method}] -Url:[${req.url}] -IP[${req.socket.remoteAddress}]`);

        res.on(`finish`, () => {
            Logging.info(`Incoming -> method: [${req.method}] -Url:[${req.url}] -IP[${req.socket.remoteAddress}] -Status:[${res.statusCode}]`);
        });

        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    /** Rules of our API */
    app.use((req: Request, res: Response, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /* Routes */
    app.use('/authors', authorRoutes);
    app.use('/books', bookRoutes);

    /* HealthCheck */

    app.get('/ping', (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({ message: 'pong' });
    });

    /* Error Handling  */
    app.use('*', (req: Request, res: Response) => {
        return res.status(400).json({ status: false, message: 'bad url' });
    });

    app.use((req: Request, res: Response, next: NextFunction) => {
        const error = new Error('not found');
        Logging.error(error);
        return res.status(404).json({ message: error.message });
    });

    http.createServer(app).listen(config.server.port, () => {
        Logging.info(`Server listening on port ${config.server.port}`);
    });
};

// app.listen(config.server.port,()=>{
//     Logging.info(`Server listening on port ${config.server.port}`);
// })
