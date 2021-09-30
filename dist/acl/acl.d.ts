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
import { WithResourceInfo, File, WithServerResourceInfo, UrlString, Url, SolidDataset, Thing } from "../interfaces";
import { internal_defaultFetchOptions } from "../resource/resource";
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Verify whether a given SolidDataset was fetched together with its Access Control List.
 *
 * @param dataset A [[SolidDataset]] that may have its ACLs attached.
 * @returns True if `dataset` was fetched together with its ACLs.
 */
export declare function hasAcl<T extends object>(dataset: T): dataset is T & WithAcl;
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Verifies whether the given Resource has a resource ACL (Access Control List) attached.
 *
 * The [[hasResourceAcl]] function checks that:
 * - a given Resource has a resource ACL attached, and
 * - the user calling [[hasResourceAcl]] has Control access to the Resource.
 *
 * To retrieve a Resource with its ACLs, see [[getSolidDatasetWithAcl]].
 *
 * @param resource A Resource that might have an ACL attached.
 * @returns `true` if the Resource has a resource ACL attached that is accessible by the user.
 */
export declare function hasResourceAcl<Resource extends WithAcl & WithServerResourceInfo>(resource: Resource): resource is Resource & WithResourceAcl & WithAccessibleAcl;
/**
 * Experimental: fetch a SolidDataset and its associated Access Control List.
 *
 * This is an experimental function that fetches both a Resource, the linked ACL Resource (if
 * available), and the ACL that applies to it if the linked ACL Resource is not available. This can
 * result in many HTTP requests being executed, in lieu of the Solid spec mandating servers to
 * provide this info in a single request. Therefore, and because this function is still
 * experimental, prefer [[getSolidDataset]] instead.
 *
 * If the Resource does not advertise the ACL Resource (because the authenticated user does not have
 * access to it), the `acl` property in the returned value will be null. `acl.resourceAcl` will be
 * undefined if the Resource's linked ACL Resource could not be fetched (because it does not exist),
 * and `acl.fallbackAcl` will be null if the applicable Container's ACL is not accessible to the
 * authenticated user.
 *
 * @param url URL of the SolidDataset to fetch.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns A SolidDataset and the ACLs that apply to it, if available to the authenticated user.
 */
export declare function getSolidDatasetWithAcl(url: UrlString | Url, options?: Partial<typeof internal_defaultFetchOptions>): Promise<SolidDataset & WithServerResourceInfo & WithAcl>;
/**
 * ```{note} This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Retrieves a file, its resource ACL (Access Control List) if available,
 * and its fallback ACL from a URL and returns them as a blob.
 *
 * If the user calling the function does not have access to the file's resource ACL,
 * [[hasAccessibleAcl]] on the returned blob returns false.
 * If the user has access to the file's resource ACL but the resource ACL does not exist,
 * [[getResourceAcl]] on the returned blob returns null.
 * If the fallback ACL is inaccessible by the user,
 * [[getFallbackAcl]] on the returned blob returns null.
 *
 * ```{tip}
 * To retrieve the ACLs, the function results in multiple HTTP requests rather than a single
 * request as mandated by the Solid spec. As such, prefer [[getFile]] instead if you do not need the ACL.
 * ```
 *
 * @param url The URL of the fetched file
 * @param options Fetching options: a custom fetcher and/or headers.
 * @returns A file and its ACLs, if available to the authenticated user, as a blob.
 * @since 0.2.0
 */
export declare function getFileWithAcl(input: Url | UrlString, options?: Partial<typeof internal_defaultFetchOptions>): Promise<File & WithServerResourceInfo & WithAcl>;
/**
 * Experimental: fetch a Resource's metadata and its associated Access Control List.
 *
 * This is an experimental function that fetches both a Resource's metadata, the linked ACL Resource (if
 * available), and the ACL that applies to it if the linked ACL Resource is not available (if accessible). This can
 * result in many HTTP requests being executed, in lieu of the Solid spec mandating servers to
 * provide this info in a single request.
 *
 * If the Resource's linked ACL Resource could not be fetched (because it does not exist, or because
 * the authenticated user does not have access to it), `acl.resourceAcl` will be `null`. If the
 * applicable Container's ACL is not accessible to the authenticated user, `acl.fallbackAcl` will be
 * `null`.
 *
 * @param url URL of the SolidDataset to fetch.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns A Resource's metadata and the ACLs that apply to the Resource, if available to the authenticated user.
 */
export declare function getResourceInfoWithAcl(url: UrlString, options?: Partial<typeof internal_defaultFetchOptions>): Promise<WithServerResourceInfo & WithAcl>;
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 * Returns the resource ACL (Access Control List) attached to a Resource.
 *
 * If the Resource has its resource ACL attached and is accessible by the user
 * (see [[hasResourceAcl]]), the function returns the resource ACL.
 * If the Resource does not have a resource ACL attached or is inaccessible by the user,
 * the function returns `null`.
 *
 * @param resource A Resource with potentially an ACL attached.
 * @returns The resource ACL if available and `null` if not.
 */
export declare function getResourceAcl(resource: WithAcl & WithServerResourceInfo & WithResourceAcl): AclDataset;
export declare function getResourceAcl(resource: WithAcl & WithServerResourceInfo): AclDataset | null;
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Verifies whether the given Resource has a fallback ACL (Access Control List) attached.
 *
 * A fallback ACL for a Resource is inherited from the Resource's parent Container
 * (or another of its ancestor Containers) and applies if the Resource does
 * not have its own resource ACL.
 *
 * The [[hasFallbackAcl]] function checks that:
 * - a given Resource has a fallback ACL attached, and
 * - the user calling [[hasFallbackAcl]] has Control access to the Container
 * from which the Resource inherits its ACL.
 *
 * To retrieve a Resource with its ACLs, see [[getSolidDatasetWithAcl]].
 *
 * @param resource A [[SolidDataset]] that might have a fallback ACL attached.
 *
 * @returns `true` if the Resource has a fallback ACL attached that is accessible to the user.
 */
export declare function hasFallbackAcl<Resource extends WithAcl>(resource: Resource): resource is Resource & WithFallbackAcl;
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Returns the fallback ACL (Access Control List) attached to a Resource.
 *
 * If the Resource has a fallback ACL attached and is accessible by the user
 * (see [[hasFallbackAcl]]), the function returns the fallback ACL.
 * If the Resource does not hava a fallback ACL attached or is inaccessible by the user,
 * the function returns `null`.
 *
 * @param resource A Resource with potentially a fallback ACL attached.
 * @returns The fallback ACL if available or `null` if not.
 */
export declare function getFallbackAcl(resource: WithFallbackAcl): AclDataset;
export declare function getFallbackAcl(dataset: WithAcl): AclDataset | null;
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Creates an empty resource ACL (Access Control List) for a given Resource.
 *
 * @param targetResource A Resource that does not have its own ACL yet (see [[hasResourceAcl]]).
 * @returns An empty resource ACL for the given Resource.
 */
export declare function createAcl(targetResource: WithResourceInfo & WithAccessibleAcl): AclDataset;
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Creates a resource ACL (Access Control List), initialised from the fallback ACL
 * inherited from the given Resource's Container (or another of its ancestor Containers).
 * That is, the new ACL has the same rules/entries as the fallback ACL that currently
 * applies to the Resource.
 *
 * @param resource A Resource without its own resource ACL (see [[hasResourceAcl]]) but with an accessible fallback ACL (see [[hasFallbackAcl]]).
 * @returns A resource ACL initialised with the rules/entries from the Resource's fallback ACL.
 */
export declare function createAclFromFallbackAcl(resource: WithFallbackAcl & WithServerResourceInfo & WithAccessibleAcl): AclDataset;
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Saves the resource ACL for a Resource.
 *
 * @param resource The Resource to which the given resource ACL applies.
 * @param resourceAcl An [[AclDataset]] whose ACL Rules will apply to `resource`.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 */
export declare function saveAclFor(resource: WithAccessibleAcl, resourceAcl: SolidDataset, options?: Partial<typeof internal_defaultFetchOptions>): Promise<AclDataset & WithResourceInfo>;
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Removes the resource ACL (Access Control List) from a Resource.
 *
 * Once the resource ACL is removed from the Resource, the Resource relies on the
 * fallback ACL inherited from the Resource's parent Container (or another of its ancestor Containers).
 *
 * @param resource The Resource for which you want to delete the ACL.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 */
export declare function deleteAclFor<Resource extends WithResourceInfo & WithAccessibleAcl>(resource: Resource, options?: Partial<typeof internal_defaultFetchOptions>): Promise<Resource & {
    acl: {
        resourceAcl: null;
    };
}>;
/**
 * A [[SolidDataset]] containing Access Control rules for another SolidDataset.
 *
 * Please note that the Web Access Control specification is not yet finalised, and hence, this
 * function is still experimental and can change in a non-major release.
 */
export declare type AclDataset = SolidDataset & WithResourceInfo & {
    internal_accessTo: UrlString;
};
/**
 * @hidden Developers shouldn't need to directly access ACL rules. Instead, we provide our own functions that verify what access someone has.
 */
export declare type AclRule = Thing;
/**
 * An object with the boolean properties `read`, `append`, `write` and `control`, representing the
 * respective Access Modes defined by the Web Access Control specification.
 *
 * Since that specification is not finalised yet, this interface is still experimental.
 */
export declare type Access = {
    read: boolean;
    append: boolean;
    write: boolean;
    control: boolean;
};
/**
 * Please note that the Web Access Control specification is not yet finalised, and hence, this
 * function is still experimental and can change in a non-major release.
 *
 * @hidden Developers should use [[getResourceAcl]] and [[getFallbackAcl]] to access these.
 */
export declare type WithAcl = {
    internal_acl: {
        resourceAcl: AclDataset;
        fallbackAcl: null;
    } | {
        resourceAcl: null;
        fallbackAcl: AclDataset | null;
    };
};
/**
 * If this type applies to a Resource, an Access Control List that applies to it exists and is accessible to the currently authenticated user.
 *
 * Please note that the Web Access Control specification is not yet finalised, and hence, this
 * function is still experimental and can change in a non-major release.
 */
export declare type WithResourceAcl<ResourceExt extends WithAcl = WithAcl> = ResourceExt & {
    internal_acl: {
        resourceAcl: Exclude<WithAcl["internal_acl"]["resourceAcl"], null>;
    };
};
/**
 * If this type applies to a Resource, the Access Control List that applies to its nearest Container with an ACL is accessible to the currently authenticated user.
 *
 * Please note that the Web Access Control specification is not yet finalised, and hence, this
 * function is still experimental and can change in a non-major release.
 */
export declare type WithFallbackAcl<ResourceExt extends WithAcl = WithAcl> = ResourceExt & {
    internal_acl: {
        fallbackAcl: Exclude<WithAcl["internal_acl"]["fallbackAcl"], null>;
    };
};
/**
 * If this type applies to a Resource, its Access Control List, if it exists, is accessible to the currently authenticated user.
 *
 * Please note that the Web Access Control specification is not yet finalised, and hence, this
 * function is still experimental and can change in a non-major release.
 */
export declare type WithAccessibleAcl<ResourceExt extends WithServerResourceInfo = WithServerResourceInfo> = ResourceExt & {
    internal_resourceInfo: {
        aclUrl: Exclude<WithServerResourceInfo["internal_resourceInfo"]["aclUrl"], undefined>;
    };
};
/**
 * Given a [[SolidDataset]], verify whether its Access Control List is accessible to the current user.
 *
 * This should generally only be true for SolidDatasets fetched by
 * [[getSolidDatasetWithAcl]].
 *
 * Please note that the Web Access Control specification is not yet finalised, and hence, this
 * function is still experimental and can change in a non-major release.
 *
 * @param dataset A [[SolidDataset]].
 * @returns Whether the given `dataset` has a an ACL that is accessible to the current user.
 */
export declare function hasAccessibleAcl<ResourceExt extends WithServerResourceInfo>(dataset: ResourceExt): dataset is WithAccessibleAcl<ResourceExt>;
