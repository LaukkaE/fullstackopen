const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const mongoose = require('mongoose');

// const Blog = mongoose.model('Blog', blogSchema);

mongoose
    .connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message);
    });

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

const PORT = config.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
