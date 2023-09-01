const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// View individual post
router.get('/:id', async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findByPk(postId);
  const comments = await Comment.findAll({ where: { postId } });
  res.render('post', { post, comments });
});

// Add comment
router.post('/add-comment', async (req, res) => {
  const postId = req.body.postId;
  const content = req.body.content;

  await Comment.create({
    postId,
    content
  });

  res.redirect(`/posts/${postId}`);
});

module.exports = router;
