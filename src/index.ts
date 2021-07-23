import i18next, { FormatFunction, InitOptions, Resource, StringMap, TFunction, TFunctionKeys, TOptions } from 'i18next';
import en from './locale/en.json';
import ru from './locale/ru.json';

export interface IError {
  code: ErrorCode;
  message: string;
}

export enum ErrorCode {
  Success,
  Empty,
  WrongLength,
  WrongFormat,
  WrongSecure,
}

export interface IProps {
  strict?: boolean;
}

export class Validator {
  private _locale?: TFunction;
  private readonly _options?: IProps;

  private constructor(options?: IProps) {
    this._options = options;
  }

  public static async getInstance(options?: IProps & InitOptions): Promise<Validator> {
    const instance = new Validator(options);

    const defaultResources: Resource = {
      en: en,
      ru: ru,
    };

    const { resources, interpolation: customInterpolation } = options || {};
    if (resources) {
      Object.keys(resources).forEach(key => (defaultResources[key] = resources[key]));
    }

    const format: FormatFunction = (value, format) => {
      if (format === 'uppercase') return value.toUpperCase();
      return value;
    };

    instance._locale = await i18next.init({
      lng: 'en',
      ...options,
      interpolation: { ...{ format }, ...customInterpolation },
      resources: defaultResources,
    });

    return instance;
  }

  private static _validateLength(val: string, len: number[]): boolean {
    return !len.includes(val.length);
  }

  Bik(bik: string, error: IError): boolean {
    if (this._validateEmpty(bik)) {
      error.code = ErrorCode.Empty;
      error.message = this._translate('is_empty', 'Field is empty', { key: this._translate('bik', 'BIK') });
      return false;
    } else if (/[^0-9]/.test(bik)) {
      error.code = ErrorCode.WrongFormat;
      error.message = this._translate('only_digits', 'Wrong format', { key: this._translate('bik', 'BIK') });
      return false;
    } else if (Validator._validateLength(bik, [9])) {
      this._fillLengthError([9], 'bik', 'BIK', error);
      return false;
    }

    return true;
  }

  Inn(inn: string, error: IError): boolean {
    if (this._validateEmpty(inn)) {
      error.code = ErrorCode.Empty;
      error.message = this._translate('is_empty', 'Field is empty', { key: this._translate('inn', 'INN') });
      return false;
    } else if (/[^0-9]/.test(inn)) {
      error.code = ErrorCode.WrongFormat;
      error.message = this._translate('only_digits', 'Wrong format', { key: this._translate('inn', 'INN') });
      return false;
    } else if (Validator._validateLength(inn, [10, 12])) {
      this._fillLengthError([10, 12], 'inn', 'INN', error);
      return false;
    }

    const checkDigit = function (inn: string, coefficients: number[], checkVal: string): boolean {
      let n = 0;
      coefficients.forEach((_, i) => {
        n += coefficients[i] * parseInt(inn[i]);
      });
      return (n % 11) % 10 === parseInt(checkVal);
    };

    if (inn.length === 10 && checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8], inn[9])) {
      return true;
    }

    if (
      inn.length === 12 &&
      checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8], inn[10]) &&
      checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8], inn[11])
    ) {
      return true;
    }

    error.code = ErrorCode.WrongSecure;
    error.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('inn', 'INN') });
    return false;
  }

  Ogrn(ogrn: string, error: IError): boolean {
    if (this._validateEmpty(ogrn)) {
      error.code = ErrorCode.Empty;
      error.message = this._translate('is_empty', 'Field is empty', { key: this._translate('ogrn', 'OGRN') });
      return false;
    } else if (/[^0-9]/.test(ogrn)) {
      error.code = ErrorCode.WrongFormat;
      error.message = this._translate('only_digits', 'Wrong format', { key: this._translate('ogrn', 'OGRN') });
      return false;
    } else if (Validator._validateLength(ogrn, [13])) {
      this._fillLengthError([13], 'ogrn', 'OGRN', error);
      return false;
    }

    const n13 = parseInt((parseInt(ogrn.slice(0, -1)) % 11).toString().slice(-1));
    if (n13 !== parseInt(ogrn[12])) {
      error.code = ErrorCode.WrongSecure;
      error.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('ogrn', 'OGRN') });
      return false;
    }

    return true;
  }

  Ogrnip(ogrnip: string, error: IError): boolean {
    if (this._validateEmpty(ogrnip)) {
      error.code = ErrorCode.Empty;
      error.message = this._translate('is_empty', 'Field is empty', { key: this._translate('ogrnip', 'OGRNIP') });
      return false;
    } else if (/[^0-9]/.test(ogrnip)) {
      error.code = ErrorCode.WrongFormat;
      error.message = this._translate('only_digits', 'Wrong format', { key: this._translate('ogrnip', 'OGRNIP') });
      return false;
    } else if (Validator._validateLength(ogrnip, [15])) {
      this._fillLengthError([15], 'ogrnip', 'OGRNIP', error);
      return false;
    }

    const n15 = parseInt((parseInt(ogrnip.slice(0, -1)) % 13).toString().slice(-1));
    if (n15 !== parseInt(ogrnip[14])) {
      error.code = ErrorCode.WrongSecure;
      error.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('ogrnip', 'OGRNIP') });
      return false;
    }

    return true;
  }

  Kpp(kpp: string, error: IError): boolean {
    if (this._validateEmpty(kpp)) {
      error.code = ErrorCode.Empty;
      error.message = this._translate('is_empty', 'Field is empty', { key: this._translate('kpp', 'KPP') });
      return false;
    } else if (Validator._validateLength(kpp, [9])) {
      this._fillLengthError([9], 'kpp', 'KPP', error);
      return false;
    } else if (!/^[0-9]{4}[0-9A-Z]{2}[0-9]{3}$/.test(kpp)) {
      error.code = ErrorCode.WrongFormat;
      error.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('kpp', 'KPP') });
      return false;
    }

    return true;
  }

  Ks(ca: string, bik: string, error: IError): boolean {
    return this._checkAccount(ca, bik, error, 'ca', 'C/A');
  }

  Rs(rs: string, bik: string, error: IError): boolean {
    return this._checkAccount(rs, bik, error, 'rs', 'C/A');
  }

  Snils(snils: string, error: IError): boolean {
    if (this._validateEmpty(snils)) {
      error.code = ErrorCode.Empty;
      error.message = this._translate('is_empty', 'Field is empty', { key: this._translate('snils', 'SNILS') });
      return false;
    } else if (/[^0-9]/.test(snils)) {
      error.code = ErrorCode.WrongFormat;
      error.message = this._translate('only_digits', 'Wrong format', { key: this._translate('snils', 'SNILS') });
      return false;
    } else if (Validator._validateLength(snils, [11])) {
      this._fillLengthError([11], 'snils', 'SNILS', error);
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(snils[i]) * (9 - i);
    }

    let checkDigit = 0;
    if (sum < 100) {
      checkDigit = sum;
    } else if (sum > 101) {
      checkDigit = sum % 101;
      if (checkDigit === 100) {
        checkDigit = 0;
      }
    }

    if (checkDigit !== parseInt(snils.slice(-2))) {
      error.code = ErrorCode.WrongSecure;
      error.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('snils', 'SNILS') });
      return false;
    }

    return true;
  }

  private _translate<TKeys extends TFunctionKeys = string, TInterpolationMap extends Record<string, unknown> = StringMap>(
    key: TKeys | TKeys[],
    defaultValue: string,
    options?: TOptions<TInterpolationMap> | string,
  ): string {
    if (this._locale) {
      return this._locale(key, defaultValue, options);
    }
    return defaultValue;
  }

  private _validateEmpty(val: string): boolean {
    return !val.length || (!!this._options?.strict && parseInt(val) <= 0);
  }

  private _checkAccount(account: string, bik: string, error: IError, translateKey: string, translateDefaultKey: string): boolean {
    if (this.Bik(bik, error)) {
      if (!account.length) {
        error.code = ErrorCode.Empty;
        error.message = this._translate('is_empty', 'Field is empty', { key: this._translate(translateKey, translateDefaultKey) });
        return false;
      } else if (/[^0-9]/.test(account)) {
        error.code = ErrorCode.WrongFormat;
        error.message = this._translate('only_digits', 'Wrong format', { key: this._translate(translateKey, translateDefaultKey) });
        return false;
      } else if (Validator._validateLength(account, [20])) {
        this._fillLengthError([20], translateKey, 'C/A', error);
        return false;
      } else if (!this._validateBikChecksum(account, bik)) {
        error.code = ErrorCode.WrongSecure;
        error.message = this._translate('wrong_format', 'Wrong format', { key: this._translate(translateKey, translateDefaultKey) });
        return false;
      }
    }

    return true;
  }

  private _fillLengthError(len: number[], fieldName: string, defaultFieldName: string, error: IError): void {
    error.code = ErrorCode.WrongLength;
    error.message = this._translate('wrong_length', 'Wrong length', {
      key: this._translate(fieldName, defaultFieldName),
      digits: this._concatDigitsLength(len),
    });
  }

  private _concatDigitsLength(len: number[]): string {
    if (len.length === 1) {
      return len[0].toString(10);
    }

    return len.join(` ${this._translate('or', 'or')} `);
  }

  private _validateBikChecksum(data: string, bik: string): boolean {
    const bikKs = '0' + bik.toString().slice(4, 6) + data;
    let checksum = 0;
    const coefficients = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
    coefficients.forEach((_, i) => {
      checksum += coefficients[i] * (parseInt(bikKs[i]) % 10);
    });
    return checksum % 10 === 0;
  }
}
