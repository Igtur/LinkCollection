const express = require('express');
const config = require('config');
const  mongoose = require('mongoose');

const app = express();

app.use('/api/auth', require('./routes/auth.routes'))  //подключение midleware без создания переменной

const PORT = config.get('port') || 4000;

app.use(express.urlencoded({ extended: true }));

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        app.listen(PORT,()=> console.log(`App run on port ${PORT}`));
    }catch (e){
        console.log('Server Error', e.message);
        process.exit(1);
    }
};

start();


