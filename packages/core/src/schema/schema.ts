import {
  boolean,
  datetime,
  int,
  mysqlTable,
  serial,
  text,
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

export const inventory = mysqlTable("inventory", {
  id: serial("inventory_id").primaryKey(),
  name: varchar("name", { length: 256 }),
  description: text("description"),
  category: varchar("category", { length: 256 }),
  quantity_in_stock: int("quantity_in_stock"),
  unit_price: int("unit_price"),
  supplier: varchar("supplier", { length: 256 }),
  date_added: datetime("date_added"),
  added_by: varchar("added_by", { length: 256 }),
  is_approved: boolean("is_approved"),
  approved_by: varchar("approved_by", { length: 256 }),
  is_deleted: boolean("is_deleted"),
});
