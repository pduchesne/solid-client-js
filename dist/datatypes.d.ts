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
import { NamedNode, Literal, Term, Quad_Subject } from "@rdfjs/types";
import { IriString, Iri, SolidClientError, LocalNode } from "./interfaces";
/**
 * IRIs of the XML Schema data types we support
 * @internal
 */
export declare const xmlSchemaTypes: {
    readonly boolean: "http://www.w3.org/2001/XMLSchema#boolean";
    readonly dateTime: "http://www.w3.org/2001/XMLSchema#dateTime";
    readonly date: "http://www.w3.org/2001/XMLSchema#date";
    readonly time: "http://www.w3.org/2001/XMLSchema#time";
    readonly decimal: "http://www.w3.org/2001/XMLSchema#decimal";
    readonly integer: "http://www.w3.org/2001/XMLSchema#integer";
    readonly string: "http://www.w3.org/2001/XMLSchema#string";
    readonly langString: "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString";
};
export declare type XmlSchemaTypeIri = typeof xmlSchemaTypes[keyof typeof xmlSchemaTypes];
/**
 * @internal
 * @param value Value to serialise.
 * @returns String representation of `value`.
 * @see https://www.w3.org/TR/xmlschema-2/#boolean-lexical-representation
 */
export declare function serializeBoolean(value: boolean): string;
/**
 * @internal
 * @param value Value to deserialise.
 * @returns Deserialized boolean, or null if the given value is not a valid serialised boolean.
 * @see https://www.w3.org/TR/xmlschema-2/#boolean-lexical-representation
 */
export declare function deserializeBoolean(value: string): boolean | null;
/**
 * Time type for time data type attributes
 *
 * @since 1.10.0
 */
export declare type Time = {
    hour: number;
    minute: number;
    second: number;
    millisecond?: number;
    timezoneHourOffset?: number;
    timezoneMinuteOffset?: number;
};
/**
 * @internal
 * @param value Value to serialise.
 * @returns String representation of `value` in UTC.
 * @see https://www.w3.org/TR/xmlschema-2/#time-lexical-repr
 */
export declare function serializeTime(value: Time): string;
/**
 * @internal
 * @param literalString Value to deserialise.
 * @returns Deserialized time, or null if the given value is not a valid serialised datetime.
 * @see https://www.w3.org/TR/xmlschema-2/#time-lexical-repr
 */
export declare function deserializeTime(literalString: string): Time | null;
/**
 * @internal
 * @param value Value to serialise.
 * @returns String representation of `value`.
 * @see https://www.w3.org/TR/xmlschema-2/#dateTime-lexical-representation
 */
export declare function serializeDatetime(value: Date): string;
/**
 * @internal
 * @param value Value to deserialise.
 * @returns Deserialized datetime, or null if the given value is not a valid serialised datetime.
 * @see https://www.w3.org/TR/xmlschema-2/#dateTime-lexical-representation
 */
export declare function deserializeDatetime(literalString: string): Date | null;
/**
 * @internal
 * @param value Value to serialise.
 * @returns String representation of `value`.
 * @see https://www.w3.org/TR/xmlschema-2/#date-lexical-representation
 */
export declare function serializeDate(value: Date): string;
/**
 * @internal
 * @param value Value to deserialise.
 * @returns Deserialized datetime, or null if the given value is not a valid serialised datetime.
 * @see https://www.w3.org/TR/xmlschema-2/#date-lexical-representation
 */
export declare function deserializeDate(literalString: string): Date | null;
/**
 * @internal
 * @param value Value to serialise.
 * @returns String representation of `value`.
 * @see https://www.w3.org/TR/xmlschema-2/#decimal-lexical-representation
 */
export declare function serializeDecimal(value: number): string;
/**
 * @internal
 * @param value Value to deserialise.
 * @returns Deserialized decimal, or null if the given value is not a valid serialised decimal.
 * @see https://www.w3.org/TR/xmlschema-2/#decimal-lexical-representation
 */
export declare function deserializeDecimal(literalString: string): number | null;
/**
 * @internal
 * @param value Value to serialise.
 * @returns String representation of `value`.
 */
export declare function serializeInteger(value: number): string;
/**
 * @internal
 * @param value Value to deserialise.
 * @returns Deserialized integer, or null if the given value is not a valid serialised integer.
 */
export declare function deserializeInteger(literalString: string): number | null;
/**
 * @internal
 * @param locale Locale to transform into a consistent format.
 */
export declare function normalizeLocale(locale: string): string;
/**
 * @internal Library users shouldn't need to be exposed to raw NamedNodes.
 * @param value The value that might or might not be a Named Node.
 * @returns Whether `value` is a Named Node.
 */
export declare function isNamedNode<T>(value: T | NamedNode): value is NamedNode;
/**
 * @internal Library users shouldn't need to be exposed to raw Literals.
 * @param value The value that might or might not be a Literal.
 * @returns Whether `value` is a Literal.
 */
export declare function isLiteral<T>(value: T | Literal): value is Literal;
/**
 * @internal Library users shouldn't need to be exposed to raw Terms.
 * @param value The value that might or might not be a Term.
 * @returns Whether `value` is a Term.
 */
export declare function isTerm<T>(value: T | Term): value is Term;
/**
 * @internal Library users shouldn't need to be exposed to LocalNodes.
 * @param value The value that might or might not be a Node with no known IRI yet.
 * @returns Whether `value` is a Node with no known IRI yet.
 */
export declare function isLocalNode<T>(value: T | Quad_Subject | LocalNode): value is LocalNode;
/**
 * Ensure that a given value is a valid URL.
 *
 * @internal Library users shouldn't need to be exposed to raw URLs.
 * @param iri The value of which to verify that it is a valid URL.
 */
export declare function internal_isValidUrl(iri: Iri | IriString): boolean;
/**
 * Ensure that a given value is a Named Node.
 *
 * If the given parameter is a Named Node already, it will be returned as-is. If it is a string, it
 * will check whether it is a valid IRI. If not, it will throw an error; otherwise a Named Node
 * representing the given IRI will be returned.
 *
 * @internal Library users shouldn't need to be exposed to raw NamedNodes.
 * @param iri The IRI that should be converted into a Named Node, if it isn't one yet.
 */
export declare function asNamedNode(iri: Iri | IriString): NamedNode;
/**
 * @internal Utility method; library users should not need to interact with LocalNodes directly.
 * @param localNode The LocalNode to resolve to a NamedNode.
 * @param resourceIri The Resource in which the Node will be saved.
 */
export declare function resolveIriForLocalNode(localNode: LocalNode, resourceIri: IriString): NamedNode;
/**
 * @internal API for internal use only.
 * @param name The name identifying a Thing.
 * @param resourceIri The Resource in which the Thing can be found.
 */
export declare function resolveLocalIri(name: string, resourceIri: IriString): IriString;
/**
 * This error is thrown when a given value is not a proper URL.
 */
export declare class ValidUrlExpectedError extends SolidClientError {
    readonly receivedValue: unknown;
    constructor(receivedValue: unknown);
}
