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
import RdfJsDataFactory from "@rdfjs/data-model";
import * as RdfJs from "@rdfjs/types";
import { ImmutableDataset, Predicates } from "./rdf.internal";
import { ToRdfJsOptions } from "./rdfjs";
export declare const DataFactory: typeof RdfJsDataFactory;
declare type QuadParseOptions = Partial<{
    otherQuads: RdfJs.Quad[];
    chainBlankNodes: RdfJs.BlankNode[];
}>;
export declare function addRdfJsQuadToDataset(dataset: ImmutableDataset, quad: RdfJs.Quad, quadParseOptions?: QuadParseOptions): ImmutableDataset;
/**
 * Given an array of Quads, returns all Blank Nodes that are used in a single chain of Nodes.
 *
 * This allows you to obtain which Blank Nodes are involved in e.g. RDF lists.
 * This is useful because those can be represented as nested data that will have
 * a deterministic structure, whereas a representation of Blank Nodes that
 * create a cycle or are re-used will need ad-hoc, non-deterministic identifiers
 * to allow for representation without inifinite nesting.
 */
export declare function getChainBlankNodes(quads: RdfJs.Quad[]): RdfJs.BlankNode[];
export declare function toRdfJsQuads(dataset: ImmutableDataset, options?: ToRdfJsOptions): RdfJs.Quad[];
export declare function subjectToRdfJsQuads(predicates: Predicates, subjectNode: RdfJs.NamedNode | RdfJs.BlankNode, graphNode: RdfJs.NamedNode | RdfJs.DefaultGraph, options?: ToRdfJsOptions): RdfJs.Quad[];
export {};
