import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import DB from './lib/user.stream.store';
import Service from './lib/user.stream.service';
import StreamRoute from './routes/stream';
import IndexRouter from './routes/index';

const db = DB();
const service = Service(db);
const streamRouter = StreamRoute(service);
const indexRouter = IndexRouter(streamRouter);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.disable('x-powered-by');
app.use('/', indexRouter.router());

export default app;
