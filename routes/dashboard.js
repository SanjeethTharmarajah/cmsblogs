const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

// Dashboard page
router.get('/', async (req, res) => {
  try {
    const userId = req.session.userId; // store user ID from the session

    // Check if userId is defined before using it in the query
    if (userId !== undefined) {
      const posts = await Post.findAll({
        where: {
          userId: userId // Use the retrieved userId
        },
      });
      const posts2 = posts.map((posts) =>
      posts.get({ plain: true })
    );
    console.log(posts2);
      // Render the view with the retrieved posts
      res.render('dashboard', {posts2});
   
      
    } else {
      // Handle case where userId is undefined
      res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/">Go Back</a></font></center>');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Create new post
// Define the GET route for displaying the create post form
router.get('/createpost', (req, res) => {
  // Render the create post form view
  res.render('createpost'); // Make sure you have a corresponding view file
});

router.post('/createpost', async (req, res) => {
  const userId = req.session.userId;
  const { title, content } = req.body;

  await Post.create({
    title,
    content,
    userId
  });

  res.redirect('/dashboard');
});

// Edit post
router.get('/edit-post/:id', async (req, res) => {
  const userId = req.session.userId; 
  if (userId !== undefined) {
    const postId = req.params.id;
    const posts = await Post.findAll({ where: { id: postId } });
    const posts2 = posts.map((posts) =>
        posts.get({ plain: true })
      );

    res.render('edit-post', { posts2 });
    
    router.post('/edit-post/:id', async (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;

    const post = await Post.findByPk(postId);
    post.title = title;
    post.content = content;
    await post.save();

    res.redirect('/dashboard');
    });
  }
  else {
    // Handle case where userId is undefined
    res.status(403).send('<center><br><br><font size="5">Please, go back and login first ! <br><br> <a href="/">Go Back</a></font></center>');
  }
  });

// Delete post
router.get('/delete-post/:id', async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findByPk(postId);
  await post.destroy();
  
  res.redirect('/dashboard');
});


module.exports = router;
