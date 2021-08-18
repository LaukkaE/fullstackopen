const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');
const { usersInDb, blogs, blogsInDb } = require('./test_helper');
const Blog = require('../models/blog');
const User = require('../models/user');
const api = supertest(app);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('blog get tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await Blog.insertMany(blogs);
    });
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
        const user = {
            username: 'root',
            password: 'hunter2',
        };
        const loggedUser = await api.post('/api/login').send(user).expect(200);
        const newBlog = {
            title: 'Pertun testaamisen alkeet',
            author: loggedUser.body.name,
            likes: 999,
            url: 'https://stackoverflow.com',
            user: loggedUser.body.userID,
        };
        const blogs = await blogsInDb();
        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + loggedUser.body.token)
            .send(newBlog);

        const blogsAfterAdd = await blogsInDb();
        expect(blogsAfterAdd).toHaveLength(blogs.length + 1);

        const contents = blogsAfterAdd.map((blog) => blog.author);
        expect(contents).toContain(loggedUser.body.name);
    });
    test('blogs added without likes field defaults to 0', async () => {
        const user = {
            username: 'root',
            password: 'hunter2',
        };
        const loggedUser = await api.post('/api/login').send(user).expect(200);
        const newBlog = {
            title: 'Pertun testaamisen alkeet',
            author: 'Perttu Perustestaaja',
            url: 'https://stackoverflow.com',
            user: loggedUser.body.userID,
            author: loggedUser.body.name,
        };
        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + loggedUser.body.token)
            .send(newBlog);
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
    beforeEach(async () => {
        await Blog.deleteMany({});
        await Blog.insertMany(blogs);
    });
    // test('a single blog can be removed', async () => {
    //     const blogs = await blogsInDb();
    //     const idToDelete = blogs[0].id;

    //     await api.delete(`/api/blogs/${idToDelete}`).expect(204);

    //     const blogsAfterDelete = await blogsInDb();

    //     expect(blogsAfterDelete).toHaveLength(blogs.length - 1);
    // });

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
describe('tests for user management', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = await bcrypt.hashSync('hunter2', salt);
        const user = new User({
            username: 'root',
            passwordHash,
            name: 'Perttu',
        });

        await user.save();
    });
    test('new user can be added', async () => {
        const users = await usersInDb();
        const newUser = {
            username: 'Pete66',
            name: 'Perttu Perustestaaja',
            password: 'hunter2',
        };

        await api.post('/api/users').send(newUser).expect(200);
        const usersAfterAdd = await usersInDb();
        expect(usersAfterAdd.length).toEqual(users.length + 1);
    });
    test('user with non unique username cannot be added', async () => {
        const users = await usersInDb();
        const newUser = {
            username: 'root',
            password: 'hunter2',
            name: 'Vallu Vale',
        };
        await api.post('/api/users').send(newUser).expect(401);
        const usersAfterAdd = await usersInDb();
        expect(usersAfterAdd.length).toEqual(users.length);
    });
    test('adding user fails if password is under three characters long', async () => {
        const users = await usersInDb();
        const newUser = {
            username: 'ValtteriBottas',
            password: 'hu',
            name: 'Vallu Vale',
        };
        await api.post('/api/users').send(newUser).expect(400);
        const usersAfterAdd = await usersInDb();
        expect(usersAfterAdd.length).toEqual(users.length);
    });
});
describe('login and token tests', () => {
    // beforeEach(async () => {
    //     await User.deleteMany({});

    //     const salt = bcrypt.genSaltSync(10);
    //     const passwordHash = await bcrypt.hashSync('hunter2', salt);
    //     const user = new User({
    //         username: 'root',
    //         passwordHash,
    //         name: 'Perttu',
    //     });

    //     await user.save();
    // });
    test('login with right credentials work', async () => {
        const user = {
            username: 'root',
            password: 'hunter2',
        };
        await api
            .post('/api/login')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });
    test('login with wrong credentials doesnt work', async () => {
        const user = {
            username: 'root',
            password: 'hackerman',
        };
        await api.post('/api/login').send(user).expect(401);
    });
    test('a login can be performed, blog can be added and the added blog can be removed', async () => {
        const user = {
            username: 'root',
            password: 'hunter2',
        };
        const loggedUser = await api.post('/api/login').send(user).expect(200);
        console.log(loggedUser.body);
        const blog = {
            title: 'Perttu Testailee jälleen',
            author: loggedUser.body.name,
            likes: 0,
            url: 'google.com',
            user: loggedUser.body.userID,
        };
        const blogs = await blogsInDb();
        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + loggedUser.body.token)
            .send(blog)
            .expect(200);
        const blogsAfterAdd = await blogsInDb();
        expect(blogs.length).toEqual(blogsAfterAdd.length - 1);
        const idToDelete = blogsAfterAdd[blogsAfterAdd.length - 1].id;
        await api
            .delete(`/api/blogs/${idToDelete}`)
            .set('Authorization', 'Bearer ' + loggedUser.body.token)
            .expect(204);

        const blogsAfterDelete = await blogsInDb();

        expect(blogsAfterDelete).toHaveLength(blogs.length);
    });
    test('cannot add blog without token', async () => {
        const blog = {
            title: 'Pertun iltasadut',
            author: 'Perttu',
            likes: 0,
            url: 'google.com',
        };
        await api.post('/api/blogs').send(blog).expect(401);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
    console.log('mongo connection close');
});
