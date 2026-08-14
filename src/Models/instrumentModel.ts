import mongoose from "mongoose";
const instrumentSchema = new mongoose.Schema({
  instrument_token: {
    type: Number,
    unique: true,
    index: true
  },
  exchange_token: Number,
  tradingsymbol: {
    type: String,
    index: true
  },
  name: String,
  last_price: Number,
  expiry: Date,
  strike: Number,
  tick_size: Number,
  lot_size: Number,
  instrument_type: String,
  segment: String,
  exchange: String
});

export default mongoose.model("Instrument", instrumentSchema);