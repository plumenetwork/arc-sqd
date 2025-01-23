import {TypeormDatabase} from '@subsquid/typeorm-store'
import { MINERAL_VAULT_FUND_TOKEN_ADDRESS, processor } from './processor';
import * as fundTokenAbi from './abi/fundToken'
import { Token, TokenDeposit, TokenHolder, WhitelistedAddress } from './model';

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      if (log.address.toLowerCase() === MINERAL_VAULT_FUND_TOKEN_ADDRESS.toLowerCase()) {
        if (log.topics[0] === fundTokenAbi.events.Initialized.topic) {
          let { version } = fundTokenAbi.events.Initialized.decode(log);
          ctx.log.info(`Initialized: version=${version}`);
          const mineralVaultFundToken = await ctx.store.findOne(Token, {
            where: {
              address: log.address
            }
          });
          if (!mineralVaultFundToken) {
            await ctx.store.upsert(new Token({
              id: log.id,
              address: log.address,
              createdAt: new Date(),
              tokenAdmins: ["0xb015762405de8fd24d29a6e0799c12e0ea81c1ff".toLowerCase()],
            }));
          }
        }

        if (log.topics[0] === fundTokenAbi.events.Transfer.topic) {
          // Transfers
          let {from, to, value} = fundTokenAbi.events.Transfer.decode(log);
          ctx.log.info(`Transfer: from=${from}, to=${to}, value=${value}`)

          if (from.toLowerCase() !== "0x0000000000000000000000000000000000000000") {
            const fromTokenHolder = await ctx.store.findOne(TokenHolder, {
              where: {
                address: from,
                tokenAddress: log.address
              }
            }) ?? new TokenHolder({
              id: log.id,
              address: from,
              tokenAddress: log.address,
              value: 0n
            });
            fromTokenHolder.value = (fromTokenHolder.value ?? 0n) - value;
            await ctx.store.upsert(fromTokenHolder);
          }

          if (to.toLowerCase() !== "0x0000000000000000000000000000000000000000") {
            const toTokenHolder = await ctx.store.findOne(TokenHolder, {
              where: {
                address: to,
                tokenAddress: log.address
              }
            }) ?? new TokenHolder({
              id: log.id,
              address: to,
              tokenAddress: log.address,
              value: 0n
            });
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
            transactionHash,
            tokenAddress: log.address,
            depositor: user,
            depositedAt,
            amount: currencyTokenAmount,
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

        if (log.topics[0] === fundTokenAbi.events.RoleGranted.topic) {
          // Role Granted
          let {role, account} = fundTokenAbi.events.RoleGranted.decode(log);
          ctx.log.info(`Role granted: address=${log.address}, role=${role}, account=${account}`)
          if (role === "0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775") {
            const token = await ctx.store.findOne(Token, {
              where: {
                address: log.address
              }
            });
            if (token) {
              token.tokenAdmins = [...token.tokenAdmins, account.toLowerCase()];
              await ctx.store.upsert(token);
            }
          }
        }

        if (log.topics[0] === fundTokenAbi.events.RoleRevoked.topic) {
          // Role Revoked
          let {role, account} = fundTokenAbi.events.RoleRevoked.decode(log);
          ctx.log.info(`Role revoked: address=${log.address}, role=${role}, account=${account}`)
          if (role === "0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775") {
            const token = await ctx.store.findOne(Token, {
              where: {
                address: log.address
              }
            });
            if (token) {
              token.tokenAdmins = token.tokenAdmins.filter(admin => admin !== account.toLowerCase());
              await ctx.store.upsert(token);
            }
          }
        }

        if (log.topics[0] === fundTokenAbi.events.AddressAddedToWhitelist.topic) {
          // Address added to whitelist
          let {user} = fundTokenAbi.events.AddressAddedToWhitelist.decode(log);
          ctx.log.info(`Address added to whitelist: user=${user}`);
          const whitelistedAddress = await ctx.store.findOne(WhitelistedAddress, {
            where: {
              address: user,
              tokenAddress: log.address
            }
          });
          if (!whitelistedAddress) {
            await ctx.store.upsert(new WhitelistedAddress({
              id: log.id,
              address: user,
              tokenAddress: log.address,
            }));
          }
        }

        if (log.topics[0] === fundTokenAbi.events.AddressRemovedFromWhitelist.topic) {
          // Address removed from whitelist
          let {user} = fundTokenAbi.events.AddressRemovedFromWhitelist.decode(log);
          ctx.log.info(`Address removed from whitelist: user=${user}`);
          const whitelistedAddress = await ctx.store.findOne(WhitelistedAddress, {
            where: {
              address: user,
              tokenAddress: log.address
            }
          });
          if (whitelistedAddress) {
            await ctx.store.remove(whitelistedAddress);
          }
        }
      }
    }
  }
})
