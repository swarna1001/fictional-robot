// import { users } from "@probable-invention/core/schema/schema";
import { users } from "@@@app/core/schema/schema";
import { eq } from "drizzle-orm";
import { AuthHandler, GoogleAdapter, Session } from "sst/node/auth";
import { Config } from "sst/node/config";
import { db } from "utils/db";

const GOOGLE_CLIENT_ID = Config.GOOGLE_CLIENT_ID;
declare module "sst/node/auth" {
  export interface SessionTypes {
    user: {
      user: any;
    };
  }
}

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

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: "oidc",
      clientID: GOOGLE_CLIENT_ID,
      onSuccess: async (tokenset) => {
        const claims = tokenset.claims();

        const newUser = {
          google_id: claims.sub,
          email: claims.email,
          name: claims.name,
          is_manager: false,
          has_identified: false,
        };

        const user = await checkAndCreateUser(newUser);
        console.log("USER : ", user);

        return Session.cookie({
          redirect: process.env.IS_LOCAL
            ? "http://localhost:5173/"
            : "https://d2oz28sjjhna8e.cloudfront.net",
          type: "user",
          properties: {
            user: user,
          },
        });

        // return {
        //   statusCode: 200,
        //   body: JSON.stringify(tokenset.claims(), null, 4),
        // };
      },
    }),
  },
});
