// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

import mongoose from 'mongoose';
const app = require('./app');

const db: any = process.env.MONGODB_URI
mongoose.connect(db).then((con) => {
  //console.log(con.connections);
  console.log('DataBase has awaken');
});

app.listen(7000, () => {
  console.log('Listenin');
});
//
