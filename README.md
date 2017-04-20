# @mcmath/tslint-rules

[![Version][version-badge]][npm]
[![Build][build-badge]][travis]

Custom rules for TSLint

## Install

Install as an [npm][npm] devDependency. [TypeScript][typescript] and [TSLint][tslint]
should also be installed.

```sh
npm install --save-dev typescript tslint @mcmath/tslint-rules
```

## Usage

Include a `tslint.json` file in your project and add `"@mcmath/tslint-rules"` to
the `"extends"` field. Custom rules can then be enabled under `"rules"`.

```json
{
  "extends": ["@mcmath/tslint-rules"],
  "rules": {
    "enum-member-name": [true, "caps-case"]
  }
}
```

## Rules

#### enum-member-name

Ensures `enum` members follow a consistent naming convention.

This rule accepts a single string option. If no option is given,
"pascal-case" is assumed.

| Option        | Attributes | Example     |
|:--------------|:-----------|:------------|
| "pascal-case" | default    | PascalCase  |
| "camel-case"  |            | camelCase   |
| "caps-case"   |            | CAPS_CASE   |
| "snake-case"  |            | snake_case  |

#### enum-name

Ensures `enum` identifiers follow a consistent naming convention.

This rule accepts a single string option. If no option is given,
"pascal-case" is assumed.

| Option        | Attributes | Example     |
|:--------------|:-----------|:------------|
| "pascal-case" | default    | PascalCase  |
| "camel-case"  |            | camelCase   |
| "caps-case"   |            | CAPS_CASE   |
| "snake-case"  |            | snake_case  |

## License

Copyright &copy; 2017 Akim McMath. Licensed under the [MIT License][license].

[version-badge]: https://img.shields.io/npm/v/@mcmath/tslint-rules.svg?style=flat-square
[build-badge]: https://img.shields.io/travis/mcmath/tslint-rules/master.svg?style=flat-square
[npm]: https://www.npmjs.com/package/@mcmath/tslint-rules
[travis]: https://travis-ci.org/mcmath/tslint-rules
[typescript]: https://www.typescriptlang.org/
[tslint]: https://palantir.github.io/tslint/
[license]: LICENSE
