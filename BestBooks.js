'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://AloshSmadi:MqG8webtRfEHSaH2@cluster0-shard-00-00.jj9nx.mongodb.net:27017,cluster0-shard-00-01.jj9nx.mongodb.net:27017,cluster0-shard-00-02.jj9nx.mongodb.net:27017/myLogInApp?ssl=true&replicaSet=atlas-xwabrw-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });




require('dotenv').config();  //   to  activate  .env  file 
// const axios = require('axios');


const functionGroups = {}


const BookSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String
});

const Books = new mongoose.Schema({
    email: String,
    books: [BookSchema]
});

let userModel = mongoose.model('Auther', Books);

functionGroups.seedMyFavoriteBooks = (meMail) => {


    const wealthBooks = new userModel({
        email: meMail,
        books: [
            {
                name: 'First Book',
                description: `First Description`,
                status: 'First Status'
            }
        ]
    });


    wealthBooks.save();

    return wealthBooks

}


functionGroups.addNewBookFunc = (req, res) => {
    const { bookName, bookStatus, bookDesc, imgUrl, MyNewBookemail } = req.body

    console.log(req.body)

    console.log(req.body.email)

    userModel.find({ email: req.body.email }, function (error, ownerData) {
        if (error) {
            console.log("did not work")

            res.send('did not work')
        } else {
            console.log(req.body.email)

            console.log(ownerData[0])

            ownerData[0].books.push({
                name: req.body.bookName,
                description: req.body.bookDesc,
                status: req.body.bookStatus
            })
            ownerData[0].save()

            console.log(ownerData)

            res.send(ownerData)
        }


    })


}



functionGroups.componentDidMount = (req, res) => {



    let myEmail = req.query.email;

    console.log(userModel)
    console.log(myEmail)

    // myEmail
    userModel.find({ email: myEmail }, function (error, ownerData) {
        if (error) {
            // console.log("did not work")

            let dataNew = functionGroups.seedMyFavoriteBooks(myEmail)
            console.log(dataNew)
            let newArr = [dataNew]
            res.send(newArr)

        } else {
            console.log(ownerData)
            res.send(ownerData)
        }
    })
}



//  delete  =>  /deleteMyBook

functionGroups.deleteMyBook = (rec, res) => {
    console.log('delete')

    console.log(rec.query)
    console.log(rec.params)

    let id = Number(rec.params.bookID)
    let myEmail = rec.query.email

    console.log("id = ", id)
    console.log("email = ", myEmail)


    userModel.find({ email: myEmail }, function (error, ownerData) {
        if (error) {
            // console.log("did not work")

            console.log("Error")
            res.send('Data could not find ')

        } else {
            console.log(ownerData[0].books)

            let newArr = ownerData[0].books.filter((book, index) => {
                if (index !== id)
                    return true
            })

            console.log(newArr)

            ownerData[0].books = newArr

            ownerData[0].save();

            console.log(ownerData[0].books)

            res.send(ownerData)
        }
    })

}


//  updateFun  =>  /updateFun

functionGroups.updateFun = (rec, res) => {
    console.log('update')


    let id = Number(rec.params.bookID)
    let myEmail = rec.body.params.email
    let myName = rec.body.params.name
    let myDesc = rec.body.params.desc
    let myStatus = rec.body.params.status
    let myUrl = rec.body.params.url

    console.log(id)
    console.log(myEmail)

    userModel.find({ email: myEmail }, function (error, ownerData) {
        if (error) {
            // console.log("did not work")

            console.log("Error")
            res.send('Data could not find ')

        } else {
            console.log(ownerData[0].books[id])

            ownerData[0].books[id].name = myName
            ownerData[0].books[id].description = myDesc
            ownerData[0].books[id].status = myStatus

            ownerData[0].save()
            res.send(ownerData)
        }
    })

}

module.exports = functionGroups;

