const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectToDB = require('./server_config/db-config');
require('dotenv').config()
const app = express();
connectToDB();

const authRouter = require('./routes/' + 'auth');
const adCategoryRouter = require('./routes/' + 'ad_category');
const adRouter = require('./routes/' + 'ad');

//middleware usage
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Router related usage
app.use('/auth', authRouter);
app.use('/ad-category', adCategoryRouter);
app.use('/ads', adRouter);

app.listen(8000); 
