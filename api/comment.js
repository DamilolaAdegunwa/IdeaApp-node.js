const CommentApis = () => {
// const express = require('express');
// const router = express.Router();
// const Comment = require('../models/Comment');
// const passport = require('passport');

//1
// Create API endpoint
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Check if the user making the request is an admin
    if (!req.user.isAdmin) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // Check that the request data is not null
    if (!req.body) {
        return res.status(400).json({ error: 'Invalid request data' });
    }
    // Create a new comment
    const newComment = new Comment({
        text: req.body.text,
        rating: req.body.rating,
        status: req.body.status,
        content: req.body.content,
        creatorUserId: req.user.id
    });
    // Save the comment and send a mail to admin email (admin@ideaapp.com)
    newComment.save()
        .then(comment => {
            // Send mail
            // ...
            res.status(200).json(comment);
        })
        .catch(err => {
            res.status(500).json({ error: 'Error saving comment' });
        });
});

//2
// Read all API endpoint
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Check if the user making the request is an admin
    if (!req.user.isAdmin) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // Pagination options
    const pageSize = req.query.pageSize || 20;
    const page = req.query.page || 1;
    // Find all comments
    Comment.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .then(comments => {
            // Check if export=true in the query
            if (req.query.export === 'true') {
                // Export as file
                // ...
            }
            // Check if mail=true in the query
            if (req.query.mail === 'true') {
                // Mail as excel file
                // ...
            }
            // Alert admin phone
            // ...
            // Log result
            // ...
            res.status(200).json(comments);
        })
        .catch(err => {
            res.status(500).json({ error: 'Error finding comments' });
        });
});

// const express = require('express');
// const router = express.Router();
// const Comment = require('../models/Comment');
// const passport = require('passport');

//3
// READ API
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Check if the user making the request is an administrator
  if (!req.user.isAdmin) return res.status(401).json({ error: 'Unauthorized' });

  // Find the comment by ID
  Comment.findById(req.params.id, (err, comment) => {
    if (err) return res.status(404).json({ error: 'Invalid comment ID' });
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    res.json(comment);
  });
});

//4
// UPDATE API
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Check if the user making the request is an administrator
  if (!req.user.isAdmin) return res.status(401).json({ error: 'Unauthorized' });

  // Find the comment by ID and update it with the new data
  Comment.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, comment) => {
    if (err) return res.status(404).json({ error: 'Invalid comment ID' });
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    res.json(comment);
  });
});

//5
// DELETE API
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Check if the user making the request is an administrator
  if (!req.user.isAdmin) return res.status(401).json({ error: 'Unauthorized' });

  // Find the comment by ID and delete it
  Comment.findByIdAndDelete(req.params.id, (err, comment) => {
    if (err) return res.status(404).json({ error: 'Invalid comment ID' });
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    res.json({ message: 'Comment deleted' });
  });
});
};