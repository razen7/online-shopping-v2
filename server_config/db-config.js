const mongoose = require('mongoose');

const DB_NAME = 'bazaar';
const DB_URI = `mongodb+srv://admin:wB3iDDpS8mfrW6ko@cluster0.gcqabka.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const connectToDB = () => {
    mongoose
        .connect(
            DB_URI,
            {
                useUnifiedTopology: true,
                useNewURLParser: true,
            },
        )
        .then(() => console.log('Connected to DB'))
        .catch((err) => console.log(err));
}

module.exports = connectToDB;