/* Backfill the Mathematics Studio from every historical maths attempt. Idempotent. Run:
     DATABASE_URL=mysql://... DATABASE_SSL=disable npx tsx scripts/mathstudio-backfill.ts
   Optionally pass a user id to backfill one student: ... scripts/mathstudio-backfill.ts 123 */
import { ensureSeed } from "../lib/mathstudio/store";
import { backfill } from "../lib/mathstudio/ingest";

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  const userId = process.argv[2] ? Number(process.argv[2]) : undefined;
  await ensureSeed();
  const r = await backfill(undefined, userId);
  console.log(`Backfilled: ${r.gre} GRE attempts, ${r.mathspeed} Mathematics Speed attempts, ${r.errors} skipped.`);
  process.exit(0);
}
main().catch((e) => { console.error(e); process.exit(1); });
