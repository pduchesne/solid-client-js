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
/** @hidden */
export declare const acl: {
    readonly Authorization: "http://www.w3.org/ns/auth/acl#Authorization";
    readonly AuthenticatedAgent: "http://www.w3.org/ns/auth/acl#AuthenticatedAgent";
    readonly accessTo: "http://www.w3.org/ns/auth/acl#accessTo";
    readonly agent: "http://www.w3.org/ns/auth/acl#agent";
    readonly agentGroup: "http://www.w3.org/ns/auth/acl#agentGroup";
    readonly agentClass: "http://www.w3.org/ns/auth/acl#agentClass";
    readonly default: "http://www.w3.org/ns/auth/acl#default";
    readonly defaultForNew: "http://www.w3.org/ns/auth/acl#defaultForNew";
    readonly mode: "http://www.w3.org/ns/auth/acl#mode";
    readonly origin: "http://www.w3.org/ns/auth/acl#origin";
};
/** @hidden */
export declare const rdf: {
    readonly type: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
};
/** @hidden */
export declare const ldp: {
    readonly BasicContainer: "http://www.w3.org/ns/ldp#BasicContainer";
    readonly Container: "http://www.w3.org/ns/ldp#Container";
    readonly Resource: "http://www.w3.org/ns/ldp#Resource";
    readonly contains: "http://www.w3.org/ns/ldp#contains";
};
/** @hidden */
export declare const foaf: {
    readonly Agent: "http://xmlns.com/foaf/0.1/Agent";
};
/** @hidden */
export declare const acp: {
    readonly AccessControlResource: "http://www.w3.org/ns/solid/acp#AccessControlResource";
    readonly Policy: "http://www.w3.org/ns/solid/acp#Policy";
    readonly AccessControl: "http://www.w3.org/ns/solid/acp#AccessControl";
    readonly Read: "http://www.w3.org/ns/solid/acp#Read";
    readonly Append: "http://www.w3.org/ns/solid/acp#Append";
    readonly Write: "http://www.w3.org/ns/solid/acp#Write";
    /** @deprecated Removed from the ACP proposal, to be replaced by Matchers. */
    readonly Rule: "http://www.w3.org/ns/solid/acp#Rule";
    readonly Matcher: "http://www.w3.org/ns/solid/acp#Matcher";
    readonly accessControl: "http://www.w3.org/ns/solid/acp#accessControl";
    readonly apply: "http://www.w3.org/ns/solid/acp#apply";
    readonly applyMembers: "http://www.w3.org/ns/solid/acp#applyMembers";
    readonly allow: "http://www.w3.org/ns/solid/acp#allow";
    readonly deny: "http://www.w3.org/ns/solid/acp#deny";
    readonly allOf: "http://www.w3.org/ns/solid/acp#allOf";
    readonly anyOf: "http://www.w3.org/ns/solid/acp#anyOf";
    readonly noneOf: "http://www.w3.org/ns/solid/acp#noneOf";
    readonly access: "http://www.w3.org/ns/solid/acp#access";
    readonly accessMembers: "http://www.w3.org/ns/solid/acp#accessMembers";
    readonly agent: "http://www.w3.org/ns/solid/acp#agent";
    readonly group: "http://www.w3.org/ns/solid/acp#group";
    readonly client: "http://www.w3.org/ns/solid/acp#client";
    readonly PublicAgent: "http://www.w3.org/ns/solid/acp#PublicAgent";
    readonly AuthenticatedAgent: "http://www.w3.org/ns/solid/acp#AuthenticatedAgent";
    readonly CreatorAgent: "http://www.w3.org/ns/solid/acp#CreatorAgent";
};
/** @hidden */
export declare const solid: {
    readonly PublicOidcClient: "http://www.w3.org/ns/solid/terms#PublicOidcClient";
};
/** @hidden */
export declare const security: {
    readonly publicKey: "https://w3id.org/security#publicKey";
};
/** @hidden */
export declare const pim: {
    readonly storage: "http://www.w3.org/ns/pim/space#storage";
};
