import {assertNotNull} from '@subsquid/util-internal'
import { EvmBatchProcessor } from '@subsquid/evm-processor'
import * as fundTokenFactoryAbi from './abi/fundTokenFactory'

export const processor = new EvmBatchProcessor()
  .setGateway('https://v2.archive.subsquid.io/network/plume-testnet')
  .setRpcEndpoint({
      url: assertNotNull(process.env.RPC_ENDPOINT, 'No RPC endpoint supplied'),
      rateLimit: 10
  })
  .setFinalityConfirmation(75)
  .setBlockRange({
    from: 8000948
  })
  .addLog({
      address: [ '0xa2D4b99980784a00D94d59bADBA22f7Ce3515426' ],
      topic0: [ fundTokenFactoryAbi.events.TokenCreated.topic ]
  })
