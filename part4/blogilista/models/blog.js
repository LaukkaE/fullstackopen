const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    url: { type: String, required: true },
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: [
        {
            type: String,
            ref: 'Comment',
        },
    ],
    username: String,
    nameOfUser: String,
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        if (!returnedObject.likes) returnedObject.likes = 0;
    },
});

module.exports = mongoose.model('Blog', blogSchema);
