'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });


require('dotenv').config();  //   to  activate  .env  file 
// const axios = require('axios');



const BookSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String
});

const Books = new mongoose.Schema({
    email: String,
    books: [BookSchema]
});

const userModel = mongoose.model('Auther', Books);

function seedMyFavoriteBooks(){
    const successBooks = new userModel({
        email: 'alaasmadi1010@gmail.com',
        books: [
            {
                name: 'act like a success ',
                description: 'Act Like a Success, Think Like a Success is a book about success that is rich with anecdotes from Steve’s life—from sleeping in his car to becoming the $40 million dollar man! This invaluable guide is written for everyone, whether you are just beginning your career or are well situated in the c-suite. ',
                status: ' rate : 4.10 out of 5'
            },
            {
                name: "How to Get Common Sense Even If You Don't Know What It Is Kindle Edition",
                description: "What is common sense? Whatever you want to learn about common sense this book has it. It's the complete common sense education. There're common sense examples, lack of common sense examples and common sense quotes. You'll learn what common sense is, how to improve common sense and logic, and how to make common sense decisions. If you want to improve common sense, or understand it better, this book will help you.",
                status: 'rate : 2.0 out of 5'
            }
        ]
    });

    const wealthBooks = new userModel({
        email: 'alaaads27@gmail.com',
        books: [
            {
                name: 'The Way to Wealth',
                description: `The first American book on personal finance, "The Way to Wealth" by Benjamin Franklin is still the best and wisest money book ever written. Originally published in 1758 as the preface to "Poor Richard's Almanack," this little gem has been through innumerable printings and sold millions of copies to those in search of smart but entertaining advice about hard work, earning and saving money and debt.`,
                status: 'rate : 4.6 out of 5'
            }
        ]
    });

    successBooks.save();
    wealthBooks.save();

}



function componentDidMount(req,res){
    // seedMyFad voriteBooks();


    const myEmail = req.query.email;

    userModel.find({email:myEmail},function(error,ownerData){
        if(error) {
            console.log("did not work")
            res.send('did not work')
        } else {
            console.log(ownerData)
            res.send(ownerData)
        }
    })
}


module.exports = componentDidMount;

