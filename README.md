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
![Statements](https://img.shields.io/badge/statements-98.41%25-brightgreen.svg?style=flat)
<br/>
![Lines](https://img.shields.io/badge/lines-98.18%25-brightgreen.svg?style=flat)
<br/>
![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat)
<br/>
![Branches](https://img.shields.io/badge/branches-97.36%25-brightgreen.svg?style=flat)
<br/>
<br/>
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<br />
<br />

<img src="https://raw.githubusercontent.com/noahvarghese/get_j_opts/main/assets/curly-bracket.png" width="100" alt="Curly brackets" />

# get_j_opts

Allows retrieving and checking options passed in json object.

## Usage

```typescript
/**
 * Example app setup using express
 */
import { Request, Response, Router } from "express";
import getJOpts, { Expected } from "@noahvarghese/get_j_opts";
import validator from "validator";

const router = Router();

/**
 * The types used in the library
 */
const types = [
    "string",
    "number",
    "undefined",
    "boolean",
    "object",
    "function",
    "bigint",
    "symbol",
] as const;

type TypeKey = typeof types[number];

type ValidatorMap<T extends string> = {
    [x in T]: (v?: unknown) => boolean;
};

type Expected<T extends string> = {
    [x: string]: {
        required: boolean;
        value: unknown;
        format?: T;
    };
};

type TypeMap = ValidatorMap<TypeKey>;

/**
 * Basic Usage
 */

router.post("/", (req: Request, res: Response): void => {
    const data: Expected<unknown> = {
        email: {
            required: true,
            type: "string" as TypeKey
        }
    }

    let body: { email: string };

    try {
        // Reads data from first parameter using expected values from data
        body = getJOpts(req.body, data);
        res.status(200).send(body.email);
    } catch(_e) {
        console.error((_e as Error).message);
        // Throws error if a required field does not exist or is not of the type desired
        res.sendStatus(400);
    }
});

/**
 * Adv. Usage
 * Custom format checkers
 */

// Requires definition of a custom Expected type
const formats = {
    email: (v: unknown): boolean => validator.isEmail(v),
}

const body:  = {
    email: {
        required: true,
        type: "string",
        format: "email" as keyof typeof formats,
    }
}

const type: {email} = getJOpts();


```

## Development - Getting Started

```bash
git clone https://github.com/noahvarghese/get_j_opts
cd ./get_j_opts
npm i
# Configure pre commit hook and set shell preferences
npm run init
```
