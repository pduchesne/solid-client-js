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
import { Iri, IriString, Jwk, Jwks, SolidDataset, UrlString, WebId, WithResourceInfo } from "../interfaces";
import { internal_defaultFetchOptions } from "../resource/resource";
/**
 * Set a JWKS IRI associated with a WebID in a profile document.
 *
 * @param profileDocument The profile document dataset.
 * @param webId The WebID associated with the profile document.
 * @param jwksIri The JWKS IRI to be set.
 * @returns A modified copy of the profile document, with the JWKS IRI set.
 * @since 1.12.0
 */
export declare function setProfileJwks<Dataset extends SolidDataset>(profileDocument: Dataset, webId: WebId, jwksIri: Iri | IriString): Dataset;
/**
 * Look for a JWKS IRI optionally advertized from a profile document.
 *
 * @param profileDocument The profile document.
 * @param webId The WebID featured in the profile document.
 * @returns The JWKS IRI associated with the WebID, if any.
 * @since 1.12.0
 */
export declare function getProfileJwksIri(profileDocument: SolidDataset, webId: WebId): UrlString | null;
/**
 * Fetch a JWKS at a given IRI, and add the given JWK to the obtained key set.
 *
 * @param jwk The JWK to add to the set.
 * @param jwksIri The IRI where the key set should be looked up.
 * @param options @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns Promise resolving to a JWKS where the given key has been added.
 * @since 1.12.0
 */
export declare function addJwkToJwks(jwk: Jwk, jwksIri: IriString, options?: Partial<typeof internal_defaultFetchOptions>): Promise<Jwks>;
/**
 * Adds a public key to the JWKS listed in the profile associated to the given WebID.
 * Retrieves the profile document for the specified WebID and looks up the associated
 * JWKS. Having added the given key to the JWKS, this function overwrites the
 * previous JWKS so that the new version is saved. This assumes the JWKS is hosted
 * at a read-write IRI, such as in a Solid Pod.
 *
 * @param publicKey The public key value to set.
 * @param webId The WebID whose profile document references the key set to which we wish to add the specified public key.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @since 1.12.0
 */
export declare function addPublicKeyToProfileJwks(publicKey: Jwk, webId: WebId, options?: Partial<typeof internal_defaultFetchOptions>): Promise<Blob & WithResourceInfo>;
