const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];
const phoneName = process.argv[3];
const phoneNumber = process.argv[4];

const url = `mongodb+srv://fsopen:${password}@cluster0.dhkmw.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const numberSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date,
});
const Number = mongoose.model('Number', numberSchema);

if (phoneName && phoneNumber) {
    const number = new Number({
        name: phoneName,
        number: phoneNumber,
        date: new Date(),
    });

    number.save().then(() => {
        console.log(`added ${phoneName} number ${phoneNumber} to phonebook`);
        mongoose.connection.close();
    });
} else {
    console.log('phonebook:');
    Number.find({}).then((result) => {
        result.forEach((number) => {
            console.log(number.name, number.number);
        });
        mongoose.connection.close();
    });
}
