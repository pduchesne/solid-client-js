/**
 * Copyright 2021 Inrupt Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { Quad, Quad_Object } from "@rdfjs/types";
import { Thing, SolidDataset, WithChangeLog } from "../interfaces";
/** @hidden For internal use only. */
export declare function internal_getReadableValue(value: Quad_Object): string;
/**
 * @hidden
 */
export declare function internal_throwIfNotThing(thing: Thing): void;
/**
 * @hidden
 * @param solidDataset
 */
export declare function internal_addAdditionsToChangeLog<Dataset extends SolidDataset>(solidDataset: Dataset, additions: Quad[]): Dataset & WithChangeLog;
/**
 * @hidden
 * @param solidDataset
 */
export declare function internal_addDeletionsToChangeLog<Dataset extends SolidDataset>(solidDataset: Dataset, deletions: Quad[]): Dataset & WithChangeLog;
/**
 * Enforces the presence of a Changelog for a given dataset. If a changelog is
 * already present, it is unchanged. Otherwise, an empty changelog is created.
 * @hidden
 * @param solidDataset
 */
export declare function internal_withChangeLog<Dataset extends SolidDataset>(solidDataset: Dataset): Dataset & WithChangeLog;
