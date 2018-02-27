declare module 'web3_beta';
declare module 'chai-bignumber';
declare module 'dirty-chai';
declare module 'request-promise-native';
declare module 'web3-provider-engine';
declare module 'web3-provider-engine/subproviders/rpc';

// HACK: In order to merge the bignumber declaration added by chai-bignumber to the chai Assertion
// interface we must use `namespace` as the Chai definitelyTyped definition does. Since we otherwise
// disallow `namespace`, we disable tslint for the following.
/* tslint:disable */
declare namespace Chai {
    interface Assertion {
        bignumber: Assertion;
        // HACK: In order to comply with chai-as-promised we make eventually a `PromisedAssertion` not an `Assertion`
        eventually: PromisedAssertion;
    }
}
/* tslint:enable */

declare module '*.json' {
    const json: any;
    /* tslint:disable */
    export default json;
    /* tslint:enable */
}

declare module 'ethereumjs-abi' {
    const soliditySHA3: (argTypes: string[], args: any[]) => Buffer;
}

// truffle-hdwallet-provider declarations
declare module 'truffle-hdwallet-provider' {
    import * as Web3 from 'web3';
    class HDWalletProvider implements Web3.Provider {
        constructor(mnemonic: string, rpcUrl: string);
        public sendAsync(
            payload: Web3.JSONRPCRequestPayload,
            callback: (err: Error, result: Web3.JSONRPCResponsePayload) => void,
        ): void;
    }
    export = HDWalletProvider;
}

declare module 'ethers-contracts' {
    export interface TransactionDescription {
        name: string;
        signature: string;
        sighash: string;
        data: string;
    }
    export interface CallDescription extends TransactionDescription {
        parse: (...args: any[]) => any;
    }
    export interface FunctionDescription {
        (...params: any[]): TransactionDescription | CallDescription;
        inputs: { names: string[]; types: string[] };
        outputs: { names: string[]; types: string[] };
    }
    export interface EventDescription {
        inputs: { names: string[]; types: string[] };
        signature: string;
        topic: string;
    }
    // tslint:disable-next-line:max-classes-per-file
    export class Interface {
        public functions: { [functionName: string]: FunctionDescription };
        public events: { [eventName: string]: EventDescription };
        public static decodeParams(types: string[], data: string): any[];
        constructor(abi: any);
    }
}
