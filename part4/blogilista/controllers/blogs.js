const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
    const body = new Blog(request.body);

    const savedBlog = await body.save();
    response.json(savedBlog.toJSON());
});

module.exports = blogsRouter;
