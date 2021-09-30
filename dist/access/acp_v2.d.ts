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
import { WithAccessibleAcr, WithAcp } from "../acp/acp";
import { Policy } from "../acp/policy";
import { Matcher } from "../acp/matcher";
import { IriString, UrlString, WebId, WithResourceInfo } from "../interfaces";
import { Access } from "./universal";
declare const knownActorRelations: "http://www.w3.org/ns/solid/acp#agent"[];
/**
 * Union type of all relations defined in `knownActorRelations`.
 *
 * When the ACP spec evolves to support additional relations of Matchers to Actors,
 * adding those relations to `knownActorRelations` will cause TypeScript to warn
 * us everywhere to update everywhere the ActorRelation type is used and that
 * needs additional work to handle it.
 */
declare type ActorRelation = typeof knownActorRelations extends Array<infer E> ? E : never;
/**
 * Get an overview of what access is defined for a given actor in a Resource's Access Control Resource.
 *
 * This will only return a value if all relevant access is defined in just the Resource's Access
 * Control Resource; in other words, if an Access Policy or Access Matcher applies that is re-used for
 * other Resources, this function will not be able to determine the access relevant to this actor.
 *
 * Additionally, this only considers access given _explicitly_ to the given actor, i.e. without
 * additional conditions.
 *
 * In other words, this function will generally understand and return the access as set by
 * [[internal_setActorAccess]], but not understand more convoluted Policies.
 *
 * @param acpData All Access Control Policies and Matchers that apply to a particular Resource.
 * @param actorRelation What type of actor (e.g. acp:agent) you want to get the access for.
 * @param actor Which instance of the given actor type you want to get the access for.
 * @returns What Access modes are granted to the given actor explicitly, or null if it could not be determined.
 */
export declare function internal_getActorAccess(acpData: internal_AcpData, actorRelation: ActorRelation, actor: IriString): Access | null;
/**
 * Get an overview of what access is defined for a given Agent in a Resource's Access Control Resource.
 *
 * This will only return a value if all relevant access is defined in just the Resource's Access
 * Control Resource; in other words, if an Access Policy or Access Matcher applies that is re-used for
 * other Resources, this function will not be able to determine the access relevant to this Agent.
 *
 * Additionally, this only considers access given _explicitly_ to the given Agent, i.e. without
 * additional conditions.
 *
 * In other words, this function will generally understand and return the access as set by
 * [[internal_setAgentAccess]], but not understand more convoluted Policies.
 *
 * @param acpData All Access Control Policies and Matchers that apply to a particular Resource.
 * @param webId WebID of the Agent you want to get the access for.
 * @returns What Access modes are granted to the given Agent explicitly, or null if it could not be determined.
 */
export declare function internal_getAgentAccess(acpData: internal_AcpData, webId: WebId): Access | null;
/**
 * Get an overview of what access is defined for everybody in a Resource's Access Control Resource.
 *
 * This will only return a value if all relevant access is defined in just the Resource's Access
 * Control Resource; in other words, if an Access Policy or Access Matcher applies that is re-used for
 * other Resources, this function will not be able to determine the access relevant to everybody.
 *
 * Additionally, this only considers access given _explicitly_ to everybody, i.e. without
 * additional conditions.
 *
 * In other words, this function will generally understand and return the access as set by
 * [[internal_setPublicAccess]], but not understand more convoluted Policies.
 *
 * @param acpData All Access Control Policies and Matchers that apply to a particular Resource.
 * @returns What Access modes are granted to everyone explicitly, or null if it could not be determined.
 */
export declare function internal_getPublicAccess(acpData: internal_AcpData): Access | null;
/**
 * Get an overview of what access is defined for all authenticated Agents in a Resource's Access Control Resource.
 *
 * This will only return a value if all relevant access is defined in just the Resource's Access
 * Control Resource; in other words, if an Access Policy or Access Matcher applies that is re-used for
 * other Resources, this function will not be able to determine the access relevant to authenticated
 * Agents.
 *
 * Additionally, this only considers access given _explicitly_ to authenticated Agents, i.e. without
 * additional conditions.
 *
 * In other words, this function will generally understand and return the access as set by
 * [[internal_setAuthenticatedAccess]], but not understand more convoluted Policies.
 *
 * @param acpData All Access Control Policies and Matchers that apply to a particular Resource.
 * @returns What Access modes are granted to authenticated users explicitly, or null if it could not be determined.
 */
export declare function internal_getAuthenticatedAccess(acpData: internal_AcpData): Access | null;
/**
 * Iterate through all the actors active for an ACR, and list all of their access.
 * @param acpData All Access Control Policies and Matchers that apply to a particular Resource.
 * @param actorRelation The type of actor we want to list access for
 * @returns A map with each actor access indexed by their URL, or null if some
 * external policies are referenced.
 */
export declare function internal_getActorAccessAll(acpData: internal_AcpData, actorRelation: ActorRelation): Record<string, Access> | null;
/**
 * Get an overview of what access are defined for all Agents in a Resource's Access Control Resource.
 *
 * This will only return a value if all relevant access is defined in just the Resource's Access
 * Control Resource; in other words, if an Access Policy or Access Matcher applies that is re-used for
 * other Resources, this function will not be able to determine the access relevant to the mentionned
 * Agents.
 *
 * Additionally, this only considers access given _explicitly_ to individual Agents, i.e. without
 * additional conditions.
 *
 * In other words, this function will generally understand and return the access as set by
 * [[internal_setAgentAccess]], but not understand more convoluted Policies.
 *
 * @param acpData All Access Control Policies and Matchers that apply to a particular Resource.
 * @returns A map with each Agent's access indexed by their WebID, or null if some
 * external policies are referenced.
 */
export declare function internal_getAgentAccessAll(acpData: internal_AcpData): Record<WebId, Access> | null;
/**
 * Set access to a Resource for a specific actor.
 *
 * This function adds the relevant Access Control Policies and Matchers to a
 * Resource's Access Control Resource to define the given access for the given
 * actor specifically. In other words, it can, for example, add Policies that
 * give the general Public Read access to the Resource. However, if other
 * Policies specify that everyone is *denied* Read access *except* for a
 * particular Agent, then that will be left intact.
 * This means that, unless *only* this module's functions are used to manipulate
 * access to this Resource, the set access might not be equal to the effective
 * access for an agent matching the given actor.
 *
 * There are a number of preconditions that have to be fulfilled for this
 * function to work:
 * - Access to the Resource is determined via an Access Control Resource.
 * - The Resource's Access Control Resource does not refer to (Policies or Matchers
 *   in) other Resources.
 * - The current user has access to the Resource's Access Control Resource.
 *
 * If those conditions do not hold, this function will return `null`.
 *
 * Additionally, take note that the given access will only be applied to the
 * given Resource; if that Resource is a Container, access will have to be set
 * for its contained Resources independently.
 *
 * @param resource Resource that was fetched together with its linked Access Control Resource.
 * @param acpData All Access Control Policies and Matchers that apply to a particular Resource.
 * @param actorRelation What type of actor (e.g. acp:agent) you want to set the access for.
 * @param actor Which instance of the given actor type you want to set the access for.
 * @param access What access (read, append, write, controlRead, controlWrite) to set for the given actor. `true` to allow, `false` to deny, and `undefined` to leave unchanged.
 * @returns The Resource with the updated Access Control Resource attached, if updated successfully, or `null` if not.
 */
export declare function internal_setActorAccess<ResourceExt extends WithResourceInfo & WithAcp>(resource: ResourceExt, acpData: internal_AcpData, actorRelation: ActorRelation, actor: UrlString, access: Partial<Access>): ResourceExt | null;
/**
 * Set access to a Resource for a specific Agent.
 *
 * This function adds the relevant Access Control Policies and Matchers to a
 * Resource's Access Control Resource to define the given access for the given
 * Agent specifically. In other words, it can, for example, add Policies that
 * give a particular Agent Read access to the Resource. However, if other
 * Policies specify that that Agent is *denied* Read access *except* if they
 * match on some other characteristic, then that will be left intact.
 * This means that, unless *only* this function is used to manipulate access to
 * this Resource, the set access might not be equal to the effective access for
 * the given Agent.
 *
 * There are a number of preconditions that have to be fulfilled for this
 * function to work:
 * - Access to the Resource is determined via an Access Control Resource.
 * - The Resource's Access Control Resource does not refer to (Policies or Matchers
 *   in) other Resources.
 * - The current user has access to the Resource's Access Control Resource.
 *
 * If those conditions do not hold, this function will return `null`.
 *
 * Additionally, take note that the given access will only be applied to the
 * given Resource; if that Resource is a Container, access will have to be set
 * for its contained Resources independently.
 *
 * @param resource Resource that was fetched together with its linked Access Control Resource.
 * @param acpData All Access Control Policies and Matchers that apply to a particular Resource.
 * @param webId Which Agent you want to set the access for.
 * @param access What access (read, append, write, controlRead, controlWrite) to set for the given Agent. `true` to allow, `false` to deny, and `undefined` to leave unchanged.
 * @returns The Resource with the updated Access Control Resource attached, if updated successfully, or `null` if not.
 */
export declare function internal_setAgentAccess<ResourceExt extends WithResourceInfo & WithAcp>(resource: ResourceExt, acpData: internal_AcpData, webId: WebId, access: Partial<Access>): ResourceExt | null;
/**
 * Set access to a Resource for everybody.
 *
 * This function adds the relevant Access Control Policies and Matchers to a
 * Resource's Access Control Resource to define the given access for everybody
 * specifically. In other words, it can, for example, add Policies that
 * give everybody Read access to the Resource. However, if other
 * Policies specify that everybody is *denied* Read access *except* if they're
 * a particular Agent, then that will be left intact.
 * This means that, unless *only* this module's functions are used to manipulate
 * access to this Resource, the set access might not be equal to the effective
 * access for a particular Agent.
 *
 * There are a number of preconditions that have to be fulfilled for this
 * function to work:
 * - Access to the Resource is determined via an Access Control Resource.
 * - The Resource's Access Control Resource does not refer to (Policies or Matchers
 *   in) other Resources.
 * - The current user has access to the Resource's Access Control Resource.
 *
 * If those conditions do not hold, this function will return `null`.
 *
 * Additionally, take note that the given access will only be applied to the
 * given Resource; if that Resource is a Container, access will have to be set
 * for its contained Resources independently.
 *
 * @param resource Resource that was fetched together with its linked Access Control Resource.
 * @param acpData All Access Control Policies and Matchers that apply to a particular Resource.
 * @param access What access (read, append, write, controlRead, controlWrite) to set for everybody. `true` to allow, `false` to deny, and `undefined` to leave unchanged.
 * @returns The Resource with the updated Access Control Resource attached, if updated successfully, or `null` if not.
 */
export declare function internal_setPublicAccess<ResourceExt extends WithResourceInfo & WithAcp>(resource: ResourceExt, acpData: internal_AcpData, access: Partial<Access>): ResourceExt | null;
/**
 * Set access to a Resource for authenticated Agents.
 *
 * This function adds the relevant Access Control Policies and Matchers to a
 * Resource's Access Control Resource to define the given access for
 * authenticated Agents specifically. In other words, it can, for example, add
 * Policies that give authenticated Agents Read access to the Resource. However,
 * if other Policies specify that authenaticated Agents are *denied* Read access
 * *except* if they're a particular Agent, then that will be left intact.
 * This means that, unless *only* this module's functions are used to manipulate
 * access to this Resource, the set access might not be equal to the effective
 * access for a particular Agent.
 *
 * There are a number of preconditions that have to be fulfilled for this
 * function to work:
 * - Access to the Resource is determined via an Access Control Resource.
 * - The Resource's Access Control Resource does not refer to (Policies or Matchers
 *   in) other Resources.
 * - The current user has access to the Resource's Access Control Resource.
 *
 * If those conditions do not hold, this function will return `null`.
 *
 * Additionally, take note that the given access will only be applied to the
 * given Resource; if that Resource is a Container, access will have to be set
 * for its contained Resources independently.
 *
 * @param resource Resource that was fetched together with its linked Access Control Resource.
 * @param acpData All Access Control Policies and Matchers that apply to a particular Resource.
 * @param access What access (read, append, write, controlRead, controlWrite) to set for authenticated Agents. `true` to allow, `false` to deny, and `undefined` to leave unchanged.
 * @returns The Resource with the updated Access Control Resource attached, if updated successfully, or `null` if not.
 */
export declare function internal_setAuthenticatedAccess<ResourceExt extends WithResourceInfo & WithAcp>(resource: ResourceExt, acpData: internal_AcpData, access: Partial<Access>): ResourceExt | null;
export declare type internal_AcpData = {
    acrPolicies: Policy[];
    policies: Policy[];
    matchers: Matcher[];
    inaccessibleUrls: UrlString[];
};
export declare function internal_getPoliciesAndMatchers(resource: WithResourceInfo & WithAccessibleAcr, options?: {
    fetch: ((input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>) & typeof fetch;
}): Promise<internal_AcpData>;
export {};
