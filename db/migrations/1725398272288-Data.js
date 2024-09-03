module.exports = class Data1725398272288 {
    name = 'Data1725398272288'

    async up(db) {
        await db.query(`CREATE TABLE "token_deposit" ("id" character varying NOT NULL, "deposited_at" TIMESTAMP WITH TIME ZONE NOT NULL, "token_address" text NOT NULL, "depositor" text NOT NULL, "amount" numeric NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_7c5eea7aeab3f0e71da8d2d9f4f" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_10681a1c2560ba892994202a06" ON "token_deposit" ("token_address") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "token_deposit"`)
        await db.query(`DROP INDEX "public"."IDX_10681a1c2560ba892994202a06"`)
    }
}
