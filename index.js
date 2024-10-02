const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User.js');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log('Server is running on port 2000');
});