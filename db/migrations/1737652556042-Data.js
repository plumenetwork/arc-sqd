module.exports = class Data1737652556042 {
    name = 'Data1737652556042'

    async up(db) {
        await db.query(`CREATE TABLE "token" ("id" character varying NOT NULL, "address" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "token_admins" text array NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`)
        await db.query(`CREATE UNIQUE INDEX "IDX_40a4dcc6b727285c6539aa1d1c" ON "token" ("address") `)
        await db.query(`CREATE TABLE "token_holder" ("id" character varying NOT NULL, "address" text NOT NULL, "token_address" text NOT NULL, "value" numeric NOT NULL, CONSTRAINT "PK_c5e10d5c2543fac00a5d3086a2c" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_6b3c0be07f28745c01c39d1924" ON "token_holder" ("address") `)
        await db.query(`CREATE INDEX "IDX_3f3048c0cf573a13d7c977c4e4" ON "token_holder" ("token_address") `)
        await db.query(`CREATE TABLE "token_deposit" ("id" character varying NOT NULL, "transaction_hash" text NOT NULL, "token_address" text NOT NULL, "depositor" text NOT NULL, "deposited_at" TIMESTAMP WITH TIME ZONE NOT NULL, "amount" numeric NOT NULL, CONSTRAINT "PK_7c5eea7aeab3f0e71da8d2d9f4f" PRIMARY KEY ("id"))`)
        await db.query(`CREATE UNIQUE INDEX "IDX_9e36ba2452feeeb6958618548f" ON "token_deposit" ("transaction_hash") `)
        await db.query(`CREATE INDEX "IDX_10681a1c2560ba892994202a06" ON "token_deposit" ("token_address") `)
        await db.query(`CREATE TABLE "whitelisted_address" ("id" character varying NOT NULL, "address" text NOT NULL, "token_address" text NOT NULL, CONSTRAINT "PK_9679a9ed3d5cefe2f733614a158" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_d69bd6f7cc0e2dd5593610a3ee" ON "whitelisted_address" ("address") `)
        await db.query(`CREATE INDEX "IDX_af050b623759e5afd6de93fab2" ON "whitelisted_address" ("token_address") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "token"`)
        await db.query(`DROP INDEX "public"."IDX_40a4dcc6b727285c6539aa1d1c"`)
        await db.query(`DROP TABLE "token_holder"`)
        await db.query(`DROP INDEX "public"."IDX_6b3c0be07f28745c01c39d1924"`)
        await db.query(`DROP INDEX "public"."IDX_3f3048c0cf573a13d7c977c4e4"`)
        await db.query(`DROP TABLE "token_deposit"`)
        await db.query(`DROP INDEX "public"."IDX_9e36ba2452feeeb6958618548f"`)
        await db.query(`DROP INDEX "public"."IDX_10681a1c2560ba892994202a06"`)
        await db.query(`DROP TABLE "whitelisted_address"`)
        await db.query(`DROP INDEX "public"."IDX_d69bd6f7cc0e2dd5593610a3ee"`)
        await db.query(`DROP INDEX "public"."IDX_af050b623759e5afd6de93fab2"`)
    }
}
