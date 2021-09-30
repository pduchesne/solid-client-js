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
import { Literal, Quad_Object, NamedNode } from "@rdfjs/types";
import { Time } from "../datatypes";
import { Thing, ThingLocal, ThingPersisted, Url, UrlString } from "../interfaces";
import { AddOfType, addStringWithLocale } from "./add";
import { removeLiteral, RemoveOfType, removeStringWithLocale } from "./remove";
import { SetOfType, setStringWithLocale } from "./set";
import { CreateThingLocalOptions, CreateThingPersistedOptions } from "./thing";
declare type Adder<Type, T extends Thing> = (property: Parameters<AddOfType<Type>>[1], value: Parameters<AddOfType<Type>>[2]) => ThingBuilder<T>;
declare type Setter<Type, T extends Thing> = (property: Parameters<SetOfType<Type>>[1], value: Parameters<SetOfType<Type>>[2]) => ThingBuilder<T>;
declare type Remover<Type, T extends Thing> = (property: Parameters<RemoveOfType<Type>>[1], value: Parameters<RemoveOfType<Type>>[2]) => ThingBuilder<T>;
/**
 * A Fluent interface to build a [[Thing]].
 *
 * Add, replace or remove property values using consecutive calls to `.add*()`,
 * `.set*()` and `.remove*()`, then finally generate a [[Thing]] with the given
 * properties using `.build()`.
 * @since 1.9.0
 */
export declare type ThingBuilder<T extends Thing> = {
    build: () => T;
    addUrl: Adder<Url | UrlString | Thing, T>;
    addIri: Adder<Url | UrlString | Thing, T>;
    addBoolean: Adder<boolean, T>;
    addDatetime: Adder<Date, T>;
    addDate: Adder<Date, T>;
    addTime: Adder<Time, T>;
    addDecimal: Adder<number, T>;
    addInteger: Adder<number, T>;
    addStringNoLocale: Adder<string, T>;
    addStringEnglish: Adder<string, T>;
    addStringWithLocale: (property: Parameters<typeof addStringWithLocale>[1], value: Parameters<typeof addStringWithLocale>[2], locale: Parameters<typeof addStringWithLocale>[3]) => ThingBuilder<T>;
    addNamedNode: Adder<NamedNode, T>;
    addLiteral: Adder<Literal, T>;
    addTerm: Adder<Quad_Object, T>;
    setUrl: Setter<Url | UrlString | Thing, T>;
    setIri: Setter<Url | UrlString | Thing, T>;
    setBoolean: Setter<boolean, T>;
    setDatetime: Setter<Date, T>;
    setDate: Setter<Date, T>;
    setTime: Setter<Time, T>;
    setDecimal: Setter<number, T>;
    setInteger: Setter<number, T>;
    setStringNoLocale: Setter<string, T>;
    setStringEnglish: Setter<string, T>;
    setStringWithLocale: (property: Parameters<typeof setStringWithLocale>[1], value: Parameters<typeof setStringWithLocale>[2], locale: Parameters<typeof setStringWithLocale>[3]) => ThingBuilder<T>;
    setNamedNode: Setter<NamedNode, T>;
    setLiteral: Setter<Literal, T>;
    setTerm: Setter<Quad_Object, T>;
    removeAll: (property: Parameters<typeof removeLiteral>[1]) => ThingBuilder<T>;
    removeUrl: Remover<Url | UrlString | Thing, T>;
    removeIri: Remover<Url | UrlString | Thing, T>;
    removeBoolean: Remover<boolean, T>;
    removeDatetime: Remover<Date, T>;
    removeDate: Remover<Date, T>;
    removeTime: Remover<Time, T>;
    removeDecimal: Remover<number, T>;
    removeInteger: Remover<number, T>;
    removeStringNoLocale: Remover<string, T>;
    removeStringEnglish: Remover<string, T>;
    removeStringWithLocale: (property: Parameters<typeof removeStringWithLocale>[1], value: Parameters<typeof removeStringWithLocale>[2], locale: Parameters<typeof removeStringWithLocale>[3]) => ThingBuilder<T>;
    removeNamedNode: Remover<NamedNode, T>;
    removeLiteral: Remover<Literal, T>;
};
/**
 * Modify a [[Thing]], setting multiple properties in a single expresssion.
 *
 * For example, you can initialise several properties of a given Thing as follows:
 *
 *     const me = buildThing(createThing({ name: "profile-vincent" }))
 *       .addUrl(rdf.type, schema.Person)
 *       .addStringNoLocale(schema.givenName, "Vincent")
 *       .build();
 *
 * Take note of the final call to `.build()` to obtain the actual Thing.
 *
 * @param init A Thing to modify.
 * @returns a [[ThingBuilder]], a Fluent API that allows you to set multiple properties in a single expression.
 * @since 1.9.0
 */
export declare function buildThing(init: ThingLocal): ThingBuilder<ThingLocal>;
/**
 * Modify a [[Thing]], setting multiple properties in a single expresssion.
 *
 * For example, you can initialise several properties of a given Thing as follows:
 *
 *     const me = buildThing(createThing({ url: "https://example.pod/profile#vincent" }))
 *       .addUrl(rdf.type, schema.Person)
 *       .addStringNoLocale(schema.givenName, "Vincent")
 *       .build();
 *
 * Take note of the final call to `.build()` to obtain the actual Thing.
 *
 * @param init A Thing to modify.
 * @returns a [[ThingBuilder]], a Fluent API that allows you to set multiple properties in a single expression.
 * @since 1.9.0
 */
export declare function buildThing(init: ThingPersisted): ThingBuilder<ThingPersisted>;
/**
 * Create a [[Thing]], setting multiple properties in a single expresssion.
 *
 * For example, you can create a new Thing and initialise several properties as follows:
 *
 *     const me = buildThing({ name: "profile-vincent" })
 *       .addUrl(rdf.type, schema.Person)
 *       .addStringNoLocale(schema.givenName, "Vincent")
 *       .build();
 *
 * Take note of the final call to `.build()` to obtain the actual Thing.
 *
 * @param init Options used to initialise a new Thing.
 * @returns a [[ThingBuilder]], a Fluent API that allows you to set multiple properties in a single expression.
 * @since 1.9.0
 */
export declare function buildThing(init: CreateThingLocalOptions): ThingBuilder<ThingLocal>;
/**
 * Create a [[Thing]], setting multiple properties in a single expresssion.
 *
 * For example, you can create a new Thing and initialise several properties as follows:
 *
 *     const me = buildThing({ url: "https://example.pod/profile#vincent" })
 *       .addUrl(rdf.type, schema.Person)
 *       .addStringNoLocale(schema.givenName, "Vincent")
 *       .build();
 *
 * Take note of the final call to `.build()` to obtain the actual Thing.
 *
 * @param init Optionally pass an existing [[Thing]] to modify the properties of. If left empty, `buildThing` will initialise a new Thing.
 * @returns a [[ThingBuilder]], a Fluent API that allows you to set multiple properties in a single expression.
 * @since 1.9.0
 */
export declare function buildThing(init: CreateThingPersistedOptions): ThingBuilder<ThingPersisted>;
/**
 * Create a [[Thing]], setting multiple properties in a single expresssion.
 *
 * For example, you can create a new Thing and initialise several properties as follows:
 *
 *     const me = buildThing()
 *       .addUrl(rdf.type, schema.Person)
 *       .addStringNoLocale(schema.givenName, "Vincent")
 *       .build();
 *
 * Take note of the final call to `.build()` to obtain the actual Thing.
 *
 * @returns a [[ThingBuilder]], a Fluent API that allows you to set multiple properties in a single expression.
 * @since 1.9.0
 */
export declare function buildThing(): ThingBuilder<ThingLocal>;
export {};
