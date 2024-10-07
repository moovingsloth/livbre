const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors'); // Import the cors package
const keys = require('./config/keys');
require('./models/User.js');
require('./models/Book.js'); // Ensure Book model is included
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(express.json());

// Enable CORS for all routes
// CORS 설정
app.use(cors({
    origin: 'http://localhost:3000', // 허용할 출처
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // 쿠키 전송을 허용하려면 true로 설정
}));
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/bookRoutes')(app); // Ensure bookRoutes is included

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log('Server is running on port 2000');
});