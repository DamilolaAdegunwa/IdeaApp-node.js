const AdvertApis = () => {
    //1. Create
//     const express = require('express');
// const mongoose = require('mongoose');
// const passport = require('passport');
// const Advert = require('./models/Advert');
// const nodemailer = require('nodemailer');

//const router = express.Router();

// create new advert
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // check if user is an administrator
    if (req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // validate request data
    if (!req.body.title || !req.body.description || !req.body.advertReference) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // check if advertReference is unique
    Advert.findOne({ advertReference: req.body.advertReference }, (err, existingAdvert) => {
        if (err) {
            return res.status(500).json({ error: 'Error checking advertReference' });
        }
        if (existingAdvert) {
            return res.status(400).json({ error: 'AdvertReference already exists' });
        }

        // create new advert
        const newAdvert = new Advert({
            title: req.body.title,
            description: req.body.description,
            advertReference: req.body.advertReference,
            price: req.body.price,
            location: req.body.location,
            imageUrls: req.body.imageUrls
        });

        // save new advert
        newAdvert.save((saveErr, savedAdvert) => {
            if (saveErr) {
                return res.status(500).json({ error: 'Error saving advert' });
            }

            // send email to admin
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'admin@ideaapp.com',
                    pass: 'yourpassword'
                }
            });
            const mailOptions = {
                from: 'admin@ideaapp.com',
                to: 'admin@ideaapp.com',
                subject: 'New Advert Created',
                html: `<p>A new advert has been created on IdeaApp:</p>
                       <p>Title: ${savedAdvert.title}</p>
                       <p>Description: ${savedAdvert.description}</p>
                       <p>Advert Reference: ${savedAdvert.advertReference}</p>
                       <p>Price: ${savedAdvert.price}</p>
                       <p>Location: ${savedAdvert.location}</p>`
            };
            transporter.sendMail(mailOptions, (mailErr, info) => {
                if (mailErr) {
                    console.log(mailErr);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            // return saved advert
            res.status(200).json(savedAdvert);
        });
    });
});

//2 read all
// const express = require('express');
// const mongoose = require('mongoose');
// const passport = require('passport');
// const Advert = require('./models/Advert');
// const mongoosePaginate = require('mongoose-paginate');

// const router = express.Router();

// get all adverts
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // check if user is an administrator
    if (req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // get page number and page size from query parameters
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 20;

    // query adverts with pagination
    Advert.paginate({}, { page, limit: pageSize }, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error getting adverts' });
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

    // find advert by id
    Advert.findById(req.params.id, (err, advert) => {
        if (err) {
            return res.status(500).json({ error: 'Error getting advert' });
        }
        if (!advert) {
            return res.status(404).json({ error: 'Invalid advert id' });
        }
        res.status(200).json(advert);
    });
});

//4
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // check if user is an administrator
    if (req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // find advert by id
    Advert.findById(req.params.id, (err, advert) => {
        if (err) {
            return res.status(500).json({ error: 'Error getting advert' });
        }
        if (!advert) {
            return res.status(404).json({ error: 'Invalid advert id' });
        }

        // update advert
        advert.title = req.body.title;
        advert.description = req.body.description;
        advert.advertReference = req.body.advertReference;
        advert.price = req.body.price;
        advert.location = req.body.location;
        advert.imageUrls = req.body.imageUrls;
        advert.modifiedAt = Date.now();
        advert.save((saveErr, savedAdvert) => {
            if (saveErr) {
                return res.status(500).json({ error: 'Error updating advert' });
            }
            res.status(200).json(savedAdvert);
        });
    });
});

//5
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // check if user is an administrator
    if (req.user.role !== 'admin') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // find advert by id and delete
    Advert.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting advert' });
        }
        res.status(200).json({ message: 'Advert deleted successfully' });
    });
});

};

module.exports = AdvertApis;

/*
some advert methods

Social media posts (Facebook, Instagram, Twitter, etc.)
Online advertisements (Google AdWords, display ads, etc.)
Influencer marketing
Content marketing (blog posts, videos, infographics, etc.)
Email marketing campaigns
Trade show or conference sponsorships
Print advertisements (magazines, newspapers, etc.)
Outdoor advertising (billboards, bus stop ads, etc.)
Radio or television commercials
Public relations and media outreach.
*/