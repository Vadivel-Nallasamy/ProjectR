// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

import mongoose from 'mongoose';
import kiteConnect from './utils/kite';
import KiteSession from './Models/kiteSessionModel';
const app = require('./app');

const db: any = process.env.MONGODB_URI
mongoose.connect(db).then(async(con) => {
  //console.log(con.connections);
  const session: any = await KiteSession.findOne();
  console.log('DataBase has awaken', session);
  kiteConnect.setAccessToken(session?.accessToken)
});

app.listen(5000, () => {
  console.log('Listenin');
});
//
