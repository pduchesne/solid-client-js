import { acp, rdf, solid } from '../constants.mjs';
import { isNamedNode } from '../datatypes.mjs';
import { internal_toIriString } from '../interfaces.internal.mjs';
import { getSourceUrl } from '../resource/resource.mjs';
import { addIri } from '../thing/add.mjs';
import { getIriAll, getUrl } from '../thing/get.mjs';
import { removeIri } from '../thing/remove.mjs';
import { setIri, setUrl } from '../thing/set.mjs';
import { createThing, getThing, getThingAll, removeThing, asUrl, setThing } from '../thing/thing.mjs';
import { internal_getAcr, internal_setAcr } from './control.internal.mjs';

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
 * NOTE: Don't export for now (i.e. if exported, should this be `isAcpRule()` so
 * as not to clash with `isAclRule()`.
 *
 * @param thing the [[Thing]] to check to see if it's an ACP rule or not
 */
function isRule(thing) {
    return getIriAll(thing, rdf.type).includes(acp.Rule);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Add a rule that refines the scope of a given the [[Policy]]. If an agent
 * requesting access to a resource is **not** present in **any** of the "All Of" rules,
 * they will not be granted access.
 *
 * Also see [[addAnyOfRuleUrl]] and [[addNoneOfRuleUrl]].
 *
 * @param policy The [[Policy]] to which the rule should be added.
 * @param rule The rule to add to the policy.
 * @returns A new [[Policy]] clone of the original one, with the new rule added.
 * @since 1.6.0
 */
function addAllOfRuleUrl(policy, rule) {
    return addIri(policy, acp.allOf, rule);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Removes a rule that refines the scope of a given the [[Policy]]. If an agent
 * requesting access to a resource is **not** present in **any** of the "All Of" rules,
 * they will not be granted access.
 * @param policy The [[Policy]] from which the rule should be removed.
 * @param rule The rule to remove from the policy.
 * @returns A new [[Policy]] clone of the original one, with the rule removed.
 * @since 1.6.0
 */
function removeAllOfRuleUrl(policy, rule) {
    return removeIri(policy, acp.allOf, rule);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Overwrites the rule refining the scope of a given the [[Policy]]. If an agent
 * requesting access to a resource is **not** present in **any** of the "All Of" rules,
 * they will not be granted access.
 * @param policy The [[Policy]] to which the rule should be added.
 * @param rules The rules the policy requires.
 * @returns A new [[Policy]] clone of the original one, with the "All Of" rules replaced.
 * @since 1.6.0
 */
function setAllOfRuleUrl(policy, rule) {
    return setIri(policy, acp.allOf, rule);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the "All Of" [[Rule]]s for the given [[Policy]]
 * @param policy The [[policy]] from which the rules should be read.
 * @returns A list of the "All Of" [[Rule]]s
 * @since 1.6.0
 */
function getAllOfRuleUrlAll(policy) {
    return getIriAll(policy, acp.allOf);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Add a rule that extends the scope of a given the [[Policy]]. If an agent
 * requesting access to a resource is present in **any** of the "Any Of" rules,
 * they will be granted access.
 *
 * Also see [[addAllOfRuleUrl]] and [[addNoneOfRuleUrl]].
 *
 * @param policy The [[Policy]] to which the rule should be added.
 * @param rule The rule to add to the policy.
 * @returns A new [[Policy]] clone of the original one, with the new rule added.
 * @since 1.6.0
 */
function addAnyOfRuleUrl(policy, rule) {
    return addIri(policy, acp.anyOf, rule);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Removes a rule that extends the scope of a given the [[Policy]]. If an agent
 * requesting access to a resource is present in **any** of the "Any Of" rules,
 * they will be granted access.
 * @param policy The [[Policy]] from which the rule should be removed.
 * @param rule The rule to remove from the policy.
 * @returns A new [[Policy]] clone of the original one, with the rule removed.
 * @since 1.6.0
 */
function removeAnyOfRuleUrl(policy, rule) {
    return removeIri(policy, acp.anyOf, rule);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Overwrite the rule extending the scope of a given the [[Policy]]. If an agent
 * requesting access to a resource is present in **any** of the "Any Of" rules,
 * they will be granted access.
 * @param policy The [[Policy]] to which the rule should be added.
 * @param rules The rules the policy accepts.
 * @returns A new [[Policy]] clone of the original one, with the "Any Of" rules replaced.
 * @since 1.6.0
 */
function setAnyOfRuleUrl(policy, rule) {
    return setIri(policy, acp.anyOf, rule);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the "Any Of" [[Rule]]s for the given [[Policy]]
 * @param policy The [[policy]] from which the rules should be read.
 * @returns A list of the "Any Of" [[Rule]]s
 * @since 1.6.0
 */
function getAnyOfRuleUrlAll(policy) {
    return getIriAll(policy, acp.anyOf);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Add a rule that restricts the scope of a given the [[Policy]]. If an agent
 * requesting access to a resource is present in **any** of the forbidden rules,
 * they will **not** be granted access.
 *
 * Also see [[addAllOfRuleUrl]] and [[addAnyOfRuleUrl]].
 *
 * @param policy The [[Policy]] to which the rule should be added.
 * @param rule The rule to add to the policy.
 * @returns A new [[Policy]] clone of the original one, with the new rule added.
 * @since 1.6.0
 */
function addNoneOfRuleUrl(policy, rule) {
    return addIri(policy, acp.noneOf, rule);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Removes a rule that restricts the scope of a given the [[Policy]]. If an agent
 * requesting access to a resource is present in **any** of the forbidden rules,
 * they will **not** be granted access.
 * @param policy The [[Policy]] from which the rule should be removed.
 * @param rule The rule to remove from the policy.
 * @returns A new [[Policy]] clone of the original one, with the rule removed.
 * @since 1.6.0
 */
function removeNoneOfRuleUrl(policy, rule) {
    return removeIri(policy, acp.noneOf, rule);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Set the rules restrincting the scope of a given the [[Policy]]. If an agent
 * requesting access to a resource is present in **any** of the "None Of" rules,
 * they will not be granted access.
 * @param policy The [[Policy]] to which the rule should be added.
 * @param rules The rules the policy accepts.
 * @returns A new [[Policy]] clone of the original one, with the "Any Of" rules replaced.
 * @since 1.6.0
 */
function setNoneOfRuleUrl(policy, rule) {
    return setIri(policy, acp.noneOf, rule);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the "None Of" [[Rule]]s for the given [[Policy]]
 * @param policy The [[policy]] from which the rules should be read.
 * @returns A list of the forbidden [[Rule]]s
 * @since 1.6.0
 */
function getNoneOfRuleUrlAll(policy) {
    return getIriAll(policy, acp.noneOf);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Initialise a new, empty [[Rule]].
 *
 * @param url URL that identifies this [[Rule]].
 * @since 1.6.0
 */
function createRule(url) {
    const stringUrl = internal_toIriString(url);
    let ruleThing = createThing({ url: stringUrl });
    ruleThing = setUrl(ruleThing, rdf.type, acp.Rule);
    return ruleThing;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Initialise a new, empty [[ResourceRule]] for the given Resource.
 *
 * @param resourceWithAcr The Resource to which the new Rule is to apply.
 * @param name Name that identifies this [[Rule]].
 * @since 1.6.0
 */
function createResourceRuleFor(resourceWithAcr, name) {
    const acr = internal_getAcr(resourceWithAcr);
    const url = new URL(getSourceUrl(acr));
    url.hash = `#${name}`;
    let ruleThing = createThing({ url: url.href });
    ruleThing = setUrl(ruleThing, rdf.type, acp.Rule);
    return ruleThing;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the [[Rule]] with the given URL from an [[SolidDataset]].
 *
 * @param ruleResource The Resource that contains the given [[Rule]].
 * @param url URL that identifies this [[Rule]].
 * @returns The requested [[Rule]], if it exists, or `null` if it does not.
 * @since 1.6.0
 */
function getRule(ruleResource, url) {
    const foundThing = getThing(ruleResource, url);
    if (foundThing === null || getUrl(foundThing, rdf.type) !== acp.Rule) {
        return null;
    }
    return foundThing;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the [[ResourceRule]] with the given name from an Resource's Access Control
 * Resource.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains the given [[ResourceRule]].
 * @param name Name that identifies this [[ResourceRule]].
 * @returns The requested [[ResourceRule]], if it exists, or `null` if it does not.
 * @since 1.6.0
 */
function getResourceRule(resourceWithAcr, name) {
    const acr = internal_getAcr(resourceWithAcr);
    const acrUrl = getSourceUrl(acr);
    const url = new URL(acrUrl);
    url.hash = `#${name}`;
    const foundThing = getThing(acr, url.href);
    if (foundThing === null || !isRule(foundThing)) {
        return null;
    }
    return foundThing;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Gets the [[Rule]]s from a [[SolidDataset]].
 *
 * @param ruleResource The Resource that contains (zero or more) [[Rule]]s.
 * @returns The [[Rule]]s contained in this resource.
 * @since 1.6.0
 */
function getRuleAll(ruleResource) {
    const things = getThingAll(ruleResource);
    return things.filter(isRule);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Gets the [[ResourceRule]]s from a Resource's Access Control Resource.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains (zero or more) [[ResourceRule]]s.
 * @returns The [[ResourceRule]]s contained in this Resource's Access Control Resource.
 * @since 1.6.0
 */
function getResourceRuleAll(resourceWithAcr) {
    const acr = internal_getAcr(resourceWithAcr);
    const things = getThingAll(acr);
    return things.filter(isRule);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Removes the given [[Rule]] from the given [[SolidDataset]].
 *
 * @param ruleResource The Resource that contains (zero or more) [[Rule]]s.
 * @returns A new SolidDataset equal to the given Rule Resource, but without the given Rule.
 * @since 1.6.0
 */
function removeRule(ruleResource, rule) {
    return removeThing(ruleResource, rule);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Removes the given [[ResourceRule]] from the given Resource's Access Control Resource.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains (zero or more) [[ResourceRule]]s.
 * @returns A new Resource equal to the given Resource, but without the given Rule in its ACR.
 * @since 1.6.0
 */
function removeResourceRule(resourceWithAcr, rule) {
    const acr = internal_getAcr(resourceWithAcr);
    let ruleToRemove;
    if (typeof rule === "string") {
        try {
            new URL(rule);
            ruleToRemove = rule;
        }
        catch (e) {
            // If the given Rule to remove is the name of the Rule,
            // resolve it to its full URL — developers usually refer to either the
            // Rule itself, or by its name, as they do not have access to the ACR
            // directly.
            const ruleUrl = new URL(getSourceUrl(acr));
            ruleUrl.hash = `#${rule}`;
            ruleToRemove = ruleUrl.href;
        }
    }
    else if (isNamedNode(rule)) {
        ruleToRemove = internal_toIriString(rule);
    }
    else {
        ruleToRemove = asUrl(rule);
    }
    // Check whether the actual Rule (i.e. with the Rule type) exists:
    const matchingRule = getResourceRule(resourceWithAcr, new URL(ruleToRemove).hash.substring(1));
    if (matchingRule === null) {
        // No such Rule exists yet, so return the Resource+ACR unchanged:
        return resourceWithAcr;
    }
    const updatedAcr = removeThing(acr, matchingRule);
    const updatedResource = internal_setAcr(resourceWithAcr, updatedAcr);
    return updatedResource;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Insert the given [[Rule]] into the given [[SolidDataset]], replacing previous
 * instances of that Rule.
 *
 * @param ruleResource The Resource that contains (zero or more) [[Rule]]s.
 * @returns A new SolidDataset equal to the given Rule Resource, but with the given Rule.
 * @since 1.6.0
 */
function setRule(ruleResource, rule) {
    return setThing(ruleResource, rule);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Insert the given [[ResourceRule]] into the given Resource's Access Control Resource,
 * replacing previous instances of that Rule.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains (zero or more) [[ResourceRule]]s.
 * @returns A new Resource equal to the given Resource, but with the given Rule in its ACR.
 * @since 1.6.0
 */
function setResourceRule(resourceWithAcr, rule) {
    const acr = internal_getAcr(resourceWithAcr);
    const updatedAcr = setThing(acr, rule);
    const updatedResource = internal_setAcr(resourceWithAcr, updatedAcr);
    return updatedResource;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * List all the agents a [[Rule]] applies **directly** to. This will not include agents
 * that are part of a group the [[Rule]] applies to, nor will it include specific agent
 * classes, such as authenticated or public agents.
 *
 * @param rule The rule from which agents are read.
 * @returns A list of the WebIDs of agents included in the rule.
 * @since 1.6.0
 */
function getAgentAll(rule) {
    return getIriAll(rule, acp.agent).filter((agent) => agent !== acp.PublicAgent &&
        agent !== acp.AuthenticatedAgent &&
        agent !== acp.CreatorAgent);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Overwrite the agents the [[Rule]] applies to with the provided agents.
 *
 * @param rule The rule for which agents are set.
 * @param agent The agent the rule should apply to.
 * @returns A copy of the input rule, applying to a different set of agents.
 * @since 1.6.0
 */
function setAgent(rule, agent) {
    // Preserve the special agent classes authenticated and public, which we
    // don't want to overwrite with this function.
    const isPublic = hasPublic(rule);
    const isAuthenticated = hasAuthenticated(rule);
    const isCreator = hasCreator(rule);
    let result = setIri(rule, acp.agent, agent);
    // Restore public and authenticated
    if (isPublic) {
        result = setPublic(result);
    }
    if (isAuthenticated) {
        result = setAuthenticated(result);
    }
    if (isCreator) {
        result = setCreator(result);
    }
    return result;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Apply the [[Rule]] to an additional agent.
 *
 * @param rule The [[Rule]] to be applied to an additional agent.
 * @param agent The agent the [[Rule]] should apply to.
 * @returns A copy of the [[Rule]], applying to an additional agent.
 * @since 1.6.0
 */
function addAgent(rule, agent) {
    return addIri(rule, acp.agent, agent);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Prevent the [[Rule]] from applying to a given agent directly. This will not
 * remove the agent from any groups the rule applies to.
 *
 * @param rule The [[Rule]] that should no longer apply to a given agent.
 * @param agent The agent the rule should no longer apply to.
 * @returns A copy of the rule, not applying to the given agent.
 * @since 1.6.0
 */
function removeAgent(rule, agent) {
    return removeIri(rule, acp.agent, agent);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Lists all the groups a [[Rule]] applies to.
 *
 * @param rule The rule from which groups are read.
 * @returns A list of the [[URL]]'s of groups included in the rule.
 * @since 1.6.0
 * @deprecated Access Control Policies will no longer support vcard:Group. You can re-use a Rule listing multiple Agents to get the same functionality.
 */
function getGroupAll(rule) {
    return getIriAll(rule, acp.group);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Overwrite the groups the [[Rule]] applies to with the provided groups.
 *
 * @param rule The rule for which groups are set.
 * @param group The group the rule should apply to.
 * @returns A copy of the input rule, applying to a different set of groups.
 * @since 1.6.0
 * @deprecated Access Control Policies will no longer support vcard:Group. You can re-use a Rule listing multiple Agents to get the same functionality.
 */
function setGroup(rule, group) {
    return setIri(rule, acp.group, group);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Apply the [[Rule]] to an additional group.
 *
 * @param rule The [[Rule]] to be applied to an additional group.
 * @param agent The group the [[Rule]] should apply to.
 * @returns A copy of the [[Rule]], applying to an additional group.
 * @since 1.6.0
 * @deprecated Access Control Policies will no longer support vcard:Group. You can re-use a Rule listing multiple Agents to get the same functionality.
 */
function addGroup(rule, group) {
    return addIri(rule, acp.group, group);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Prevent the [[Rule]] from applying to a given group.
 *
 * @param rule The [[Rule]] that should no longer apply to a given group.
 * @param agent The group the rule should no longer apply to.
 * @returns A copy of the rule, not applying to the given group.
 * @since 1.6.0
 * @deprecated Access Control Policies will no longer support vcard:Group. You can re-use a Rule listing multiple Agents to get the same functionality.
 */
function removeGroup(rule, group) {
    return removeIri(rule, acp.group, group);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Check if the rule applies to any agent.
 *
 * @param rule The rule checked for public access.
 * @returns Whether the rule applies to any agent or not.
 * @since 1.6.0
 */
function hasPublic(rule) {
    return (getIriAll(rule, acp.agent).filter((agent) => agent === acp.PublicAgent)
        .length > 0);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Set a Rule to apply to any Agent.
 *
 * @param rule The rule being modified.
 * @returns A copy of the rule, updated to apply to any agent.
 * @since 1.6.0
 */
function setPublic(rule) {
    // The second argument should not be part of the function signature,
    // so it's not in the parameter list:
    // eslint-disable-next-line prefer-rest-params
    if (typeof arguments === "object" && typeof arguments[1] === "boolean") {
        throw new Error("The function `setPublic` no longer takes a second parameter. It is now used together with `removePublic` instead.");
    }
    return addIri(rule, acp.agent, acp.PublicAgent);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Set a Rule to no longer apply to any Agent.
 *
 * @param rule The rule being modified.
 * @returns A copy of the rule, updated to no longer apply to any agent.
 * @since 1.6.0
 */
function removePublic(rule) {
    return removeIri(rule, acp.agent, acp.PublicAgent);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Check if the rule applies to any authenticated agent.
 *
 * @param rule The rule checked for authenticated access.
 * @returns Whether the rule applies to any authenticated agent or not.
 * @since 1.6.0
 */
function hasAuthenticated(rule) {
    return (getIriAll(rule, acp.agent).filter((agent) => agent === acp.AuthenticatedAgent).length > 0);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Set a Rule to apply to any authenticated Agent.
 *
 * @param rule The rule being modified.
 * @returns A copy of the rule, updated to apply to any authenticated Agent.
 * @since 1.6.0
 */
function setAuthenticated(rule) {
    // The second argument should not be part of the function signature,
    // so it's not in the parameter list:
    // eslint-disable-next-line prefer-rest-params
    if (typeof arguments === "object" && typeof arguments[1] === "boolean") {
        throw new Error("The function `setAuthenticated` no longer takes a second parameter. It is now used together with `removeAuthenticated` instead.");
    }
    return addIri(rule, acp.agent, acp.AuthenticatedAgent);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Set a Rule to no longer apply to any authenticated Agent.
 *
 * @param rule The rule being modified.
 * @returns A copy of the rule, updated to apply/not apply to any authenticated agent.
 * @since 1.6.0
 */
function removeAuthenticated(rule) {
    return removeIri(rule, acp.agent, acp.AuthenticatedAgent);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Check if the rule applies to the creator of the Resource.
 *
 * @param rule The rule checked for authenticated access.
 * @returns Whether the rule applies to the creator of the Resource or not.
 * @since 1.6.0
 */
function hasCreator(rule) {
    return (getIriAll(rule, acp.agent).filter((agent) => agent === acp.CreatorAgent)
        .length > 0);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Set a Rule to apply to the creator of a Resource.
 *
 * @param rule The rule being modified.
 * @returns A copy of the rule, updated to apply to the creator of a Resource.
 * @since 1.6.0
 */
function setCreator(rule) {
    // The second argument should not be part of the function signature,
    // so it's not in the parameter list:
    // eslint-disable-next-line prefer-rest-params
    if (typeof arguments === "object" && typeof arguments[1] === "boolean") {
        throw new Error("The function `setCreator` no longer takes a second parameter. It is now used together with `removeCreator` instead.");
    }
    return addIri(rule, acp.agent, acp.CreatorAgent);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Set a Rule to no longer apply to the creator of a Resource.
 *
 * @param rule The rule being modified.
 * @returns A copy of the rule, updated to apply/not apply to the creator of a Resource.
 * @since 1.6.0
 */
function removeCreator(rule) {
    return removeIri(rule, acp.agent, acp.CreatorAgent);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * List all the clients a [[Rule]] applies **directly** to. This will not include
 * specific client classes, such as public clients.
 *
 * @param rule The rule from which clients are read.
 * @returns A list of the WebIDs of clients included in the rule.
 * @since 1.6.0
 */
function getClientAll(rule) {
    return getIriAll(rule, acp.client).filter((client) => client !== solid.PublicOidcClient);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Overwrite the clients the [[Rule]] applies to with the provided Client.
 *
 * @param rule The rule for which clients are set.
 * @param client The Client the rule should apply to.
 * @returns A copy of the input rule, applying to a different set of Clients.
 * @since 1.6.0
 */
function setClient(rule, client) {
    // Preserve the special "any client" class, which we
    // don't want to overwrite with this function.
    const anyClientEnabled = hasAnyClient(rule);
    let result = setIri(rule, acp.client, client);
    // Restore the "any client" class
    if (anyClientEnabled) {
        result = setAnyClient(result);
    }
    return result;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Apply the [[Rule]] to an additional Client.
 *
 * @param rule The [[Rule]] to be applied to an additional Client.
 * @param client The Client the [[Rule]] should apply to.
 * @returns A copy of the [[Rule]], applying to an additional Client.
 * @since 1.6.0
 */
function addClient(rule, client) {
    return addIri(rule, acp.client, client);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Prevent the [[Rule]] from applying to a given Client directly.
 *
 * @param rule The [[Rule]] that should no longer apply to a given Client.
 * @param client The Client the rule should no longer apply to.
 * @returns A copy of the rule, not applying to the given Client.
 * @since 1.6.0
 */
function removeClient(rule, client) {
    return removeIri(rule, acp.client, client);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Check if the rule applies to any client, i.e. all the applications
 * regardless of their identifier.
 *
 * @param rule The rule checked for authenticated access.
 * @returns Whether the rule applies to public clients.
 * @since 1.6.0
 */
function hasAnyClient(rule) {
    return (getIriAll(rule, acp.client).filter((client) => client === solid.PublicOidcClient).length > 0);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Make the [[Rule]] apply to any client application.
 *
 * @param rule The rule for which clients are set.
 * @returns A copy of the rule, updated to apply to any client
 * @since 1.6.0
 */
function setAnyClient(rule) {
    return addIri(rule, acp.client, solid.PublicOidcClient);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Make the [[Rule]] no longer apply to any client application.
 *
 * @param rule The rule for which clients are set.
 * @returns A copy of the rule, updated to no longer apply to any client
 * @since 1.6.0
 */
function removeAnyClient(rule) {
    return removeIri(rule, acp.client, solid.PublicOidcClient);
}
/**
 * Gets a human-readable representation of the given [[Rule]] to aid debugging.
 *
 * Note that changes to the exact format of the return value are not considered a breaking change;
 * it is intended to aid in debugging, not as a serialisation method that can be reliably parsed.
 *
 * @param rule The Rule to get a human-readable representation of.
 * @since 1.6.0
 */
function ruleAsMarkdown(rule) {
    let markdown = `## Rule: ${asUrl(rule)}\n\n`;
    let targetEnumeration = "";
    if (hasPublic(rule)) {
        targetEnumeration += "- Everyone\n";
    }
    if (hasAuthenticated(rule)) {
        targetEnumeration += "- All authenticated agents\n";
    }
    if (hasCreator(rule)) {
        targetEnumeration += "- The creator of this resource\n";
    }
    if (hasAnyClient(rule)) {
        targetEnumeration += "- Users of any client application\n";
    }
    const targetAgents = getAgentAll(rule);
    if (targetAgents.length > 0) {
        targetEnumeration += "- The following agents:\n  - ";
        targetEnumeration += targetAgents.join("\n  - ") + "\n";
    }
    const targetGroups = getGroupAll(rule);
    if (targetGroups.length > 0) {
        targetEnumeration += "- Members of the following groups:\n  - ";
        targetEnumeration += targetGroups.join("\n  - ") + "\n";
    }
    const targetClients = getClientAll(rule);
    if (targetClients.length > 0) {
        targetEnumeration += "- Users of the following client applications:\n  - ";
        targetEnumeration += targetClients.join("\n  - ") + "\n";
    }
    markdown +=
        targetEnumeration.length > 0
            ? "This rule applies to:\n" + targetEnumeration
            : "<empty>\n";
    return markdown;
}

export { addAgent, addAllOfRuleUrl, addAnyOfRuleUrl, addClient, addGroup, addNoneOfRuleUrl, createResourceRuleFor, createRule, getAgentAll, getAllOfRuleUrlAll, getAnyOfRuleUrlAll, getClientAll, getGroupAll, getNoneOfRuleUrlAll, getResourceRule, getResourceRuleAll, getRule, getRuleAll, hasAnyClient, hasAuthenticated, hasCreator, hasPublic, removeAgent, removeAllOfRuleUrl, removeAnyClient, removeAnyOfRuleUrl, removeAuthenticated, removeClient, removeCreator, removeGroup, removeNoneOfRuleUrl, removePublic, removeResourceRule, removeRule, ruleAsMarkdown, setAgent, setAllOfRuleUrl, setAnyClient, setAnyOfRuleUrl, setAuthenticated, setClient, setCreator, setGroup, setNoneOfRuleUrl, setPublic, setResourceRule, setRule };
