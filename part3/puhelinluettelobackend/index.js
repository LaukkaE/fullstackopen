require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Number = require('./models/number');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static('build'));

// app.use(morgan('tiny'));

morgan.token('data', (req, ) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :response-time ms :data'));

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/info', (req, res, next) => {
    let time = new Date();
    Number.countDocuments({})
        .then((result) => {
            let count = result;
            console.log(result);
            res.send(`Phonebook has info for ${count} people<br/>${time}
    `);
        })
        .catch((error) => next(error));
});

app.get('/api/persons', (request, response) => {
    Number.find({}).then((notes) => {
        response.json(notes);
    });
});

app.get('/api/persons/:id', (request, response, next) => {
    Number.findById(request.params.id)
        .then((number) => {
            if (number) {
                response.json(number);
            } else {
                response.status(404).end();
            }
        })
        .catch((error) => next(error));
});
app.delete('/api/persons/:id', (request, response, next) => {
    // const id = Number(request.params.id);
    // persons = persons.filter((person) => person.id !== id);

    // response.status(204).end();
    Number.findById(request.params.id)
        .then((number) => {
            number.delete().then(() => {
                response.status(204).end();
            });
        })
        .catch((error) => next(error));
});

//mongodb luo oman Id:n
// const generateId = () => {
//     const maxId =
//         persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
//     return maxId + 1;
// };

app.post('/api/persons', (request, response, next) => {
    const body = request.body;
    // console.log(request.body);

    if (!body.number || !body.name) {
        return response.status(400).json({
            error: 'number or name missing',
        });
    }

    const person = new Number({
        number: body.number,
        name: body.name,
    });

    person
        .save()
        .then((savedPerson) => savedPerson.toJSON())
        .then((savedAndFormattedPerson) => {
            response.json(savedAndFormattedPerson);
        })
        .catch((error) => next(error));
});
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        number: body.number,
        name: body.name,
    };

    Number.findByIdAndUpdate(request.params.id, person, { new: true })
        .then((updatedPerson) => {
            response.json(updatedPerson);
        })
        .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
