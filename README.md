# Difference Generator

> [Hexlet project](https://ru.hexlet.io/projects)

[![Maintainability](https://api.codeclimate.com/v1/badges/028c2d2a25f316882a5b/maintainability)](https://codeclimate.com/github/AndreyMork/gendiff/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/028c2d2a25f316882a5b/test_coverage)](https://codeclimate.com/github/AndreyMork/gendiff/test_coverage)

[![Build Status](https://travis-ci.org/AndreyMork/gendiff.svg?branch=master)](https://travis-ci.org/AndreyMork/gendiff)

[![npm](https://img.shields.io/npm/v/aethra-gendiff.svg?style=flat)](https://www.npmjs.com/package/aethra-gendiff)

***
## Description

Compares two configuration files and shows the difference.
Supported formats: ```json, yaml, ini```.

***
## Installation

```$ npm install aethra-gendiff```

## Usage

```$ gendiff --help```

    Usage: gendiff [options] <firstConfig> <secondConfig>

    Compares two configuration files and shows the difference.
    Supported formats: json, yaml, ini.

    Options:

      -V, --version        output the version number
      -f, --format [type]  output format - default: raw. Supported: plain, raw, json.
      -h, --help           output usage information
***
## Example

before.json

    {
      "key1": "was not changed",
      "key2": "to be removed",
      "key3": "was not changed",
      "nested": {
        "innerKey1": "to be removed"
      }
    }

after.json

    {
      "key1": "was changed",
      "key3": "was not changed",
      "key4": "was added",
      "nested": {
        "innerKey2": "was added"
      }
    }

```$ gendiff before.json after.json```

    {
      + key1: was changed
      - key1: was not changed
      - key2: to be removed
        key3: was not changed
        nested: {
          - innerKey1: to be removed
          + innerKey2: was added
        }
      + key4: was added
    }

```$ gendiff -f plain before.json after.json```

    Property 'key1' was updated. From 'was not changed' to 'was changed'
    Property 'key2' was removed
    Property 'nested.innerKey1' was removed
    Property 'nested.innerKey2' was added with value: 'was added'
    Property 'key4' was added with value: 'was added'

```$ gendiff -f json before.json after.json```

    [{"key":"key1","type":"changed","valueBefore":"was not changed","valueAfter":"was changed"},{"key":"key2","type":"removed","value":"to be removed"},{"key":"key3","type":"common","value":"was not changed"},{"key":"nested","type":"nested","children":[{"key":"innerKey1","type":"removed","value":"to be removed"},{"key":"innerKey2","type":"added","value":"was added"}]},{"key":"key4","type":"added","value":"was added"}]
