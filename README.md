# Russian data validation

[![Running Code Coverage](https://github.com/Halfi/russian-requisites-validation/actions/workflows/codeql.yml/badge.svg)](https://github.com/Halfi/russian-requisites-validation/actions/workflows/codeql.yml)
[![Codecov](https://img.shields.io/codecov/c/github/halfi/russian-requisites-validation)](https://codecov.io/gh/halfi/russian-requisites-validation)
[![npm version](https://img.shields.io/npm/v/russian-requisites-validation)](https://www.npmjs.com/package/russian-requisites-validation)
[![install size](https://img.shields.io/bundlephobia/min/russian-requisites-validation)](https://bundlephobia.com/package/russian-requisites-validation)
[![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/russian-requisites-validation)](https://libraries.io/npm/russian-requisites-validation)
[![license](https://img.shields.io/github/license/halfi/russian-requisites-validation)](https://github.com/Halfi/russian-requisites-validation/blob/main/LICENSE)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-blue.svg?logo=prettier)](https://github.com/prettier/prettier)

---

This is more modern realisation of [this library](https://github.com/Kholenkov/js-data-validation) written on typescript and published to the npm.

Validate inn, ogrn, ogrnip, snils, bik, kpp, correspondent and checking account.

More detail information about data validation [here](http://www.kholenkov.ru/data-validation/).

## Installation

```shell
npm i russian-requisites-validation
```

## Usage

### Typescript

```typescript
import { Validator, IError, ErrorCode } from 'russian-requisites-validation';

const error: IError = { code: ErrorCode.Success, message: '' };
const v = await Validator.getInstance({ lng: 'ru' });
const valid = v.Inn(value, error);

console.log('valid: ', valid);
console.log('error: ', error.message);
console.log('error code: ', error.code);
```

### EcmaScript

```ecmascript 6
import { Validator, IError, ErrorCode } from 'russian-requisites-validation';

const error = {};
const v = await Validator.getInstance({ lng: 'ru' });
const valid = v.Inn(value, error);

console.log('valid: ', valid);
console.log('error: ', error.message);
console.log('error code: ', error.code);
```

## License

The scripts and documentation in this project are released under the [MIT License](https://github.com/Halfi/russian-requisites-validation/blob/main/LICENSE)
