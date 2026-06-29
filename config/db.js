const mongoose = require('mongoose');

mongoose.connect('mongodb://manthanranderi4_db_user:blog2730@ac-hpzzchc-shard-00-00.km9nayu.mongodb.net:27017,ac-hpzzchc-shard-00-01.km9nayu.mongodb.net:27017,ac-hpzzchc-shard-00-02.km9nayu.mongodb.net:27017/?ssl=true&replicaSet=atlas-bovvr1-shard-0&authSource=admin&appName=blog');

const db = mongoose.connection;

db.once('open',(err) =>{
    if(err){
        console.log(err);
        return false;
    }
    console.log('DATABASE CONNECTION SUCCESFULLY');
});

module.exports = db;
