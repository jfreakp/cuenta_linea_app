import client from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// The Prisma v7 package may not export a named `PrismaClient` type in a way
// that TypeScript recognizes here on all build environments. To keep this
// file resilient across installs we access the runtime constructor from the
// default import and treat it as `any` for instantiation purposes.
const PrismaClientCtor = (client as any).PrismaClient as new (opts?: any) => any;

const connectionString = process.env.DATABASE_URL!;

const pool = new pg.Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as {
  prisma: any;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClientCtor({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;