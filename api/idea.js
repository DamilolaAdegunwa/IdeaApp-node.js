const ideaApis = (app, Idea, passport) => {
    //1) Ideas index route
    
app.get('/ideas', (req, res) => {
    Idea.find({})
      .then(ideas => {
          console.log(`ideas returned: ${ideas}`);
        res.json(ideas);
      })
      .catch(err => {
        res.status(404).json({ noideasfound: 'No ideas found' });
      });
  });

  //2) Ideas create route
app.post('/ideas', passport.authenticate('jwt', { session: false }), (req, res) => {
    const newIdea = new Idea({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id
    });
  
    newIdea
      .save()
      .then(idea => res.json(idea))
      .catch(err => res.status(400).json(err));
  });
}

module.exports = ideaApis;