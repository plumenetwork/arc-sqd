import {TypeormDatabase} from '@subsquid/typeorm-store'
import { FACTORY_ADDRESS, processor } from './processor';
import * as fundTokenFactoryAbi from './abi/fundTokenFactory'
import * as fundTokenAbi from './abi/fundToken'
import { TokenCreation, TokenDeposit, TokenHolder } from './model';
import { Log } from '@subsquid/evm-processor';

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
  const tokenAddresses = await ctx.store.findBy(TokenCreation, {})
      .then((q) => new Set(q.map((i) => i.tokenAddress)))

  const tokenCreations: TokenCreation[] = []
  const transferLogs: Log[] = [];
  const depositedLogs: Log[] = [];

  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      if (log.topics[0] === fundTokenFactoryAbi.events.TokenCreated.topic && log.address.toLowerCase() === FACTORY_ADDRESS.toLowerCase()) {
        let { owner, tokenAddress } = fundTokenFactoryAbi.events.TokenCreated.decode(log);
        ctx.log.info(`Token created: owner=${owner}, tokenAddress=${tokenAddress}`)
        tokenCreations.push(new TokenCreation({
          id: log.id,
          createdAt: new Date(log.block.timestamp),
          owner,
          tokenAddress
        }))
        tokenAddresses.add(tokenAddress)
      }

      if (log.topics[0] === fundTokenAbi.events.Transfer.topic) {
        transferLogs.push(log)
      }

      if (log.topics[0] === fundTokenAbi.events.Deposited.topic) {
        depositedLogs.push(log);
      }
    }
  }

  await ctx.store.insert(tokenCreations)

  for (let log of transferLogs) {
    if (tokenAddresses.has(log.address)) {
      let { from, to, value } = fundTokenAbi.events.Transfer.decode(log);
      ctx.log.info(`Transfer: from=${from}, to=${to}, value=${value}`)

      if (from.toLowerCase() !== "0x0000000000000000000000000000000000000000") {
        const fromTokenHolder = await ctx.store.findOne(TokenHolder, {
          where: {
            owner: from,
            tokenAddress: log.address
          }
        }) ?? new TokenHolder({ id: `${from}-${log.address}`, owner: from, tokenAddress: log.address, value: 0n });
        fromTokenHolder.value = (fromTokenHolder.value ?? 0n) - value;
        await ctx.store.upsert(fromTokenHolder);
      }

      if (to.toLowerCase() !== "0x0000000000000000000000000000000000000000") {
        const toTokenHolder = await ctx.store.findOne(TokenHolder, {
          where: {
            owner: to,
            tokenAddress: log.address
          }
        }) ?? new TokenHolder({ id: `${to}=${log.address}`, owner: to, tokenAddress: log.address, value: 0n });
        toTokenHolder.value = (toTokenHolder.value ?? 0n) + value;
        await ctx.store.upsert(toTokenHolder);
      }
    }
  }

  for (let log of depositedLogs) {
    if (tokenAddresses.has(log.address)) {
      let { amount, depositor } = fundTokenAbi.events.Deposited.decode(log);
      const transactionHash = log.block.hash;
      const depositedAt = new Date(log.block.timestamp);
      ctx.log.info(`Deposited: address=${log.address}, depositor=${depositor}, amount=${amount}, transactionHash=${transactionHash}, depositedAt=${depositedAt}`)
      const tokenDeposit = new TokenDeposit({
        id: log.id,
        depositedAt,
        tokenAddress: log.address,
        depositor,
        amount,
        transactionHash,
      });
      await ctx.store.insert(tokenDeposit);
    }
  }
})
