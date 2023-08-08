import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { Config } from "sst/node/config";
import { context } from "fetch-h2";
const { fetch } = context();

const connection = connect({
  //@ts-ignore
  fetch: fetch,
  host: Config.PLANETSCALE_HOST,
  username: Config.PLANETSCALE_USERNAME,
  password: Config.PLANETSCALE_PASSWORD,
});

export const db = drizzle(connection);
