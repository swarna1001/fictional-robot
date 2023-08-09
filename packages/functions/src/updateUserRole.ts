import { users } from "@@@app/core/schema/schema";
import { eq } from "drizzle-orm";
import { db } from "utils/db";

import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  //@ts-ignore
  const { is_manager, id } = JSON.parse(event.body);

  console.log(
    "[LOG] | file: updateUserRole.ts:41 | consthandler:APIGatewayProxyHandlerV2= | is_manager:",
    is_manager
  );

  const resp = await db
    .update(users)
    .set({ is_manager: is_manager, has_identified: true })
    .where(eq(users.id, id));

  return {
    statusCode: 200,
    body: "User role updated",
  };
};
