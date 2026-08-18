import "dotenv/config";
import axios from "axios";
import { parse } from "csv-parse/sync";
import elasticClient from "../config/elasticsearch";

const INDEX_NAME = "instruments";
const BATCH_SIZE = 1000;

const getInstrumentMaster = async () => {
  console.log("Downloading instrument master...");

  const response = await axios.get(
    "https://api.kite.trade/instruments"
  );

  const records = parse(response.data, {
    columns: true,
    skip_empty_lines: true,
  });

  console.log(`Parsed ${records.length} instruments`);

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch : any = records.slice(i, i + BATCH_SIZE);

    const operations: any[] = [];

    for (const item of batch) {
      operations.push({
        index: {
          _index: INDEX_NAME,
          _id: item.instrument_token,
        },
      });

      operations.push({
        instrument_token: Number(item.instrument_token),
        exchange_token: Number(item.exchange_token),
        tradingsymbol: item.tradingsymbol,
        name: item.name,
        last_price: Number(item.last_price),
        expiry: item.expiry || null,
        strike: Number(item.strike),
        tick_size: Number(item.tick_size),
        lot_size: Number(item.lot_size),
        instrument_type: item.instrument_type,
        segment: item.segment,
        exchange: item.exchange,
      });
    }

    const result = await elasticClient.bulk({
      operations,
    });

    if (result.errors) {
      console.error(`Errors in batch starting at ${i}`);

      // Let's print which documents failed.
      for (const item of result.items) {
        if (item.index?.error) {
          console.error(item.index.error);
        }
      }
    }

    console.log(
      `Indexed ${Math.min(i + BATCH_SIZE, records.length)} / ${records.length}`
    );
  }

  console.log("Instrument master indexing completed");
};

getInstrumentMaster().catch(console.error);