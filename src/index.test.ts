import { ErrorCode, IError, Validator } from './index';
import { Resource } from 'i18next';

interface ICase {
  name: string;
  data: string;
  success: boolean;
  errorCode: ErrorCode;
  errorText: string;
  lng?: string;
  resources?: Resource | undefined;
}

interface IBankCase extends ICase {
  bik: string;
}

describe('test bik', () => {
  [
    {
      name: 'empty',
      data: '',
      success: false,
      errorCode: ErrorCode.Empty,
      errorText: 'BIK is empty',
    },
    {
      name: 'fail numbers',
      data: '012345n67',
      success: false,
      errorCode: ErrorCode.WrongFormat,
      errorText: 'BIK can contain only digits',
    },
    {
      name: 'fail length',
      data: '01234567',
      success: false,
      errorCode: ErrorCode.WrongLength,
      errorText: 'BIK can contain only 9 symbols',
    },
    { name: 'success', data: '000000000', success: true, errorCode: ErrorCode.Success, errorText: '' },
  ].forEach(({ name, data, success, errorCode, errorText }: ICase) => {
    it(name, async function () {
      const error: IError = { code: ErrorCode.Success, message: '' };
      const validator = await Validator.getInstance();
      const result = validator.Bik(data, error);
      expect(result).toEqual(success);
      expect(error.code).toEqual(errorCode);
      expect(error.message).toEqual(errorText);
    });
  });
});

describe('test kpp', () => {
  [
    {
      name: 'empty',
      data: '',
      success: false,
      errorCode: ErrorCode.Empty,
      errorText: 'KPP is empty',
    },
    {
      name: 'fail numbers',
      data: '01234567',
      success: false,
      errorCode: ErrorCode.WrongLength,
      errorText: 'KPP can contain only 9 symbols',
    },
    {
      name: 'fail length',
      data: '01234567v',
      success: false,
      errorCode: ErrorCode.WrongFormat,
      errorText: 'KPP has wrong format',
    },
    {
      name: 'fail length',
      data: '0000aZ000',
      success: false,
      errorCode: ErrorCode.WrongFormat,
      errorText: 'KPP has wrong format',
    },
    { name: 'success', data: '000000000', success: true, errorCode: ErrorCode.Success, errorText: '' },
    { name: 'success', data: '012345678', success: true, errorCode: ErrorCode.Success, errorText: '' },
    { name: 'success', data: '0000AZ000', success: true, errorCode: ErrorCode.Success, errorText: '' },
  ].forEach(({ name, data, success, errorCode, errorText }: ICase) => {
    it(name, async function () {
      const error: IError = { code: ErrorCode.Success, message: '' };
      const validator = await Validator.getInstance();
      const result = validator.Kpp(data, error);
      expect(result).toEqual(success);
      expect(error.code).toEqual(errorCode);
      expect(error.message).toEqual(errorText);
    });
  });
});

describe('test inn', () => {
  [
    {
      name: 'empty',
      data: '',
      success: false,
      errorCode: ErrorCode.Empty,
      errorText: 'INN is empty',
    },
    {
      name: 'fail numbers',
      data: '012345n67',
      success: false,
      errorCode: ErrorCode.WrongFormat,
      errorText: 'INN can contain only digits',
    },
    {
      name: 'fail length',
      data: '01234567',
      success: false,
      errorCode: ErrorCode.WrongLength,
      errorText: 'INN can contain only 10 or 12 symbols',
    },
    { name: 'success 10 zero', data: '0000000000', success: true, errorCode: ErrorCode.Success, errorText: '' },
    { name: 'success 12 zero', data: '000000000000', success: true, errorCode: ErrorCode.Success, errorText: '' },
    { name: 'success 10', data: '7827004526', success: true, errorCode: ErrorCode.Success, errorText: '' },
    { name: 'success 12', data: '760307073214', success: true, errorCode: ErrorCode.Success, errorText: '' },
    {
      name: 'fail secure',
      data: '0123456789',
      success: false,
      errorCode: ErrorCode.WrongSecure,
      errorText: 'INN has wrong format',
    },
  ].forEach(({ name, data, success, errorCode, errorText }: ICase) => {
    it(name, async function () {
      const error: IError = { code: ErrorCode.Success, message: '' };
      const validator = await Validator.getInstance();
      const result = validator.Inn(data, error);
      expect(result).toEqual(success);
      expect(error.code).toEqual(errorCode);
      expect(error.message).toEqual(errorText);
    });
  });
});

describe('test ogrn', () => {
  [
    {
      name: 'empty',
      data: '',
      success: false,
      errorCode: ErrorCode.Empty,
      errorText: 'OGRN is empty',
    },
    {
      name: 'fail numbers',
      data: '012345n67',
      success: false,
      errorCode: ErrorCode.WrongFormat,
      errorText: 'OGRN can contain only digits',
    },
    {
      name: 'fail length',
      data: '01234567',
      success: false,
      errorCode: ErrorCode.WrongLength,
      errorText: 'OGRN can contain only 13 symbols',
    },
    { name: 'success zero', data: '0000000000000', success: true, errorCode: ErrorCode.Success, errorText: '' },
    { name: 'success', data: '1027812400868', success: true, errorCode: ErrorCode.Success, errorText: '' },
    {
      name: 'fail secure',
      data: '0123456789012',
      success: false,
      errorCode: ErrorCode.WrongSecure,
      errorText: 'OGRN has wrong format',
    },
  ].forEach(({ name, data, success, errorCode, errorText }: ICase) => {
    it(name, async function () {
      const error: IError = { code: ErrorCode.Success, message: '' };
      const validator = await Validator.getInstance();
      const result = validator.Ogrn(data, error);
      expect(result).toEqual(success);
      expect(error.code).toEqual(errorCode);
      expect(error.message).toEqual(errorText);
    });
  });
});

describe('test ogrnip', () => {
  [
    {
      name: 'empty',
      data: '',
      success: false,
      errorCode: ErrorCode.Empty,
      errorText: 'OGRNIP is empty',
    },
    {
      name: 'fail numbers',
      data: '012345n67',
      success: false,
      errorCode: ErrorCode.WrongFormat,
      errorText: 'OGRNIP can contain only digits',
    },
    {
      name: 'fail length',
      data: '01234567',
      success: false,
      errorCode: ErrorCode.WrongLength,
      errorText: 'OGRNIP can contain only 15 symbols',
    },
    { name: 'success zero', data: '000000000000000', success: true, errorCode: ErrorCode.Success, errorText: '' },
    { name: 'success', data: '307760324100018', success: true, errorCode: ErrorCode.Success, errorText: '' },
    {
      name: 'fail secure',
      data: '012345678901234',
      success: false,
      errorCode: ErrorCode.WrongSecure,
      errorText: 'OGRNIP has wrong format',
    },
  ].forEach(({ name, data, success, errorCode, errorText }: ICase) => {
    it(name, async function () {
      const error: IError = { code: ErrorCode.Success, message: '' };
      const validator = await Validator.getInstance();
      const result = validator.Ogrnip(data, error);
      expect(result).toEqual(success);
      expect(error.code).toEqual(errorCode);
      expect(error.message).toEqual(errorText);
    });
  });
});

describe('test ks', () => {
  [
    {
      name: 'empty',
      data: '',
      bik: '000000000',
      success: false,
      errorCode: ErrorCode.Empty,
      errorText: 'C&#x2F;A is empty',
    },
    {
      name: 'fail numbers',
      data: '3010181020000000082n',
      bik: '000000000',
      success: false,
      errorCode: ErrorCode.WrongFormat,
      errorText: 'C&#x2F;A can contain only digits',
    },
    {
      name: 'fail length',
      data: '3010181020000000082',
      bik: '000000000',
      success: false,
      errorCode: ErrorCode.WrongLength,
      errorText: 'C&#x2F;A can contain only 20 symbols',
    },
    {
      name: 'fail bik',
      data: '00000000000000000000',
      bik: '0000000000',
      success: true,
      errorCode: ErrorCode.WrongLength,
      errorText: 'BIK can contain only 9 symbols',
    },
    {
      name: 'success',
      data: '00000000000000000000',
      bik: '000000000',
      success: true,
      errorCode: ErrorCode.Success,
      errorText: '',
    },
    {
      name: 'success',
      data: '30101810200000000827',
      bik: '044030827',
      success: true,
      errorCode: ErrorCode.Success,
      errorText: '',
    },
    {
      name: 'fail secure',
      data: '12345678901234567890',
      bik: '000000000',
      success: false,
      errorCode: ErrorCode.WrongSecure,
      errorText: 'C&#x2F;A has wrong format',
    },
  ].forEach(({ name, data, bik, success, errorCode, errorText }: IBankCase) => {
    it(name, async function () {
      const error: IError = { code: ErrorCode.Success, message: '' };
      const validator = await Validator.getInstance();
      const result = validator.Ks(data, bik, error);
      expect(result).toEqual(success);
      expect(error.code).toEqual(errorCode);
      expect(error.message).toEqual(errorText);
    });
  });
});

describe('test rs', () => {
  [
    {
      name: 'empty',
      data: '',
      bik: '000000000',
      success: false,
      errorCode: ErrorCode.Empty,
      errorText: 'C&#x2F;A is empty',
    },
    {
      name: 'fail numbers',
      data: '3010181020000000082n',
      bik: '000000000',
      success: false,
      errorCode: ErrorCode.WrongFormat,
      errorText: 'C&#x2F;A can contain only digits',
    },
    {
      name: 'fail length',
      data: '3010181020000000082',
      bik: '000000000',
      success: false,
      errorCode: ErrorCode.WrongLength,
      errorText: 'C&#x2F;A can contain only 20 symbols',
    },
    {
      name: 'fail bik',
      data: '00000000000000000000',
      bik: '0000000000',
      success: true,
      errorCode: ErrorCode.WrongLength,
      errorText: 'BIK can contain only 9 symbols',
    },
    {
      name: 'success',
      data: '00000000000000000000',
      bik: '000000000',
      success: true,
      errorCode: ErrorCode.Success,
      errorText: '',
    },
    {
      name: 'success',
      data: '30101810200000000827',
      bik: '044030827',
      success: true,
      errorCode: ErrorCode.Success,
      errorText: '',
    },
    {
      name: 'fail secure',
      data: '12345678901234567890',
      bik: '000000000',
      success: false,
      errorCode: ErrorCode.WrongSecure,
      errorText: 'C&#x2F;A has wrong format',
    },
  ].forEach(({ name, data, bik, success, errorCode, errorText }: IBankCase) => {
    it(name, async function () {
      const error: IError = { code: ErrorCode.Success, message: '' };
      const validator = await Validator.getInstance();
      const result = validator.Rs(data, bik, error);
      expect(result).toEqual(success);
      expect(error.code).toEqual(errorCode);
      expect(error.message).toEqual(errorText);
    });
  });
});

describe('test snils', () => {
  [
    {
      name: 'empty',
      data: '',
      success: false,
      errorCode: ErrorCode.Empty,
      errorText: 'SNILS is empty',
    },
    {
      name: 'fail numbers',
      data: '012345n67',
      success: false,
      errorCode: ErrorCode.WrongFormat,
      errorText: 'SNILS can contain only digits',
    },
    {
      name: 'fail length',
      data: '0123456789',
      success: false,
      errorCode: ErrorCode.WrongLength,
      errorText: 'SNILS can contain only 11 symbols',
    },
    { name: 'success zero', data: '00000000000', success: true, errorCode: ErrorCode.Success, errorText: '' },
    { name: 'success', data: '08765430300', success: true, errorCode: ErrorCode.Success, errorText: '' },
    {
      name: 'fail secure',
      data: '18765430300',
      success: false,
      errorCode: ErrorCode.WrongSecure,
      errorText: 'SNILS has wrong format',
    },
    {
      name: 'success 201',
      data: '99600000600',
      success: true,
      errorCode: ErrorCode.Success,
      errorText: '',
    },
    {
      name: 'fail secure 201',
      data: '99600000601',
      success: false,
      errorCode: ErrorCode.WrongSecure,
      errorText: 'SNILS has wrong format',
    },
    {
      name: 'success 101',
      data: '92000000400',
      success: true,
      errorCode: ErrorCode.Success,
      errorText: '',
    },
    {
      name: 'fail secure 101',
      data: '92000000401',
      success: false,
      errorCode: ErrorCode.WrongSecure,
      errorText: 'SNILS has wrong format',
    },
  ].forEach(({ name, data, success, errorCode, errorText }: ICase) => {
    it(name, async function () {
      const error: IError = { code: ErrorCode.Success, message: '' };
      const validator = await Validator.getInstance();
      const result = validator.Snils(data, error);
      expect(result).toEqual(success);
      expect(error.code).toEqual(errorCode);
      expect(error.message).toEqual(errorText);
    });
  });
});

describe('test translate', () => {
  [
    {
      lng: 'ru',
      name: 'wrong secure in ru',
      data: '012345678901234',
      success: false,
      errorCode: ErrorCode.WrongSecure,
      errorText: 'ОГРНИП имеет неправильный формат',
    },
    {
      lng: 'ru',
      name: 'wrong format in ru with custom resources',
      data: 'n01234567890123',
      success: false,
      errorCode: ErrorCode.WrongFormat,
      errorText: 'ОГРНИП может состоять только из чисел',
      resources: {
        ru: {
          translation: {
            only_digits: '{{key, uppercase}} может состоять только из чисел',
            ogrnip: 'огрнип',
          },
        },
      },
    },
    {
      lng: 'ru',
      name: 'wrong length in ru with custom resources',
      data: '01234567890123',
      success: false,
      errorCode: ErrorCode.WrongLength,
      errorText: 'огрнип может состоять только из 15 цифр',
      resources: {
        ru: {
          translation: {
            wrong_length: '{{key, any}} может состоять только из {{digits}} цифр',
            ogrnip: 'огрнип',
          },
        },
      },
    },
    {
      lng: 'ru',
      name: 'wrong secure in ru with custom resources',
      data: '012345678901234',
      success: false,
      errorCode: ErrorCode.WrongSecure,
      errorText: 'Неправильное проверочное число',
      resources: {
        ru: {
          translation: {
            wrong_format: 'Неправильное проверочное число',
          },
        },
      },
    },
  ].forEach(({ lng, resources, name, data, success, errorCode, errorText }: ICase) => {
    it(name, async function () {
      const error: IError = { code: ErrorCode.Success, message: '' };
      const validator = await Validator.getInstance({ lng, resources });
      const result = validator.Ogrnip(data, error);
      expect(result).toEqual(success);
      expect(error.code).toEqual(errorCode);
      expect(error.message).toEqual(errorText);
    });
  });
});

it('test fallback translate', async () => {
  const error: IError = { code: ErrorCode.Success, message: '' };
  const validator = await Validator.getInstance();
  Reflect.set(validator, '_locale', undefined);

  const result = validator.Ogrnip('012345678901234', error);
  expect(result).not.toBeTruthy();
  expect(error.code).toEqual(ErrorCode.WrongSecure);
  expect(error.message).toEqual('Wrong format');
});

it('test strict', async () => {
  const error: IError = { code: ErrorCode.Success, message: '' };
  const validator = await Validator.getInstance({ strict: true });

  const result = validator.Ogrnip('000000000000000', error);
  expect(result).not.toBeTruthy();
  expect(error.code).toEqual(ErrorCode.Empty);
  expect(error.message).toEqual('OGRNIP is empty');
});
