import { StackContext, Api, StaticSite, Auth, Config } from "sst/constructs";

export function API({ stack }: StackContext) {
  const GOOGLE_CLIENT_ID = new Config.Secret(stack, "GOOGLE_CLIENT_ID");
  const PLANETSCALE_USERNAME = new Config.Secret(stack, "PLANETSCALE_USERNAME");
  const PLANETSCALE_PASSWORD = new Config.Secret(stack, "PLANETSCALE_PASSWORD");
  const PLANETSCALE_HOST = new Config.Parameter(stack, "PLANETSCALE_HOST", {
    value: "aws.connect.psdb.cloud",
  });

  const api = new Api(stack, "api", {
    cors: {
      allowCredentials: true,
      allowHeaders: ["content-type"],
      allowMethods: ["ANY"],
      allowOrigins: [
        "http://localhost:5173",
        "https://d2oz28sjjhna8e.cloudfront.net",
      ],
    },
    routes: {
      "GET /session": "packages/functions/src/session.handler",
      "GET /migrate": "packages/functions/src/migration.handler",
      "GET /inventories": "packages/functions/src/getInventories.handler",
      "POST /update-user-role": "packages/functions/src/updateUserRole.handler",
      "POST /add-inventory": "packages/functions/src/addInventory.handler",
      "POST /inventory/{id}": "packages/functions/src/deleteInventory.handler",
      "POST /update-inventory/{id}":
        "packages/functions/src/updateInventory.handler",
    },
  });

  const web = new StaticSite(stack, "web", {
    path: "packages/web",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      VITE_APP_API_URL: api.url,
    },
  });

  const auth = new Auth(stack, "auth", {
    authenticator: {
      handler: "packages/functions/src/auth.handler",
      bind: [web],
    },
  });

  api.bind([
    PLANETSCALE_HOST,
    PLANETSCALE_USERNAME,
    PLANETSCALE_PASSWORD,
    GOOGLE_CLIENT_ID,
  ]);

  auth.attach(stack, {
    api,
    prefix: "/auth",
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    Web: web.url,
  });
}
