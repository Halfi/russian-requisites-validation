import i18next, { FormatFunction, InitOptions, Resource, StringMap, TFunction, TFunctionKeys, TOptions } from 'i18next';
import en from './locale/en.json';
import ru from './locale/ru.json';

export interface IResponse {
  code: ResponseCode;
  message?: string;
}

export enum ResponseCode {
  Success,
  Empty,
  WrongLength,
  WrongFormat,
  WrongSecure,
}

export interface IProps {
  strict?: boolean;
  debug?: boolean;
}

export class Validation {
  private _locale?: TFunction;
  private readonly _options?: IProps;

  constructor(options?: IProps & InitOptions) {
    this._options = options;

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

    i18next
      .init({
        lng: 'en',
        ...options,
        interpolation: { ...{ format }, ...customInterpolation },
        resources: defaultResources,
      })
      .then(instance => (this._locale = instance))
      .catch(/* istanbul ignore next: i18next do not throw reject */ e => (options?.debug ? console.error(e) : null));
  }

  private static _validateLength(val: string, len: number[]): boolean {
    return !len.includes(val.length);
  }

  Bik(bik: string): IResponse {
    const response: IResponse = { code: ResponseCode.Success };
    if (this._validateEmpty(bik)) {
      response.code = ResponseCode.Empty;
      response.message = this._translate('is_empty', 'Field is empty', { key: this._translate('bik', 'BIK') });
      return response;
    } else if (/[^0-9]/.test(bik)) {
      response.code = ResponseCode.WrongFormat;
      response.message = this._translate('only_digits', 'Wrong format', { key: this._translate('bik', 'BIK') });
      return response;
    } else if (Validation._validateLength(bik, [9])) {
      this._fillLengthError([9], 'bik', 'BIK', response);
      return response;
    }

    return response;
  }

  Inn(inn: string): IResponse {
    const response: IResponse = { code: ResponseCode.Success };
    if (this._validateEmpty(inn)) {
      response.code = ResponseCode.Empty;
      response.message = this._translate('is_empty', 'Field is empty', { key: this._translate('inn', 'INN') });
      return response;
    } else if (/[^0-9]/.test(inn)) {
      response.code = ResponseCode.WrongFormat;
      response.message = this._translate('only_digits', 'Wrong format', { key: this._translate('inn', 'INN') });
      return response;
    } else if (Validation._validateLength(inn, [10, 12])) {
      this._fillLengthError([10, 12], 'inn', 'INN', response);
      return response;
    }

    const checkDigit = function (inn: string, coefficients: number[], checkVal: string): boolean {
      let n = 0;
      coefficients.forEach((_, i) => {
        n += coefficients[i] * parseInt(inn[i]);
      });
      return (n % 11) % 10 === parseInt(checkVal);
    };

    if (inn.length === 10 && checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8], inn[9])) {
      return response;
    }

    if (
      inn.length === 12 &&
      checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8], inn[10]) &&
      checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8], inn[11])
    ) {
      return response;
    }

    response.code = ResponseCode.WrongSecure;
    response.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('inn', 'INN') });
    return response;
  }

  Ogrn(ogrn: string): IResponse {
    const response: IResponse = { code: ResponseCode.Success };
    if (this._validateEmpty(ogrn)) {
      response.code = ResponseCode.Empty;
      response.message = this._translate('is_empty', 'Field is empty', { key: this._translate('ogrn', 'OGRN') });
      return response;
    } else if (/[^0-9]/.test(ogrn)) {
      response.code = ResponseCode.WrongFormat;
      response.message = this._translate('only_digits', 'Wrong format', { key: this._translate('ogrn', 'OGRN') });
      return response;
    } else if (Validation._validateLength(ogrn, [13])) {
      this._fillLengthError([13], 'ogrn', 'OGRN', response);
      return response;
    }

    const n13 = parseInt((parseInt(ogrn.slice(0, -1)) % 11).toString().slice(-1));
    if (n13 !== parseInt(ogrn[12])) {
      response.code = ResponseCode.WrongSecure;
      response.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('ogrn', 'OGRN') });
      return response;
    }

    return response;
  }

  Ogrnip(ogrnip: string): IResponse {
    const response: IResponse = { code: ResponseCode.Success };
    if (this._validateEmpty(ogrnip)) {
      response.code = ResponseCode.Empty;
      response.message = this._translate('is_empty', 'Field is empty', { key: this._translate('ogrnip', 'OGRNIP') });
      return response;
    } else if (/[^0-9]/.test(ogrnip)) {
      response.code = ResponseCode.WrongFormat;
      response.message = this._translate('only_digits', 'Wrong format', { key: this._translate('ogrnip', 'OGRNIP') });
      return response;
    } else if (Validation._validateLength(ogrnip, [15])) {
      this._fillLengthError([15], 'ogrnip', 'OGRNIP', response);
      return response;
    }

    const n15 = parseInt((parseInt(ogrnip.slice(0, -1)) % 13).toString().slice(-1));
    if (n15 !== parseInt(ogrnip[14])) {
      response.code = ResponseCode.WrongSecure;
      response.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('ogrnip', 'OGRNIP') });
      return response;
    }

    return response;
  }

  Kpp(kpp: string): IResponse {
    const response: IResponse = { code: ResponseCode.Success };
    if (this._validateEmpty(kpp)) {
      response.code = ResponseCode.Empty;
      response.message = this._translate('is_empty', 'Field is empty', { key: this._translate('kpp', 'KPP') });
      return response;
    } else if (Validation._validateLength(kpp, [9])) {
      this._fillLengthError([9], 'kpp', 'KPP', response);
      return response;
    } else if (!/^[0-9]{4}[0-9A-Z]{2}[0-9]{3}$/.test(kpp)) {
      response.code = ResponseCode.WrongFormat;
      response.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('kpp', 'KPP') });
      return response;
    }

    return response;
  }

  Ks(ca: string, bik: string): IResponse {
    return this._checkAccount(ca, bik, 'ca', 'C/A');
  }

  Rs(rs: string, bik: string): IResponse {
    return this._checkAccount(rs, bik, 'rs', 'C/A');
  }

  Snils(snils: string): IResponse {
    const response: IResponse = { code: ResponseCode.Success };
    if (this._validateEmpty(snils)) {
      response.code = ResponseCode.Empty;
      response.message = this._translate('is_empty', 'Field is empty', { key: this._translate('snils', 'SNILS') });
      return response;
    } else if (/[^0-9]/.test(snils)) {
      response.code = ResponseCode.WrongFormat;
      response.message = this._translate('only_digits', 'Wrong format', { key: this._translate('snils', 'SNILS') });
      return response;
    } else if (Validation._validateLength(snils, [11])) {
      this._fillLengthError([11], 'snils', 'SNILS', response);
      return response;
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
      response.code = ResponseCode.WrongSecure;
      response.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('snils', 'SNILS') });
      return response;
    }

    return response;
  }

  private _translate<TKeys extends TFunctionKeys = string, TInterpolationMap extends Record<string, unknown> = StringMap>(
    key: TKeys | TKeys[],
    defaultValue: string,
    options?: TOptions<TInterpolationMap> | string,
  ): string {
    if (this._locale) {
      return this._locale(key, defaultValue, options);
    } else if (this._options?.debug) {
      console.warn('i18next is not initialised');
    }

    return defaultValue;
  }

  private _validateEmpty(val: string): boolean {
    return !val.length || (!!this._options?.strict && parseInt(val) <= 0);
  }

  private _checkAccount(account: string, bik: string, translateKey: string, translateDefaultKey: string): IResponse {
    const response = this.Bik(bik);
    if (response.code === ResponseCode.Success) {
      if (!account.length) {
        response.code = ResponseCode.Empty;
        response.message = this._translate('is_empty', 'Field is empty', { key: this._translate(translateKey, translateDefaultKey) });
        return response;
      } else if (/[^0-9]/.test(account)) {
        response.code = ResponseCode.WrongFormat;
        response.message = this._translate('only_digits', 'Wrong format', { key: this._translate(translateKey, translateDefaultKey) });
        return response;
      } else if (Validation._validateLength(account, [20])) {
        this._fillLengthError([20], translateKey, 'C/A', response);
        return response;
      } else if (!this._validateBikChecksum(account, bik)) {
        response.code = ResponseCode.WrongSecure;
        response.message = this._translate('wrong_format', 'Wrong format', { key: this._translate(translateKey, translateDefaultKey) });
        return response;
      }
    }

    return response;
  }

  private _fillLengthError(len: number[], fieldName: string, defaultFieldName: string, response: IResponse): void {
    response.code = ResponseCode.WrongLength;
    response.message = this._translate('wrong_length', 'Wrong length', {
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
