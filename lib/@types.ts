export interface WasmFunctions {
    _n_factor: (p: number, q: number) => number;
    _publicKey_totient: (p: number, q: number) => number;
    _publicKey_e: (totient: number, initialExponent: number) => number;
    _privateKey_d: (totient: number, exponent: number) => number;
    _mdc: (a: number, b: number) => number;
    _cryptosia_encrypt: (message: number, e: number, n: number) => number;
    _cryptosia_decrypt: (message: number, d: number, n: number) => number;
}

export interface WasmMethods {
    cwrap: (name: string, returnType: string, argTypes: string[]) => any;
    ccall: (
        name: string,
        returnType: string,
        argTypes: string[],
        args: any[]
    ) => any;
    stringToNewUTF8: (str: string) => number;
    UTF8ToString: (pointer: number) => string;
    AsciiToString: (pointer: number) => string;
    getValue: (pointer: number, type: string) => any;
    _free: (pointer: number) => void;
}
