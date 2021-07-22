'use strict';


const express = require('express');   //   import  server  requirments 

require('dotenv').config();  //   to  activate  .env  file 

const cors = require('cors');
// const axios = require('axios');

const functionGroups = require('./BestBooks')
// const addUserBooks = require('./addUserBooks')

const server = express();  //   name  of  the  server,  to manage process
const PORT = process.env.PORT;  //  PORT  name  and  number 
server.use(cors());
// server.use(express.bodyParser());
server.use(express.json())



server.get('/books', functionGroups.componentDidMount)

server.post('/addNewBook', functionGroups.addNewBookFunc)

server.delete('/deleteMyBook/:bookID', functionGroups.deleteMyBook)


server.put('/updateFun/:bookID', functionGroups.updateFun)

// server.get('/addBook', addUserBooks)



server.get('/', (req, res) => {
    
    res.send('  Welcome  To  Alaa  Server  ')
})

server.get('*', (req, res) => {
    res.status(500).send('NOT FOUND')
})



server.listen(PORT, () => {  //   function  to  awake  Server 
    console.log(`Listening on PORT ${PORT}`);
})


