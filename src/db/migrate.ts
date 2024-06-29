import "dotenv/config";
import { migrate } from "drizzle-orm/libsql/migrator";
import { client, db } from ".";

(async () => {
  await migrate(db, { migrationsFolder: "./migrations" });
  client.close();
})();
