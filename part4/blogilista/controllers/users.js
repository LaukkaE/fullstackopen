var bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
    const body = request.body;
    if (!body.password || !body.username) {
        return response
            .status(400)
            .json({ error: 'password or username missing' });
    }
    if (body.password.length < 3 || body.username.length < 3) {
        return response
            .status(400)
            .json({ error: 'password or username too short' });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hashSync(body.password, salt);

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    });

    const savedUser = await user.save();

    response.json(savedUser);
});
usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {
        title: 1,
        author: 1,
        likes: 1,
    });

    response.json(users.map((u) => u.toJSON()));
});
module.exports = usersRouter;
