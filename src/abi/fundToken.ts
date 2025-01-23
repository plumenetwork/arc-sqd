import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    AddressAddedToWhitelist: event("0x534d18c8ff24ba5980906d732f3075704749427353734fbbf05d50485643b124", "AddressAddedToWhitelist(address)", {"user": indexed(p.address)}),
    AddressRemovedFromWhitelist: event("0x535611fb62fa2a833988f283b779e417e996813e44046f521d76c17b5943b08c", "AddressRemovedFromWhitelist(address)", {"user": indexed(p.address)}),
    Approval: event("0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", "Approval(address,address,uint256)", {"owner": indexed(p.address), "spender": indexed(p.address), "value": p.uint256}),
    Deposited: event("0x2da466a7b24304f47e87fa2e1e5a81b9831ce54fec19055ce277ca2f39ba42c4", "Deposited(address,uint256)", {"user": indexed(p.address), "currencyTokenAmount": p.uint256}),
    HolderStatusChanged: event("0x7f5afba82537588e2b8f8287c533b55a7458b4ae0249d14e29864df86b50b718", "HolderStatusChanged(address,bool)", {"holder": indexed(p.address), "isHolder": p.bool}),
    Initialized: event("0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2", "Initialized(uint64)", {"version": p.uint64}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    RoleAdminChanged: event("0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff", "RoleAdminChanged(bytes32,bytes32,bytes32)", {"role": indexed(p.bytes32), "previousAdminRole": indexed(p.bytes32), "newAdminRole": indexed(p.bytes32)}),
    RoleGranted: event("0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d", "RoleGranted(bytes32,address,address)", {"role": indexed(p.bytes32), "account": indexed(p.address), "sender": indexed(p.address)}),
    RoleRevoked: event("0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b", "RoleRevoked(bytes32,address,address)", {"role": indexed(p.bytes32), "account": indexed(p.address), "sender": indexed(p.address)}),
    Transfer: event("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "Transfer(address,address,uint256)", {"from": indexed(p.address), "to": indexed(p.address), "value": p.uint256}),
    Upgraded: event("0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b", "Upgraded(address)", {"implementation": indexed(p.address)}),
    YieldAccrued: event("0x8258a59886e03bdb78e5ddb9566b8ad4957a1747e8d15fd0b4a24274f35cf317", "YieldAccrued(address,uint256)", {"user": indexed(p.address), "currencyTokenAmount": p.uint256}),
    YieldClaimed: event("0xc04825ba3f383b602255d2a13065a68e325c65c9e0ed5d031ea2b06f641873af", "YieldClaimed(address,uint256)", {"user": indexed(p.address), "currencyTokenAmount": p.uint256}),
}

export const functions = {
    ADMIN_ROLE: viewFun("0x75b238fc", "ADMIN_ROLE()", {}, p.bytes32),
    DEFAULT_ADMIN_ROLE: viewFun("0xa217fddf", "DEFAULT_ADMIN_ROLE()", {}, p.bytes32),
    UPGRADER_ROLE: viewFun("0xf72c0d8b", "UPGRADER_ROLE()", {}, p.bytes32),
    UPGRADE_INTERFACE_VERSION: viewFun("0xad3cb1cc", "UPGRADE_INTERFACE_VERSION()", {}, p.string),
    accrueYield: fun("0x084fa74e", "accrueYield(address)", {"user": p.address}, ),
    addToWhitelist: fun("0xe43252d7", "addToWhitelist(address)", {"user": p.address}, ),
    allowance: viewFun("0xdd62ed3e", "allowance(address,address)", {"owner": p.address, "spender": p.address}, p.uint256),
    approve: fun("0x095ea7b3", "approve(address,uint256)", {"spender": p.address, "value": p.uint256}, p.bool),
    balanceOf: viewFun("0x70a08231", "balanceOf(address)", {"account": p.address}, p.uint256),
    claimYield: fun("0x999927df", "claimYield(address)", {"user": p.address}, {"currencyToken": p.address, "currencyTokenAmount": p.uint256}),
    decimals: viewFun("0x313ce567", "decimals()", {}, p.uint8),
    depositYield: fun("0x7cf4c01b", "depositYield(uint256)", {"currencyTokenAmount": p.uint256}, ),
    getBalanceAvailable: viewFun("0xc7ca0708", "getBalanceAvailable(address)", {"user": p.address}, p.uint256),
    getCurrencyToken: viewFun("0x4f8d7cad", "getCurrencyToken()", {}, p.address),
    getPricePerToken: viewFun("0xca1e9738", "getPricePerToken()", {}, p.uint256),
    getRoleAdmin: viewFun("0x248a9ca3", "getRoleAdmin(bytes32)", {"role": p.bytes32}, p.bytes32),
    getTokenURI: viewFun("0xd4a19116", "getTokenURI()", {}, p.string),
    getTotalValue: viewFun("0xcaa648b4", "getTotalValue()", {}, p.uint256),
    getUserState: viewFun("0x416ae768", "getUserState(address)", {"account": p.address}, p.uint256),
    grantRole: fun("0x2f2ff15d", "grantRole(bytes32,address)", {"role": p.bytes32, "account": p.address}, ),
    hasRole: viewFun("0x91d14854", "hasRole(bytes32,address)", {"role": p.bytes32, "account": p.address}, p.bool),
    initialize: fun("0x7f3c3a8a", "initialize(address,string,string,address,uint8,string,uint256,uint256,bool)", {"owner": p.address, "name": p.string, "symbol": p.string, "currencyToken": p.address, "decimals_": p.uint8, "tokenURI_": p.string, "initialSupply": p.uint256, "totalValue_": p.uint256, "isWhitelistEnabled_": p.bool}, ),
    isAddressWhitelisted: viewFun("0x13f44d10", "isAddressWhitelisted(address)", {"user": p.address}, p.bool),
    isWhitelistEnabled: viewFun("0x184d69ab", "isWhitelistEnabled()", {}, p.bool),
    mint: fun("0x40c10f19", "mint(address,uint256)", {"user": p.address, "assetTokenAmount": p.uint256}, ),
    name: viewFun("0x06fdde03", "name()", {}, p.string),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    pendingYield: viewFun("0xc7bf1980", "pendingYield(address)", {"user": p.address}, p.uint256),
    proxiableUUID: viewFun("0x52d1902d", "proxiableUUID()", {}, p.bytes32),
    removeFromWhitelist: fun("0x8ab1d681", "removeFromWhitelist(address)", {"user": p.address}, ),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    renounceRole: fun("0x36568abe", "renounceRole(bytes32,address)", {"role": p.bytes32, "callerConfirmation": p.address}, ),
    requestYield: fun("0x2a2b3e5f", "requestYield(address)", {"from": p.address}, ),
    revokeRole: fun("0xd547741f", "revokeRole(bytes32,address)", {"role": p.bytes32, "account": p.address}, ),
    setTokenURI: fun("0xe0df5b6f", "setTokenURI(string)", {"tokenURI": p.string}, ),
    setTotalValue: fun("0xc5dbc900", "setTotalValue(uint256)", {"totalValue": p.uint256}, ),
    supportsInterface: viewFun("0x01ffc9a7", "supportsInterface(bytes4)", {"interfaceId": p.bytes4}, p.bool),
    symbol: viewFun("0x95d89b41", "symbol()", {}, p.string),
    totalSupply: viewFun("0x18160ddd", "totalSupply()", {}, p.uint256),
    transfer: fun("0xa9059cbb", "transfer(address,uint256)", {"to": p.address, "value": p.uint256}, p.bool),
    transferFrom: fun("0x23b872dd", "transferFrom(address,address,uint256)", {"from": p.address, "to": p.address, "value": p.uint256}, p.bool),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    upgradeToAndCall: fun("0x4f1ef286", "upgradeToAndCall(address,bytes)", {"newImplementation": p.address, "data": p.bytes}, ),
}

export class Contract extends ContractBase {

    ADMIN_ROLE() {
        return this.eth_call(functions.ADMIN_ROLE, {})
    }

    DEFAULT_ADMIN_ROLE() {
        return this.eth_call(functions.DEFAULT_ADMIN_ROLE, {})
    }

    UPGRADER_ROLE() {
        return this.eth_call(functions.UPGRADER_ROLE, {})
    }

    UPGRADE_INTERFACE_VERSION() {
        return this.eth_call(functions.UPGRADE_INTERFACE_VERSION, {})
    }

    allowance(owner: AllowanceParams["owner"], spender: AllowanceParams["spender"]) {
        return this.eth_call(functions.allowance, {owner, spender})
    }

    balanceOf(account: BalanceOfParams["account"]) {
        return this.eth_call(functions.balanceOf, {account})
    }

    decimals() {
        return this.eth_call(functions.decimals, {})
    }

    getBalanceAvailable(user: GetBalanceAvailableParams["user"]) {
        return this.eth_call(functions.getBalanceAvailable, {user})
    }

    getCurrencyToken() {
        return this.eth_call(functions.getCurrencyToken, {})
    }

    getPricePerToken() {
        return this.eth_call(functions.getPricePerToken, {})
    }

    getRoleAdmin(role: GetRoleAdminParams["role"]) {
        return this.eth_call(functions.getRoleAdmin, {role})
    }

    getTokenURI() {
        return this.eth_call(functions.getTokenURI, {})
    }

    getTotalValue() {
        return this.eth_call(functions.getTotalValue, {})
    }

    getUserState(account: GetUserStateParams["account"]) {
        return this.eth_call(functions.getUserState, {account})
    }

    hasRole(role: HasRoleParams["role"], account: HasRoleParams["account"]) {
        return this.eth_call(functions.hasRole, {role, account})
    }

    isAddressWhitelisted(user: IsAddressWhitelistedParams["user"]) {
        return this.eth_call(functions.isAddressWhitelisted, {user})
    }

    isWhitelistEnabled() {
        return this.eth_call(functions.isWhitelistEnabled, {})
    }

    name() {
        return this.eth_call(functions.name, {})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    pendingYield(user: PendingYieldParams["user"]) {
        return this.eth_call(functions.pendingYield, {user})
    }

    proxiableUUID() {
        return this.eth_call(functions.proxiableUUID, {})
    }

    supportsInterface(interfaceId: SupportsInterfaceParams["interfaceId"]) {
        return this.eth_call(functions.supportsInterface, {interfaceId})
    }

    symbol() {
        return this.eth_call(functions.symbol, {})
    }

    totalSupply() {
        return this.eth_call(functions.totalSupply, {})
    }
}

/// Event types
export type AddressAddedToWhitelistEventArgs = EParams<typeof events.AddressAddedToWhitelist>
export type AddressRemovedFromWhitelistEventArgs = EParams<typeof events.AddressRemovedFromWhitelist>
export type ApprovalEventArgs = EParams<typeof events.Approval>
export type DepositedEventArgs = EParams<typeof events.Deposited>
export type HolderStatusChangedEventArgs = EParams<typeof events.HolderStatusChanged>
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type RoleAdminChangedEventArgs = EParams<typeof events.RoleAdminChanged>
export type RoleGrantedEventArgs = EParams<typeof events.RoleGranted>
export type RoleRevokedEventArgs = EParams<typeof events.RoleRevoked>
export type TransferEventArgs = EParams<typeof events.Transfer>
export type UpgradedEventArgs = EParams<typeof events.Upgraded>
export type YieldAccruedEventArgs = EParams<typeof events.YieldAccrued>
export type YieldClaimedEventArgs = EParams<typeof events.YieldClaimed>

/// Function types
export type ADMIN_ROLEParams = FunctionArguments<typeof functions.ADMIN_ROLE>
export type ADMIN_ROLEReturn = FunctionReturn<typeof functions.ADMIN_ROLE>

export type DEFAULT_ADMIN_ROLEParams = FunctionArguments<typeof functions.DEFAULT_ADMIN_ROLE>
export type DEFAULT_ADMIN_ROLEReturn = FunctionReturn<typeof functions.DEFAULT_ADMIN_ROLE>

export type UPGRADER_ROLEParams = FunctionArguments<typeof functions.UPGRADER_ROLE>
export type UPGRADER_ROLEReturn = FunctionReturn<typeof functions.UPGRADER_ROLE>

export type UPGRADE_INTERFACE_VERSIONParams = FunctionArguments<typeof functions.UPGRADE_INTERFACE_VERSION>
export type UPGRADE_INTERFACE_VERSIONReturn = FunctionReturn<typeof functions.UPGRADE_INTERFACE_VERSION>

export type AccrueYieldParams = FunctionArguments<typeof functions.accrueYield>
export type AccrueYieldReturn = FunctionReturn<typeof functions.accrueYield>

export type AddToWhitelistParams = FunctionArguments<typeof functions.addToWhitelist>
export type AddToWhitelistReturn = FunctionReturn<typeof functions.addToWhitelist>

export type AllowanceParams = FunctionArguments<typeof functions.allowance>
export type AllowanceReturn = FunctionReturn<typeof functions.allowance>

export type ApproveParams = FunctionArguments<typeof functions.approve>
export type ApproveReturn = FunctionReturn<typeof functions.approve>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type ClaimYieldParams = FunctionArguments<typeof functions.claimYield>
export type ClaimYieldReturn = FunctionReturn<typeof functions.claimYield>

export type DecimalsParams = FunctionArguments<typeof functions.decimals>
export type DecimalsReturn = FunctionReturn<typeof functions.decimals>

export type DepositYieldParams = FunctionArguments<typeof functions.depositYield>
export type DepositYieldReturn = FunctionReturn<typeof functions.depositYield>

export type GetBalanceAvailableParams = FunctionArguments<typeof functions.getBalanceAvailable>
export type GetBalanceAvailableReturn = FunctionReturn<typeof functions.getBalanceAvailable>

export type GetCurrencyTokenParams = FunctionArguments<typeof functions.getCurrencyToken>
export type GetCurrencyTokenReturn = FunctionReturn<typeof functions.getCurrencyToken>

export type GetPricePerTokenParams = FunctionArguments<typeof functions.getPricePerToken>
export type GetPricePerTokenReturn = FunctionReturn<typeof functions.getPricePerToken>

export type GetRoleAdminParams = FunctionArguments<typeof functions.getRoleAdmin>
export type GetRoleAdminReturn = FunctionReturn<typeof functions.getRoleAdmin>

export type GetTokenURIParams = FunctionArguments<typeof functions.getTokenURI>
export type GetTokenURIReturn = FunctionReturn<typeof functions.getTokenURI>

export type GetTotalValueParams = FunctionArguments<typeof functions.getTotalValue>
export type GetTotalValueReturn = FunctionReturn<typeof functions.getTotalValue>

export type GetUserStateParams = FunctionArguments<typeof functions.getUserState>
export type GetUserStateReturn = FunctionReturn<typeof functions.getUserState>

export type GrantRoleParams = FunctionArguments<typeof functions.grantRole>
export type GrantRoleReturn = FunctionReturn<typeof functions.grantRole>

export type HasRoleParams = FunctionArguments<typeof functions.hasRole>
export type HasRoleReturn = FunctionReturn<typeof functions.hasRole>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type IsAddressWhitelistedParams = FunctionArguments<typeof functions.isAddressWhitelisted>
export type IsAddressWhitelistedReturn = FunctionReturn<typeof functions.isAddressWhitelisted>

export type IsWhitelistEnabledParams = FunctionArguments<typeof functions.isWhitelistEnabled>
export type IsWhitelistEnabledReturn = FunctionReturn<typeof functions.isWhitelistEnabled>

export type MintParams = FunctionArguments<typeof functions.mint>
export type MintReturn = FunctionReturn<typeof functions.mint>

export type NameParams = FunctionArguments<typeof functions.name>
export type NameReturn = FunctionReturn<typeof functions.name>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type PendingYieldParams = FunctionArguments<typeof functions.pendingYield>
export type PendingYieldReturn = FunctionReturn<typeof functions.pendingYield>

export type ProxiableUUIDParams = FunctionArguments<typeof functions.proxiableUUID>
export type ProxiableUUIDReturn = FunctionReturn<typeof functions.proxiableUUID>

export type RemoveFromWhitelistParams = FunctionArguments<typeof functions.removeFromWhitelist>
export type RemoveFromWhitelistReturn = FunctionReturn<typeof functions.removeFromWhitelist>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type RenounceRoleParams = FunctionArguments<typeof functions.renounceRole>
export type RenounceRoleReturn = FunctionReturn<typeof functions.renounceRole>

export type RequestYieldParams = FunctionArguments<typeof functions.requestYield>
export type RequestYieldReturn = FunctionReturn<typeof functions.requestYield>

export type RevokeRoleParams = FunctionArguments<typeof functions.revokeRole>
export type RevokeRoleReturn = FunctionReturn<typeof functions.revokeRole>

export type SetTokenURIParams = FunctionArguments<typeof functions.setTokenURI>
export type SetTokenURIReturn = FunctionReturn<typeof functions.setTokenURI>

export type SetTotalValueParams = FunctionArguments<typeof functions.setTotalValue>
export type SetTotalValueReturn = FunctionReturn<typeof functions.setTotalValue>

export type SupportsInterfaceParams = FunctionArguments<typeof functions.supportsInterface>
export type SupportsInterfaceReturn = FunctionReturn<typeof functions.supportsInterface>

export type SymbolParams = FunctionArguments<typeof functions.symbol>
export type SymbolReturn = FunctionReturn<typeof functions.symbol>

export type TotalSupplyParams = FunctionArguments<typeof functions.totalSupply>
export type TotalSupplyReturn = FunctionReturn<typeof functions.totalSupply>

export type TransferParams = FunctionArguments<typeof functions.transfer>
export type TransferReturn = FunctionReturn<typeof functions.transfer>

export type TransferFromParams = FunctionArguments<typeof functions.transferFrom>
export type TransferFromReturn = FunctionReturn<typeof functions.transferFrom>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type UpgradeToAndCallParams = FunctionArguments<typeof functions.upgradeToAndCall>
export type UpgradeToAndCallReturn = FunctionReturn<typeof functions.upgradeToAndCall>

