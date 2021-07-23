'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var i18next = require('i18next');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var i18next__default = /*#__PURE__*/_interopDefaultLegacy(i18next);

var translation$1 = {
	is_empty: "{{key, uppercase}} is empty",
	only_digits: "{{key, uppercase}} can contain only digits",
	only_digits_and_letters: "{{key, uppercase}} can contain only {{digits}} symbols (digits and uppercase letters from A to Z)",
	wrong_length: "{{key, uppercase}} can contain only {{digits}} symbols",
	wrong_format: "{{key, uppercase}} has wrong format",
	bik: "bik",
	inn: "inn",
	ogrn: "ogrn",
	ogrnip: "ogrnip",
	kpp: "kpp",
	ca: "c/a",
	rs: "c/a",
	snils: "snils",
	or: "or"
};
var en = {
	translation: translation$1
};

var translation = {
	is_empty: "{{key, uppercase}} пустой",
	only_digits: "{{key, uppercase}} может состоять только из цифр",
	only_digits_and_letters: "{{key, uppercase}} может состоять из {{digits}} символов (цифр или заглавных букв латинского алфавита от A до Z)",
	wrong_length: "{{key, uppercase}} может состоять только из {{digits}} символов",
	wrong_format: "{{key, uppercase}} имеет неправильный формат",
	bik: "бик",
	inn: "инн",
	ogrn: "огрн",
	ogrnip: "огрнип",
	kpp: "кпп",
	ca: "к/с",
	rs: "р/с",
	snils: "снилс",
	or: "или"
};
var ru = {
	translation: translation
};

exports.ErrorCode = void 0;
(function (ErrorCode) {
    ErrorCode[ErrorCode["Success"] = 0] = "Success";
    ErrorCode[ErrorCode["Empty"] = 1] = "Empty";
    ErrorCode[ErrorCode["WrongLength"] = 2] = "WrongLength";
    ErrorCode[ErrorCode["WrongFormat"] = 3] = "WrongFormat";
    ErrorCode[ErrorCode["WrongSecure"] = 4] = "WrongSecure";
})(exports.ErrorCode || (exports.ErrorCode = {}));
class Validator {
    constructor(options) {
        this._options = options;
    }
    static async getInstance(options) {
        const instance = new Validator(options);
        const defaultResources = {
            en: en,
            ru: ru,
        };
        const { resources, interpolation: customInterpolation } = options || {};
        if (resources) {
            Object.keys(resources).forEach(key => (defaultResources[key] = resources[key]));
        }
        const format = (value, format) => {
            if (format === 'uppercase')
                return value.toUpperCase();
            return value;
        };
        instance._locale = await i18next__default['default'].init({
            lng: 'en',
            ...options,
            interpolation: { ...{ format }, ...customInterpolation },
            resources: defaultResources,
        });
        return instance;
    }
    static _validateLength(val, len) {
        return !len.includes(val.length);
    }
    Bik(bik, error) {
        if (this._validateEmpty(bik)) {
            error.code = exports.ErrorCode.Empty;
            error.message = this._translate('is_empty', 'Field is empty', { key: this._translate('bik', 'BIK') });
            return false;
        }
        else if (/[^0-9]/.test(bik)) {
            error.code = exports.ErrorCode.WrongFormat;
            error.message = this._translate('only_digits', 'Wrong format', { key: this._translate('bik', 'BIK') });
            return false;
        }
        else if (Validator._validateLength(bik, [9])) {
            this._fillLengthError([9], 'bik', 'BIK', error);
            return false;
        }
        return true;
    }
    Inn(inn, error) {
        if (this._validateEmpty(inn)) {
            error.code = exports.ErrorCode.Empty;
            error.message = this._translate('is_empty', 'Field is empty', { key: this._translate('inn', 'INN') });
            return false;
        }
        else if (/[^0-9]/.test(inn)) {
            error.code = exports.ErrorCode.WrongFormat;
            error.message = this._translate('only_digits', 'Wrong format', { key: this._translate('inn', 'INN') });
            return false;
        }
        else if (Validator._validateLength(inn, [10, 12])) {
            this._fillLengthError([10, 12], 'inn', 'INN', error);
            return false;
        }
        const checkDigit = function (inn, coefficients, checkVal) {
            let n = 0;
            coefficients.forEach((_, i) => {
                n += coefficients[i] * parseInt(inn[i]);
            });
            return (n % 11) % 10 === parseInt(checkVal);
        };
        if (inn.length === 10 && checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8], inn[9])) {
            return true;
        }
        if (inn.length === 12 &&
            checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8], inn[10]) &&
            checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8], inn[11])) {
            return true;
        }
        error.code = exports.ErrorCode.WrongSecure;
        error.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('inn', 'INN') });
        return false;
    }
    Ogrn(ogrn, error) {
        if (this._validateEmpty(ogrn)) {
            error.code = exports.ErrorCode.Empty;
            error.message = this._translate('is_empty', 'Field is empty', { key: this._translate('ogrn', 'OGRN') });
            return false;
        }
        else if (/[^0-9]/.test(ogrn)) {
            error.code = exports.ErrorCode.WrongFormat;
            error.message = this._translate('only_digits', 'Wrong format', { key: this._translate('ogrn', 'OGRN') });
            return false;
        }
        else if (Validator._validateLength(ogrn, [13])) {
            this._fillLengthError([13], 'ogrn', 'OGRN', error);
            return false;
        }
        const n13 = parseInt((parseInt(ogrn.slice(0, -1)) % 11).toString().slice(-1));
        if (n13 !== parseInt(ogrn[12])) {
            error.code = exports.ErrorCode.WrongSecure;
            error.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('ogrn', 'OGRN') });
            return false;
        }
        return true;
    }
    Ogrnip(ogrnip, error) {
        if (this._validateEmpty(ogrnip)) {
            error.code = exports.ErrorCode.Empty;
            error.message = this._translate('is_empty', 'Field is empty', { key: this._translate('ogrnip', 'OGRNIP') });
            return false;
        }
        else if (/[^0-9]/.test(ogrnip)) {
            error.code = exports.ErrorCode.WrongFormat;
            error.message = this._translate('only_digits', 'Wrong format', { key: this._translate('ogrnip', 'OGRNIP') });
            return false;
        }
        else if (Validator._validateLength(ogrnip, [15])) {
            this._fillLengthError([15], 'ogrnip', 'OGRNIP', error);
            return false;
        }
        const n15 = parseInt((parseInt(ogrnip.slice(0, -1)) % 13).toString().slice(-1));
        if (n15 !== parseInt(ogrnip[14])) {
            error.code = exports.ErrorCode.WrongSecure;
            error.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('ogrnip', 'OGRNIP') });
            return false;
        }
        return true;
    }
    Kpp(kpp, error) {
        if (this._validateEmpty(kpp)) {
            error.code = exports.ErrorCode.Empty;
            error.message = this._translate('is_empty', 'Field is empty', { key: this._translate('kpp', 'KPP') });
            return false;
        }
        else if (Validator._validateLength(kpp, [9])) {
            this._fillLengthError([9], 'kpp', 'KPP', error);
            return false;
        }
        else if (!/^[0-9]{4}[0-9A-Z]{2}[0-9]{3}$/.test(kpp)) {
            error.code = exports.ErrorCode.WrongFormat;
            error.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('kpp', 'KPP') });
            return false;
        }
        return true;
    }
    Ks(ca, bik, error) {
        return this._checkAccount(ca, bik, error, 'ca', 'C/A');
    }
    Rs(rs, bik, error) {
        return this._checkAccount(rs, bik, error, 'rs', 'C/A');
    }
    Snils(snils, error) {
        if (this._validateEmpty(snils)) {
            error.code = exports.ErrorCode.Empty;
            error.message = this._translate('is_empty', 'Field is empty', { key: this._translate('snils', 'SNILS') });
            return false;
        }
        else if (/[^0-9]/.test(snils)) {
            error.code = exports.ErrorCode.WrongFormat;
            error.message = this._translate('only_digits', 'Wrong format', { key: this._translate('snils', 'SNILS') });
            return false;
        }
        else if (Validator._validateLength(snils, [11])) {
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
        }
        else if (sum > 101) {
            checkDigit = sum % 101;
            if (checkDigit === 100) {
                checkDigit = 0;
            }
        }
        if (checkDigit !== parseInt(snils.slice(-2))) {
            error.code = exports.ErrorCode.WrongSecure;
            error.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('snils', 'SNILS') });
            return false;
        }
        return true;
    }
    _translate(key, defaultValue, options) {
        if (this._locale) {
            return this._locale(key, defaultValue, options);
        }
        return defaultValue;
    }
    _validateEmpty(val) {
        return !val.length || (!!this._options?.strict && parseInt(val) <= 0);
    }
    _checkAccount(account, bik, error, translateKey, translateDefaultKey) {
        if (this.Bik(bik, error)) {
            if (!account.length) {
                error.code = exports.ErrorCode.Empty;
                error.message = this._translate('is_empty', 'Field is empty', { key: this._translate(translateKey, translateDefaultKey) });
                return false;
            }
            else if (/[^0-9]/.test(account)) {
                error.code = exports.ErrorCode.WrongFormat;
                error.message = this._translate('only_digits', 'Wrong format', { key: this._translate(translateKey, translateDefaultKey) });
                return false;
            }
            else if (Validator._validateLength(account, [20])) {
                this._fillLengthError([20], translateKey, 'C/A', error);
                return false;
            }
            else if (!this._validateBikChecksum(account, bik)) {
                error.code = exports.ErrorCode.WrongSecure;
                error.message = this._translate('wrong_format', 'Wrong format', { key: this._translate(translateKey, translateDefaultKey) });
                return false;
            }
        }
        return true;
    }
    _fillLengthError(len, fieldName, defaultFieldName, error) {
        error.code = exports.ErrorCode.WrongLength;
        error.message = this._translate('wrong_length', 'Wrong length', {
            key: this._translate(fieldName, defaultFieldName),
            digits: this._concatDigitsLength(len),
        });
    }
    _concatDigitsLength(len) {
        if (len.length === 1) {
            return len[0].toString(10);
        }
        return len.join(` ${this._translate('or', 'or')} `);
    }
    _validateBikChecksum(data, bik) {
        const bikKs = '0' + bik.toString().slice(4, 6) + data;
        let checksum = 0;
        const coefficients = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
        coefficients.forEach((_, i) => {
            checksum += coefficients[i] * (parseInt(bikKs[i]) % 10);
        });
        return checksum % 10 === 0;
    }
}

exports.Validator = Validator;
