const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const { blogs } = require('../tests/test_helper');

router.post('/reset', async (request, response) => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    response.status(204).end();
});

router.post('/addblogs', async (request, response) => {
    console.log(blogs);
    await Blog.insertMany(blogs);

    response.status(200).end();
});

module.exports = router;
