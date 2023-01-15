// const mongoose = require('mongoose');
// const Product = require('./models/product');
// const nodemailer = require('nodemailer');
// const passport = require('passport');

const productApis = (router, Product, nodemailer, passport) => {
    //1.    For the create API:
    router.post('product/create', passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
          // Validate request data and check for unique productCode
          if (!req.body.name || !req.body.productCode || !req.body.description || !req.body.price) {
            return res.status(400).json({msg: 'Please enter all fields'});
          }
      
          let product = await Product.findOne({productCode: req.body.productCode});
          if (product) {
            return res.status(400).json({msg: 'Product code already exists'});
          }
      
          // Create new product
          product = new Product({
            name: req.body.name,
            productCode: req.body.productCode,
            description: req.body.description,
            price: req.body.price
          });
      
          // Save product to database
          await product.save();
      
          // Send email to admin
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'youremail@gmail.com',
              pass: 'yourpassword'
            }
          });
      
          let mailOptions = {
            from: 'youremail@gmail.com',
            to: 'admin@ideaapp.com',
            subject: 'New Product Created',
            text: `A new product with code ${req.body.productCode} has been created.`
          };
      
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
      
          // Return saved product
          res.json({
            product: {
              id: product._id,
              name: product.name,
              productCode: product.productCode,
              description: product.description,
              price: product.price
            }
          });
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
      });

    //2.    For the read-all API:
    router.get('product', passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
          // Get pagination parameters
          const page = parseInt(req.query.page) || 1;
          const pageSize = parseInt(req.query.pageSize) || 20;
      
          // Get products from the database
          const products = await Product.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);
      
          // Check for export and email parameters
          if (req.query.export === 'true') {
            // Export products as file
          }
          if (req.query.email === 'true') {
            // Email products as excel file
          }
      
          // Send SMS alert
          const client = new twilio('YOUR ACCOUNT SID', 'YOUR AUTH TOKEN');
          client.messages.create({
            body: 'A user has requested all products',
            from: '+123456789',
            to: '+2348131363116'
          });
      
          // Log result
          winston.log('info', `${products.length} products returned`);
      
          // Return products
          res.json({products});
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
      });

      //3.  For the read API:
      router.get('product/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
          // Get product by id
          const product = await Product.findById(req.params.id);
          if (!product) {
            return res.status(404).json({msg: 'Invalid product id'});
          }
      
          // Return product
          res.json({product});
        } catch (err) {
          console.error(err.message);
          if (err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Invalid product id'});
          }
          res.status(500).send('Server Error');
        }
      });

      //4.  update api
      router.put('product/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
          // Get product by id
          let product = await Product.findById(req.params.id);
          if (!product) {
            return res.status(404).json({msg: 'Invalid product id'});
          }
      
          // Update product
          product = await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            productCode: req.body.productCode,
            description: req.body.description,
            price: req.body.price
          }, {new: true});
      
          // Return updated product
          res.json({product});
        } catch (err) {
          console.error(err.message);
          if (err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Invalid product id'});
          }
          res.status(500).send('Server Error');
        }
      });

      //5. delete product
      router.delete('product/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
          // Get product by id
          let product = await Product.findById(req.params.id);
          if (!product) {
            return res.status(404).json({msg: 'Invalid product id'});
          }
      
          // Delete product
          await Product.findByIdAndRemove(req.params.id);
      
          // Return message
          res.json({msg: 'Product removed'});
        } catch (err) {
          console.error(err.message);
          if (err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Invalid product id'});
          }
          res.status(500).send('Server Error');
        }
      });
      
};

module.exports = productApis;
/*
some products i'd be adding to the product collection includes:

A productivity app that helps users organize their tasks and goals
A brainstorming tool for creative professionals
A note-taking app with advanced features for organizing and sharing notes
A mind mapping software for visualizing ideas and connections
A project management tool for teams to collaborate on ideas and tasks
A journaling app for capturing and reflecting on personal ideas
A marketplace for buying and selling intellectual property, such as patents or trademarks.
A software that allows you to create and share interactive presentations, wireframes, and mockups.
A tool that helps people come up with business ideas, name, and branding
An app that provides a platform for people to share and exchange ideas with a community.
*/