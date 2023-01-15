// Import required modules
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const Idea = require('./models/Idea'); // Import Idea model
const User = require('./models/User'); // Import User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const passportLocal = require('./config/Passport');
const UserIdeaRelationship = require('./models/user_idea_relationship');
const nodemailer = require('nodemailer');
const excel = require('exceljs');
const fs = require('fs');
const sms = require('sms-send');
const log4js = require('log4js');
const LocalStrategy = require('passport-local').Strategy;
const test = require('./service/test');
//const {uuidv1, uuidv4, uuidv6} = require('uuid');
const uuid = require('uuid');
const router = express.Router();
const ideaApis = require('./api/idea');
const SECRET_OR_KEY = process.env.SECRET_OR_KEY || 'nonce_or_secret';
const Tag = require('./models/tag');
const productApis = require('./api/product');
const healthcheck = require('express-healthcheck');
const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');
const swaggerJsdoc = require('swagger-jsdoc');
const Product = require('./models/product');
//----------------------------------------------------------------

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ideaapp', { useNewUrlParser: true });

// Initialize Express app
const app = express();

//swaggerUi //swagger-jsdoc, swagger-node-express
const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
        description: 'A sample API',
      },
      servers: [
        {
          url: 'http://localhost:3000/api'
        }
      ]
    },
    apis: ['./api/*.js'],
  };
  const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//health check
//v1
//app.use('/healthcheck', healthcheck());

//v2
app.use('/healthcheck', healthcheck({
    healthy: () => {
      return {
          status: 'success',
          message: 'All systems are a go!',
          data: {
              version: '1.0.0'
          }
      }
    },
    unhealthy: () => {
      return {
          status: 'error',
          message: 'Oh no! Something is not working',
      }
    }
  }));
  
// Use Passport middleware
app.use(passport.initialize());
app.use(express.json());

//configure the logger
log4js.configure({
    appenders: {
      everything: { type: 'file', filename: 'log.log' },
    },
    categories: {
      default: { appenders: ['everything'], level: 'debug' },
    },
  });
  
const logger = log4js.getLogger();
// Import Passport strategies
const passportLocal = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        Usr.findById(id, function(err, user) {
            done(err, user);
        })
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            Usr.findOne({ 'local.email': email }, function(err, user) {
                if (err) { return done(err); }
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'El email ya existe'));
                } else {
                    var newUser = new Usr();
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.save(function(err) {
                        if (err) { throw err; }
                        return done(null, newUser);
                    });
                }
            })
        }));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            Usr.findOne({ 'local.email': email }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'El email no ha sido encontrado'));
                }
                if (!user.validatePassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Wrong password'));
                }
                return done(null, user);
            })
        }));
}
passportLocal(passport);
//ROUTES
test(app);
// Home route (working)
app.get('/', (req, res) => {
  res.send('Welcome to IdeaApp');
});

//idea routes
ideaApis(app, Idea, passport);
productApis(router, Product,nodemailer, passport);


app.use("/api/v1", router);

// Users register route (working)
app.post('/users/register', (req, res) => {
    //show that the request reached the endpoint
    console.log(`req.body:${req.body}`);
    console.log(`req.body.id:${req.body.id}`);
    logger.debug(`req.body:${req.body}`);
    var newUser = null;
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
        console.log('Email already exists');
      return res.status(400).json({ email: 'Email already exists' });
    } else {
        console.log("new user!")
      newUser = new User({
        id: `${uuid.v1()}-${uuid.v4()}`,
        isActive: true,
        userName: req.body.userName,
        email: req.body.email,
        normalizedEmail: req.body.normalizedEmail,
        emailConfirmed: req.body.emailConfirmed,
        //password: req.body.password
        securityStamp: req.body.securityStamp,
        concurrencyStamp: req.body.concurrencyStamp,
        phoneNumber: req.body.phoneNumber,
        phoneNumberConfirmed: req.body.phoneNumberConfirmed,
        twoFactorEnabled: req.body.twoFactorEnabled,
        lockoutEnd: req.body.lockoutEnd,
        lockoutEnabled: req.body.lockoutEnabled,
        accessFailedCount: req.body.accessFailedCount,
        refreshToken: req.body.refreshToken,
        accountConfirmationCode: req.body.accountConfirmationCode,
        userType: req.body.userType,
      });
      console.log(`new user: ${newUser}`);
      bcrypt.genSalt(10, (err, salt) => {
        console.log(`salt: ${salt}`);
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            console.log(`hash: ${hash}`)
          if (err){
            throw err;
          } 
          newUser.passwordHash = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log('error while registering a new user:',err));
        });
      });
    }
  });
});

// Users login route (workng)
app.post('/users/login', (req, res) => {
    console.log(`the user login endpont is called`);
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
        console.log('Email not found');
      return res.status(404).json({ emailnotfound: 'Email not found' });
    }

    // Check password
    console.log(`password: ${password} and password hash: ${user.passwordHash}`);
    bcrypt.compare(password, user.passwordHash).then(isMatch => {
        if (isMatch) {
            console.log(`credentials matched`)
          // User matched
          // Create JWT Payload
          console.log(`the user id: ${user._id} and the user name: ${user.userName}`);
          const payload = {
            id: user._id,
            name: user.userName
          };
          
          // Sign token
          console.log(`the secret is ${SECRET_OR_KEY}`)
          const sign = jwt.sign(
            payload,
            SECRET_OR_KEY,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
                if (err) {
                    console.error('err: ',err);
                    return res .status(400).send(err);
                }
                const response = {
                    success: true,
                    token: 'Bearer ' + token
                  };
                  /*
                  res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                  */
                 console.log('the bearer token was gotten successfully!',response)
                res.json(response);
            }
          );
          console.log(`jwt payload: ${ JSON.stringify(payload)}`);
          /*console.log(`jwt signature: ${ JSON.stringify(sign)}`);*/
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: 'Password incorrect' });
        }
      });
    });
  });

// User profile route
app.get(
    '/users/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      User.findById(req.user.id)
        .then(user => {
          if (!user) {
            return res.status(404).json({ usernotfound: 'User not found' });
          }
          res.json(user);
        })
        .catch(err => res.status(404).json(err));
    }
  );

  app.get('/search-simple', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const searchTerm = req.query.term;
    const ideas = await Idea.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ],
    });
  
    res.json(ideas);
  });
  
  app.get('/search', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const searchTerm = req.query.term;
    const ideas = await Idea.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ],
    });
  
    const userId = req.user.id;
    let message = '';
    let role = '';
    let ideaIds = [];
    let ideaTitles = '';
    let ideaDescriptions = '';
  
    for (const idea of ideas) {
      ideaIds.push(idea._id);
      ideaTitles += idea.title + '\n';
      ideaDescriptions += idea.description + '\n';
    }
  
    const relationships = await UserIdeaRelationship.find({
      user: userId,
      idea: { $in: ideaIds },
    });
  
    for (const relationship of relationships) {
      role = relationship.role;
    }
  
    if (role === 'sponsor') {
      message = 'Thank you for your support, please consider donating to this idea';
    } else if (role === 'envangelist') {
      message = 'Remember to honor your appointments';
    } else if (role === 'student') {
      message = 'Don\'t miss any of the lectures';
    } else if (role === 'professional') {
      message = 'Please come prepared';
    }
  
    // create a workbook and worksheet
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Ideas');
  
    // add rows to the worksheet
  worksheet.addRow(['Title', 'Description']);
  const titles = ideaTitles.split('\n');
  const descriptions = ideaDescriptions.split('\n');
  for (let i = 0; i < titles.length; i++) {
    worksheet.addRow([titles[i], descriptions[i]]);
  }

  // write the workbook to a file in the temp folder
  const fileName = 'temp/ideas.xlsx';
  await workbook.xlsx.writeFile(fileName);

  // create a new transporter object
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email-address',
      pass: 'your-email-password',
    },
  });

  // send the email
  let info = await transporter.sendMail({
    from: '"Idea App" <your-email-address>',
    to: 'damee1993@gmail.com',
    subject: 'Idea Search Results',
    text: message,
    attachments: [
      {
        filename: 'ideas.xlsx',
        path: fileName,
      },
    ],
  });

  // send the SMS message
  sms('2348131363116', message);
  logger.debug(`Email sent: ${info.messageId}`);
  logger.debug(`SMS sent: ${message}`);
  res.json(ideas);
});

app.listen(3000);