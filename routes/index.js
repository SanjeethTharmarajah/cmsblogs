// loads required modules
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Home page
router.get('/', async (req, res) => {
  const posts = await Post.findAll();
  const posts2 = posts.map((posts) =>
      posts.get({ plain: true })
    );
  res.render('home',  {posts2} );
});
// exports router
module.exports = router;
