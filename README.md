![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
<br />
![npm](https://badges.aleen42.com/src/npm.svg)
<br />
<br />
![Continuous Deployment](https://github.com/noahvarghese/get_j_opts/actions/workflows/cd.yaml/badge.svg)
<br />
![Continuous Integration](https://github.com/noahvarghese/get_j_opts/actions/workflows/ci.yaml/badge.svg)
<br />
<br />
![Statements](https://img.shields.io/badge/statements-69.87%25-red.svg?style=flat)
<br/>
![Lines](https://img.shields.io/badge/lines-67.94%25-red.svg?style=flat)
<br/>
![Functions](https://img.shields.io/badge/functions-53.84%25-red.svg?style=flat)
<br/>
![Branches](https://img.shields.io/badge/branches-62.71%25-red.svg?style=flat)
<br/>
<br/>
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<br />
<br />

<img src="https://raw.githubusercontent.com/noahvarghese/get_j_opts/main/assets/curly-bracket.png" width="100" alt="Curly brackets" />

# get_j_opts 

Named for my dislike of the getopt/getopts bash utilities.
Probably most closely resembles golang's <a href="https://pkg.go.dev/flag">flag module</a>.
Allows retrieving and checking options in JSON.

## Usage

```typescript
import getJOpts from "@noahvarghese/get_j_opts";

const formats = {
    email: {},
    postal_code: {},
    phone: {}
}

const body = {
    email: {
        required: true, 
        type: "string",
        format: "email" as keyof typeof formats,
        value: undefined
    }
}

const type = {};


```

## Development - Getting Started

```bash
git clone https://github.com/noahvarghese/get_j_opts
cd ./get_j_opts
npm i
# Configure pre commit hook and set shell preferences
npm run init
```

