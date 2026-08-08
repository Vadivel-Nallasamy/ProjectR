// ////----CORE MODULES------/////

const express = require('express'); //Require express
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');



//const { stringify } = require('querystring');
//const exp = require('constants');
const app = express(); ///Create an instance of module so that you can create multiple servers and listen dynamically
app.use(helmet()); ///Set Security HTTP Headers
/////MIDDLEWARES/////
const limitter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try after 1 hour',
});

app.use(limitter); //Limit request

if (process.env.NODE_ENV === 'development') {
  //app.use(morgan('dev')); //Use morgan only in devlopment environment
}
//console.log(process.env.NODE_ENV);
app.use(express.json({ limit: '10kb' })); /////BODY PARSER to read body into req.body

//Middleware to block malicious query injection
app.use(mongoSanitize());

//Middeware to block cross site scripting(xss) attacks
app.use(xss());

//Prevent Parameter Pollution
// app.use(
//   hpp({
//     whitelist: [
//       'duration',
//       'ratingsQuantity',
//       'ratingsAverage',
//       'maxGroupSize',
//       'difficulty',
//       'price',
//     ],
//   })
// );

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ///////ROUTES////////////////


// app.all('*', (req, res, next) => {
//   // const err = new Error(`Can't find ${req.originalUrl} in this request`);

//   // err.statusCode = 404;
//   // err.status = 'Error';

// });


////////LISTEN FOR REQUESTS/////////
module.exports = app;
