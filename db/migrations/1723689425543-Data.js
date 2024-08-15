module.exports = class Data1723689425543 {
    name = 'Data1723689425543'

    async up(db) {
        await db.query(`CREATE TABLE "token_creation" ("id" character varying NOT NULL, "owner" text NOT NULL, "token_address" text NOT NULL, CONSTRAINT "PK_e22189d729c2b625c171e630e89" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_d1b4315fd3482c8022ca845b73" ON "token_creation" ("owner") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "token_creation"`)
        await db.query(`DROP INDEX "public"."IDX_d1b4315fd3482c8022ca845b73"`)
    }
}
