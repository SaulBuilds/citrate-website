import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const networkStats = pgTable("network_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tps: integer("tps").notNull(),
  finality: text("finality").notNull(),
  evmCompatibility: text("evm_compatibility").notNull(),
  aiSupport: text("ai_support").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertNetworkStatsSchema = createInsertSchema(networkStats).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertNetworkStats = z.infer<typeof insertNetworkStatsSchema>;
export type NetworkStats = typeof networkStats.$inferSelect;

export interface StatsData {
  value: string;
  label: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
