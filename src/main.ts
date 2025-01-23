import {TypeormDatabase} from '@subsquid/typeorm-store'
import { MINERAL_VAULT_FUND_TOKEN_ADDRESS, processor } from './processor';
import * as fundTokenAbi from './abi/fundToken'
import { TokenCreation, TokenDeposit, TokenHolder } from './model';

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
  const mineralVaultFundToken = await ctx.store.findOne(TokenCreation, {
    where: {
      tokenAddress: MINERAL_VAULT_FUND_TOKEN_ADDRESS
    }
  });
  if (!mineralVaultFundToken) {
    ctx.log.info(`Creating token for address ${MINERAL_VAULT_FUND_TOKEN_ADDRESS}`);
    await ctx.store.upsert(new TokenCreation({
      id: "1",
      createdAt: new Date(),
      owner: "0x7C656ef9E2a18fbcDc9524D04A250399A4c07B3d",
      tokenAddress: MINERAL_VAULT_FUND_TOKEN_ADDRESS,
    }));
  }
  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      if (log.address === MINERAL_VAULT_FUND_TOKEN_ADDRESS) {
        if (log.topics[0] === fundTokenAbi.events.Transfer.topic) {
          // Transfers
          let {from, to, value} = fundTokenAbi.events.Transfer.decode(log);
          ctx.log.info(`Transfer: from=${from}, to=${to}, value=${value}`)

          if (from.toLowerCase() !== "0x0000000000000000000000000000000000000000") {
            const fromTokenHolder = await ctx.store.findOne(TokenHolder, {
              where: {
                owner: from,
                tokenAddress: log.address
              }
            }) ?? new TokenHolder({id: `${from}-${log.address}`, owner: from, tokenAddress: log.address, value: 0n});
            fromTokenHolder.value = (fromTokenHolder.value ?? 0n) - value;
            await ctx.store.upsert(fromTokenHolder);
          }

          if (to.toLowerCase() !== "0x0000000000000000000000000000000000000000") {
            const toTokenHolder = await ctx.store.findOne(TokenHolder, {
              where: {
                owner: to,
                tokenAddress: log.address
              }
            }) ?? new TokenHolder({id: `${to}=${log.address}`, owner: to, tokenAddress: log.address, value: 0n});
            toTokenHolder.value = (toTokenHolder.value ?? 0n) + value;
            await ctx.store.upsert(toTokenHolder);
          }
        }

        if (log.topics[0] === fundTokenAbi.events.Deposited.topic) {
          // Deposits
          let {currencyTokenAmount, user} = fundTokenAbi.events.Deposited.decode(log);
          const transactionHash = log.block.hash;
          const depositedAt = new Date(log.block.timestamp);
          ctx.log.info(`Deposited: address=${log.address}, user=${user}, currencyTokenAmount=${currencyTokenAmount}, transactionHash=${transactionHash}, depositedAt=${depositedAt}`)
          const tokenDeposit = new TokenDeposit({
            id: log.id,
            depositedAt,
            tokenAddress: log.address,
            depositor: user,
            amount: currencyTokenAmount,
            transactionHash,
          });
          await ctx.store.insert(tokenDeposit);
        }

        if (log.topics[0] === fundTokenAbi.events.YieldClaimed.topic) {
          // Yield claimed
          let {currencyTokenAmount, user} = fundTokenAbi.events.YieldClaimed.decode(log);
          const transactionHash = log.block.hash;
          const claimedAt = new Date(log.block.timestamp);
          ctx.log.info(`Yield claimed: address=${log.address}, user=${user}, currencyTokenAmount=${currencyTokenAmount}, transactionHash=${transactionHash}, claimedAt=${claimedAt}`)
          // TODO: Add a new model for yield claims
        }
      }
    }
  }
})
