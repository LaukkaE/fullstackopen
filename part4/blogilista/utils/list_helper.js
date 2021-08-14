var _ = require('lodash');

const totalLikes = (blogs) => {
    if (blogs.length === 0) return 0;
    return blogs.reduce((sum, item) => {
        return sum + item.likes;
    }, 0);
};

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return 0;
    let highestBlog = blogs.reduce((currentHigh, item) => {
        if (!currentHigh.likes) return item;
        return item.likes > currentHigh.likes ? item : currentHigh;
    }, {});
    return _.pick(highestBlog, ['title', 'author', 'likes']);
};

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return 0;
    let authorList = blogs.reduce((list, item) => {
        list[item.author] = ++list[item.author] || 1;
        return list;
    }, {});

    let maxAuthor = _.maxBy(Object.keys(authorList), (o) => authorList[o]);
    return { author: maxAuthor, blogs: authorList[maxAuthor] };
};

const mostLikes = (blogs) => {
    if (blogs.length === 0) return 0;
    let authorList = blogs.reduce((list, item) => {
        list[item.author]
            ? (list[item.author] += item.likes)
            : (list[item.author] = item.likes);
        return list;
    }, {});
    let maxAuthor = _.maxBy(Object.keys(authorList), (o) => authorList[o]);
    return { author: maxAuthor, likes: authorList[maxAuthor] };
};

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
