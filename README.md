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
import getJOpts, {
    Expected,
    TypeKey,
    ValidatorMap,
} from "@noahvarghese/get_j_opts";
import validator from "validator";

const router = Router();

/**
 * Basic Usage
 */

router.post("/", (req: Request, res: Response): void => {
    const body: Expected = {
        email: {
            required: true,
            type: "string" as TypeKey,
        },
    };

    let data: { email: string };

    try {
        // Reads data from first parameter using expected values from data
        data = getJOpts(req.body, body);
        res.status(200).send(data.email);
    } catch (_e) {
        console.error((_e as Error).message);
        // Throws error if a required field does not exist or is not of the type desired
        res.sendStatus(400);
    }
});

/**
 * Adv. Usage
 * Custom format checkers
 */

const keys = ["email"] as const;
type FormatKeys = typeof keys[number];

const formats: ValidatorMap<FormatKeys> = {
    email: (v: unknown): boolean => validator.isEmail(v),
};

router.put("/", (req: Request, res: Response): void => {
    const body: Expected<FormatKeys> = {
        email: {
            required: true,
            type: "string",
            format: "email",
        },
    };

    let data: { email: string };

    try {
        // Reads data from first parameter using expected values from data
        data = getJOpts(req.body, body, formats);
        res.status(200).send(body.email);
    } catch (_e) {
        console.error((_e as Error).message);
        // Throws error if a required field does not exist
        // Or if it exists but is not of the type desired
        // Or if it exists and the custom formatter fails/returns false
        // or the format key doesn't match the key of one of the custom format functions
        res.sendStatus(400);
    }
});
```

## Development - Getting Started

```bash
git clone https://github.com/noahvarghese/get_j_opts
cd ./get_j_opts
npm i
# Configure pre commit hook and set shell preferences
npm run init
```
