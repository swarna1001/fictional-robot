import {
  boolean,
  datetime,
  int,
  mysqlTable,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }),
  name: varchar("name", { length: 256 }),
  is_manager: boolean("is_manager"),
  google_id: varchar("google_id", { length: 256 }),
  has_identified: boolean("has_identified"),
});
