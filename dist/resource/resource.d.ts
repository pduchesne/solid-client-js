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
import { UrlString, Url, WebId, Resource, WithServerResourceInfo, WithResourceInfo, SolidClientError, LinkedResourceUrlAll, EffectiveAccess } from "../interfaces";
/** @ignore For internal use only. */
export declare const internal_defaultFetchOptions: {
    fetch: ((input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>) & typeof globalThis.fetch;
};
/**
 * Retrieve the information about a resource (e.g. access permissions) without
 * fetching the resource itself.
 *
 * @param url URL to fetch Resource metadata from.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters).
 * @returns Promise resolving to the metadata describing the given Resource, or rejecting if fetching it failed.
 * @since 0.4.0
 */
export declare function getResourceInfo(url: UrlString, options?: Partial<typeof internal_defaultFetchOptions>): Promise<WithServerResourceInfo>;
/**
 * Parse Solid metadata from a Response obtained by fetching a Resource from a Solid Pod,
 *
 * @param response A Fetch API Response. See {@link https://developer.mozilla.org/en-US/docs/Web/API/Response MDN}.
 * @returns Resource metadata readable by functions such as [[getSourceUrl]].
 * @hidden This interface is not exposed yet until we've tried it out in practice.
 */
export declare function responseToResourceInfo(response: Response): WithServerResourceInfo;
/**
 * @param resource Resource for which to check whether it is a Container.
 * @returns Whether `resource` is a Container.
 */
export declare function isContainer(resource: Url | UrlString | WithResourceInfo): boolean;
/**
 * This function will tell you whether a given Resource contains raw data, or a SolidDataset.
 *
 * @param resource Resource for which to check whether it contains raw data.
 * @return Whether `resource` contains raw data.
 */
export declare function isRawData(resource: WithResourceInfo): boolean;
/**
 * @param resource Resource for which to determine the Content Type.
 * @returns The Content Type, if known, or null if not known.
 */
export declare function getContentType(resource: WithResourceInfo): string | null;
/**
 * @param resource
 * @returns The URL from which the Resource has been fetched, or null if it is not known.
 */
export declare function getSourceUrl(resource: WithResourceInfo): string;
export declare function getSourceUrl(resource: Resource): string | null;
/** @hidden Alias of getSourceUrl for those who prefer to use IRI terminology. */
export declare const getSourceIri: typeof getSourceUrl;
/**
 * Given a Resource that exposes information about the owner of the Pod it is in, returns the WebID of that owner.
 *
 * Data about the owner of the Pod is exposed when the following conditions hold:
 * - The Pod server supports exposing the Pod owner
 * - The current user is allowed to see who the Pod owner is.
 *
 * If one or more of those conditions are false, this function will return `null`.
 *
 * @param resource A Resource that contains information about the owner of the Pod it is in.
 * @returns The WebID of the owner of the Pod the Resource is in, if provided, or `null` if not.
 * @since 0.6.0
 */
export declare function getPodOwner(resource: WithServerResourceInfo): WebId | null;
/**
 * Given a WebID and a Resource that exposes information about the owner of the Pod it is in, returns whether the given WebID is the owner of the Pod.
 *
 * Data about the owner of the Pod is exposed when the following conditions hold:
 * - The Pod server supports exposing the Pod owner
 * - The current user is allowed to see who the Pod owner is.
 *
 * If one or more of those conditions are false, this function will return `null`.
 *
 * @param webId The WebID of which to check whether it is the Pod Owner's.
 * @param resource A Resource that contains information about the owner of the Pod it is in.
 * @returns Whether the given WebID is the Pod Owner's, if the Pod Owner is exposed, or `null` if it is not exposed.
 * @since 0.6.0
 */
export declare function isPodOwner(webId: WebId, resource: WithServerResourceInfo): boolean | null;
/**
 * Get the URLs of Resources linked to the given Resource.
 *
 * Solid servers can link Resources to each other. For example, in servers
 * implementing Web Access Control, Resources can have an Access Control List
 * Resource linked to it via the `acl` relation.
 *
 * @param resource A Resource fetched from a Solid Pod.
 * @returns The URLs of Resources linked to the given Resource, indexed by the key that links them.
 * @since 1.7.0
 */
export declare function getLinkedResourceUrlAll(resource: WithServerResourceInfo): LinkedResourceUrlAll;
/**
 * Get what access the current user has to the given Resource.
 *
 * This function can tell you what access the current user has for the given
 * Resource, allowing you to e.g. determine that changes to it will be rejected
 * before attempting to do so.
 * Additionally, for servers adhering to the Web Access Control specification,
 * it will tell you what access unauthenticated users have to the given Resource.
 *
 * @param resource A Resource fetched from a Solid Pod.
 * @returns What access the current user and, if supported by the server, unauthenticated users have to the given Resource.
 * @since 1.7.0
 */
export declare function getEffectiveAccess(resource: WithServerResourceInfo): EffectiveAccess;
/**
 * Extends the regular JavaScript error object with access to the status code and status message.
 * @since 1.2.0
 */
export declare class FetchError extends SolidClientError {
    /** @since 1.3.0 */
    readonly response: Response & {
        ok: false;
    };
    get statusCode(): number;
    get statusText(): string | undefined;
    constructor(message: string, errorResponse: Response & {
        ok: false;
    });
}
