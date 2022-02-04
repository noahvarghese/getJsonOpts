/*
 * Modified slightly 2022 by Noah Varghese <noah.varghese@mohawkcollege.ca>
 */

/*
 *  Copyright (c) 2018 Chris O'Hara <cohara87@gmail.com>
 *  Permission is hereby granted, free of charge, to any person obtaining
 *  a copy of this software and associated documentation files (the
 *  "Software"), to deal in the Software without restriction, including
 *  without limitation the rights to use, copy, modify, merge, publish,
 *  distribute, sublicense, and/or sell copies of the Software, and to
 *  permit persons to whom the Software is furnished to do so, subject to
 *  the following conditions:

 *  The above copyright notice and this permission notice shall be
 *  included in all copies or substantial portions of the Software.

 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 *  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 *  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 *  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 *  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 *  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const isString = (v: unknown): boolean =>
    typeof v === "string" || v instanceof String;

/**
 * Throws error if v is not a string
 */
export default (v: unknown): void => {
    if (isString(v)) return;

    // Get info for error
    let type: string = v === null ? "null" : typeof v;

    if (type !== "null")
        type = type === "object" ? (v as object).constructor.name : type;

    throw new Error(`Expected a string but received: ${type}`);
};
