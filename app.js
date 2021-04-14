const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
//const jwt = require('_helpers/jwt');

const testRoute = require('./routes/test');
const userRoute = require('./routes/user');
const dbRoute = require('./routes/db1');

const app = express();

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//app.use(jwt());

app.get('/', (req, res) => {
    res.send("router");
});

app.use('/test', testRoute);
app.use('/user', userRoute);

app.use('/db', dbRoute);

app.listen(process.env.PORT || 3000, () => console.log(`Example app listening at http://localhost:3000`));

module.exports = app;