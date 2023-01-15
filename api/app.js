const appApis = () => {
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

    // create new app
    const newApp = new App({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating,
        version: req.body.version,
        releaseNotes: req.body.releaseNotes,
        creatorUserId: req.user.id
    });

    // save app to database
    newApp.save((err, savedApp) => {
        if (err) {
            return res.status(500).json({ error: 'Error saving app' });
        }

        // return saved app
        res.status(200).json(savedApp);
    });
});


//2
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // check if user is an administrator
    if (req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // get page number and page size from query parameters
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 20;

    // query apps with pagination
    App.paginate({}, { page, limit: pageSize }, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error getting apps' });
        }
        res.status(200).json(result);
    });
});


//3
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // check if user is an administrator
    if (req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // find app by id
    App.findById(req.params.id, (err, app) => {
        if (err) {
            return res.status(500).json({ error: 'Error getting app' });
        }
        if (!app) {
            return res.status(404).json({ error: 'Invalid app id' });
        }
        res.status(200).json(app);
    });
});

//4
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // check if user is an administrator
    if (req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // find app by id
    App.findById(req.params.id, (err, app) => {
        if (err) {
            return res.status(500).json({ error: 'Error getting app' });
        }
        if (!app) {
            return res.status(404).json({ error: 'Invalid app id' });
        }

        // update app
        app.name = req.body.name;
        app.description = req.body.description;
        app.price = req.body.price;
        app.rating = req.body.rating;
        app.version = req.body.version;
        app.releaseNotes = req.body.releaseNotes;
        app.lastModificationTime = Date.now();
        app.lastModifierUserId = req.user.id;

        // save changes
        app.save((saveErr, savedApp) => {
            if (saveErr) {
                return res.status(500).json({ error: 'Error updating app' });
            }
            res.status(200).json(savedApp);
        });
    });
});

//5
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    //check if user is an administrator
        if (req.user.role !== 'admin') {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    
        // find app by id and delete
        App.findByIdAndDelete(req.params.id, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error deleting app' });
            }
            res.status(200).json({ message: 'App deleted successfully' });
        });
    });
    
//---
};

module.exports = appApis;
/*
A brainstorming app that allows users to submit and vote on ideas for new products or features
A task management app that allows users to organize and prioritize their ideas and projects
A goal-setting app that helps users turn their ideas into actionable plans
A note-taking app that allows users to capture and organize their ideas and thoughts
A problem-solving app that uses creative problem-solving techniques to help users generate new ideas
A journaling app that encourages users to reflect on their ideas and experiences
A social networking app that allows users to share and collaborate on ideas with others
A mind mapping app that helps users visually organize and explore their ideas.


...and some more
A business plan app that guides users through the process of creating a plan for a new business idea
A startup pitch app that helps users create a compelling pitch for their business idea
A creative writing app that offers prompts and exercises to help users generate new story or poetry ideas
A study planning app that helps students organize their ideas and resources for a research paper or project
A garden planning app that allows users to plan and design their ideal garden, including plant selection and layout ideas.
A travel planning app that helps users research and plan their dream vacation, including destination ideas and itinerary planning.
A fashion design app that allows users to create mood boards and sketches of their fashion ideas.
A recipe app that allows users to create, share and discover new recipes and meal ideas.
A home decor app that allows users to design and plan their ideal home, including furniture and decor ideas.
A workout planning app that suggests workout ideas based on user's goals and preferences.
A gift suggestion app that suggests gift ideas for different occasions and people.


...and a few more
A painting app that allows users to experiment with different color palettes, brush strokes and techniques to generate new art ideas
A photography app that suggests new photography ideas and techniques for users to try
A music composition app that helps users generate new musical ideas and compose their own songs
A fashion styling app that allows users to mix and match clothing items to create new outfit ideas
A home renovation app that helps users plan and visualize home improvement ideas
A gift wrapping app that suggests different gift wrapping ideas and techniques
A party planning app that helps users plan and organize ideas for different types of parties
A personal development app that suggests new self-improvement ideas and habits to adopt
A beauty app that suggests new makeup and hairstyle ideas and tutorials
A cooking app that suggests new ingredient combinations and cooking techniques for users to experiment with.

A gardening app that suggests different types of plants and gardening techniques to try.
A cake design app that helps users plan and decorate cakes, including ideas for different cake shapes, flavors and decorations.
A craft app that suggests different types of crafts and DIY projects to try and provides instructions and ideas.
A interior design app that allows users to plan and decorate a room and suggests different furniture and decor ideas.
A event planning app that helps users organize and plan different types of events, including ideas for venues, menus, and activities.
A game design app that allows users to create game concepts, characters and rules and test different game ideas.
A sports training app that suggests new exercises and drills to improve performance and suggests new workout ideas.
A fashion trend app that keeps users updated on the latest fashion trends and suggests new outfit ideas.
A personal finance app that suggests new ways to save money and invest and suggests new financial ideas.
A pet care app that suggests new ideas for pet grooming, training, and nutrition.

A home automation app that allows users to control and schedule different smart home devices, and suggests new ways to improve home automation ideas.
A personal shopping app that suggests new clothing and accessory items based on user's preferences and suggests new fashion ideas.
A movie & TV show app that suggests new movies and TV shows to watch based on user's preferences and suggests new entertainment ideas.
A personal productivity app that suggests new ways to manage time and improve productivity, and suggests new productivity ideas.
A language learning app that suggests new words and phrases to learn, and suggests new language learning ideas.
A art history app that suggests new artists, movements and art pieces to discover, and suggests new art history ideas.
A cooking app that suggests new ingredient combinations and cooking techniques for users to experiment with, and suggests new food ideas.
A hike and trail app that suggests new hiking and trail routes, and suggests new outdoor ideas.
A personal well-being app that suggests new ways to improve mental and physical well-being, and suggests new well-being ideas.
A travel planning app that helps users find unique and off the beaten path destinations and activities, and suggests new travel ideas.

A home brewing app that suggests new beer, wine, and spirit recipes and brewing techniques, and suggests new brewing ideas.
A personal skincare app that suggests new skincare routines and products based on user's skin type and suggests new skincare ideas.
A personal development app that suggests new habits to form, and suggests new self-improvement ideas.
A educational app that suggests new educational resources and activities based on user's interests and suggests new learning ideas.
A workout planning app that suggests new exercises and workout plans and suggests new fitness ideas.
A cooking app that suggests new ingredient combinations and cooking techniques for users to experiment with and suggests new recipes ideas.
A car maintenance app that suggests new ways to maintain and improve car performance and suggests new car maintenance ideas.
A home DIY app that suggests new DIY projects and home improvement ideas and provides instructions.
A nature and wildlife app that suggests new nature and wildlife related activities and suggests new nature ideas.
A financial planning app that suggests new ways to save money and invest and suggests new financial planning ideas.

A home cleaning and organization app that suggests new cleaning methods and organization techniques, and suggests new home cleaning ideas.
A photography app that suggests new photography subjects, techniques and editing ideas.
A personal styling app that suggests new hairstyles, makeup looks, and personal styling ideas based on user's preferences.
A mental health app that suggests new techniques and activities to improve mental well-being and suggests new mental health ideas.
A garden planning app that suggests new garden design ideas, plant combinations and gardening techniques.
A home security app that suggests new ways to improve home security and suggests new home security ideas.
A personal development app that suggests new ways to improve self-awareness and emotional intelligence and suggests new personal development ideas.
A green living app that suggests new ways to live sustainably and environmentally friendly and suggests new green living ideas.
A personal budgeting app that suggests new ways to manage money and suggests new budgeting ideas.
A personal book club app that suggests new books to read based on user's preferences and suggests new book club ideas.
*/