const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blogs');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const Blog = require('./models/blog');


async function mongoConnect() {
  await mongoose.connect(config.MONGODB_URI);
  console.log('Connected');
}

mongoConnect();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


module.exports = app