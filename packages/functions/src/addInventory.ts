import { inventory, users } from "@@@app/core/schema/schema";
import { eq } from "drizzle-orm";
import { ApiHandler } from "sst/node/api";
import { AuthHandler, GoogleAdapter, Session, useSession } from "sst/node/auth";
import { Config } from "sst/node/config";
import { db } from "utils/db";

export const handler = ApiHandler(async (event) => {
  //@ts-ignore

  //   console.log("REQUEST: ", JSON.parse(event.body));

  const inventoryItem = JSON.parse(event.body);
  const session = useSession();

  const username = session.properties.user[0].name;
  const is_manager = session.properties.user[0].is_manager;

  console.log(
    "[LOG] | file: addInventory.ts:19 | handler | is_manager:",
    is_manager
  );

  console.log(
    "[LOG] | file: addInventory.ts:34 | consthandler:APIGatewayProxyHandlerV2= | inventoryItem:",
    inventoryItem
  );

  // const resp = await db
  //   .update(inventory)
  //   .set({ name: inventoryItem.name, description: inventoryItem.description })
  //   .where(eq(users.id, id));

  const newInventory = {
    name: inventoryItem.name,
    description: inventoryItem.description,
    category: inventoryItem.category,
    quantity_in_stock: inventoryItem.quantity_in_stock,
    unit_price: inventoryItem.unit_price,
    supplier: inventoryItem.supplier,
    date_added: new Date(),
    added_by: username,
    is_deleted: false,
    is_approved: is_manager ? true : false,
    ...(is_manager && {
      approved_by: username,
    }),
  };

  console.log(
    "[LOG] | file: addInventory.ts:47 | handler | newInventory:",
    newInventory
  );

  const resp = await db.insert(inventory).values(newInventory);

  console.log("[LOG] | file: addInventory.ts:61 | resp | resp:", resp);

  //   if (!note) {
  //     return {
  //       statusCode: 404,
  //       body: JSON.stringify({ error: true }),
  //     };
  //   }

  //   const data = JSON.parse(event.body);

  //   note.content = data.content;

  return {
    statusCode: 201,
    body: "Inventory added.",
  };
});
