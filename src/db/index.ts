import * as schema from "./schema";

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { env } from "@/env";

export const client = createClient({
  url: env.DATABASE_URL!,
  authToken: env.DB_AUTH_TOKEN!,
});

export const db = drizzle(client, { schema });
