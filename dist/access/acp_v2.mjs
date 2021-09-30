import { acp } from '../constants.mjs';
import { internal_defaultFetchOptions } from '../resource/resource.mjs';
import { asIri, getThing } from '../thing/thing.mjs';
import { hasAccessibleAcr } from '../acp/acp.mjs';
import { removeAcrPolicyUrl, removePolicyUrl, getAcrPolicyUrlAll, getPolicyUrlAll } from '../acp/control.mjs';
import { getAllowModesV2, getDenyModesV2, setResourceAcrPolicy, setResourcePolicy, createResourcePolicyFor, setAllowModesV2 } from '../acp/policy.mjs';
import { getAllOfMatcherUrlAll, getAnyOfMatcherUrlAll, getNoneOfMatcherUrlAll, setResourceMatcher, createResourceMatcherFor } from '../acp/matcher.mjs';
import { getIriAll } from '../thing/get.mjs';
import { addIri } from '../thing/add.mjs';
import { setIri } from '../thing/set.mjs';
import { getSolidDataset } from '../resource/solidDataset.mjs';
import { internal_accessModeIriStrings } from '../acl/acl.internal.mjs';

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
const knownActorRelations = [acp.agent];
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
function internal_getActorAccess(acpData, actorRelation, actor) {
    if (acpData.inaccessibleUrls.length > 0) {
        // If we can't see all access data,
        // we can't reliably determine what access the given actor has:
        return null;
    }
    const applicableAcrPolicies = acpData.acrPolicies.filter((policy) => policyAppliesTo(policy, actorRelation, actor, acpData));
    const applicablePolicies = acpData.policies.filter((policy) => policyAppliesTo(policy, actorRelation, actor, acpData));
    const initialAccess = {
        read: false,
        append: false,
        write: false,
        controlRead: false,
        controlWrite: false,
    };
    // All allowed reading and writing defined in ACR policies
    // determines whether the `controlRead` and `controlWrite` statuses are `true`.
    const allowedAcrAccess = applicableAcrPolicies.reduce((acc, policy) => {
        const allAllowedAccess = Object.assign({}, acc);
        const allowModes = getAllowModesV2(policy);
        if (allowModes.read) {
            allAllowedAccess.controlRead = true;
        }
        if (allowModes.write) {
            allAllowedAccess.controlWrite = true;
        }
        return allAllowedAccess;
    }, initialAccess);
    // Then allowed reading, appending and writing in regular policies
    // determines whether the respective status is `true`.
    const withAllowedAccess = applicablePolicies.reduce((acc, policy) => {
        const allAllowedAccess = Object.assign({}, acc);
        const allowModes = getAllowModesV2(policy);
        if (allowModes.read) {
            allAllowedAccess.read = true;
        }
        if (allowModes.append) {
            allAllowedAccess.append = true;
        }
        if (allowModes.write) {
            allAllowedAccess.write = true;
        }
        return allAllowedAccess;
    }, allowedAcrAccess);
    // At this point, everything that has been explicitly allowed is true.
    // However, it could still be overridden by access that is explicitly denied.
    // Starting with `controlRead` and `controlWrite`,
    // by inspecting denied reading and writing defined in the ACR policies.
    const withAcrDeniedAccess = applicableAcrPolicies.reduce((acc, policy) => {
        const allDeniedAccess = Object.assign({}, acc);
        const denyModes = getDenyModesV2(policy);
        if (denyModes.read === true) {
            allDeniedAccess.controlRead = false;
        }
        if (denyModes.write === true) {
            allDeniedAccess.controlWrite = false;
        }
        return allDeniedAccess;
    }, withAllowedAccess);
    // And finally, we set to `false` those access modes that are explicitly denied
    // in the regular policies:
    const withDeniedAccess = applicablePolicies.reduce((acc, policy) => {
        const allDeniedAccess = Object.assign({}, acc);
        const denyModes = getDenyModesV2(policy);
        if (denyModes.read === true) {
            allDeniedAccess.read = false;
        }
        if (denyModes.append === true) {
            allDeniedAccess.append = false;
        }
        if (denyModes.write === true) {
            allDeniedAccess.write = false;
        }
        return allDeniedAccess;
    }, withAcrDeniedAccess);
    return withDeniedAccess;
}
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
function internal_getAgentAccess(acpData, webId) {
    return internal_getActorAccess(acpData, acp.agent, webId);
}
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
function internal_getPublicAccess(acpData) {
    return internal_getActorAccess(acpData, acp.agent, acp.PublicAgent);
}
function policyAppliesTo(policy, actorRelation, actor, acpData) {
    const allowModes = getIriAll(policy, acp.allow);
    const denyModes = getIriAll(policy, acp.deny);
    if (allowModes.length + denyModes.length === 0) {
        // A Policy that does not specify access modes does not do anything:
        return false;
    }
    // Note: the non-null assertions (`!`) here should be valid because
    //       the caller of `policyAppliesTo` should already have validated that
    //       the return value of internal_getPoliciesAndMatchers() did not have any
    //       inaccessible URLs, so we should be able to find every Matcher.
    const allOfMatchers = getAllOfMatcherUrlAll(policy).map((matcherUrl) => acpData.matchers.find((matcher) => asIri(matcher) === matcherUrl));
    const anyOfMatchers = getAnyOfMatcherUrlAll(policy).map((matcherUrl) => acpData.matchers.find((matcher) => asIri(matcher) === matcherUrl));
    const noneOfMatchers = getNoneOfMatcherUrlAll(policy).map((matcherUrl) => acpData.matchers.find((matcher) => asIri(matcher) === matcherUrl));
    // We assume that this Policy applies if this specific actor is mentioned
    // and no further restrictions are in place.
    // (In other words, the Policy may apply to others *in addition to* this
    // actor, but if it applies to this actor *unless* some other condition holds,
    // we cannot be sure whether it will apply to this actor.)
    // This means that:
    return (
    // Every existing allOf Matcher explicitly applies explicitly to this given actor:
    allOfMatchers.every((matcher) => matcherAppliesTo(matcher, actorRelation, actor)) &&
        // If there are anyOf Matchers, at least one applies explicitly to this actor:
        (anyOfMatchers.length === 0 ||
            anyOfMatchers.some((matcher) => matcherAppliesTo(matcher, actorRelation, actor))) &&
        // There is at least one allOf or anyOf Matcher:
        allOfMatchers.length + anyOfMatchers.length > 0 &&
        // No further restrictions are in place that make this sometimes not apply
        // to the given actor:
        noneOfMatchers.length === 0);
}
function policyConflictsWith(policy, otherAccess) {
    const allowModes = getIriAll(policy, acp.allow);
    const denyModes = getIriAll(policy, acp.deny);
    return ((otherAccess.read === true &&
        denyModes.includes(internal_accessModeIriStrings.read)) ||
        (otherAccess.read === false &&
            allowModes.includes(internal_accessModeIriStrings.read) &&
            !denyModes.includes(internal_accessModeIriStrings.read)) ||
        (otherAccess.append === true &&
            denyModes.includes(internal_accessModeIriStrings.append)) ||
        (otherAccess.append === false &&
            allowModes.includes(internal_accessModeIriStrings.append) &&
            !denyModes.includes(internal_accessModeIriStrings.append)) ||
        (otherAccess.write === true &&
            denyModes.includes(internal_accessModeIriStrings.write)) ||
        (otherAccess.write === false &&
            allowModes.includes(internal_accessModeIriStrings.write) &&
            !denyModes.includes(internal_accessModeIriStrings.write)));
}
function matcherAppliesTo(matcher, actorRelation, actor) {
    return getIriAll(matcher, actorRelation).includes(actor);
}
/**
 * Get a set of all actors mentioned in an ACR by active Matchers (i.e. that are
 * referenced by Policies referenced by the ACR Control, and therefore that
 * effectively apply).
 *
 * @param acpData All Access Control Policies and Matchers that apply to a particular Resource.
 * @param actorRelation
 */
function internal_findActorAll(acpData, actorRelation) {
    const actors = new Set();
    // This code could be prettier using flat(), which isn't supported by nodeJS 10.
    // If you read this comment after April 2021, feel free to refactor.
    acpData.matchers.forEach((matcher) => {
        getIriAll(matcher, actorRelation)
            .filter((iri) => ![
            acp.PublicAgent,
            acp.CreatorAgent,
            acp.AuthenticatedAgent,
        ].includes(iri) || actorRelation != acp.agent)
            .forEach((iri) => actors.add(iri));
    });
    return actors;
}
/**
 * Iterate through all the actors active for an ACR, and list all of their access.
 * @param acpData All Access Control Policies and Matchers that apply to a particular Resource.
 * @param actorRelation The type of actor we want to list access for
 * @returns A map with each actor access indexed by their URL, or null if some
 * external policies are referenced.
 */
function internal_getActorAccessAll(acpData, actorRelation) {
    if (acpData.inaccessibleUrls.length > 0) {
        // If we can't see all access data,
        // we can't reliably determine what access actors of the given type have:
        return null;
    }
    const result = {};
    const actors = internal_findActorAll(acpData, actorRelation);
    actors.forEach((iri) => {
        // The type assertion holds, because if internal_getActorAccess were null,
        // we would have returned {} already.
        const access = internal_getActorAccess(acpData, actorRelation, iri);
        result[iri] = access;
    });
    return result;
}
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
function internal_getAgentAccessAll(acpData) {
    return internal_getActorAccessAll(acpData, acp.agent);
}
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
function internal_setActorAccess(resource, acpData, actorRelation, actor, access) {
    var _a, _b, _c, _d, _e;
    if (!hasAccessibleAcr(resource) || acpData.inaccessibleUrls.length > 0) {
        return null;
    }
    // Get the access that currently applies to the given actor
    const existingAccess = internal_getActorAccess(acpData, actorRelation, actor);
    /* istanbul ignore if: It returns null if the ACR has inaccessible Policies, which should happen since we already check for that above. */
    if (existingAccess === null) {
        return null;
    }
    // Get all Policies that apply specifically to the given actor
    const applicableAcrPolicies = acpData.acrPolicies.filter((policy) => policyAppliesTo(policy, actorRelation, actor, acpData));
    const applicablePolicies = acpData.policies.filter((policy) => policyAppliesTo(policy, actorRelation, actor, acpData));
    // We only need to override Policies that define access other than what we want:
    const conflictingAcrPolicies = applicableAcrPolicies.filter((policy) => policyConflictsWith(policy, {
        read: access.controlRead,
        write: access.controlWrite,
    }));
    const conflictingPolicies = applicablePolicies.filter((policy) => policyConflictsWith(policy, {
        read: access.read,
        append: access.append,
        write: access.write,
    }));
    // For every Policy that applies specifically to the given Actor, but _also_
    // to another actor (i.e. that applies using an anyOf Matcher, or a Matcher that
    // mentions both the given and another actor)...
    const otherActorAcrPolicies = conflictingAcrPolicies.filter((acrPolicy) => policyHasOtherActors(acrPolicy, actorRelation, actor, acpData));
    const otherActorPolicies = conflictingPolicies.filter((policy) => policyHasOtherActors(policy, actorRelation, actor, acpData));
    // ...check what access the current actor would have if we removed them...
    const acpDataWithPoliciesExcluded = Object.assign(Object.assign({}, acpData), { acrPolicies: acpData.acrPolicies.filter((acrPolicy) => !otherActorAcrPolicies.includes(acrPolicy)), policies: acpData.policies.filter((policy) => !otherActorPolicies.includes(policy)) });
    const remainingAccess = internal_getActorAccess(acpDataWithPoliciesExcluded, actorRelation, actor);
    /* istanbul ignore if: It returns null if the ACR has inaccessible Policies, which should happen since we already check for that at the start. */
    if (remainingAccess === null) {
        return null;
    }
    // ...add copies of those Policies and their Matchers, but excluding the given actor...
    let updatedResource = resource;
    otherActorAcrPolicies.forEach((acrPolicy) => {
        const [policyCopy, matcherCopies] = copyPolicyExcludingActor(acrPolicy, resource, acpData, actorRelation, actor);
        updatedResource = setResourceAcrPolicy(updatedResource, policyCopy);
        updatedResource = matcherCopies.reduce(setResourceMatcher, updatedResource);
    });
    otherActorPolicies.forEach((policy) => {
        const [policyCopy, matcherCopies] = copyPolicyExcludingActor(policy, resource, acpData, actorRelation, actor);
        updatedResource = setResourcePolicy(updatedResource, policyCopy);
        updatedResource = matcherCopies.reduce(setResourceMatcher, updatedResource);
    });
    // ...add a new Policy that applies the given access,
    // and the previously applying access for access modes that were undefined...
    const newMatcherName = `matcher_${encodeURIComponent(`${actorRelation}_${actor}`)}`;
    let newMatcher = createResourceMatcherFor(resource, newMatcherName);
    newMatcher = setIri(newMatcher, actorRelation, actor);
    const newControlReadAccess = (_a = access.controlRead) !== null && _a !== void 0 ? _a : existingAccess.controlRead;
    const newControlWriteAccess = (_b = access.controlWrite) !== null && _b !== void 0 ? _b : existingAccess.controlWrite;
    let acrPoliciesToUnapply = otherActorAcrPolicies;
    // Only replace existing Policies if the defined access actually changes:
    if (newControlReadAccess !== remainingAccess.controlRead ||
        newControlWriteAccess !== remainingAccess.controlWrite) {
        const newAcrPolicyName = `acr_policy` +
            `_${encodeURIComponent(`${actorRelation}_${actor}`)}` +
            `_${Date.now()}_${Math.random()}`;
        let newAcrPolicy = createResourcePolicyFor(resource, newAcrPolicyName);
        newAcrPolicy = setAllowModesV2(newAcrPolicy, {
            read: newControlReadAccess === true,
            append: false,
            write: newControlWriteAccess === true,
        });
        newAcrPolicy = addIri(newAcrPolicy, acp.allOf, newMatcher);
        updatedResource = setResourceAcrPolicy(updatedResource, newAcrPolicy);
        updatedResource = setResourceMatcher(updatedResource, newMatcher);
        // If we don't have to set new access, we only need to unapply the
        // ACR Policies that applied to both the given actor and other actors
        // (because they have been replaced by clones not mentioning the given
        // actor). Hence `policiesToUnApply` is initialised to `otherActorPolicies`.
        // However, if we're in this if branch, that means we also had to replace
        // Policies that defined access for just this actor, so we'll have to remove
        // all Policies mentioning this actor:
        acrPoliciesToUnapply = conflictingAcrPolicies;
    }
    const newReadAccess = (_c = access.read) !== null && _c !== void 0 ? _c : existingAccess.read;
    const newAppendAccess = (_d = access.append) !== null && _d !== void 0 ? _d : existingAccess.append;
    const newWriteAccess = (_e = access.write) !== null && _e !== void 0 ? _e : existingAccess.write;
    let policiesToUnapply = otherActorPolicies;
    // Only replace existing Policies if the defined access actually changes:
    if (newReadAccess !== remainingAccess.read ||
        newAppendAccess !== remainingAccess.append ||
        newWriteAccess !== remainingAccess.write) {
        const newPolicyName = `policy` +
            `_${encodeURIComponent(`${actorRelation}_${actor}`)}` +
            `_${Date.now()}_${Math.random()}`;
        let newPolicy = createResourcePolicyFor(resource, newPolicyName);
        newPolicy = setAllowModesV2(newPolicy, {
            read: newReadAccess === true,
            append: newAppendAccess === true,
            write: newWriteAccess === true,
        });
        newPolicy = addIri(newPolicy, acp.allOf, newMatcher);
        updatedResource = setResourcePolicy(updatedResource, newPolicy);
        updatedResource = setResourceMatcher(updatedResource, newMatcher);
        // If we don't have to set new access, we only need to unapply the
        // Policies that applied to both the given actor and other actors (because
        // they have been replaced by clones not mentioning the given actor). Hence
        // `policiesToUnApply` is initialised to `otherActorPolicies`.
        // However, if we're in this if branch, that means we also had to replace
        // Policies that defined access for just this actor, so we'll have to remove
        // all Policies mentioning this actor:
        policiesToUnapply = conflictingPolicies;
    }
    // ...then remove existing Policy URLs that mentioned both the given actor
    // and other actors from the given Resource and apply the new ones (but do not
    // remove the actual old Policies - they might still apply to other Resources!).
    acrPoliciesToUnapply.forEach((previouslyApplicableAcrPolicy) => {
        updatedResource = removeAcrPolicyUrl(updatedResource, asIri(previouslyApplicableAcrPolicy));
    });
    policiesToUnapply.forEach((previouslyApplicablePolicy) => {
        updatedResource = removePolicyUrl(updatedResource, asIri(previouslyApplicablePolicy));
    });
    return updatedResource;
}
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
function internal_setAgentAccess(resource, acpData, webId, access) {
    return internal_setActorAccess(resource, acpData, acp.agent, webId, access);
}
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
function internal_setPublicAccess(resource, acpData, access) {
    return internal_setActorAccess(resource, acpData, acp.agent, acp.PublicAgent, access);
}
function policyHasOtherActors(policy, actorRelation, actor, acpData) {
    // Note: the non-null assertions (`!`) here should be valid because
    //       the caller of `policyHasOtherActors` should already have validated
    //       that the return value of internal_getPoliciesAndMatchers() did not have
    //       any inaccessible URLs, so we should be able to find every Matcher.
    const allOfMatchers = getIriAll(policy, acp.allOf).map((matcherUrl) => acpData.matchers.find((matcher) => asIri(matcher) === matcherUrl));
    const allOfMatchersHaveOtherActors = allOfMatchers.some((matcher) => {
        return matcherHasOtherActors(matcher, actorRelation, actor);
    });
    const anyOfMatchers = getIriAll(policy, acp.anyOf).map((matcherUrl) => acpData.matchers.find((matcher) => asIri(matcher) === matcherUrl));
    const anyOfMatchersHaveOtherActors = anyOfMatchers.some((matcher) => {
        return matcherHasOtherActors(matcher, actorRelation, actor);
    });
    /* istanbul ignore next This function only gets called after policyAppliesTo, which already filters out all noneOf Matchers */
    const noneOfMatchers = getIriAll(policy, acp.noneOf).map((matcherUrl) => acpData.matchers.find((matcher) => asIri(matcher) === matcherUrl));
    /* istanbul ignore next This function only gets called after policyAppliesTo, which already filters out all noneOf Matchers */
    const noneOfMatchersHaveOtherActors = noneOfMatchers.some((matcher) => {
        return matcherHasOtherActors(matcher, actorRelation, actor);
    });
    return (allOfMatchersHaveOtherActors ||
        anyOfMatchersHaveOtherActors ||
        noneOfMatchersHaveOtherActors);
}
function matcherHasOtherActors(matcher, actorRelation, actor) {
    const otherActors = [];
    knownActorRelations.forEach((knownActorRelation) => {
        const otherActorsWithThisRelation = getIriAll(matcher, knownActorRelation).filter((applicableActor) => applicableActor !== actor || knownActorRelation !== actorRelation);
        // Unfortunately Node 10 does not support `.flat()` yet, hence the use of `push`:
        otherActors.push(...otherActorsWithThisRelation);
    });
    return otherActors.length > 0;
}
function copyPolicyExcludingActor(inputPolicy, resourceWithAcr, acpData, actorRelationToExclude, actorToExclude) {
    const newIriSuffix = "_copy_without" +
        `_${encodeURIComponent(actorRelationToExclude)}_${actorToExclude}` +
        `_${Date.now()}_${Math.random()}`;
    // Create new Matchers for the Policy, excluding the given Actor
    const newAllOfMatchers = copyMatchersExcludingActor(getIriAll(inputPolicy, acp.allOf), resourceWithAcr, acpData, newIriSuffix, actorRelationToExclude, actorToExclude);
    const newAnyOfMatchers = copyMatchersExcludingActor(getIriAll(inputPolicy, acp.anyOf), resourceWithAcr, acpData, newIriSuffix, actorRelationToExclude, actorToExclude);
    const newNoneOfMatchers = copyMatchersExcludingActor(getIriAll(inputPolicy, acp.noneOf), resourceWithAcr, acpData, newIriSuffix, actorRelationToExclude, actorToExclude);
    // Create a new Policy with the new Matchers
    let newPolicy = createResourcePolicyFor(resourceWithAcr, encodeURI(asIri(inputPolicy)) + newIriSuffix);
    getIriAll(inputPolicy, acp.allow).forEach((allowMode) => {
        newPolicy = addIri(newPolicy, acp.allow, allowMode);
    });
    getIriAll(inputPolicy, acp.deny).forEach((denyMode) => {
        newPolicy = addIri(newPolicy, acp.deny, denyMode);
    });
    newAllOfMatchers.forEach((newMatcher) => {
        newPolicy = addIri(newPolicy, acp.allOf, newMatcher);
    });
    newAnyOfMatchers.forEach((newMatcher) => {
        newPolicy = addIri(newPolicy, acp.anyOf, newMatcher);
    });
    /* istanbul ignore next Policies listing noneOf Matchers are left alone (because they do not unambiguously apply to the given actor always), so there will usually not be any noneOf Matchers to copy. */
    newNoneOfMatchers.forEach((newMatcher) => {
        newPolicy = addIri(newPolicy, acp.noneOf, newMatcher);
    });
    return [
        newPolicy,
        newAllOfMatchers.concat(newAnyOfMatchers).concat(newNoneOfMatchers),
    ];
}
/** Creates clones of all the Matchers identified by `matcherIris` in `acpData`, excluding the given Actor */
function copyMatchersExcludingActor(matcherIris, resourceWithAcr, acpData, iriSuffix, actorRelationToExclude, actorToExclude) {
    return matcherIris
        .map((matcherIri) => {
        const matcher = acpData.matchers.find((matcher) => asIri(matcher) === matcherIri);
        /* istanbul ignore if: getPoliciesAndMatchers should already have fetched all referenced Matchers, so this should never be true: */
        if (typeof matcher === "undefined") {
            return null;
        }
        let newMatcher = createResourceMatcherFor(resourceWithAcr, encodeURI(asIri(matcher)) + iriSuffix);
        let listsOtherActors = false;
        knownActorRelations.forEach((knownActorRelation) => {
            getIriAll(matcher, knownActorRelation).forEach((targetActor) => {
                if (knownActorRelation === actorRelationToExclude &&
                    targetActor === actorToExclude) {
                    return;
                }
                listsOtherActors = true;
                newMatcher = addIri(newMatcher, knownActorRelation, targetActor);
            });
        });
        return listsOtherActors ? newMatcher : null;
    })
        .filter(isNotNull);
}
function isNotNull(value) {
    return value !== null;
}
async function internal_getPoliciesAndMatchers(resource, options = internal_defaultFetchOptions) {
    const acrPolicyUrls = getAcrPolicyUrlAll(resource);
    const policyUrls = getPolicyUrlAll(resource);
    const allPolicyResourceUrls = getResourceUrls(acrPolicyUrls).concat(getResourceUrls(policyUrls));
    const policyResources = await getResources(allPolicyResourceUrls, options);
    const acrPolicies = getThingsFromResources(acrPolicyUrls, policyResources).filter(isNotNull);
    const policies = getThingsFromResources(policyUrls, policyResources).filter(isNotNull);
    const matcherUrlSet = new Set();
    acrPolicies.forEach((acrPolicy) => {
        const referencedMatcherUrls = getReferencedMatcherUrls(acrPolicy);
        referencedMatcherUrls.forEach((matcherUrl) => {
            matcherUrlSet.add(matcherUrl);
        });
    });
    policies.forEach((policy) => {
        const referencedMatcherUrls = getReferencedMatcherUrls(policy);
        referencedMatcherUrls.forEach((matcherUrl) => {
            matcherUrlSet.add(matcherUrl);
        });
    });
    const matcherUrls = Array.from(matcherUrlSet);
    const matcherResourceUrls = matcherUrls.map((matcherUrl) => getResourceUrl(matcherUrl));
    const unfetchedMatcherResourceUrls = matcherResourceUrls.filter((matcherResourceUrl) => !allPolicyResourceUrls.includes(matcherResourceUrl));
    const matcherResources = await getResources(unfetchedMatcherResourceUrls, options);
    const allResources = Object.assign(Object.assign({}, policyResources), matcherResources);
    const matchers = getThingsFromResources(matcherUrls, allResources).filter(isNotNull);
    const inaccessibleUrls = Object.keys(allResources).filter((resourceUrl) => allResources[resourceUrl] === null);
    return {
        inaccessibleUrls: inaccessibleUrls,
        acrPolicies: acrPolicies,
        policies: policies,
        matchers: matchers,
    };
}
function getResourceUrl(thingUrl) {
    const thingUrlObject = new URL(thingUrl);
    thingUrlObject.hash = "";
    return thingUrlObject.href;
}
function getResourceUrls(thingUrls) {
    const resourceUrls = [];
    thingUrls.forEach((thingUrl) => {
        const resourceUrl = getResourceUrl(thingUrl);
        if (!resourceUrls.includes(resourceUrl)) {
            resourceUrls.push(resourceUrl);
        }
    });
    return resourceUrls;
}
async function getResources(resourceUrls, options) {
    const uniqueResourceUrls = Array.from(new Set(resourceUrls));
    const resources = {};
    await Promise.all(uniqueResourceUrls.map(async (resourceUrl) => {
        try {
            const resource = await getSolidDataset(resourceUrl, options);
            resources[resourceUrl] = resource;
        }
        catch (e) {
            resources[resourceUrl] = null;
        }
    }));
    return resources;
}
function getThingsFromResources(thingUrls, resources) {
    return thingUrls.map((thingUrl) => {
        const resourceUrl = getResourceUrl(thingUrl);
        const resource = resources[resourceUrl];
        if (!resource) {
            return null;
        }
        return getThing(resource, thingUrl);
    });
}
function getReferencedMatcherUrls(policy) {
    return getAllOfMatcherUrlAll(policy)
        .concat(getAnyOfMatcherUrlAll(policy))
        .concat(getNoneOfMatcherUrlAll(policy));
}

export { internal_getActorAccess, internal_getActorAccessAll, internal_getAgentAccess, internal_getAgentAccessAll, internal_getPoliciesAndMatchers, internal_getPublicAccess, internal_setActorAccess, internal_setAgentAccess, internal_setPublicAccess };
