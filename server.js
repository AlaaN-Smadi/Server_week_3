'use strict';


const express = require('express');   //   import  server  requirments 

require('dotenv').config();  //   to  activate  .env  file 

const cors = require('cors');
// const axios = require('axios');

const componentDidMount = require('./BestBooks')

const server = express();  //   name  of  the  server,  to manage process
const PORT = process.env.PORT;  //  PORT  name  and  number 
server.use(cors());


server.get('/books',componentDidMount)


server.get('/', (req, res) => {
    res.send('  Welcome  To  Alaa  Server  ')
})

server.get('*', (req, res) => {
    res.status(500).send('NOT FOUND')
})



server.listen(PORT, () => {  //   function  to  awake  Server 
    console.log(`Listening on PORT ${PORT}`);
})


