import { ApiHandler } from "sst/node/api";
import { migrate } from "drizzle-orm/planetscale-serverless/migrator";
import { db } from "utils/db";

export const handler = ApiHandler(async () => {
  migrate(db, { migrationsFolder: "packages/core/migrations" });

  return {
    statusCode: 200,
    body: "Migrated!",
  };
});
