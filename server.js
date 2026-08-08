// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
const app = require('./app');

const db = process.env.MONGODB_URI
mongoose.connect(db).then((con) => {
  //console.log(con.connections);
  console.log('DataBase has awaken');
});

app.listen(7000, () => {
  console.log('Listening');
});
//
