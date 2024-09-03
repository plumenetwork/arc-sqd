import {assertNotNull} from '@subsquid/util-internal'
import { EvmBatchProcessor } from '@subsquid/evm-processor'
import * as fundTokenFactoryAbi from './abi/fundTokenFactory'
import * as fundTokenAbi from './abi/fundToken'

export const FACTORY_ADDRESS = '0xA5751b72D641471Aa35176A3E3193E8996eC425F';

export const processor = new EvmBatchProcessor()
  .setGateway('https://v2.archive.subsquid.io/network/plume-testnet')
  .setRpcEndpoint({
      url: assertNotNull(process.env.RPC_ENDPOINT, 'No RPC endpoint supplied'),
      rateLimit: 10
  })
  .setFinalityConfirmation(75)
  .setBlockRange({
    from: 11626110
  })
  .addLog({
      address: [ FACTORY_ADDRESS ],
      topic0: [ fundTokenFactoryAbi.events.TokenCreated.topic ]
  })
  .addLog({
    topic0: [ fundTokenAbi.events.Transfer.topic ]
  })
