import {assertNotNull} from '@subsquid/util-internal'
import { EvmBatchProcessor } from '@subsquid/evm-processor'
import * as fundTokenFactoryAbi from './abi/fundTokenFactory'
import * as fundTokenAbi from './abi/fundToken'

export const FACTORY_ADDRESS = '0x935F78637f48A612cB30C19A7732a5B6DE40Feb1';

export const processor = new EvmBatchProcessor()
  .setRpcEndpoint({
      url: assertNotNull(process.env.RPC_ENDPOINT, 'No RPC endpoint supplied'),
      rateLimit: 10
  })
  .setFinalityConfirmation(75)
  .setBlockRange({
    from: 50
  })
  .addLog({
      address: [ FACTORY_ADDRESS ],
      topic0: [ fundTokenFactoryAbi.events.TokenCreated.topic ]
  })
  .addLog({
    topic0: [ fundTokenAbi.events.Transfer.topic, fundTokenAbi.events.Deposited.topic ]
  })
