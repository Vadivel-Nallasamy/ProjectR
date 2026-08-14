// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
import { connectDb } from './db';

dotenv.config({ path: './config.env' });


const app = require('./app');

connectDb()

app.listen(5000, () => {
  console.log('Listenin');
});
//
