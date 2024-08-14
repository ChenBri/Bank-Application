const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

const cookieParser = require("cookie-parser");

var cron = require('node-cron');
const removeUnverifiedUsers = require('./utils/removeUnverifiedUsers')


// Connect to database
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://chenbrilling1:1234@chencluster.b5ne8ew.mongodb.net/bank?retryWrites=true&w=majority&appName=ChenCluster";
mongoose.connect(mongoDB);


app.use(cookieParser());

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors({
    credentials: true,
    origin: "http://127.0.0.1:3000",
}));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/api/status', require('./routes/api/status'));
app.use('/api/register', require('./routes/api/register'));
app.use('/api/authenticate', require('./routes/api/authenticate'));
app.use('/api/balance', require('./routes/api/balance'));
app.use('/api/transactions', require('./routes/api/transactions'));
app.use('/api/logout', require('./routes/api/logout'));
app.use('/api/verify', require('./routes/api/verify'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

var task = cron.schedule('0 1 * * *', () => {
    removeUnverifiedUsers();
}, {
    scheduled: false
});

task.start();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));