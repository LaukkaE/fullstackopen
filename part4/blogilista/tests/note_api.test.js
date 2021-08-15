const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');
const { listWithOneBlog, blogs, blogsInDb } = require('./test_helper');
const Blog = require('../models/blog');
const blog = require('../models/blog');
const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(blogs);
});

describe('blog get tests', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('blogs return correct number of blogs', async () => {
        const response = await api.get('/api/blogs');

        expect(response.body).toHaveLength(blogs.length);
    });
    test('blogs contain id field', async () => {
        const response = await api.get('/api/blogs');
        response.body.forEach((blog) => {
            expect(blog.id).toBeDefined();
        });
    });
});

describe('blog post tests', () => {
    test('blogs can be added with http post', async () => {
        const newBlog = {
            title: 'Pertun testaamisen alkeet',
            author: 'Perttu Perustestaaja',
            likes: 999,
            url: 'https://stackoverflow.com',
        };
        await api.post('/api/blogs').send(newBlog);

        const numberOfBlogs = await blogsInDb();
        expect(numberOfBlogs).toHaveLength(blogs.length + 1);

        const contents = numberOfBlogs.map((blog) => blog.author);
        expect(contents).toContain('Perttu Perustestaaja');
    });
    test('blogs added without likes field defaults to 0', async () => {
        const newBlog = {
            title: 'Pertun testaamisen alkeet',
            author: 'Perttu Perustestaaja',
            url: 'https://stackoverflow.com',
        };
        await api.post('/api/blogs').send(newBlog);
        const blogList = await blogsInDb();
        expect(blogList[blogList.length - 1].likes).toEqual(0);
    });
    test('blogs added without title fails', async () => {
        const newBlog = {
            author: 'Perttu Perustestaaja',
            likes: 999,
            url: 'https://stackoverflow.com',
        };
        await api.post('/api/blogs').send(newBlog).expect(401);
    });
    test('blogs added without URL fails', async () => {
        const newBlog = {
            title: 'Pertun testaamisen alkeet',
            author: 'Perttu Perustestaaja',
            likes: 999,
        };
        await api.post('/api/blogs').send(newBlog).expect(401);
    });
});

describe('test for updating or removing a blog', () => {
    test('a single blog can be removed', async () => {
        const blogs = await blogsInDb();
        const idToDelete = blogs[0].id;

        await api.delete(`/api/blogs/${idToDelete}`).expect(204);

        const blogsAfterDelete = await blogsInDb();

        expect(blogsAfterDelete).toHaveLength(blogs.length - 1);
    });
    test('updating the number of likes in a blog', async () => {
        const updatedLikes = {
            likes: 123,
        };
        const blogs = await blogsInDb();
        const idToUpdate = blogs[0].id;

        await api.put(`/api/blogs/${idToUpdate}`).send(updatedLikes);

        const updatedBlogList = await blogsInDb();
        expect(updatedBlogList[0].likes).toEqual(123);
    });
});

afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    await mongoose.connection.close();
    console.log('mongo connection close');
});
