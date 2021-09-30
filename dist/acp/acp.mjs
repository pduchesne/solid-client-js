import { acp } from '../constants.mjs';
import { internal_toIriString } from '../interfaces.internal.mjs';
import { getFile } from '../resource/file.mjs';
import { internal_defaultFetchOptions, getResourceInfo, getSourceUrl } from '../resource/resource.mjs';
import { hasAccessibleAcl } from '../acl/acl.mjs';
import { internal_fetchAcl, internal_setAcl } from '../acl/acl.internal.mjs';
import { getSolidDataset, saveSolidDatasetAt } from '../resource/solidDataset.mjs';
import { hasLinkedAcr, getPolicyUrlAll, getMemberPolicyUrlAll, getAcrPolicyUrlAll, getMemberAcrPolicyUrlAll } from './control.mjs';
import { internal_getAcr, internal_setAcr } from './control.internal.mjs';
import { normalizeServerSideIri } from '../resource/iri.internal.mjs';
import { isAcr } from './acp.internal.mjs';

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
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Fetch a SolidDataset and its associated Access Control Resource (if available to the current user).
 *
 * @param url URL of the SolidDataset to fetch.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns A SolidDataset and the ACR that applies to it, if available to the authenticated user.
 * @since 1.6.0
 */
async function getSolidDatasetWithAcr(url, options = internal_defaultFetchOptions) {
    const urlString = internal_toIriString(url);
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const solidDataset = await getSolidDataset(urlString, config);
    const acp = await fetchAcr(solidDataset, config);
    return Object.assign(Object.assign({}, solidDataset), acp);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Fetch a file and its associated Access Control Resource (if available to the current user).
 *
 * @param url URL of the file to fetch.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns A file and the ACR that applies to it, if available to the authenticated user.
 * @since 1.6.0
 */
async function getFileWithAcr(url, options = internal_defaultFetchOptions) {
    const urlString = internal_toIriString(url);
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const file = await getFile(urlString, config);
    const acp = await fetchAcr(file, config);
    return Object.assign(file, acp);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Retrieve information about a Resource and its associated Access Control Resource (if available to
 * the current user), without fetching the Resource itself.
 *
 * @param url URL of the Resource about which to fetch its information.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns Metadata describing a Resource, and the ACR that applies to it, if available to the authenticated user.
 * @since 1.6.0
 */
async function getResourceInfoWithAcr(url, options = internal_defaultFetchOptions) {
    const urlString = internal_toIriString(url);
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const resourceInfo = await getResourceInfo(urlString, config);
    const acp = await fetchAcr(resourceInfo, config);
    return Object.assign(Object.assign({}, resourceInfo), acp);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Fetch a SolidDataset, and:
 * - if the Resource is governed by an ACR: its associated Access Control Resource (if available to
 *                                          the current user), and all the Access Control Policies
 *                                          referred to therein, if available to the current user.
 * - if the Resource is governed by an ACL: its associated Resource ACL (if available to the current
 *                                          user), or its Fallback ACL if it does not exist.
 *
 * @param url URL of the SolidDataset to fetch.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns A SolidDataset and either the ACL access data or the ACR access data, if available to the current user.
 * @since 1.6.0
 */
async function getSolidDatasetWithAccessDatasets(url, options = internal_defaultFetchOptions) {
    const urlString = internal_toIriString(url);
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const solidDataset = await getSolidDataset(urlString, config);
    if (hasAccessibleAcl(solidDataset)) {
        const acl = await internal_fetchAcl(solidDataset, config);
        return internal_setAcl(solidDataset, acl);
    }
    else {
        const acr = await fetchAcr(solidDataset, config);
        return Object.assign(Object.assign({}, solidDataset), acr);
    }
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Fetch a File, and:
 * - if the Resource is governed by an ACR: its associated Access Control Resource (if available to
 *                                          the current user), and all the Access Control Policies
 *                                          referred to therein, if available to the current user.
 * - if the Resource is governed by an ACL: its associated Resource ACL (if available to the current
 *                                          user), or its Fallback ACL if it does not exist.
 *
 * @param url URL of the File to fetch.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns A File and either the ACL access data or the ACR access data, if available to the current user.
 * @since 1.6.0
 */
async function getFileWithAccessDatasets(url, options = internal_defaultFetchOptions) {
    const urlString = internal_toIriString(url);
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const file = await getFile(urlString, config);
    if (hasAccessibleAcl(file)) {
        const acl = await internal_fetchAcl(file, config);
        return internal_setAcl(file, acl);
    }
    else {
        const acr = await fetchAcr(file, config);
        return Object.assign(file, acr);
    }
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Fetch information about a Resource, and:
 * - if the Resource is governed by an ACR: its associated Access Control Resource (if available to
 *                                          the current user), and all the Access Control Policies
 *                                          referred to therein, if available to the current user.
 * - if the Resource is governed by an ACL: its associated Resource ACL (if available to the current
 *                                          user), or its Fallback ACL if it does not exist.
 *
 * @param url URL of the Resource information about which to fetch.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns Information about a Resource and either the ACL access data or the ACR access data, if available to the current user.
 * @since 1.6.0
 */
async function getResourceInfoWithAccessDatasets(url, options = internal_defaultFetchOptions) {
    const urlString = internal_toIriString(url);
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const resourceInfo = await getResourceInfo(urlString, config);
    if (hasAccessibleAcl(resourceInfo)) {
        const acl = await internal_fetchAcl(resourceInfo, config);
        return internal_setAcl(resourceInfo, acl);
    }
    else {
        const acr = await fetchAcr(resourceInfo, config);
        return Object.assign(Object.assign({}, resourceInfo), acr);
    }
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Save a Resource's Access Control Resource.
 *
 * @param resource Resource with an Access Control Resource that should be saved.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @since 1.6.0
 */
async function saveAcrFor(resource, options = internal_defaultFetchOptions) {
    const acr = internal_getAcr(resource);
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const savedAcr = await saveSolidDatasetAt(getSourceUrl(acr), acr, config);
    return internal_setAcr(resource, savedAcr);
}
/**
 * @param resource Resource of which to check whether it has an Access Control Resource attached.
 * @returns Boolean representing whether the given Resource has an Access Control Resource attached for use in e.g. [[getPolicyUrlAll]].
 * @since 1.6.0
 */
function hasAccessibleAcr(resource) {
    return (typeof resource.internal_acp === "object" &&
        resource.internal_acp !== null &&
        typeof resource.internal_acp.acr === "object" &&
        resource.internal_acp.acr !== null);
}
async function fetchAcr(resource, options) {
    let acrUrl = undefined;
    if (hasLinkedAcr(resource)) {
        // Whereas a Resource can generally have multiple linked Resources for the same relation,
        // it can only have one Access Control Resource for that ACR to be valid.
        // Hence the accessing of [0] directly:
        acrUrl =
            resource.internal_resourceInfo.linkedResources[acp.accessControl][0];
    }
    else if (hasAccessibleAcl(resource)) {
        // The ACP proposal will be updated to expose the Access Control Resource
        // via a Link header with rel="acl", just like WAC. That means that if
        // an ACL is advertised, we can still fetch its metadata — if that indicates
        // that it's actually an ACP Access Control Resource, then we can fetch that
        // instead.
        const aclResourceInfo = await getResourceInfo(resource.internal_resourceInfo.aclUrl, options);
        if (isAcr(aclResourceInfo)) {
            acrUrl = getSourceUrl(aclResourceInfo);
        }
    }
    // If the Resource doesn't advertise an ACR via the old Link header,
    // nor via a rel="acl" header, then return, indicating that no ACR could be
    // fetched:
    if (typeof acrUrl !== "string") {
        return {
            internal_acp: {
                acr: null,
            },
        };
    }
    let acr;
    try {
        acr = await getSolidDataset(acrUrl, options);
    }
    catch (e) {
        return {
            internal_acp: {
                acr: null,
            },
        };
    }
    const acrDataset = Object.assign(Object.assign({}, acr), { accessTo: getSourceUrl(resource) });
    const acpInfo = {
        internal_acp: {
            acr: acrDataset,
        },
    };
    return acpInfo;
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * To make it easy to fetch all the relevant Access Policy Resources,
 * this function returns all referenced Access Policy Resources referenced in an
 * Access Control Resource.
 * In other words, if Access Controls refer to different Policies in the same
 * Access Policy Resource, this function will only return that Access Policy
 * Resource's URL once.
 *
 * @param withAcr A Resource with an Access Control Resource attached.
 * @returns List of all unique Access Policy Resources that are referenced in the given Access Control Resource.
 * @since 1.6.0
 */
function getReferencedPolicyUrlAll(withAcr) {
    const policyUrls = getPolicyUrlAll(withAcr)
        .map(normalizeServerSideIri)
        .concat(getMemberPolicyUrlAll(withAcr).map(normalizeServerSideIri))
        .concat(getAcrPolicyUrlAll(withAcr).map(normalizeServerSideIri))
        .concat(getMemberAcrPolicyUrlAll(withAcr).map(normalizeServerSideIri));
    const uniqueUrls = Array.from(new Set(policyUrls));
    return uniqueUrls;
}

export { getFileWithAccessDatasets, getFileWithAcr, getReferencedPolicyUrlAll, getResourceInfoWithAccessDatasets, getResourceInfoWithAcr, getSolidDatasetWithAccessDatasets, getSolidDatasetWithAcr, hasAccessibleAcr, saveAcrFor };
