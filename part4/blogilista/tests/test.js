const listHelper = require('../utils/list_helper');
const { listWithOneBlog, blogs } = require('./test_helper');

describe('total likes', () => {
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });
    test('when list has multiple blogs equals the likes of the sum of their likes', () => {
        const result = listHelper.totalLikes(blogs);
        expect(result).toBe(36);
    });
    test('empty list returns zero', () => {
        const result = listHelper.totalLikes([]);
        expect(result).toBe(0);
    });
});

describe('favourite blog', () => {
    test('when list has only one blog equals that blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog);
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        });
    });

    test('when list has multiple blogs equals to the blog with most likes', () => {
        const result = listHelper.favoriteBlog(blogs);
        expect(result).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12,
        });
    });
    test('empty list returns zero', () => {
        const result = listHelper.favoriteBlog([]);
        expect(result).toEqual(0);
    });
});
describe('authors multiple works', () => {
    test('when list has multiple blogs equals the author with most blogs and number of blogs', () => {
        const result = listHelper.mostBlogs(blogs);
        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3,
        });
    });
    test('when list has multiple blogs equals the author with most likes and number of likes', () => {
        const result = listHelper.mostLikes(blogs);
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17,
        });
    });
});
