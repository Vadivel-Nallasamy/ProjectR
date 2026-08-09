// ////----CORE MODULES------/////


import express from 'express'
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import researchRouter from './Routes/researchRoutes';
import userRouter from './Routes/userRoutes';



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
// app.use(mongoSanitize());

//Middeware to block cross site scripting(xss) attacks
// app.use(xss());

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

app.use((req: any, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ///////ROUTES////////////////
app.use('/api/v1/research', researchRouter);
app.use('/api/v1/auth', userRouter)

app.all("/{*splat}", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

////////LISTEN FOR REQUESTS/////////
module.exports = app;
