import { ApiHandler } from "sst/node/api";
import { useSession } from "sst/node/auth";
import { eq } from "drizzle-orm";

export const handler = ApiHandler(async () => {
  const session = useSession();

  console.log("SESSION : ", session);

  // Check user is authenticated
  if (session.type !== "user") {
    // throw new Error("Not authenticated");
    return {
      statusCode: 400,
      body: "No session",
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(session),
  };
});
