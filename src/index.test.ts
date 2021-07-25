import { Resource } from 'i18next';

import { ResponseCode, Validation } from './index';

interface ICase {
  name: string;
  data: string;
  responseCode: ResponseCode;
  responseText?: string;
  lng?: string;
  resources?: Resource | undefined;
}

interface IBankCase extends ICase {
  bik: string;
}

describe('test bik', () => {
  let validator: Validation;
  beforeEach(() => {
    validator = new Validation();
  });

  [
    {
      name: 'empty',
      data: '',
      responseCode: ResponseCode.Empty,
      responseText: 'BIK is empty',
    },
    {
      name: 'fail numbers',
      data: '012345n67',
      responseCode: ResponseCode.WrongFormat,
      responseText: 'BIK can contain only digits',
    },
    {
      name: 'fail length',
      data: '01234567',
      responseCode: ResponseCode.WrongLength,
      responseText: 'BIK can contain only 9 symbols',
    },
    { name: 'success', data: '000000000', responseCode: ResponseCode.Success },
  ].forEach(({ name, data, responseCode, responseText }: ICase) => {
    it(name, function () {
      const response = validator.Bik(data);
      expect(response.code).toEqual(responseCode);
      expect(response.message).toEqual(responseText);
    });
  });
});

describe('test kpp', () => {
  let validator: Validation;
  beforeEach(() => {
    validator = new Validation();
  });

  [
    {
      name: 'empty',
      data: '',
      responseCode: ResponseCode.Empty,
      responseText: 'KPP is empty',
    },
    {
      name: 'fail numbers',
      data: '01234567',
      responseCode: ResponseCode.WrongLength,
      responseText: 'KPP can contain only 9 symbols',
    },
    {
      name: 'fail length',
      data: '01234567v',
      responseCode: ResponseCode.WrongFormat,
      responseText: 'KPP has wrong format',
    },
    {
      name: 'fail length',
      data: '0000aZ000',
      responseCode: ResponseCode.WrongFormat,
      responseText: 'KPP has wrong format',
    },
    { name: 'success', data: '000000000', responseCode: ResponseCode.Success },
    { name: 'success', data: '012345678', responseCode: ResponseCode.Success },
    { name: 'success', data: '0000AZ000', responseCode: ResponseCode.Success },
  ].forEach(({ name, data, responseCode, responseText }: ICase) => {
    it(name, function () {
      const response = validator.Kpp(data);
      expect(response.code).toEqual(responseCode);
      expect(response.message).toEqual(responseText);
    });
  });
});

describe('test inn', () => {
  let validator: Validation;
  beforeEach(() => {
    validator = new Validation();
  });

  [
    {
      name: 'empty',
      data: '',
      responseCode: ResponseCode.Empty,
      responseText: 'INN is empty',
    },
    {
      name: 'fail numbers',
      data: '012345n67',
      responseCode: ResponseCode.WrongFormat,
      responseText: 'INN can contain only digits',
    },
    {
      name: 'fail length',
      data: '01234567',
      responseCode: ResponseCode.WrongLength,
      responseText: 'INN can contain only 10 or 12 symbols',
    },
    { name: 'success 10 zero', data: '0000000000', responseCode: ResponseCode.Success },
    { name: 'success 12 zero', data: '000000000000', responseCode: ResponseCode.Success },
    { name: 'success 10', data: '7827004526', responseCode: ResponseCode.Success },
    { name: 'success 12', data: '760307073214', responseCode: ResponseCode.Success },
    {
      name: 'fail secure',
      data: '0123456789',
      responseCode: ResponseCode.WrongSecure,
      responseText: 'INN has wrong format',
    },
  ].forEach(({ name, data, responseCode, responseText }: ICase) => {
    it(name, function () {
      const response = validator.Inn(data);
      expect(response.code).toEqual(responseCode);
      expect(response.message).toEqual(responseText);
    });
  });
});

describe('test ogrn', () => {
  let validator: Validation;
  beforeEach(() => {
    validator = new Validation();
  });

  [
    {
      name: 'empty',
      data: '',
      responseCode: ResponseCode.Empty,
      responseText: 'OGRN is empty',
    },
    {
      name: 'fail numbers',
      data: '012345n67',
      responseCode: ResponseCode.WrongFormat,
      responseText: 'OGRN can contain only digits',
    },
    {
      name: 'fail length',
      data: '01234567',
      responseCode: ResponseCode.WrongLength,
      responseText: 'OGRN can contain only 13 symbols',
    },
    { name: 'success zero', data: '0000000000000', responseCode: ResponseCode.Success },
    { name: 'success', data: '1027812400868', responseCode: ResponseCode.Success },
    {
      name: 'fail secure',
      data: '0123456789012',
      responseCode: ResponseCode.WrongSecure,
      responseText: 'OGRN has wrong format',
    },
  ].forEach(({ name, data, responseCode, responseText }: ICase) => {
    it(name, function () {
      const response = validator.Ogrn(data);
      expect(response.code).toEqual(responseCode);
      expect(response.message).toEqual(responseText);
    });
  });
});

describe('test ogrnip', () => {
  let validator: Validation;
  beforeEach(() => {
    validator = new Validation();
  });

  [
    {
      name: 'empty',
      data: '',
      responseCode: ResponseCode.Empty,
      responseText: 'OGRNIP is empty',
    },
    {
      name: 'fail numbers',
      data: '012345n67',
      responseCode: ResponseCode.WrongFormat,
      responseText: 'OGRNIP can contain only digits',
    },
    {
      name: 'fail length',
      data: '01234567',
      responseCode: ResponseCode.WrongLength,
      responseText: 'OGRNIP can contain only 15 symbols',
    },
    { name: 'success zero', data: '000000000000000', responseCode: ResponseCode.Success },
    { name: 'success', data: '307760324100018', responseCode: ResponseCode.Success },
    {
      name: 'fail secure',
      data: '012345678901234',
      responseCode: ResponseCode.WrongSecure,
      responseText: 'OGRNIP has wrong format',
    },
  ].forEach(({ name, data, responseCode, responseText }: ICase) => {
    it(name, function () {
      const response = validator.Ogrnip(data);
      expect(response.code).toEqual(responseCode);
      expect(response.message).toEqual(responseText);
    });
  });
});

describe('test ks', () => {
  let validator: Validation;
  beforeEach(() => {
    validator = new Validation();
  });

  [
    {
      name: 'empty',
      data: '',
      bik: '000000000',
      responseCode: ResponseCode.Empty,
      responseText: 'C&#x2F;A is empty',
    },
    {
      name: 'fail numbers',
      data: '3010181020000000082n',
      bik: '000000000',
      responseCode: ResponseCode.WrongFormat,
      responseText: 'C&#x2F;A can contain only digits',
    },
    {
      name: 'fail length',
      data: '3010181020000000082',
      bik: '000000000',
      responseCode: ResponseCode.WrongLength,
      responseText: 'C&#x2F;A can contain only 20 symbols',
    },
    {
      name: 'fail bik',
      data: '00000000000000000000',
      bik: '0000000000',
      responseCode: ResponseCode.WrongLength,
      responseText: 'BIK can contain only 9 symbols',
    },
    {
      name: 'success',
      data: '00000000000000000000',
      bik: '000000000',
      responseCode: ResponseCode.Success,
    },
    {
      name: 'success',
      data: '30101810200000000827',
      bik: '044030827',
      responseCode: ResponseCode.Success,
    },
    {
      name: 'fail secure',
      data: '12345678901234567890',
      bik: '000000000',
      responseCode: ResponseCode.WrongSecure,
      responseText: 'C&#x2F;A has wrong format',
    },
  ].forEach(({ name, data, bik, responseCode, responseText }: IBankCase) => {
    it(name, function () {
      const response = validator.Ks(data, bik);
      expect(response.code).toEqual(responseCode);
      expect(response.message).toEqual(responseText);
    });
  });
});

describe('test rs', () => {
  let validator: Validation;
  beforeEach(() => {
    validator = new Validation();
  });

  [
    {
      name: 'empty',
      data: '',
      bik: '000000000',
      responseCode: ResponseCode.Empty,
      responseText: 'C&#x2F;A is empty',
    },
    {
      name: 'fail numbers',
      data: '3010181020000000082n',
      bik: '000000000',
      responseCode: ResponseCode.WrongFormat,
      responseText: 'C&#x2F;A can contain only digits',
    },
    {
      name: 'fail length',
      data: '3010181020000000082',
      bik: '000000000',
      responseCode: ResponseCode.WrongLength,
      responseText: 'C&#x2F;A can contain only 20 symbols',
    },
    {
      name: 'fail bik',
      data: '00000000000000000000',
      bik: '0000000000',
      responseCode: ResponseCode.WrongLength,
      responseText: 'BIK can contain only 9 symbols',
    },
    {
      name: 'success',
      data: '00000000000000000000',
      bik: '000000000',
      responseCode: ResponseCode.Success,
    },
    {
      name: 'success',
      data: '30101810200000000827',
      bik: '044030827',
      responseCode: ResponseCode.Success,
    },
    {
      name: 'fail secure',
      data: '12345678901234567890',
      bik: '000000000',
      responseCode: ResponseCode.WrongSecure,
      responseText: 'C&#x2F;A has wrong format',
    },
  ].forEach(({ name, data, bik, responseCode, responseText }: IBankCase) => {
    it(name, function () {
      const response = validator.Rs(data, bik);
      expect(response.code).toEqual(responseCode);
      expect(response.message).toEqual(responseText);
    });
  });
});

describe('test snils', () => {
  let validator: Validation;
  beforeEach(() => {
    validator = new Validation();
  });
  [
    {
      name: 'empty',
      data: '',
      responseCode: ResponseCode.Empty,
      responseText: 'SNILS is empty',
    },
    {
      name: 'fail numbers',
      data: '012345n67',
      responseCode: ResponseCode.WrongFormat,
      responseText: 'SNILS can contain only digits',
    },
    {
      name: 'fail length',
      data: '0123456789',
      responseCode: ResponseCode.WrongLength,
      responseText: 'SNILS can contain only 11 symbols',
    },
    { name: 'success zero', data: '00000000000', responseCode: ResponseCode.Success },
    { name: 'success', data: '08765430300', responseCode: ResponseCode.Success },
    {
      name: 'fail secure',
      data: '18765430300',
      responseCode: ResponseCode.WrongSecure,
      responseText: 'SNILS has wrong format',
    },
    {
      name: 'success 201',
      data: '99600000600',
      responseCode: ResponseCode.Success,
    },
    {
      name: 'fail secure 201',
      data: '99600000601',
      responseCode: ResponseCode.WrongSecure,
      responseText: 'SNILS has wrong format',
    },
    {
      name: 'success 101',
      data: '92000000400',
      responseCode: ResponseCode.Success,
    },
    {
      name: 'fail secure 101',
      data: '92000000401',
      responseCode: ResponseCode.WrongSecure,
      responseText: 'SNILS has wrong format',
    },
  ].forEach(({ name, data, responseCode, responseText }: ICase) => {
    it(name, function () {
      const response = validator.Snils(data);
      expect(response.code).toEqual(responseCode);
      expect(response.message).toEqual(responseText);
    });
  });
});

async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('test translate', () => {
  [
    {
      lng: 'ru',
      name: 'wrong secure in ru',
      data: '012345678901234',
      responseCode: ResponseCode.WrongSecure,
      responseText: 'ОГРНИП имеет неправильный формат',
    },
    {
      lng: 'ru',
      name: 'wrong format in ru with custom resources',
      data: 'n01234567890123',
      responseCode: ResponseCode.WrongFormat,
      responseText: 'ОГРНИП может состоять только из чисел',
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
      responseCode: ResponseCode.WrongLength,
      responseText: 'огрнип может состоять только из 15 цифр',
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
      responseCode: ResponseCode.WrongSecure,
      responseText: 'Неправильное проверочное число',
      resources: {
        ru: {
          translation: {
            wrong_format: 'Неправильное проверочное число',
          },
        },
      },
    },
  ].forEach(({ lng, resources, name, data, responseCode, responseText }: ICase) => {
    it(name, async function () {
      const validator = new Validation({ lng, resources });
      // wait next tick for initialisation of i18next
      await wait(0);
      const response = validator.Ogrnip(data);
      expect(response.code).toEqual(responseCode);
      expect(response.message).toEqual(responseText);
    });
  });
});

it('test fallback translate', async () => {
  const validator = new Validation();
  // wait next tick for initialisation of i18next
  await wait(0);
  Reflect.set(validator, '_locale', undefined);
  const response = validator.Ogrnip('012345678901234');
  expect(response.code).toEqual(ResponseCode.WrongSecure);
  expect(response.message).toEqual('Wrong format');
});

it('test fallback translate no waiting', async () => {
  // i18next silence
  console.log = jest.fn();
  //
  console.warn = jest.fn();
  const validator = new Validation({ debug: true });
  const response = validator.Ogrnip('012345678901234');
  expect(response.code).toEqual(ResponseCode.WrongSecure);
  expect(response.message).toEqual('Wrong format');
  expect(console.warn).toHaveBeenCalledWith('i18next is not initialised');
  expect(console.warn).toBeCalled();
});

it('test strict', async () => {
  const validator = new Validation({ strict: true });
  // wait next tick for initialisation of i18next
  await wait(0);
  const response = validator.Ogrnip('000000000000000');
  expect(response.code).toEqual(ResponseCode.Empty);
  expect(response.message).toEqual('OGRNIP is empty');
});
