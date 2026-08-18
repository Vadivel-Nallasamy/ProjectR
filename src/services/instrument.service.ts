import elasticClient from "../config/elasticsearch";

const INDEX_NAME = "instruments";

export const searchInstruments = async (query: string) => {
  const result = await elasticClient.search({
    index: INDEX_NAME,

    size: 20,

    query: {
      multi_match: {
        query,
        fields: [
          "tradingsymbol",
          "name",
        ],
      },
    },
  });

  return result.hits.hits.map((hit) => hit._source);
};