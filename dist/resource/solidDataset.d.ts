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
import { Quad } from "@rdfjs/types";
import { UrlString, WithResourceInfo, Url, WithServerResourceInfo, SolidDataset, WithChangeLog } from "../interfaces";
import { internal_defaultFetchOptions } from "./resource";
/**
 * Initialise a new [[SolidDataset]] in memory.
 *
 * @returns An empty [[SolidDataset]].
 */
export declare function createSolidDataset(): SolidDataset;
/**
 * A Parser takes a string and generates {@link https://rdf.js.org/data-model-spec/|RDF/JS Quads}.
 *
 * By providing an object conforming to the `Parser` interface, you can handle
 * RDF serialisations other than `text/turtle`, which `@inrupt/solid-client`
 * supports by default. This can be useful to retrieve RDF data from sources
 * other than a Solid Pod.
 *
 * A Parser has the following properties:
 * - `onQuad`: Registers the callback with which parsed
 * {@link https://rdf.js.org/data-model-spec/|RDF/JS Quads} can be provided to
 * `@inrupt/solid-client`.
 * - `onError`: Registers the callback with which `@inrupt/solid-client` can be
 * notified of errors parsing the input.
 * - `onComplete`: Registers the callback with which `@inrupt/solid-client` can
 * be notified that parsing is complete.
 * - `parse`: Accepts the serialised input string and an object containing the
 * input Resource's metadata.
 * The input metadata can be read using functions like [[getSourceUrl]] and
 * [[getContentType]].
 *
 * For example, the following defines a parser that reads an RDFa serialisation
 * using the
 * [rdfa-streaming-parser](https://www.npmjs.com/package/rdfa-streaming-parser)
 * library:
 *
 * ```javascript
 * import { RdfaParser } from "rdfa-streaming-parser";
 *
 * // ...
 *
 * const getRdfaParser = () => {
 *   const onQuadCallbacks = [];
 *   const onCompleteCallbacks = [];
 *   const onErrorCallbacks = [];
 *
 *   return {
 *     onQuad: (callback) => onQuadCallbacks.push(callback),
 *     onError: (callback) => onErrorCallbacks.push(callback),
 *     onComplete: (callback) => onCompleteCallbacks.push(callback),
 *     parse: async (source, resourceInfo) => {
 *       const parser = new RdfaParser({
 *         baseIRI: getSourceUrl(resourceInfo),
 *         contentType: getContentType(resourceInfo) ?? "text/html",
 *       });
 *       parser.on("data", (quad) => {
 *         onQuadCallbacks.forEach((callback) => callback(quad));
 *       });
 *       parser.on("error", (error) => {
 *         onErrorCallbacks.forEach((callback) => callback(error));
 *       });
 *       parser.write(source);
 *       parser.end();
 *       onCompleteCallbacks.forEach((callback) => callback());
 *     },
 *   };
 * };
 * ```
 */
export declare type Parser = {
    onQuad: (onQuadCallback: (quad: Quad) => void) => void;
    onError: (onErrorCallback: (error: unknown) => void) => void;
    onComplete: (onCompleteCallback: () => void) => void;
    parse: (source: string, resourceInfo: WithServerResourceInfo) => void;
};
declare type ContentType = string;
/**
 * Custom parsers to load [[SolidDataset]]s serialised in different RDF formats.
 *
 * Provide your own parsers by providing an object on the `parsers` property
 * with the supported content type as the key, and the parser as a value.
 * For documentation on how to provide a parser, see [[Parser]].
 */
export declare type ParseOptions = {
    parsers: Record<ContentType, Parser>;
};
/**
 * @hidden This interface is not exposed yet until we've tried it out in practice.
 */
export declare function responseToSolidDataset(response: Response, parseOptions?: Partial<ParseOptions>): Promise<SolidDataset & WithServerResourceInfo>;
/**
 * Fetch a SolidDataset from the given URL. Currently requires the SolidDataset to be available as [Turtle](https://www.w3.org/TR/turtle/).
 *
 * @param url URL to fetch a [[SolidDataset]] from.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns Promise resolving to a [[SolidDataset]] containing the data at the given Resource, or rejecting if fetching it failed.
 */
export declare function getSolidDataset(url: UrlString | Url, options?: Partial<typeof internal_defaultFetchOptions & ParseOptions>): Promise<SolidDataset & WithServerResourceInfo>;
/**
 * Given a SolidDataset, store it in a Solid Pod (overwriting the existing data at the given URL).
 *
 * A SolidDataset keeps track of the data changes compared to the data in the Pod; i.e.,
 * the changelog tracks both the old value and new values of the property being modified. This
 * function applies the changes to the current SolidDataset. If the old value specified in the
 * changelog does not correspond to the value currently in the Pod, this function will throw an
 * error.
 * The SolidDataset returned by this function will contain the data sent to the Pod, and a ChangeLog
 * up-to-date with the saved data. Note that if the data on the server was modified in between the
 * first fetch and saving it, the updated data will not be reflected in the returned SolidDataset.
 * To make sure you have the latest data, call [[getSolidDataset]] again after saving the data.
 *
 * The Solid server will create any intermediary Containers that do not exist yet, so they do not
 * need to be created in advance. For example, if the target URL is
 * https://example.pod/container/resource and https://example.pod/container/ does not exist yet,
 * it will exist after this function resolves successfully.
 *
 * @param url URL to save `solidDataset` to.
 * @param solidDataset The [[SolidDataset]] to save.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns A Promise resolving to a [[SolidDataset]] containing the stored data, or rejecting if saving it failed.
 */
export declare function saveSolidDatasetAt<Dataset extends SolidDataset>(url: UrlString | Url, solidDataset: Dataset, options?: Partial<typeof internal_defaultFetchOptions>): Promise<Dataset & WithServerResourceInfo & WithChangeLog>;
/**
 * Deletes the SolidDataset at a given URL.
 *
 * If operating on a container, the container must be empty otherwise a 409 CONFLICT will be raised.
 *
 * @param file The (URL of the) SolidDataset to delete
 * @since 0.6.0
 */
export declare function deleteSolidDataset(solidDataset: Url | UrlString | WithResourceInfo, options?: Partial<typeof internal_defaultFetchOptions>): Promise<void>;
/**
 * Create an empty Container at the given URL.
 *
 * Throws an error if creating the Container failed, e.g. because the current user does not have
 * permissions to, or because the Container already exists.
 *
 * Note that a Solid server will automatically create the necessary Containers when storing a
 * Resource; i.e. there is no need to call this function if it is immediately followed by
 * [[saveSolidDatasetAt]] or [[overwriteFile]].
 *
 * @param url URL of the empty Container that is to be created.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @since 0.2.0
 */
export declare function createContainerAt(url: UrlString | Url, options?: Partial<typeof internal_defaultFetchOptions>): Promise<SolidDataset & WithServerResourceInfo>;
/**
 * Unfortunately Node Solid Server does not confirm to the Solid spec when it comes to Container
 * creation. When we make the (valid, according to the Solid protocol) request to create a
 * Container, NSS responds with the following exact error message. Thus, when we encounter exactly
 * this message, we use an NSS-specific workaround ([[createContainerWithNssWorkaroundAt]]). Both
 * this constant and that workaround should be removed once the NSS issue has been fixed and
 * no versions of NSS with the issue are in common use/supported anymore.
 *
 * @see https://github.com/solid/node-solid-server/issues/1465
 * @internal
 */
export declare const internal_NSS_CREATE_CONTAINER_SPEC_NONCOMPLIANCE_DETECTION_ERROR_MESSAGE_TO_WORKAROUND_THEIR_ISSUE_1465 = "Can't write file: PUT not supported on containers, use POST instead";
declare type SaveInContainerOptions = Partial<typeof internal_defaultFetchOptions & {
    slugSuggestion: string;
}>;
/**
 * Given a SolidDataset, store it in a Solid Pod in a new Resource inside a Container.
 *
 * The Container at the given URL should already exist; if it does not, you can initialise it first
 * using [[createContainerAt]], or directly save the SolidDataset at the desired location using
 * [[saveSolidDatasetAt]].
 *
 * This function is primarily useful if the current user does not have access to change existing files in
 * a Container, but is allowed to add new files; in other words, they have Append, but not Write
 * access to a Container. This is useful in situations where someone wants to allow others to,
 * for example, send notifications to their Pod, but not to view or delete existing notifications.
 * You can pass a suggestion for the new Resource's name, but the server may decide to give it
 * another name — for example, if a Resource with that name already exists inside the given
 * Container.
 * If the user does have access to write directly to a given location, [[saveSolidDatasetAt]]
 * will do the job just fine, and does not require the parent Container to exist in advance.
 *
 * @param containerUrl URL of the Container in which to create a new Resource.
 * @param solidDataset The [[SolidDataset]] to save to a new Resource in the given Container.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns A Promise resolving to a [[SolidDataset]] containing the saved data. The Promise rejects if the save failed.
 */
export declare function saveSolidDatasetInContainer(containerUrl: UrlString | Url, solidDataset: SolidDataset, options?: SaveInContainerOptions): Promise<SolidDataset & WithResourceInfo>;
/**
 * Create an empty Container inside the Container at the given URL.
 *
 * Throws an error if creating the Container failed, e.g. because the current user does not have
 * permissions to.
 *
 * The Container in which to create the new Container should itself already exist.
 *
 * This function is primarily useful if the current user does not have access to change existing files in
 * a Container, but is allowed to add new files; in other words, they have Append, but not Write
 * access to a Container. This is useful in situations where someone wants to allow others to,
 * for example, send notifications to their Pod, but not to view or delete existing notifications.
 * You can pass a suggestion for the new Resource's name, but the server may decide to give it
 * another name — for example, if a Resource with that name already exists inside the given
 * Container.
 * If the user does have access to write directly to a given location, [[createContainerAt]]
 * will do the job just fine, and does not require the parent Container to exist in advance.
 *
 * @param containerUrl URL of the Container in which the empty Container is to be created.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @since 0.2.0
 */
export declare function createContainerInContainer(containerUrl: UrlString | Url, options?: SaveInContainerOptions): Promise<SolidDataset & WithResourceInfo>;
/**
 * Deletes the Container at a given URL.
 *
 * @param file The (URL of the) Container to delete
 * @since 0.6.0
 */
export declare function deleteContainer(container: Url | UrlString | WithResourceInfo, options?: Partial<typeof internal_defaultFetchOptions>): Promise<void>;
/**
 * Given a [[SolidDataset]] representing a Container (see [[isContainer]]), fetch the URLs of all
 * contained resources.
 * If the solidDataset given is not a container, or is missing resourceInfo, throw an error.
 *
 * @param solidDataset The container from which to fetch all contained Resource URLs.
 * @returns A list of URLs, each of which points to a contained Resource of the given SolidDataset.
 * @since 1.3.0
 */
export declare function getContainedResourceUrlAll(solidDataset: SolidDataset & WithResourceInfo): UrlString[];
/**
 * Gets a human-readable representation of the given SolidDataset to aid debugging.
 *
 * Note that changes to the exact format of the return value are not considered a breaking change;
 * it is intended to aid in debugging, not as a serialisation method that can be reliably parsed.
 *
 * @param solidDataset The [[SolidDataset]] to get a human-readable representation of.
 * @since 0.3.0
 */
export declare function solidDatasetAsMarkdown(solidDataset: SolidDataset): string;
/**
 * Gets a human-readable representation of the local changes to a Resource to aid debugging.
 *
 * Note that changes to the exact format of the return value are not considered a breaking change;
 * it is intended to aid in debugging, not as a serialisation method that can be reliably parsed.
 *
 * @param solidDataset The Resource of which to get a human-readable representation of the changes applied to it locally.
 * @since 0.3.0
 */
export declare function changeLogAsMarkdown(solidDataset: SolidDataset & WithChangeLog): string;
/**
 * Fetch the contents of '.well-known/solid' for a given resource URL.
 *
 * The contents of the '.well-known/solid' endpoint define the capabilities of the server, and provide their associated endpoints/locations.
 * This behaves similarly to the use of '.well-known' endpoints in e.g. (OIDC servers)[https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig]
 *
 * @param url URL of a Resource.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns Promise resolving to a [[SolidDataset]] containing the data at '.well-known/solid' for the given Resource, or rejecting if fetching it failed.
 * @since 1.12.0
 */
export declare function getWellKnownSolid(url: UrlString | Url, options?: Partial<typeof internal_defaultFetchOptions & ParseOptions>): Promise<SolidDataset & WithServerResourceInfo>;
export {};
