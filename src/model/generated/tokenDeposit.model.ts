import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, DateTimeColumn as DateTimeColumn_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class TokenDeposit {
    constructor(props?: Partial<TokenDeposit>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_({unique: true})
    @StringColumn_({nullable: false})
    transactionHash!: string

    @Index_()
    @StringColumn_({nullable: false})
    tokenAddress!: string

    @StringColumn_({nullable: false})
    depositor!: string

    @DateTimeColumn_({nullable: false})
    depositedAt!: Date

    @BigIntColumn_({nullable: false})
    amount!: bigint
}
