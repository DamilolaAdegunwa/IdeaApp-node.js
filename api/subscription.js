const SubscriptionApis = () => {
    // const Subscription = require("path/to/SubscriptionModel");
    // const passport = require("passport");
    // const mailer = require("nodemailer");
    
    app.post("/subscriptions", passport.authenticate("jwt", { session: false }), (req, res) => {
        // Check that the requester is an administrator
        if (!req.user.isAdmin) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    
        // Check that the request data is not null
        if (!req.body) {
            return res.status(400).json({ message: "Request data is required" });
        }
    
        // Create a new Subscription object
        const newSubscription = new Subscription({
            Id: req.body.Id,
            StartDate: req.body.StartDate,
            ExpirationDate: req.body.ExpirationDate,
            Status: req.body.Status,
            PaymentMethod: req.body.PaymentMethod,
            User: req.body.User,
            Product: req.body.Product,
            Price: req.body.Price,
            RenewalInterval: req.body.RenewalInterval,
            AutoRenew: req.body.AutoRenew
        });
    
        // Save the new Subscription to the database
        newSubscription
            .save()
            .then(savedSubscription => {
                // Send an email to the admin
                mailer.sendMail({
                    from: "system@ideaapp.com",
                    to: "admin@ideaapp.com",
                    subject: "New Subscription Created",
                    text: `A new subscription has been created with ID ${savedSubscription.Id}`
                });
    
                // Return the saved Subscription to the client
                res.status(200).json(savedSubscription);
            })
            .catch(err => {
                res.status(500).json({ message: "Error saving subscription" });
            });
    });

    router.get("/subscriptions", passport.authenticate("jwt", { session: false }), (req, res) => {
        if(req.user.role !== "admin") return res.status(401).json({ error: "Unauthorized" });
        
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 20;
        const exportFile = req.query.export || false;
        const mailResult = req.query.mail || false;
        
        Subscription.find()
          .skip((page - 1) * pageSize)
          .limit(pageSize)
          .then(subscriptions => {
            if(exportFile) {
              // code to export subscriptions as a file
            }
            if(mailResult) {
              // code to mail the result as excel
            }
            // alert admin phone
            console.log("logging subscriptions: ", subscriptions);
            res.status(200).json(subscriptions);
          })
          .catch(err => res.status(500).json({ error: err.message }));
      });

      router.get("/subscriptions/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
        if(req.user.role !== "admin") return res.status(401).json({ error: "Unauthorized" });
        
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
        
        Subscription.findById(id)
          .then(subscription => {
            if(!subscription) return res.status(404).json({ error: "Subscription not found" });
            res.status(200).json(subscription);
          })
          .catch(err => res.status(500).json({ error: err.message }));
      });

      router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        // Check if the user making the request is an admin
        if (req.user.role !== 'admin') {
            return res.status(401).json({ error: 'Unauthorized: Only admins can update subscriptions.' });
        }
    
        // Check if the id in the request is valid
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid id' });
        }
    
        // Find the subscription and update it
        Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, subscription) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
    
            if (!subscription) {
                return res.status(404).json({ error: 'Subscription not found' });
            }
    
            // Return the updated subscription
            return res.status(200).json(subscription);
        });
    });

    app.delete('/subscriptions/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        // check if the person making the request is an administrator
        if (!req.user.isAdmin) {
            return res.status(401).json({ msg: 'Unauthorized: Only administrators are allowed to perform this action.' });
        }
        
        // check if the id is valid
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ msg: 'Invalid id' });
        }
        
        // delete the row in question
        Subscription.findByIdAndDelete(req.params.id)
        .then(subscription => {
            if (!subscription) {
                return res.status(404).json({ msg: 'Subscription not found' });
            }
            res.json({ msg: 'Subscription deleted successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ msg: 'Internal server error' });
        });
    });
    
};

module.exports = SubscriptionApis;