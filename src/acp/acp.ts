/**
 * Copyright 2020 Inrupt Inc.
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

import { acp } from "../constants";
import {
  SolidDataset,
  File,
  Url,
  UrlString,
  WithServerResourceInfo,
  WithResourceInfo,
} from "../interfaces";
import { internal_toIriString } from "../interfaces.internal";
import { getFile } from "../resource/file";
import {
  getResourceInfo,
  getSourceUrl,
  internal_defaultFetchOptions,
} from "../resource/resource";
import { hasAccessibleAcl, WithAcl } from "../acl/acl";
import { internal_fetchAcl } from "../acl/acl.internal";
import { getSolidDataset, saveSolidDatasetAt } from "../resource/solidDataset";
import {
  AccessControlResource,
  getAcrPolicyUrlAll,
  getMemberAcrPolicyUrlAll,
  getMemberPolicyUrlAll,
  getPolicyUrlAll,
  hasLinkedAcr,
} from "./control";
import { internal_getAcr, internal_setAcr } from "./control.internal";

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
 */
export async function getSolidDatasetWithAcr(
  url: Url | UrlString,
  options: Partial<
    typeof internal_defaultFetchOptions
  > = internal_defaultFetchOptions
): Promise<SolidDataset & WithAcp> {
  const urlString = internal_toIriString(url);
  const config = {
    ...internal_defaultFetchOptions,
    ...options,
  };

  const solidDataset = await getSolidDataset(urlString, config);
  const acp = await fetchAcr(solidDataset, config);
  return Object.assign(solidDataset, acp);
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
 */
export async function getFileWithAcr(
  url: Url | UrlString,
  options: Partial<
    typeof internal_defaultFetchOptions
  > = internal_defaultFetchOptions
): Promise<File & WithAcp> {
  const urlString = internal_toIriString(url);
  const config = {
    ...internal_defaultFetchOptions,
    ...options,
  };

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
 */
export async function getResourceInfoWithAcr(
  url: Url | UrlString,
  options: Partial<
    typeof internal_defaultFetchOptions
  > = internal_defaultFetchOptions
): Promise<WithServerResourceInfo & WithAcp> {
  const urlString = internal_toIriString(url);
  const config = {
    ...internal_defaultFetchOptions,
    ...options,
  };

  const resourceInfo = await getResourceInfo(urlString, config);
  const acp = await fetchAcr(resourceInfo, config);
  return Object.assign(resourceInfo, acp);
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
 */
export async function getSolidDatasetWithAccessDatasets(
  url: Url | UrlString,
  options: Partial<
    typeof internal_defaultFetchOptions
  > = internal_defaultFetchOptions
): Promise<SolidDataset & (WithAcp | WithAcl)> {
  const urlString = internal_toIriString(url);
  const config = {
    ...internal_defaultFetchOptions,
    ...options,
  };

  const solidDataset = await getSolidDataset(urlString, config);
  if (hasAccessibleAcl(solidDataset)) {
    const acl = await internal_fetchAcl(solidDataset, config);
    return Object.assign(solidDataset, { internal_acl: acl });
  } else {
    const acr = await fetchAcr(solidDataset, config);
    return Object.assign(solidDataset, acr);
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
 */
export async function getFileWithAccessDatasets(
  url: Url | UrlString,
  options: Partial<
    typeof internal_defaultFetchOptions
  > = internal_defaultFetchOptions
): Promise<File & (WithAcp | WithAcl)> {
  const urlString = internal_toIriString(url);
  const config = {
    ...internal_defaultFetchOptions,
    ...options,
  };

  const file = await getFile(urlString, config);
  if (hasAccessibleAcl(file)) {
    const acl = await internal_fetchAcl(file, config);
    return Object.assign(file, { internal_acl: acl });
  } else {
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
 */
export async function getResourceInfoWithAccessDatasets(
  url: Url | UrlString,
  options: Partial<
    typeof internal_defaultFetchOptions
  > = internal_defaultFetchOptions
): Promise<WithServerResourceInfo & (WithAcp | WithAcl)> {
  const urlString = internal_toIriString(url);
  const config = {
    ...internal_defaultFetchOptions,
    ...options,
  };

  const resourceInfo = await getResourceInfo(urlString, config);
  if (hasAccessibleAcl(resourceInfo)) {
    const acl = await internal_fetchAcl(resourceInfo, config);
    return Object.assign(resourceInfo, { internal_acl: acl });
  } else {
    const acr = await fetchAcr(resourceInfo, config);
    return Object.assign(resourceInfo, acr);
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
 */
export async function saveAcrFor<ResourceExt extends WithAccessibleAcr>(
  resource: ResourceExt,
  options: Partial<
    typeof internal_defaultFetchOptions
  > = internal_defaultFetchOptions
): Promise<ResourceExt> {
  const acr = internal_getAcr(resource);
  const config = {
    ...internal_defaultFetchOptions,
    ...options,
  };

  const savedAcr = await saveSolidDatasetAt(getSourceUrl(acr), acr, config);

  return internal_setAcr(resource, savedAcr);
}

export type WithAcp = {
  internal_acp: {
    acr: AccessControlResource | null;
  };
};
export type WithAccessibleAcr = WithAcp & {
  internal_acp: {
    acr: Exclude<WithAcp["internal_acp"]["acr"], null>;
  };
};

/**
 * @param resource Resource of which to check whether it has an Access Control Resource attached.
 * @returns Boolean representing whether the given Resource has an Access Control Resource attached for use in e.g. [[getControl]].
 */
export function hasAccessibleAcr(
  resource: WithAcp
): resource is WithAccessibleAcr {
  return (
    typeof resource.internal_acp === "object" &&
    typeof resource.internal_acp.acr === "object"
  );
}

async function fetchAcr(
  resource: WithServerResourceInfo,
  options: Partial<typeof internal_defaultFetchOptions>
): Promise<WithAcp> {
  if (!hasLinkedAcr(resource)) {
    return {
      internal_acp: {
        acr: null,
      },
    };
  }
  let acr: SolidDataset & WithResourceInfo;
  try {
    acr = await getSolidDataset(
      // Whereas a Resource can generally have multiple linked Resources for the same relation,
      // it can only have one Access Control Resource for that ACR to be valid.
      // Hence the accessing of [0] directly:
      resource.internal_resourceInfo.linkedResources[acp.accessControl][0],
      options
    );
  } catch (e: unknown) {
    return {
      internal_acp: {
        acr: null,
      },
    };
  }

  const resourceUrl = getSourceUrl(resource);
  const acrUrl = getSourceUrl(acr);
  const acrDataset: AccessControlResource = Object.assign(acr, {
    accessTo: getSourceUrl(resource),
  });
  const acpInfo: WithAccessibleAcr = {
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
 */
export function getReferencedPolicyUrlAll(
  withAcr: WithAccessibleAcr
): UrlString[] {
  const policyUrls: UrlString[] = getPolicyUrlAll(withAcr)
    .map(getResourceUrl)
    .concat(getMemberPolicyUrlAll(withAcr).map(getResourceUrl))
    .concat(getAcrPolicyUrlAll(withAcr).map(getResourceUrl))
    .concat(getMemberAcrPolicyUrlAll(withAcr).map(getResourceUrl));

  const uniqueUrls = Array.from(new Set(policyUrls));
  return uniqueUrls;
}

/**
 * To verify whether two URLs are at the same location, we need to strip the hash.
 * This function does that.
 */
function getResourceUrl(urlWithHash: UrlString): UrlString {
  const url = new URL(urlWithHash);
  url.hash = "";
  return url.href;
}
