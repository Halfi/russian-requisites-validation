import { InitOptions } from 'i18next';
export interface IError {
    code: ErrorCode;
    message: string;
}
export declare enum ErrorCode {
    Success = 0,
    Empty = 1,
    WrongLength = 2,
    WrongFormat = 3,
    WrongSecure = 4
}
export interface IProps {
    strict?: boolean;
}
export declare class Validator {
    private _locale?;
    private readonly _options?;
    private constructor();
    static getInstance(options?: IProps & InitOptions): Promise<Validator>;
    private static _validateLength;
    Bik(bik: string, error: IError): boolean;
    Inn(inn: string, error: IError): boolean;
    Ogrn(ogrn: string, error: IError): boolean;
    Ogrnip(ogrnip: string, error: IError): boolean;
    Kpp(kpp: string, error: IError): boolean;
    Ks(ca: string, bik: string, error: IError): boolean;
    Rs(rs: string, bik: string, error: IError): boolean;
    Snils(snils: string, error: IError): boolean;
    private _translate;
    private _validateEmpty;
    private _checkAccount;
    private _fillLengthError;
    private _concatDigitsLength;
    private _validateBikChecksum;
}
//# sourceMappingURL=index.d.ts.map