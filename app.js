require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');

const User = require('./models/User')

const PORT = process.env.PORT;
const app = express();


//Passport config
require('./middleware/passport')(passport)

//Connect to mongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("MongoDB Connected!");
}).catch((e) => {
    console.log("Cannot connect to MongoDB!", e)
})

//Parse requests with "Content-Type": "application/json"
app.use(bodyParser.json());

//Parse requests with "Content-Type": "application/x-www-form-urlencoded"
app.use(bodyParser.urlencoded({extended: true}));

//Sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())

//Basic route
app.get('/', (req, res) => {
    res.send(`This is a basic template to implement google oauth using NodeJS and PassportJS.`);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});