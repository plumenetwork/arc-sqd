import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Approval: event("0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", "Approval(address,address,uint256)", {"owner": indexed(p.address), "spender": indexed(p.address), "value": p.uint256}),
    EIP712DomainChanged: event("0x0a6387c9ea3628b88a633bb4f3b151770f70085117a15f9bf3787cda53f13d31", "EIP712DomainChanged()", {}),
    Initialized: event("0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2", "Initialized(uint64)", {"version": p.uint64}),
    Paused: event("0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258", "Paused(address)", {"account": p.address}),
    RoleAdminChanged: event("0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff", "RoleAdminChanged(bytes32,bytes32,bytes32)", {"role": indexed(p.bytes32), "previousAdminRole": indexed(p.bytes32), "newAdminRole": indexed(p.bytes32)}),
    RoleGranted: event("0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d", "RoleGranted(bytes32,address,address)", {"role": indexed(p.bytes32), "account": indexed(p.address), "sender": indexed(p.address)}),
    RoleRevoked: event("0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b", "RoleRevoked(bytes32,address,address)", {"role": indexed(p.bytes32), "account": indexed(p.address), "sender": indexed(p.address)}),
    Transfer: event("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "Transfer(address,address,uint256)", {"from": indexed(p.address), "to": indexed(p.address), "value": p.uint256}),
    Unpaused: event("0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa", "Unpaused(address)", {"account": p.address}),
    Upgraded: event("0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b", "Upgraded(address)", {"implementation": indexed(p.address)}),
}

export const functions = {
    DEFAULT_ADMIN_ROLE: viewFun("0xa217fddf", "DEFAULT_ADMIN_ROLE()", {}, p.bytes32),
    DOMAIN_SEPARATOR: viewFun("0x3644e515", "DOMAIN_SEPARATOR()", {}, p.bytes32),
    MINTER_ROLE: viewFun("0xd5391393", "MINTER_ROLE()", {}, p.bytes32),
    PAUSER_ROLE: viewFun("0xe63ab1e9", "PAUSER_ROLE()", {}, p.bytes32),
    UPGRADER_ROLE: viewFun("0xf72c0d8b", "UPGRADER_ROLE()", {}, p.bytes32),
    UPGRADE_INTERFACE_VERSION: viewFun("0xad3cb1cc", "UPGRADE_INTERFACE_VERSION()", {}, p.string),
    allowance: viewFun("0xdd62ed3e", "allowance(address,address)", {"owner": p.address, "spender": p.address}, p.uint256),
    approve: fun("0x095ea7b3", "approve(address,uint256)", {"spender": p.address, "value": p.uint256}, p.bool),
    balanceOf: viewFun("0x70a08231", "balanceOf(address)", {"account": p.address}, p.uint256),
    burn: fun("0x42966c68", "burn(uint256)", {"value": p.uint256}, ),
    burnFrom: fun("0x79cc6790", "burnFrom(address,uint256)", {"account": p.address, "value": p.uint256}, ),
    contractType: viewFun("0xcb2ef6f7", "contractType()", {}, p.string),
    decimals: viewFun("0x313ce567", "decimals()", {}, p.uint8),
    eip712Domain: viewFun("0x84b0196e", "eip712Domain()", {}, {"fields": p.bytes1, "name": p.string, "version": p.string, "chainId": p.uint256, "verifyingContract": p.address, "salt": p.bytes32, "extensions": p.array(p.uint256)}),
    getAdmin: viewFun("0x6e9960c3", "getAdmin()", {}, p.address),
    getImageUrl: viewFun("0x9743a691", "getImageUrl()", {}, p.string),
    getPricePerToken: viewFun("0xca1e9738", "getPricePerToken()", {}, p.uint256),
    getRoleAdmin: viewFun("0x248a9ca3", "getRoleAdmin(bytes32)", {"role": p.bytes32}, p.bytes32),
    getTermsAndConditions: viewFun("0x43beb938", "getTermsAndConditions(address)", {"_address": p.address}, p.bool),
    getTermsAndConditionsUrl: viewFun("0xd244132f", "getTermsAndConditionsUrl()", {}, p.string),
    getTotalSupplyValue: viewFun("0x814e0ea3", "getTotalSupplyValue()", {}, p.uint256),
    getVersion: viewFun("0x0d8e6e2c", "getVersion()", {}, p.string),
    grantRole: fun("0x2f2ff15d", "grantRole(bytes32,address)", {"role": p.bytes32, "account": p.address}, ),
    hasRole: viewFun("0x91d14854", "hasRole(bytes32,address)", {"role": p.bytes32, "account": p.address}, p.bool),
    initialize: fun("0x34d251bd", "initialize(string,string,string,uint8,uint256,uint256,address)", {"name": p.string, "symbol": p.string, "_imageUrl": p.string, "customDecimals": p.uint8, "initialSupply": p.uint256, "_totalSupplyValue": p.uint256, "defaultAdmin": p.address}, ),
    mint: fun("0x40c10f19", "mint(address,uint256)", {"to": p.address, "amount": p.uint256}, ),
    name: viewFun("0x06fdde03", "name()", {}, p.string),
    nonces: viewFun("0x7ecebe00", "nonces(address)", {"owner": p.address}, p.uint256),
    pause: fun("0x8456cb59", "pause()", {}, ),
    paused: viewFun("0x5c975abb", "paused()", {}, p.bool),
    permit: fun("0xd505accf", "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)", {"owner": p.address, "spender": p.address, "value": p.uint256, "deadline": p.uint256, "v": p.uint8, "r": p.bytes32, "s": p.bytes32}, ),
    proxiableUUID: viewFun("0x52d1902d", "proxiableUUID()", {}, p.bytes32),
    renounceRole: fun("0x36568abe", "renounceRole(bytes32,address)", {"role": p.bytes32, "callerConfirmation": p.address}, ),
    revokeRole: fun("0xd547741f", "revokeRole(bytes32,address)", {"role": p.bytes32, "account": p.address}, ),
    setTermsAndConditionsUrl: fun("0x4f436cca", "setTermsAndConditionsUrl(string)", {"_url": p.string}, ),
    signTermsAndConditions: fun("0x0fdcc5cc", "signTermsAndConditions()", {}, ),
    supportsInterface: viewFun("0x01ffc9a7", "supportsInterface(bytes4)", {"interfaceId": p.bytes4}, p.bool),
    symbol: viewFun("0x95d89b41", "symbol()", {}, p.string),
    termsAndConditions: viewFun("0xf0eef974", "termsAndConditions(address)", {"_0": p.address}, p.bool),
    termsAndConditionsUrl: viewFun("0x524f2207", "termsAndConditionsUrl()", {}, p.string),
    totalSupply: viewFun("0x18160ddd", "totalSupply()", {}, p.uint256),
    totalSupplyValue: viewFun("0x56fcc0c6", "totalSupplyValue()", {}, p.uint256),
    transfer: fun("0xa9059cbb", "transfer(address,uint256)", {"to": p.address, "value": p.uint256}, p.bool),
    transferFrom: fun("0x23b872dd", "transferFrom(address,address,uint256)", {"from": p.address, "to": p.address, "value": p.uint256}, p.bool),
    unpause: fun("0x3f4ba83a", "unpause()", {}, ),
    upgradeToAndCall: fun("0x4f1ef286", "upgradeToAndCall(address,bytes)", {"newImplementation": p.address, "data": p.bytes}, ),
}

export class Contract extends ContractBase {

    DEFAULT_ADMIN_ROLE() {
        return this.eth_call(functions.DEFAULT_ADMIN_ROLE, {})
    }

    DOMAIN_SEPARATOR() {
        return this.eth_call(functions.DOMAIN_SEPARATOR, {})
    }

    MINTER_ROLE() {
        return this.eth_call(functions.MINTER_ROLE, {})
    }

    PAUSER_ROLE() {
        return this.eth_call(functions.PAUSER_ROLE, {})
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

    contractType() {
        return this.eth_call(functions.contractType, {})
    }

    decimals() {
        return this.eth_call(functions.decimals, {})
    }

    eip712Domain() {
        return this.eth_call(functions.eip712Domain, {})
    }

    getAdmin() {
        return this.eth_call(functions.getAdmin, {})
    }

    getImageUrl() {
        return this.eth_call(functions.getImageUrl, {})
    }

    getPricePerToken() {
        return this.eth_call(functions.getPricePerToken, {})
    }

    getRoleAdmin(role: GetRoleAdminParams["role"]) {
        return this.eth_call(functions.getRoleAdmin, {role})
    }

    getTermsAndConditions(_address: GetTermsAndConditionsParams["_address"]) {
        return this.eth_call(functions.getTermsAndConditions, {_address})
    }

    getTermsAndConditionsUrl() {
        return this.eth_call(functions.getTermsAndConditionsUrl, {})
    }

    getTotalSupplyValue() {
        return this.eth_call(functions.getTotalSupplyValue, {})
    }

    getVersion() {
        return this.eth_call(functions.getVersion, {})
    }

    hasRole(role: HasRoleParams["role"], account: HasRoleParams["account"]) {
        return this.eth_call(functions.hasRole, {role, account})
    }

    name() {
        return this.eth_call(functions.name, {})
    }

    nonces(owner: NoncesParams["owner"]) {
        return this.eth_call(functions.nonces, {owner})
    }

    paused() {
        return this.eth_call(functions.paused, {})
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

    termsAndConditions(_0: TermsAndConditionsParams["_0"]) {
        return this.eth_call(functions.termsAndConditions, {_0})
    }

    termsAndConditionsUrl() {
        return this.eth_call(functions.termsAndConditionsUrl, {})
    }

    totalSupply() {
        return this.eth_call(functions.totalSupply, {})
    }

    totalSupplyValue() {
        return this.eth_call(functions.totalSupplyValue, {})
    }
}

/// Event types
export type ApprovalEventArgs = EParams<typeof events.Approval>
export type EIP712DomainChangedEventArgs = EParams<typeof events.EIP712DomainChanged>
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type PausedEventArgs = EParams<typeof events.Paused>
export type RoleAdminChangedEventArgs = EParams<typeof events.RoleAdminChanged>
export type RoleGrantedEventArgs = EParams<typeof events.RoleGranted>
export type RoleRevokedEventArgs = EParams<typeof events.RoleRevoked>
export type TransferEventArgs = EParams<typeof events.Transfer>
export type UnpausedEventArgs = EParams<typeof events.Unpaused>
export type UpgradedEventArgs = EParams<typeof events.Upgraded>

/// Function types
export type DEFAULT_ADMIN_ROLEParams = FunctionArguments<typeof functions.DEFAULT_ADMIN_ROLE>
export type DEFAULT_ADMIN_ROLEReturn = FunctionReturn<typeof functions.DEFAULT_ADMIN_ROLE>

export type DOMAIN_SEPARATORParams = FunctionArguments<typeof functions.DOMAIN_SEPARATOR>
export type DOMAIN_SEPARATORReturn = FunctionReturn<typeof functions.DOMAIN_SEPARATOR>

export type MINTER_ROLEParams = FunctionArguments<typeof functions.MINTER_ROLE>
export type MINTER_ROLEReturn = FunctionReturn<typeof functions.MINTER_ROLE>

export type PAUSER_ROLEParams = FunctionArguments<typeof functions.PAUSER_ROLE>
export type PAUSER_ROLEReturn = FunctionReturn<typeof functions.PAUSER_ROLE>

export type UPGRADER_ROLEParams = FunctionArguments<typeof functions.UPGRADER_ROLE>
export type UPGRADER_ROLEReturn = FunctionReturn<typeof functions.UPGRADER_ROLE>

export type UPGRADE_INTERFACE_VERSIONParams = FunctionArguments<typeof functions.UPGRADE_INTERFACE_VERSION>
export type UPGRADE_INTERFACE_VERSIONReturn = FunctionReturn<typeof functions.UPGRADE_INTERFACE_VERSION>

export type AllowanceParams = FunctionArguments<typeof functions.allowance>
export type AllowanceReturn = FunctionReturn<typeof functions.allowance>

export type ApproveParams = FunctionArguments<typeof functions.approve>
export type ApproveReturn = FunctionReturn<typeof functions.approve>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type BurnParams = FunctionArguments<typeof functions.burn>
export type BurnReturn = FunctionReturn<typeof functions.burn>

export type BurnFromParams = FunctionArguments<typeof functions.burnFrom>
export type BurnFromReturn = FunctionReturn<typeof functions.burnFrom>

export type ContractTypeParams = FunctionArguments<typeof functions.contractType>
export type ContractTypeReturn = FunctionReturn<typeof functions.contractType>

export type DecimalsParams = FunctionArguments<typeof functions.decimals>
export type DecimalsReturn = FunctionReturn<typeof functions.decimals>

export type Eip712DomainParams = FunctionArguments<typeof functions.eip712Domain>
export type Eip712DomainReturn = FunctionReturn<typeof functions.eip712Domain>

export type GetAdminParams = FunctionArguments<typeof functions.getAdmin>
export type GetAdminReturn = FunctionReturn<typeof functions.getAdmin>

export type GetImageUrlParams = FunctionArguments<typeof functions.getImageUrl>
export type GetImageUrlReturn = FunctionReturn<typeof functions.getImageUrl>

export type GetPricePerTokenParams = FunctionArguments<typeof functions.getPricePerToken>
export type GetPricePerTokenReturn = FunctionReturn<typeof functions.getPricePerToken>

export type GetRoleAdminParams = FunctionArguments<typeof functions.getRoleAdmin>
export type GetRoleAdminReturn = FunctionReturn<typeof functions.getRoleAdmin>

export type GetTermsAndConditionsParams = FunctionArguments<typeof functions.getTermsAndConditions>
export type GetTermsAndConditionsReturn = FunctionReturn<typeof functions.getTermsAndConditions>

export type GetTermsAndConditionsUrlParams = FunctionArguments<typeof functions.getTermsAndConditionsUrl>
export type GetTermsAndConditionsUrlReturn = FunctionReturn<typeof functions.getTermsAndConditionsUrl>

export type GetTotalSupplyValueParams = FunctionArguments<typeof functions.getTotalSupplyValue>
export type GetTotalSupplyValueReturn = FunctionReturn<typeof functions.getTotalSupplyValue>

export type GetVersionParams = FunctionArguments<typeof functions.getVersion>
export type GetVersionReturn = FunctionReturn<typeof functions.getVersion>

export type GrantRoleParams = FunctionArguments<typeof functions.grantRole>
export type GrantRoleReturn = FunctionReturn<typeof functions.grantRole>

export type HasRoleParams = FunctionArguments<typeof functions.hasRole>
export type HasRoleReturn = FunctionReturn<typeof functions.hasRole>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type MintParams = FunctionArguments<typeof functions.mint>
export type MintReturn = FunctionReturn<typeof functions.mint>

export type NameParams = FunctionArguments<typeof functions.name>
export type NameReturn = FunctionReturn<typeof functions.name>

export type NoncesParams = FunctionArguments<typeof functions.nonces>
export type NoncesReturn = FunctionReturn<typeof functions.nonces>

export type PauseParams = FunctionArguments<typeof functions.pause>
export type PauseReturn = FunctionReturn<typeof functions.pause>

export type PausedParams = FunctionArguments<typeof functions.paused>
export type PausedReturn = FunctionReturn<typeof functions.paused>

export type PermitParams = FunctionArguments<typeof functions.permit>
export type PermitReturn = FunctionReturn<typeof functions.permit>

export type ProxiableUUIDParams = FunctionArguments<typeof functions.proxiableUUID>
export type ProxiableUUIDReturn = FunctionReturn<typeof functions.proxiableUUID>

export type RenounceRoleParams = FunctionArguments<typeof functions.renounceRole>
export type RenounceRoleReturn = FunctionReturn<typeof functions.renounceRole>

export type RevokeRoleParams = FunctionArguments<typeof functions.revokeRole>
export type RevokeRoleReturn = FunctionReturn<typeof functions.revokeRole>

export type SetTermsAndConditionsUrlParams = FunctionArguments<typeof functions.setTermsAndConditionsUrl>
export type SetTermsAndConditionsUrlReturn = FunctionReturn<typeof functions.setTermsAndConditionsUrl>

export type SignTermsAndConditionsParams = FunctionArguments<typeof functions.signTermsAndConditions>
export type SignTermsAndConditionsReturn = FunctionReturn<typeof functions.signTermsAndConditions>

export type SupportsInterfaceParams = FunctionArguments<typeof functions.supportsInterface>
export type SupportsInterfaceReturn = FunctionReturn<typeof functions.supportsInterface>

export type SymbolParams = FunctionArguments<typeof functions.symbol>
export type SymbolReturn = FunctionReturn<typeof functions.symbol>

export type TermsAndConditionsParams = FunctionArguments<typeof functions.termsAndConditions>
export type TermsAndConditionsReturn = FunctionReturn<typeof functions.termsAndConditions>

export type TermsAndConditionsUrlParams = FunctionArguments<typeof functions.termsAndConditionsUrl>
export type TermsAndConditionsUrlReturn = FunctionReturn<typeof functions.termsAndConditionsUrl>

export type TotalSupplyParams = FunctionArguments<typeof functions.totalSupply>
export type TotalSupplyReturn = FunctionReturn<typeof functions.totalSupply>

export type TotalSupplyValueParams = FunctionArguments<typeof functions.totalSupplyValue>
export type TotalSupplyValueReturn = FunctionReturn<typeof functions.totalSupplyValue>

export type TransferParams = FunctionArguments<typeof functions.transfer>
export type TransferReturn = FunctionReturn<typeof functions.transfer>

export type TransferFromParams = FunctionArguments<typeof functions.transferFrom>
export type TransferFromReturn = FunctionReturn<typeof functions.transferFrom>

export type UnpauseParams = FunctionArguments<typeof functions.unpause>
export type UnpauseReturn = FunctionReturn<typeof functions.unpause>

export type UpgradeToAndCallParams = FunctionArguments<typeof functions.upgradeToAndCall>
export type UpgradeToAndCallReturn = FunctionReturn<typeof functions.upgradeToAndCall>

