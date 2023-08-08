import { users } from "@@@app/core/schema/schema";
import { eq } from "drizzle-orm";
import { ApiHandler } from "sst/node/api";
import { AuthHandler, GoogleAdapter, Session, useSession } from "sst/node/auth";
import { Config } from "sst/node/config";
import { db } from "utils/db";

async function checkAndCreateUser(user: any) {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.google_id, user.google_id));

  if (existingUser.length === 0) {
    await db.insert(users).values(user);
    const createdUser = await db
      .select()
      .from(users)
      .where(eq(users.google_id, user.google_id));
    return createdUser;
  }
  return existingUser;
}

import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  //@ts-ignore

  //   console.log("REQUEST: ", JSON.parse(event.body));

  const { is_manager, id } = JSON.parse(event.body);

  console.log(
    "[LOG] | file: updateUserRole.ts:41 | consthandler:APIGatewayProxyHandlerV2= | is_manager:",
    is_manager
  );

  const resp = await db
    .update(users)
    .set({ is_manager: is_manager, has_identified: true })
    .where(eq(users.id, id));

  console.log(
    "[LOG] | file: updateUserRole.ts:44 | consthandler:APIGatewayProxyHandlerV2= | resp:",
    resp
  );

  //   if (!note) {
  //     return {
  //       statusCode: 404,
  //       body: JSON.stringify({ error: true }),
  //     };
  //   }

  //   const data = JSON.parse(event.body);

  //   note.content = data.content;

  return {
    statusCode: 200,
    // body: JSON.stringify(note),
  };
};
