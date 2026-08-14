import axios from "axios";
import { parse } from "csv-parse/sync";
import Instrument from "../Models/instrumentModel";
import dotenv from 'dotenv';
import { connectDb } from "../db";

dotenv.config({ path: './config.env' });

const getInstrumentMaster = async () => {
    await connectDb()
  const response = await axios.get(
    "https://api.kite.trade/instruments"
  );

  const csvData = response.data;

  const records = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
  });

  console.log(`Parsed ${records.length} instruments`);

  const operations = records.map((item: any) => ({
    updateOne: {
      filter: {
        instrument_token: Number(item.instrument_token),
      },
      update: {
        $set: {
          exchange_token: Number(item.exchange_token),
          tradingsymbol: item.tradingsymbol,
          name: item.name,
          last_price: Number(item.last_price),
          expiry: item.expiry ? new Date(item.expiry) : null,
          strike: Number(item.strike),
          tick_size: Number(item.tick_size),
          lot_size: Number(item.lot_size),
          instrument_type: item.instrument_type,
          segment: item.segment,
          exchange: item.exchange,
        },
      },
      upsert: true,
    },
  }));

  const result = await Instrument.bulkWrite(operations);

  console.log("Instrument master updated");
  console.log(result);
};

getInstrumentMaster().catch(console.error);