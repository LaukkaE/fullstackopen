const {
    ApolloServer,
    gql,
    UserInputError,
    AuthenticationError,
} = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET;

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
    })
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    });

const typeDefs = gql`
    type Author {
        name: String!
        born: String
        id: ID!
        bookCount: Int
    }
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String]!
        ): Book
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(username: String!, favoriteGenre: String!): User
        login(username: String!, password: String!): Token
    }
`;

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            const books = await Book.find({}).populate('author', {
                name: 1,
                born: 1,
            });
            if (!args.author) {
                return args.genre
                    ? books.filter((book) => book.genres.includes(args.genre))
                    : books;
            }
            // reduce joka palauttaa valitun authorin kirjat, sekä poistaa kirjat jotka ei kuulu genreen, jos sellainen on annettu.
            const authorsBooks = books.reduce((acc, cur) => {
                if (args.genre && !cur.genres.includes(args.genre)) {
                    return acc;
                }
                return cur.author.name === args.author ? [...acc, cur] : acc;
            }, []);
            return authorsBooks;
        },
        allAuthors: async () => {
            const authors = await Author.find({});
            const books = await Book.find({}).populate('author');
            return authors.map((author) => {
                return {
                    name: author.name,
                    born: author.born,
                    id: author.id,
                    // reduce joka käyttäytyy kuin filter().length
                    bookCount: books.reduce((acc, cur) => {
                        return cur.author.name === author.name ? acc + 1 : acc;
                    }, 0),
                };
            });
        },
        me: (root, args, context) => {
            return context.currentUser;
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new AuthenticationError('not authenticated');
            }
            if (args.title.length < 2) {
                throw new UserInputError('Book title too short');
            }
            let author = await Author.findOne({ name: args.author });
            // Jos authoria ei löydy ennestään, lisätään se järjestelmään
            console.log(author);
            if (!author) {
                console.log('author not found');
                if (args.author.length < 4) {
                    throw new UserInputError('author name too short');
                }
                author = new Author({ name: args.author });
                await author.save();
            }
            try {
                const newBook = new Book({ ...args, author: author });
                newBook.save();
                return newBook;
            } catch (error) {
                throw new UserInputError(error.message, { invalidArgs: args });
            }
        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new AuthenticationError('not authenticated');
            }
            const author = await Author.findOne({ name: args.name });
            if (!author) {
                throw new UserInputError('author not found in database');
            }
            author.born = args.setBornTo;
            try {
                await author.save();
                return author;
            } catch (error) {
                throw new UserInputError(error.message, { invalidArgs: args });
            }
        },
        createUser: (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
            });

            return user.save().catch((error) => {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            });
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== 'secret') {
                throw new UserInputError('wrong credentials');
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, JWT_SECRET) };
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser };
        }
    },
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
