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
export declare const rdfJsDataset: <InQuad extends RdfJs.BaseQuad = RdfJs.Quad>(quads?: InQuad[] | undefined) => import("@rdfjs/dataset/DatasetCore")<InQuad>;
import * as RdfJs from "@rdfjs/types";
import { IriString } from "./interfaces";
import { XmlSchemaTypeIri } from "./datatypes";
export declare const localNodeSkolemPrefix: "https://inrupt.com/.well-known/sdk-local-node/";
export declare type LocalNodeIri = `${typeof localNodeSkolemPrefix}${string}`;
export declare type LocalNodeName = string;
declare type DataTypeIriString = XmlSchemaTypeIri | IriString;
declare type LocaleString = string;
export declare type BlankNodeId = `_:${string}`;
export declare type Objects = Readonly<Partial<{
    literals: Readonly<Record<DataTypeIriString, readonly string[]>>;
    langStrings: Readonly<Record<LocaleString, readonly string[]>>;
    namedNodes: ReadonlyArray<LocalNodeIri | IriString>;
    blankNodes: ReadonlyArray<Predicates | BlankNodeId>;
}>>;
export declare type Predicates = Readonly<Record<IriString, Objects>>;
export declare type Subject = Readonly<{
    type: "Subject";
    url: BlankNodeId | LocalNodeIri | IriString;
    predicates: Predicates;
}>;
export declare type Graph = Readonly<Record<BlankNodeId | LocalNodeIri | IriString, Subject>>;
export declare type ImmutableDataset = Readonly<{
    type: "Dataset";
    graphs: Readonly<Record<IriString, Graph> & {
        default: Graph;
    }>;
}>;
/**
 * Runtime freezing might be too much overhead;
 * if so, this function allows us to replace it by a function
 * that merely marks its input as Readonly<> for static analysis.
 */
export declare const freeze: typeof Object.freeze;
export declare function isLocalNodeIri(iri: LocalNodeIri | IriString): iri is LocalNodeIri;
export declare function getLocalNodeName(localNodeIri: LocalNodeIri): string;
export declare function getLocalNodeIri(localNodeName: string): LocalNodeIri;
export declare function isBlankNodeId<T>(value: T | BlankNodeId): value is BlankNodeId;
export declare function getBlankNodeValue(blankNodeId: BlankNodeId): string;
export declare function getBlankNodeId(blankNode: RdfJs.BlankNode): BlankNodeId;
export {};
