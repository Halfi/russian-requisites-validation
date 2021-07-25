import { InitOptions } from 'i18next';
export interface IResponse {
    code: ResponseCode;
    message?: string;
}
export declare enum ResponseCode {
    Success = 0,
    Empty = 1,
    WrongLength = 2,
    WrongFormat = 3,
    WrongSecure = 4
}
export interface IProps {
    strict?: boolean;
    debug?: boolean;
}
export declare class Validation {
    private _locale?;
    private readonly _options?;
    constructor(options?: IProps & InitOptions);
    private static _validateLength;
    Bik(bik: string): IResponse;
    Inn(inn: string): IResponse;
    Ogrn(ogrn: string): IResponse;
    Ogrnip(ogrnip: string): IResponse;
    Kpp(kpp: string): IResponse;
    Ks(ca: string, bik: string): IResponse;
    Rs(rs: string, bik: string): IResponse;
    Snils(snils: string): IResponse;
    private _translate;
    private _validateEmpty;
    private _checkAccount;
    private _fillLengthError;
    private _concatDigitsLength;
    private _validateBikChecksum;
}
//# sourceMappingURL=index.d.ts.map