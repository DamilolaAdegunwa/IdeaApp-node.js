const tagApis = (router, Tag) => {
    //1
    router.post('/tag/create', passport.authenticate('jwt', { session: false }), async (req, res) => {
        const { name, useCount, lastUsed, description, relatedTags, isActive } = req.body;
      
        try {
          // Check if the tag already exists
          const existingTag = await Tag.findOne({ name });
          if (existingTag) {
            return res.status(400).json({ error: 'The tag already exists' });
          }
      
          // Check if any of the related tags already exist
          const relatedExist = await Tag.find({ name: { $in: relatedTags } });
          if (relatedExist.length > 0) {
            return res.status(400).json({ error: 'One of the related tags already exists' });
          }
      
          // Create the new tag
          const newTag = new Tag({
            name,
            useCount,
            lastUsed,
            description,
            relatedTags,
            isActive
          });
          await newTag.save();
      
          // Log the saved request
          console.log(`New tag created: ${newTag}`);
      
          // Return the created tag
          res.json(newTag);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error creating the tag' });
        }
    });

    //2
    router.post('/create-bulk', passport.authenticate('jwt', { session: false }), async (req, res) => {
        const tags = req.body.tags;
      
        try {
          // Check if any of the tags already exist
          const existingTags = await Tag.find({ name: { $in: tags.map(tag => tag.name) } });
          if (existingTags.length > 0) {
            return res.status(400).json({ error: 'One or more of the tags already exist' });
          }
      
          // Create the new tags
          const newTags = await Tag.create(tags);
      
          // Log the saved request
          console.log(`New tags created: ${newTags}`);
      
          // Return the created tags
          res.json(newTags);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error creating the tags' });
        }
    });

    //3
    router.get('/search', passport.authenticate('jwt', { session: false }), async (req, res) => {
        const { name } = req.query;
      
        try {
          // Search for the tag by name
          const tag = await Tag.findOne({ name });
          if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
          }
      
          res.json(tag);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error searching for the tag' });
        }
    });
      
    //4
    router.get('/search/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
        const { id } = req.params;
      
        try {
          // Search for the tag by id
          const tag = await Tag.findById(id);
          if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
          }
      
          res.json(tag);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error searching for the tag' });
        }
    });
    
    //5
    router.delete('/delete', passport.authenticate('jwt', { session: false }), async (req, res) => {
        const { name } = req.query;
      
        try {
          // Search for the tag by name
          const tag = await Tag.findOneAndDelete({ name });
          if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
          }
      
          res.json({ message: 'Tag deleted' });
        } catch (err) {
          console.error(err);
        }
    });
      
};