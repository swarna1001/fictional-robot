import { inventory, users } from "@@@app/core/schema/schema";
import { eq, desc } from "drizzle-orm";
import { ApiHandler } from "sst/node/api";
import { AuthHandler, GoogleAdapter, Session, useSession } from "sst/node/auth";
import { Config } from "sst/node/config";
import { db } from "utils/db";

export const handler = ApiHandler(async (event) => {
  const inventories = await db
    .select()
    .from(inventory)
    .where(eq(inventory.is_deleted, false))
    .orderBy(desc(inventory.date_added));

  console.log(
    "[LOG] | file: getInventories.ts:11 | handler | inventories:",
    inventories
  );

  console.log("Well Hello.");
  console.log("I am testing seed.");

  const approvedInventories: any = [];
  const unapprovedInventories: any = [];

  inventories.forEach((item) => {
    if (item.is_approved) {
      approvedInventories.push(item);
    } else {
      unapprovedInventories.push(item);
    }
  });

  const result = {
    approvedInventories,
    unapprovedInventories,
  };

  return {
    statusCode: 201,
    body: JSON.stringify(result),
  };
});
