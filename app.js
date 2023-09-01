const path = require('path');
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const sequelize = require('./config/database');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false
}));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
// Sync models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));
app.use('/dashboard', require('./routes/dashboard'));

// Start the server
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
