import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, DateTimeColumn as DateTimeColumn_, StringColumn as StringColumn_, Index as Index_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class TokenDeposit {
    constructor(props?: Partial<TokenDeposit>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @DateTimeColumn_({nullable: false})
    depositedAt!: Date

    @Index_()
    @StringColumn_({nullable: false})
    tokenAddress!: string

    @StringColumn_({nullable: false})
    depositor!: string

    @BigIntColumn_({nullable: false})
    amount!: bigint

    @StringColumn_({nullable: false})
    transactionHash!: string
}
