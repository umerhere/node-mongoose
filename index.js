const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/confusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("COnnection established");

    Dishes.create({ //another method for creating the document
        name: 'Uthappizza',
        description: 'Testing description for mongoose scheme insertion'
    }).then((dish) => {
        console.log(dish);

        return Dishes.find({}).exec(); //exec insures that this will get executed
    }).then((dishes) => {
        console.log(dishes);

        return Dishes.remove({});
    }).then(() => {
        return mongoose.connection.close();
    }).catch(err => console.log(err))
});

