import "dotenv/config";
import elasticClient from "../config/elasticsearch";

const INDEX_NAME = "instruments";

const createInstrumentIndex = async () => {
  const exists = await elasticClient.indices.exists({
    index: INDEX_NAME,
  });

  if (exists) {
    console.log(`Index "${INDEX_NAME}" already exists`);
    return;
  }

  await elasticClient.indices.create({
    index: INDEX_NAME,

    mappings: {
      properties: {
        instrument_token: {
          type: "long",
        },

        exchange_token: {
          type: "long",
        },

        tradingsymbol: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
            },
          },
        },

        name: {
          type: "text",
          fields: {
            keyword: {
              type: "keyword",
            },
          },
        },

        last_price: {
          type: "double",
        },

        expiry: {
          type: "date",
        },

        strike: {
          type: "double",
        },

        tick_size: {
          type: "double",
        },

        lot_size: {
          type: "integer",
        },

        instrument_type: {
          type: "keyword",
        },

        segment: {
          type: "keyword",
        },

        exchange: {
          type: "keyword",
        },
      },
    },
  });

  console.log(`Created "${INDEX_NAME}" index`);
};

createInstrumentIndex().catch(console.error);