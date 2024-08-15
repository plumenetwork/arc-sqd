import {TypeormDatabase} from '@subsquid/typeorm-store'
import {processor} from './processor'
import * as fundTokenFactoryAbi from './abi/fundTokenFactory'
import { TokenCreation } from './model';

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
  const tokenCreations: TokenCreation[] = []
  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      let { owner, tokenAddress  } = fundTokenFactoryAbi.events.TokenCreated.decode(log);
      ctx.log.info(`Token created: owner=${owner}, tokenAddress=${tokenAddress}`)
      tokenCreations.push(new TokenCreation({
        id: log.id,
        createdAt: new Date(log.block.timestamp),
        owner,
        tokenAddress
      }))
    }
  }
  await ctx.store.insert(tokenCreations)
})
