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

exports.ResponseCode = void 0;
(function (ResponseCode) {
    ResponseCode[ResponseCode["Success"] = 0] = "Success";
    ResponseCode[ResponseCode["Empty"] = 1] = "Empty";
    ResponseCode[ResponseCode["WrongLength"] = 2] = "WrongLength";
    ResponseCode[ResponseCode["WrongFormat"] = 3] = "WrongFormat";
    ResponseCode[ResponseCode["WrongSecure"] = 4] = "WrongSecure";
})(exports.ResponseCode || (exports.ResponseCode = {}));
class Validation {
    constructor(options) {
        this._options = options;
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
        i18next__default["default"]
            .init({
            lng: 'en',
            ...options,
            interpolation: { ...{ format }, ...customInterpolation },
            resources: defaultResources,
        })
            .then(instance => (this._locale = instance))
            /* istanbul ignore next: i18next do not throw reject */
            .catch(e => ((options === null || options === void 0 ? void 0 : options.debug) ? console.error(e) : null));
    }
    static _validateLength(val, len) {
        return !len.includes(val.length);
    }
    Bik(bik) {
        const response = { code: exports.ResponseCode.Success };
        if (this._validateEmpty(bik)) {
            response.code = exports.ResponseCode.Empty;
            response.message = this._translate('is_empty', 'Field is empty', { key: this._translate('bik', 'BIK') });
            return response;
        }
        else if (/[^0-9]/.test(bik)) {
            response.code = exports.ResponseCode.WrongFormat;
            response.message = this._translate('only_digits', 'Wrong format', { key: this._translate('bik', 'BIK') });
            return response;
        }
        else if (Validation._validateLength(bik, [9])) {
            this._fillLengthError([9], 'bik', 'BIK', response);
            return response;
        }
        return response;
    }
    Inn(inn) {
        const response = { code: exports.ResponseCode.Success };
        if (this._validateEmpty(inn)) {
            response.code = exports.ResponseCode.Empty;
            response.message = this._translate('is_empty', 'Field is empty', { key: this._translate('inn', 'INN') });
            return response;
        }
        else if (/[^0-9]/.test(inn)) {
            response.code = exports.ResponseCode.WrongFormat;
            response.message = this._translate('only_digits', 'Wrong format', { key: this._translate('inn', 'INN') });
            return response;
        }
        else if (Validation._validateLength(inn, [10, 12])) {
            this._fillLengthError([10, 12], 'inn', 'INN', response);
            return response;
        }
        const checkDigit = function (inn, coefficients, checkVal) {
            let n = 0;
            coefficients.forEach((_, i) => {
                n += coefficients[i] * parseInt(inn[i]);
            });
            return (n % 11) % 10 === parseInt(checkVal);
        };
        if (inn.length === 10 && checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8], inn[9])) {
            return response;
        }
        if (inn.length === 12 &&
            checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8], inn[10]) &&
            checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8], inn[11])) {
            return response;
        }
        response.code = exports.ResponseCode.WrongSecure;
        response.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('inn', 'INN') });
        return response;
    }
    Ogrn(ogrn) {
        const response = { code: exports.ResponseCode.Success };
        if (this._validateEmpty(ogrn)) {
            response.code = exports.ResponseCode.Empty;
            response.message = this._translate('is_empty', 'Field is empty', { key: this._translate('ogrn', 'OGRN') });
            return response;
        }
        else if (/[^0-9]/.test(ogrn)) {
            response.code = exports.ResponseCode.WrongFormat;
            response.message = this._translate('only_digits', 'Wrong format', { key: this._translate('ogrn', 'OGRN') });
            return response;
        }
        else if (Validation._validateLength(ogrn, [13])) {
            this._fillLengthError([13], 'ogrn', 'OGRN', response);
            return response;
        }
        const n13 = parseInt((parseInt(ogrn.slice(0, -1)) % 11).toString().slice(-1));
        if (n13 !== parseInt(ogrn[12])) {
            response.code = exports.ResponseCode.WrongSecure;
            response.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('ogrn', 'OGRN') });
            return response;
        }
        return response;
    }
    Ogrnip(ogrnip) {
        const response = { code: exports.ResponseCode.Success };
        if (this._validateEmpty(ogrnip)) {
            response.code = exports.ResponseCode.Empty;
            response.message = this._translate('is_empty', 'Field is empty', { key: this._translate('ogrnip', 'OGRNIP') });
            return response;
        }
        else if (/[^0-9]/.test(ogrnip)) {
            response.code = exports.ResponseCode.WrongFormat;
            response.message = this._translate('only_digits', 'Wrong format', { key: this._translate('ogrnip', 'OGRNIP') });
            return response;
        }
        else if (Validation._validateLength(ogrnip, [15])) {
            this._fillLengthError([15], 'ogrnip', 'OGRNIP', response);
            return response;
        }
        const n15 = parseInt((parseInt(ogrnip.slice(0, -1)) % 13).toString().slice(-1));
        if (n15 !== parseInt(ogrnip[14])) {
            response.code = exports.ResponseCode.WrongSecure;
            response.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('ogrnip', 'OGRNIP') });
            return response;
        }
        return response;
    }
    Kpp(kpp) {
        const response = { code: exports.ResponseCode.Success };
        if (this._validateEmpty(kpp)) {
            response.code = exports.ResponseCode.Empty;
            response.message = this._translate('is_empty', 'Field is empty', { key: this._translate('kpp', 'KPP') });
            return response;
        }
        else if (Validation._validateLength(kpp, [9])) {
            this._fillLengthError([9], 'kpp', 'KPP', response);
            return response;
        }
        else if (!/^[0-9]{4}[0-9A-Z]{2}[0-9]{3}$/.test(kpp)) {
            response.code = exports.ResponseCode.WrongFormat;
            response.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('kpp', 'KPP') });
            return response;
        }
        return response;
    }
    Ks(ca, bik) {
        return this._checkAccount(ca, bik, 'ca', 'C/A');
    }
    Rs(rs, bik) {
        return this._checkAccount(rs, bik, 'rs', 'C/A');
    }
    Snils(snils) {
        const response = { code: exports.ResponseCode.Success };
        if (this._validateEmpty(snils)) {
            response.code = exports.ResponseCode.Empty;
            response.message = this._translate('is_empty', 'Field is empty', { key: this._translate('snils', 'SNILS') });
            return response;
        }
        else if (/[^0-9]/.test(snils)) {
            response.code = exports.ResponseCode.WrongFormat;
            response.message = this._translate('only_digits', 'Wrong format', { key: this._translate('snils', 'SNILS') });
            return response;
        }
        else if (Validation._validateLength(snils, [11])) {
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
        }
        else if (sum > 101) {
            checkDigit = sum % 101;
            if (checkDigit === 100) {
                checkDigit = 0;
            }
        }
        if (checkDigit !== parseInt(snils.slice(-2))) {
            response.code = exports.ResponseCode.WrongSecure;
            response.message = this._translate('wrong_format', 'Wrong format', { key: this._translate('snils', 'SNILS') });
            return response;
        }
        return response;
    }
    _translate(key, defaultValue, options) {
        var _a;
        if (this._locale) {
            return this._locale(key, defaultValue, options);
        }
        else if ((_a = this._options) === null || _a === void 0 ? void 0 : _a.debug) {
            console.warn('i18next is not initialised');
        }
        return defaultValue;
    }
    _validateEmpty(val) {
        var _a;
        return !val.length || (!!((_a = this._options) === null || _a === void 0 ? void 0 : _a.strict) && parseInt(val) <= 0);
    }
    _checkAccount(account, bik, translateKey, translateDefaultKey) {
        const response = this.Bik(bik);
        if (response.code === exports.ResponseCode.Success) {
            if (!account.length) {
                response.code = exports.ResponseCode.Empty;
                response.message = this._translate('is_empty', 'Field is empty', { key: this._translate(translateKey, translateDefaultKey) });
                return response;
            }
            else if (/[^0-9]/.test(account)) {
                response.code = exports.ResponseCode.WrongFormat;
                response.message = this._translate('only_digits', 'Wrong format', { key: this._translate(translateKey, translateDefaultKey) });
                return response;
            }
            else if (Validation._validateLength(account, [20])) {
                this._fillLengthError([20], translateKey, 'C/A', response);
                return response;
            }
            else if (!this._validateBikChecksum(account, bik)) {
                response.code = exports.ResponseCode.WrongSecure;
                response.message = this._translate('wrong_format', 'Wrong format', { key: this._translate(translateKey, translateDefaultKey) });
                return response;
            }
        }
        return response;
    }
    _fillLengthError(len, fieldName, defaultFieldName, response) {
        response.code = exports.ResponseCode.WrongLength;
        response.message = this._translate('wrong_length', 'Wrong length', {
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

exports.Validation = Validation;
