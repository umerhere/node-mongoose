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
        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated test' },
        }, {
            new:true //once update of dish is complete, this will return a dish back to us and this new updated dish will then be passed to .then
        }).exec(); //exec insures that this will get executed
    
    }).then((dish) => {
    
        console.log(dish);
        dish.comments.push({
            rating: 5,
            comment: "I\'m getting a hike!",
            author: "Leonardo Di Joe"
        });
        return dish.save();

    }).then((dish) => {
        
        console.log(dish);
        return dish.remove({});

    }).then(() => {
        
        return mongoose.connection.close();
    
    }).catch(err => console.log(err))
});

