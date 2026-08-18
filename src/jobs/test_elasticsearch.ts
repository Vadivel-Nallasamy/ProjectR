import "dotenv/config";
import elasticClient from "../config/elasticsearch";

const testElasticsearch = async () => {
  const response = await elasticClient.info();

  console.log(response);
};

testElasticsearch().catch(console.error);