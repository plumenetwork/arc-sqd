import {assertNotNull} from '@subsquid/util-internal'
import { EvmBatchProcessor } from '@subsquid/evm-processor'
import * as fundTokenAbi from './abi/fundToken'

export const MINERAL_VAULT_FUND_TOKEN_ADDRESS = "0x2Ac2227eaD821F0499798AC844924F49CB9cFD90";

export const processor = new EvmBatchProcessor()
  .setGateway(assertNotNull(process.env.GATEWAY, "No Gateway supplied"))
  .setRpcEndpoint({
      url: assertNotNull(process.env.RPC_ENDPOINT, 'No RPC endpoint supplied'),
      rateLimit: 10
  })
  .setFinalityConfirmation(75)
  .addLog({
      address: [ MINERAL_VAULT_FUND_TOKEN_ADDRESS ],
      topic0: [
          fundTokenAbi.events.Transfer.topic,
          fundTokenAbi.events.Deposited.topic,
          fundTokenAbi.events.YieldClaimed.topic
      ]
  })
