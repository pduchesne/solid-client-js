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
import { SolidDataset, ThingPersisted, Url, UrlString } from "../interfaces";
import { WithAccessibleAcr } from "./acp";
/**
 * A Policy can be applied to Resources to grant or deny [[AccessModes]] to users who match the Policy's [[Rule]]s.
 * @since 1.6.0
 */
export declare type Policy = ThingPersisted;
/**
 * A Resource Policy is like a regular [[Policy]], but rather than being re-used for different Resources, it is used for a single Resource and is stored in that Resource's Access Control Resource.
 * @since 1.6.0
 */
export declare type ResourcePolicy = ThingPersisted;
/**
 * The different Access Modes that a [[Policy]] can allow or deny for a Resource.
 * @since 1.6.0
 */
export declare type AccessModes = {
    read: boolean;
    append: boolean;
    write: boolean;
};
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Initialise a new, empty [[Policy]].
 *
 * @param url URL that identifies this Policy.
 * @since 1.6.0
 */
export declare function createPolicy(url: Url | UrlString): Policy;
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the [[Policy]] with the given URL from an [[SolidDataset]].
 *
 * @param policyResource The Resource that contains the given Policy.
 * @param url URL that identifies this Policy.
 * @returns The requested Policy, if it exists, or `null` if it does not.
 * @since 1.6.0
 */
export declare function getPolicy(policyResource: SolidDataset, url: Url | UrlString): Policy | null;
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get all [[Policy]]'s in a given [[SolidDataset]].
 *
 * @param policyResource The Resource that contains Access Policies.
 * @since 1.6.0
 */
export declare function getPolicyAll(policyResource: SolidDataset): Policy[];
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Remove the given [[Policy]] from the given [[SolidDataset]].
 *
 * @param policyResource The Resource that contains Access Policies.
 * @param policy The Policy to remove from the resource.
 * @since 1.6.0
 */
export declare function removePolicy<Dataset extends SolidDataset>(policyResource: Dataset, policy: Url | UrlString | Policy): Dataset;
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Insert the given [[Policy]] into the given [[SolidDataset]], replacing previous instances of that Policy.
 *
 * @param policyResource The Resource that contains Access Policies.
 * @param policy The Policy to insert into the Resource.
 * @returns A new dataset equal to the given resource, but with the given Policy.
 * @since 1.6.0
 */
export declare function setPolicy<Dataset extends SolidDataset>(policyResource: Dataset, policy: Policy): Dataset;
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Given a [[Policy]] and a set of [[AccessModes]], return a new Policy based on the given
 * Policy, but with the given Access Modes allowed on it.
 *
 * @param policy The Policy on which to set the modes to allow.
 * @param modes Modes to allow for this Policy.
 * @since Not released yet.
 */
export declare function setAllowModesV2<P extends Policy | ResourcePolicy>(policy: P, modes: AccessModes): P;
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Given a [[Policy]] and a set of [[AccessModes]], return a new Policy based on the given
 * Policy, but with the given Access Modes allowed on it.
 *
 * @param policy The Policy on which to set the modes to allow.
 * @param modes Modes to allow for this Policy.
 * @since 1.6.0
 * @deprecated The Access Control Policies proposal will be updated to use a different vocabulary for allow- and deny-modes. To be compatible with servers that implement that, use [[setAllowModesV2]].
 */
export declare function setAllowModesV1<P extends Policy | ResourcePolicy>(policy: P, modes: AccessModes): P;
/**
 * See [[setAllowModesV1]]. Will be updated to point to [[setAllowModesV2]] when pod.inrupt.com is transitioned to the updated vocabulary.
 */
export declare const setAllowModes: typeof setAllowModesV1;
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Given a [[Policy]], return which [[AccessModes]] it allows.
 *
 * @param policy The Policy for which you want to know the Access Modes it allows.
 * @since Not released yet.
 */
export declare function getAllowModesV2<P extends Policy | ResourcePolicy>(policy: P): AccessModes;
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Given a [[Policy]], return which [[AccessModes]] it allows.
 *
 * @param policy The Policy for which you want to know the Access Modes it allows.
 * @since 1.6.0
 * @deprecated The Access Control Policies proposal will be updated to use a different vocabulary for allow- and deny-modes. To be compatible with servers that implement that, use [[getAllowModesV2]].
 */
export declare function getAllowModesV1<P extends Policy | ResourcePolicy>(policy: P): AccessModes;
/**
 * See [[getAllowModesV1]]. Will be updated to point to [[getAllowModesV2]] when pod.inrupt.com is transitioned to the updated vocabulary.
 */
export declare const getAllowModes: typeof getAllowModesV1;
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Given a [[Policy]] and a set of [[AccessModes]], return a new Policy based on the given
 * Policy, but with the given Access Modes disallowed on it.
 *
 * @param policy The Policy on which to set the modes to disallow.
 * @param modes Modes to disallow for this Policy.
 * @since Not released yet.
 */
export declare function setDenyModesV2<P extends Policy | ResourcePolicy>(policy: P, modes: AccessModes): P;
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Given a [[Policy]] and a set of [[AccessModes]], return a new Policy based on the given
 * Policy, but with the given Access Modes disallowed on it.
 *
 * @param policy The Policy on which to set the modes to disallow.
 * @param modes Modes to disallow for this Policy.
 * @since 1.6.0
 * @deprecated The Access Control Policies proposal will be updated to use a different vocabulary for allow- and deny-modes. To be compatible with servers that implement that, use [[setDenyModesV2]].
 */
export declare function setDenyModesV1<P extends Policy | ResourcePolicy>(policy: P, modes: AccessModes): P;
/**
 * See [[setDenyModesV1]]. Will be updated to point to [[setDenyModesV2]] when pod.inrupt.com is transitioned to the updated vocabulary.
 */
export declare const setDenyModes: typeof setDenyModesV1;
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Given a [[Policy]], return which [[AccessModes]] it disallows.
 *
 * @param policy The Policy on which you want to know the Access Modes it disallows.
 * @since Not released yet.
 */
export declare function getDenyModesV2<P extends Policy | ResourcePolicy>(policy: P): AccessModes;
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Given a [[Policy]], return which [[AccessModes]] it disallows.
 *
 * @param policy The Policy on which you want to know the Access Modes it disallows.
 * @since 1.6.0
 * @deprecated The Access Control Policies proposal will be updated to use a different vocabulary for allow- and deny-modes. To be compatible with servers that implement that, use [[getDenyModesV2]].
 */
export declare function getDenyModesV1<P extends Policy | ResourcePolicy>(policy: P): AccessModes;
/**
 * See [[getDenyModesV1]]. Will be updated to point to [[getDenyModesV2]] when pod.inrupt.com is transitioned to the updated vocabulary.
 */
export declare const getDenyModes: typeof getDenyModesV1;
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Initialise a new, empty [[ResourcePolicy]] for the given Resource.
 *
 * @param resourceWithAcr The Resource to which the Policy is to apply.
 * @param name The name that identifies this Policy.
 * @since 1.6.0
 */
export declare function createResourcePolicyFor(resourceWithAcr: WithAccessibleAcr, name: string): ResourcePolicy;
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the [[ResourcePolicy]] with the given name that applies to a Resource
 * from its Access Control Resource.
 *
 * @param resourceWithAcr The Resource whose ACR contains the given Policy.
 * @param name The name that identifies this Policy.
 * @returns The requested Policy, if it exists and applies to the given Resource, or `null` if it does not.
 * @since 1.6.0
 */
export declare function getResourcePolicy(resourceWithAcr: WithAccessibleAcr, name: string): ResourcePolicy | null;
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the [[ResourcePolicy]] with the given name that applies to a Resource's
 * Access Control Resource from that Access Control Resource.
 *
 * @param resourceWithAcr The Resource whose ACR contains the given Policy.
 * @param name The name that identifies this Policy.
 * @returns The requested Policy, if it exists and applies to the Resource's ACR, or `null` if it does not.
 * @since 1.6.0
 */
export declare function getResourceAcrPolicy(resourceWithAcr: WithAccessibleAcr, name: string): ResourcePolicy | null;
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get all [[ResourcePolicy]]'s that apply to a Resource in its Access Control
 * Resource.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains Access Policies applying to it.
 * @since 1.6.0
 */
export declare function getResourcePolicyAll(resourceWithAcr: WithAccessibleAcr): ResourcePolicy[];
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get all [[ResourcePolicy]]'s that apply to a given Resource's Access Control
 * Resource from that Access Control Resource.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains Access Policies.
 * @since 1.6.0
 */
export declare function getResourceAcrPolicyAll(resourceWithAcr: WithAccessibleAcr): ResourcePolicy[];
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Remove the given [[ResourcePolicy]] from the given Resource's Access Control
 * Resource.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains Access Policies.
 * @param policy The Policy to remove from the Resource's Access Control Resource.
 * @since 1.6.0
 */
export declare function removeResourcePolicy<ResourceExt extends WithAccessibleAcr>(resourceWithAcr: ResourceExt, policy: string | Url | UrlString | ResourcePolicy): ResourceExt;
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Remove the given [[ResourcePolicy]] that applies to a given Resource's Access
 * Control Resource from that Access Control Resource.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains Access Policies.
 * @param policy The ACR Policy to remove from the Resource's Access Control Resource.
 * @since 1.6.0
 */
export declare function removeResourceAcrPolicy<ResourceExt extends WithAccessibleAcr>(resourceWithAcr: ResourceExt, policy: string | Url | UrlString | ResourcePolicy): ResourceExt;
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Insert the given [[ResourcePolicy]] into the given Resource's Acccess Control
 * Resource, replacing previous instances of that Policy.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains Access Policies.
 * @param policy The Policy to insert into the Resource's Access Control Resource.
 * @returns A new Resource equal to the given Resource, but with the given Policy in its Access Control Resource.
 * @since 1.6.0
 */
export declare function setResourcePolicy<ResourceExt extends WithAccessibleAcr>(resourceWithAcr: ResourceExt, policy: ResourcePolicy): ResourceExt;
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Insert the given [[ResourcePolicy]] into the given Resource's Acccess Control
 * Resource, replacing previous instances of that Policy, to apply to the Access
 * Control Resource itself.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains Access Policies.
 * @param policy The Policy to insert into the Resource's Access Control Resource.
 * @returns A new Resource equal to the given Resource, but with the given Policy in its Access Control Resource, applying to that Access Control Resource.
 * @since 1.6.0
 */
export declare function setResourceAcrPolicy<ResourceExt extends WithAccessibleAcr>(resourceWithAcr: ResourceExt, policy: ResourcePolicy): ResourceExt;
/**
 * Gets a human-readable representation of the given [[Policy]] to aid debugging.
 *
 * Note that changes to the exact format of the return value are not considered a breaking change;
 * it is intended to aid in debugging, not as a serialisation method that can be reliably parsed.
 *
 * @param policy The Policy to get a human-readable representation of.
 * @since 1.6.0
 */
export declare function policyAsMarkdown(policy: Policy | ResourcePolicy): string;
