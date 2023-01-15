const categoryApis = () => {
    //1
    router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
        // check if user is an administrator
        if (req.user.role !== 'admin') {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    
        // validate request data
        if (!req.body.name) {
            return res.status(400).json({ error: 'Name is required' });
        }
    
        // create new category
        const newCategory = new Category({
            name: req.body.name,
            description: req.body.description,
            creatorUserId: req.user.id
        });
    
        // save category to database
        newCategory.save((err, savedCategory) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving category' });
            }
    
            // return saved category
            res.status(200).json(savedCategory);
        });
    });
//2
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // check if user is an administrator
    if (req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // set default page size and page number
    let pageSize = 20;
    let page = 1;
    if (req.query.pageSize) {
        pageSize = parseInt(req.query.pageSize);
    }
    if (req.query.page) {
        page = parseInt(req.query.page);
    }

    // get all categories with pagination
    Category.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec((err, categories) => {
            if (err) {
                return res.status(500).json({ error: 'Error getting categories' });
            }
            res.status(200).json(categories);
        });
});
//3
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // check if user is an administrator
    if (req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // find category by id
    Category.findById(req.params.id, (err, category) => {
        if (err) {
            return res.status(500).json({ error: 'Error getting category' });
        }
        if (!category) {
            return res.status(404).json({ error: 'Invalid category id' });
        }
        res.status(200).json(category);
    });
});
//4
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // check if user is an administrator
    if (req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // find category by id and update
    Category.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedCategory) => {
        if (err) {
            return res.status(500).json({ error: 'Error updating category' });
        }
        if (!updatedCategory) {
            return res.status(404).json({ error: 'Invalid category id' });
        }
        res.status(200).json(updatedCategory);
    });
});
//5
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // check if user is an administrator
    if (req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // find category by id and delete
    Category.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting category' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    });
});

};

module.exports = categoryApis;