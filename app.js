const express = require('express')

const port = process.env.PORT || 8080;

require('./config/db');

const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded());

app.use(express.static('public'));

app.use(cookieParser());

app.use('/', require('./routes/adminRoutes'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Server Running On Port ${port}`);
        console.log(`http://localhost:${port}`);
    }
})
