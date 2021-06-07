const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// const password = process.argv[2]; 
// const phoneName = process.argv[3]; 
// const phoneNumber = process.argv[4];

const url = process.env.MONGODB_URL;

// const url = `mongodb+srv://fsopen:${password}@cluster0.dhkmw.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`;

console.log('connecting to', url);
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    });

const numberSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true,minlength: 3 },
    number: { type: String, required: true, unique: true,minlength: 8 },
    date: { type: Date, required: false },
});

numberSchema.plugin(uniqueValidator);

numberSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model('Number', numberSchema);
