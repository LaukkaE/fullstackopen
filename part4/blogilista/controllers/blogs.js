const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const { usersInDb } = require('../tests/test_helper');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1,
    });
    response.json(blogs.map((blog) => blog.toJSON()));
});

//  Vanha toteutus
// blogsRouter.post('/', async (request, response) => {
//     const body = request.body;
//     const users = await usersInDb();
//     const blog = new Blog({
//         title: body.title,
//         author: body.author,
//         likes: body.likes,
//         url: body.url,
//         user: users[0].id,
//     });
//     const user = await User.findById(users[0].id);
//     const savedBlog = await blog.save();
//     user.blogs = user.blogs.concat(savedBlog._id);
//     await user.save();

//     response.json(savedBlog.toJSON());
// });
blogsRouter.post('/', async (request, response) => {
    console.log(request.body);
    const body = request.body;
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    // const user = await User.findById(decodedToken.id);
    const user = request.user;
    if (!user) {
        return response.status(401).json({ error: 'not logged in' });
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        likes: body.likes,
        url: body.url,
        user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.json(savedBlog.toJSON());
});
blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    // console.log(decodedToken);
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndDelete(request.params.id);
        return response.status(204).json({});
    } else {
        return response.status(401).json({ error: 'Unauthorized action' });
    }
});

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body;

    const blog = {
        likes: body.likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    });
    response.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
