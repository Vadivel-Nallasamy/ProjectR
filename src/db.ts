import mongoose from 'mongoose';
import kiteConnect from './utils/kite';
import KiteSession from './Models/kiteSessionModel';

export const connectDb = async()=> {
  const db: any = process.env.MONGODB_URI
  mongoose.connect(db).then(async(con) => {
  //console.log(con.connections);
  const session: any = await KiteSession.findOne();
  console.log('DataBase has awaken', session);
  kiteConnect.setAccessToken(session?.accessToken)
});
}
