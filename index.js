const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
const keys = require('./config/keys');
const next = require('next');

require('./models/User.js');
require('./models/Book.js');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: './client' }); // Specify the client directory
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();

  app.use(express.json());

  // Enable CORS for all routes
  app.use(cors({
    origin: dev ? 'http://localhost:3000' : 'https://agile-river-56065-ef389f3444b0.herokuapp.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
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
  require('./routes/bookRoutes')(app);

  if (process.env.NODE_ENV === 'production') {
    // Serve static files from the Next.js build directory
    app.use(express.static('client/.next'));

    // Serve the Next.js application
    app.get('*', (req, res) => {
      return handle(req, res);
    });
  } else {
    // Serve the Next.js application
    app.get('*', (req, res) => {
      return handle(req, res);
    });
  }

  const PORT = process.env.PORT || 2000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});