import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Initialized: event("0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2", "Initialized(uint64)", {"version": p.uint64}),
    RoleAdminChanged: event("0xbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff", "RoleAdminChanged(bytes32,bytes32,bytes32)", {"role": indexed(p.bytes32), "previousAdminRole": indexed(p.bytes32), "newAdminRole": indexed(p.bytes32)}),
    RoleGranted: event("0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d", "RoleGranted(bytes32,address,address)", {"role": indexed(p.bytes32), "account": indexed(p.address), "sender": indexed(p.address)}),
    RoleRevoked: event("0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b", "RoleRevoked(bytes32,address,address)", {"role": indexed(p.bytes32), "account": indexed(p.address), "sender": indexed(p.address)}),
    TokenCreated: event("0xd5f9bdf12adf29dab0248c349842c3822d53ae2bb4f36352f301630d018c8139", "TokenCreated(address,address)", {"tokenAddress": indexed(p.address), "owner": indexed(p.address)}),
    Upgraded: event("0xbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b", "Upgraded(address)", {"implementation": indexed(p.address)}),
}

export const functions = {
    DEFAULT_ADMIN_ROLE: viewFun("0xa217fddf", "DEFAULT_ADMIN_ROLE()", {}, p.bytes32),
    UPGRADE_INTERFACE_VERSION: viewFun("0xad3cb1cc", "UPGRADE_INTERFACE_VERSION()", {}, p.string),
    createToken: fun("0x2663fff0", "createToken(string,string,string,uint8,uint256,uint256,address,address)", {"name": p.string, "symbol": p.string, "imageUrl": p.string, "decimals": p.uint8, "initialSupply": p.uint256, "totalSupplyValue": p.uint256, "yieldCurrency": p.address, "defaultAdmin": p.address}, p.address),
    getInitialImplementation: viewFun("0x0c4c9c49", "getInitialImplementation()", {}, p.address),
    getRoleAdmin: viewFun("0x248a9ca3", "getRoleAdmin(bytes32)", {"role": p.bytes32}, p.bytes32),
    grantRole: fun("0x2f2ff15d", "grantRole(bytes32,address)", {"role": p.bytes32, "account": p.address}, ),
    hasRole: viewFun("0x91d14854", "hasRole(bytes32,address)", {"role": p.bytes32, "account": p.address}, p.bool),
    initalImplementation: viewFun("0x447af782", "initalImplementation()", {}, p.address),
    initialize: fun("0xc4d66de8", "initialize(address)", {"_initialImplementation": p.address}, ),
    isImplementationWhitelisted: viewFun("0x8876c2eb", "isImplementationWhitelisted(address)", {"implementation": p.address}, p.bool),
    proxiableUUID: viewFun("0x52d1902d", "proxiableUUID()", {}, p.bytes32),
    removeWhiteListedImplementation: fun("0x4f73c629", "removeWhiteListedImplementation(address)", {"implementation": p.address}, ),
    renounceRole: fun("0x36568abe", "renounceRole(bytes32,address)", {"role": p.bytes32, "callerConfirmation": p.address}, ),
    revokeRole: fun("0xd547741f", "revokeRole(bytes32,address)", {"role": p.bytes32, "account": p.address}, ),
    setImplementation: fun("0xd784d426", "setImplementation(address)", {"newImplementation": p.address}, ),
    supportsInterface: viewFun("0x01ffc9a7", "supportsInterface(bytes4)", {"interfaceId": p.bytes4}, p.bool),
    upgradeToAndCall: fun("0x4f1ef286", "upgradeToAndCall(address,bytes)", {"newImplementation": p.address, "data": p.bytes}, ),
    whitelistImplementation: fun("0x524291df", "whitelistImplementation(address)", {"newImplementation": p.address}, ),
}

export class Contract extends ContractBase {

    DEFAULT_ADMIN_ROLE() {
        return this.eth_call(functions.DEFAULT_ADMIN_ROLE, {})
    }

    UPGRADE_INTERFACE_VERSION() {
        return this.eth_call(functions.UPGRADE_INTERFACE_VERSION, {})
    }

    getInitialImplementation() {
        return this.eth_call(functions.getInitialImplementation, {})
    }

    getRoleAdmin(role: GetRoleAdminParams["role"]) {
        return this.eth_call(functions.getRoleAdmin, {role})
    }

    hasRole(role: HasRoleParams["role"], account: HasRoleParams["account"]) {
        return this.eth_call(functions.hasRole, {role, account})
    }

    initalImplementation() {
        return this.eth_call(functions.initalImplementation, {})
    }

    isImplementationWhitelisted(implementation: IsImplementationWhitelistedParams["implementation"]) {
        return this.eth_call(functions.isImplementationWhitelisted, {implementation})
    }

    proxiableUUID() {
        return this.eth_call(functions.proxiableUUID, {})
    }

    supportsInterface(interfaceId: SupportsInterfaceParams["interfaceId"]) {
        return this.eth_call(functions.supportsInterface, {interfaceId})
    }
}

/// Event types
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type RoleAdminChangedEventArgs = EParams<typeof events.RoleAdminChanged>
export type RoleGrantedEventArgs = EParams<typeof events.RoleGranted>
export type RoleRevokedEventArgs = EParams<typeof events.RoleRevoked>
export type TokenCreatedEventArgs = EParams<typeof events.TokenCreated>
export type UpgradedEventArgs = EParams<typeof events.Upgraded>

/// Function types
export type DEFAULT_ADMIN_ROLEParams = FunctionArguments<typeof functions.DEFAULT_ADMIN_ROLE>
export type DEFAULT_ADMIN_ROLEReturn = FunctionReturn<typeof functions.DEFAULT_ADMIN_ROLE>

export type UPGRADE_INTERFACE_VERSIONParams = FunctionArguments<typeof functions.UPGRADE_INTERFACE_VERSION>
export type UPGRADE_INTERFACE_VERSIONReturn = FunctionReturn<typeof functions.UPGRADE_INTERFACE_VERSION>

export type CreateTokenParams = FunctionArguments<typeof functions.createToken>
export type CreateTokenReturn = FunctionReturn<typeof functions.createToken>

export type GetInitialImplementationParams = FunctionArguments<typeof functions.getInitialImplementation>
export type GetInitialImplementationReturn = FunctionReturn<typeof functions.getInitialImplementation>

export type GetRoleAdminParams = FunctionArguments<typeof functions.getRoleAdmin>
export type GetRoleAdminReturn = FunctionReturn<typeof functions.getRoleAdmin>

export type GrantRoleParams = FunctionArguments<typeof functions.grantRole>
export type GrantRoleReturn = FunctionReturn<typeof functions.grantRole>

export type HasRoleParams = FunctionArguments<typeof functions.hasRole>
export type HasRoleReturn = FunctionReturn<typeof functions.hasRole>

export type InitalImplementationParams = FunctionArguments<typeof functions.initalImplementation>
export type InitalImplementationReturn = FunctionReturn<typeof functions.initalImplementation>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type IsImplementationWhitelistedParams = FunctionArguments<typeof functions.isImplementationWhitelisted>
export type IsImplementationWhitelistedReturn = FunctionReturn<typeof functions.isImplementationWhitelisted>

export type ProxiableUUIDParams = FunctionArguments<typeof functions.proxiableUUID>
export type ProxiableUUIDReturn = FunctionReturn<typeof functions.proxiableUUID>

export type RemoveWhiteListedImplementationParams = FunctionArguments<typeof functions.removeWhiteListedImplementation>
export type RemoveWhiteListedImplementationReturn = FunctionReturn<typeof functions.removeWhiteListedImplementation>

export type RenounceRoleParams = FunctionArguments<typeof functions.renounceRole>
export type RenounceRoleReturn = FunctionReturn<typeof functions.renounceRole>

export type RevokeRoleParams = FunctionArguments<typeof functions.revokeRole>
export type RevokeRoleReturn = FunctionReturn<typeof functions.revokeRole>

export type SetImplementationParams = FunctionArguments<typeof functions.setImplementation>
export type SetImplementationReturn = FunctionReturn<typeof functions.setImplementation>

export type SupportsInterfaceParams = FunctionArguments<typeof functions.supportsInterface>
export type SupportsInterfaceReturn = FunctionReturn<typeof functions.supportsInterface>

export type UpgradeToAndCallParams = FunctionArguments<typeof functions.upgradeToAndCall>
export type UpgradeToAndCallReturn = FunctionReturn<typeof functions.upgradeToAndCall>

export type WhitelistImplementationParams = FunctionArguments<typeof functions.whitelistImplementation>
export type WhitelistImplementationReturn = FunctionReturn<typeof functions.whitelistImplementation>

