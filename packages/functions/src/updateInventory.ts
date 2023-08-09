import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { db } from "utils/db";
import { inventory, users } from "@@@app/core/schema/schema";
import { eq } from "drizzle-orm";
import { ApiHandler } from "sst/node/api";
import { useSession } from "sst/node/auth";

export const handler = ApiHandler(async (event) => {
  const session = useSession();
  const inventoryId = Number(event.pathParameters?.id);
  const username = session.properties.user[0].name;

  console.log(
    "[LOG] | file: updateInventory.ts:9 | consthandler:APIGatewayProxyHandlerV2= | inventoryId:",
    inventoryId
  );

  if (!inventoryId) {
    return {
      statusCode: 400,
      body: "Inventory Id missing.",
    };
  }

  await db
    .update(inventory)
    .set({ is_approved: true, approved_by: username })
    .where(eq(inventory.id, inventoryId));

  return {
    statusCode: 200,
    body: "Inventory Approved.",
  };
});
