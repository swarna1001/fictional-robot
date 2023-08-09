import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { db } from "utils/db";
import { inventory, users } from "@@@app/core/schema/schema";
import { eq } from "drizzle-orm";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const inventoryId = Number(event.pathParameters?.id);

  console.log(
    "[LOG] | file: deleteInventory.ts:6 | consthandler:APIGatewayProxyHandlerV2= | inventoryId:",
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
    .set({ is_deleted: true })
    .where(eq(inventory.id, inventoryId));

  return {
    statusCode: 200,
    body: "Inventory deleted.",
  };
};
