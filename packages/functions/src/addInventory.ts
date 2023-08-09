import { inventory, users } from "@@@app/core/schema/schema";
import { ApiHandler } from "sst/node/api";
import { useSession } from "sst/node/auth";
import { db } from "utils/db";

export const handler = ApiHandler(async (event) => {
  //@ts-ignore
  const inventoryItem = JSON.parse(event.body);

  console.log(
    "[LOG] | file: addInventory.ts:12 | handler | inventoryItem:",
    inventoryItem
  );

  const session = useSession();
  const username = session.properties.user[0].name;
  const is_manager = session.properties.user[0].is_manager;

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

  try {
    await db.insert(inventory).values(newInventory);
  } catch (error) {
    return {
      statusCode: 500,
      body: "Could not add Inventory",
    };
  }

  return {
    statusCode: 201,
    body: "Inventory added.",
  };
});
