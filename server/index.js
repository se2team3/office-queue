// import modules
const express = require('express');
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const createError = require('http-errors');
const queueModel = require('./models/queueModel');
const CronJob = require('../lib/cron.js').CronJob;

// import Auth

// import routes
const counterRouter = require('./routes/counterRoute');
const queueRouter = require('./routes/queueRoute');
const boardRouter=require('./routes/boardRoute')
const operationRouter = require('./routes/operationRoute');

const PORT = 3001;

const app = express();

// set up Middlewares, in order
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// set up Routers
app.use('/api', counterRouter);
app.use('/api', queueRouter);
app.use('/api', boardRouter)
app.use('/api', operationRouter);

// Error routes: keep as last routes
//   catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
//   error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));


/*
*       Creation of tables: do this only once!
*/
/*
const counterModel = require('./models/counterModel');
const operationModel = require('./models/operationModel');
operationModel.createOperationsList().then();
counterModel.createCountersList().then();
counterModel.createCountersOperationsList().then();

queueModel.createQueue().then();



const t = setInterval(function(){
    const date = new Date();
        if(date.getHours() === 19 && date.getMinutes() === 30) {
            queueModel.deleteQueue().then();
        }
    },60000);*/

const job = new CronJob('00 30 19 * * 1-7',queueModel.deleteQueue());

job.start();