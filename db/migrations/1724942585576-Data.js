module.exports = class Data1724942585576 {
    name = 'Data1724942585576'

    async up(db) {
        await db.query(`CREATE TABLE "token_holder" ("id" character varying NOT NULL, "owner" text NOT NULL, "token_address" text NOT NULL, "value" numeric NOT NULL, CONSTRAINT "PK_c5e10d5c2543fac00a5d3086a2c" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_d07d1381496e24739e0fe6dfc7" ON "token_holder" ("owner") `)
        await db.query(`CREATE INDEX "IDX_3f3048c0cf573a13d7c977c4e4" ON "token_holder" ("token_address") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "token_holder"`)
        await db.query(`DROP INDEX "public"."IDX_d07d1381496e24739e0fe6dfc7"`)
        await db.query(`DROP INDEX "public"."IDX_3f3048c0cf573a13d7c977c4e4"`)
    }
}
