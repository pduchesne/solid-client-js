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
import { IriString, WithChangeLog, WithServerResourceInfo } from "../interfaces";
import { internal_defaultFetchOptions } from "../resource/resource";
import { acl } from "../constants";
import { Access, AclDataset, AclRule, WithAccessibleAcl, WithAcl, WithFallbackAcl, WithResourceAcl } from "./acl";
/**
 * This (currently internal) function fetches the ACL indicated in the [[WithServerResourceInfo]]
 * attached to a resource.
 *
 * @internal
 * @param resourceInfo The Resource info with the ACL URL
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters).
 */
export declare function internal_fetchAcl(resourceInfo: WithServerResourceInfo, options?: Partial<typeof internal_defaultFetchOptions>): Promise<WithAcl["internal_acl"]>;
/** @internal */
export declare function internal_fetchResourceAcl(dataset: WithServerResourceInfo, options?: Partial<typeof internal_defaultFetchOptions>): Promise<AclDataset | null>;
/** @internal */
export declare function internal_fetchFallbackAcl(resource: WithAccessibleAcl, options?: Partial<typeof internal_defaultFetchOptions>): Promise<AclDataset | null>;
/**
 * Given the path to a Resource, get the URL of the Container one level up in the hierarchy.
 * @param resourcePath The path of the Resource of which we need to determine the Container's path.
 * @hidden For internal use only.
 */
export declare function internal_getContainerPath(resourcePath: string): string;
/** @internal */
export declare function internal_getAclRules(aclDataset: AclDataset): AclRule[];
/** @internal */
export declare function internal_getResourceAclRules(aclRules: AclRule[]): AclRule[];
/** @internal */
export declare function internal_getResourceAclRulesForResource(aclRules: AclRule[], resource: IriString): AclRule[];
/** @internal */
export declare function internal_getDefaultAclRules(aclRules: AclRule[]): AclRule[];
/** @internal */
export declare function internal_getDefaultAclRulesForResource(aclRules: AclRule[], resource: IriString): AclRule[];
/** @internal */
export declare function internal_getAccess(rule: AclRule): Access;
/** @internal */
export declare function internal_combineAccessModes(modes: Access[]): Access;
/** @internal */
export declare function internal_removeEmptyAclRules<Dataset extends AclDataset>(aclDataset: Dataset): Dataset;
/**
 * IRIs of potential Access Modes
 * @internal
 */
export declare const internal_accessModeIriStrings: {
    readonly read: "http://www.w3.org/ns/auth/acl#Read";
    readonly append: "http://www.w3.org/ns/auth/acl#Append";
    readonly write: "http://www.w3.org/ns/auth/acl#Write";
    readonly control: "http://www.w3.org/ns/auth/acl#Control";
};
/** @internal
 * This function finds, among a set of ACL rules, the ones granting access to a given entity (the target)
 * and identifying it with a specific property (`acl:agent` or `acl:agentGroup`).
 * @param aclRules The set of rules to filter
 * @param targetIri The IRI of the target
 * @param targetType The property linking the rule to the target
 */
export declare function internal_getAclRulesForIri(aclRules: AclRule[], targetIri: IriString, targetType: typeof acl.agent | typeof acl.agentGroup): AclRule[];
/** @internal
 * This function transforms a given set of rules into a map associating the IRIs
 * of the entities to which permissions are granted by these rules, and the permissions
 * granted to them. Additionally, it filters these entities based on the predicate
 * that refers to them in the rule.
 */
export declare function internal_getAccessByIri(aclRules: AclRule[], targetType: typeof acl.agent | typeof acl.agentGroup): Record<IriString, Access>;
/**
 * Initialises a new ACL Rule that grants some access - but does not yet specify to whom.
 *
 * @hidden This is an internal utility function that should not be used directly by downstreams.
 * @param access Access mode that this Rule will grant
 */
export declare function internal_initialiseAclRule(access: Access): AclRule;
/**
 * Creates a new ACL Rule with the same ACL values as the input ACL Rule, but having a different IRI.
 *
 * Note that non-ACL values will not be copied over.
 *
 * @hidden This is an internal utility function that should not be used directly by downstreams.
 * @param sourceRule ACL rule to duplicate.
 */
export declare function internal_duplicateAclRule(sourceRule: AclRule): AclRule;
/**
 * Attach an ACL dataset to a Resource.
 *
 * @hidden This is an internal utility function that should not be used directly by downstreams.
 * @param resource The Resource to which an ACL is being attached
 * @param acl The ACL being attached to the Resource
 */
export declare function internal_setAcl<ResourceExt extends WithServerResourceInfo>(resource: ResourceExt, acl: WithResourceAcl["internal_acl"]): ResourceExt & WithResourceAcl;
export declare function internal_setAcl<ResourceExt extends WithServerResourceInfo>(resource: ResourceExt, acl: WithFallbackAcl["internal_acl"]): ResourceExt & WithFallbackAcl;
export declare function internal_setAcl<ResourceExt extends WithServerResourceInfo>(resource: ResourceExt, acl: WithAcl["internal_acl"]): ResourceExt & WithAcl;
declare const supportedActorPredicates: ("http://www.w3.org/ns/auth/acl#agent" | "http://www.w3.org/ns/auth/acl#agentGroup" | "http://www.w3.org/ns/auth/acl#agentClass" | "http://www.w3.org/ns/auth/acl#origin")[];
/**
 * Union type of all relations defined in `knownActorRelations`.
 *
 * When the ACP spec evolves to support additional relations of Rules to Actors,
 * adding those relations to `knownActorRelations` will cause TypeScript to warn
 * us everywhere to update everywhere the ActorRelation type is used and that
 * needs additional work to handle it.
 */
declare type SupportedActorPredicate = typeof supportedActorPredicates extends Array<infer E> ? E : never;
/**
 * ```{note}
 * This function is still experimental and subject to change, even in a non-major release.
 * ```
 * Modifies the resource ACL (Access Control List) to set the Access Modes for the given Agent.
 * Specifically, the function returns a new resource ACL initialised with the given ACL and
 * new rules for the Actor's access.
 *
 * If rules for Actor's access already exist in the given ACL, in the returned ACL,
 * they are replaced by the new rules.
 *
 * This function does not modify:
 *
 * - Access Modes granted indirectly to Actors through other ACL rules, e.g., public or group-specific permissions.
 * - Access Modes granted to Actors for the child Resources if the associated Resource is a Container.
 * - The original ACL.
 *
 * @param aclDataset The SolidDataset that contains Access-Control List rules.
 * @param actor The Actor to grant specific Access Modes.
 * @param access The Access Modes to grant to the Actor for the Resource.
 * @returns A new resource ACL initialised with the given `aclDataset` and `access` for the `agent`.
 */
export declare function internal_setActorAccess(aclDataset: AclDataset, access: Access, actorPredicate: SupportedActorPredicate, accessType: "default" | "resource", actor: IriString): AclDataset & WithChangeLog;
export declare function internal_setResourceAcl<T extends WithServerResourceInfo & WithAcl>(resource: T, acl: AclDataset): T & WithResourceAcl;
export declare function internal_getResourceAcl(resource: WithServerResourceInfo & WithResourceAcl): AclDataset;
export {};
