import {assertNotNull} from '@subsquid/util-internal'
import { EvmBatchProcessor } from '@subsquid/evm-processor'
import * as fundTokenFactoryAbi from './abi/fundTokenFactory'

export const processor = new EvmBatchProcessor()
  .setGateway('https://v2.archive.subsquid.io/network/plume-testnet')
  .setRpcEndpoint({
      url: assertNotNull(process.env.RPC_ETH_HTTP, 'No RPC endpoint supplied'),
      rateLimit: 10
  })
  .setFinalityConfirmation(75)
  .addLog({
      address: [ '0xa2D4b99980784a00D94d59bADBA22f7Ce3515426' ],
      topic0: [ fundTokenFactoryAbi.events.TokenCreated.topic ]
  })
