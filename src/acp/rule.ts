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

import { acp, rdf, solid } from "../constants";
import {
  SolidDataset,
  Thing,
  ThingPersisted,
  Url,
  UrlString,
  WebId,
} from "../interfaces";
import { internal_toIriString } from "../interfaces.internal";
import { addIri } from "../thing/add";
import { getIriAll, getUrl } from "../thing/get";
import { removeIri } from "../thing/remove";
import { setIri, setUrl } from "../thing/set";
import {
  asUrl,
  createThing,
  getThing,
  getThingAll,
  removeThing,
  setThing,
} from "../thing/thing";
import { Policy, ResourcePolicy } from "./policy";

export type Rule = ThingPersisted;

/**
 * NOTE: Don't export for now (i.e. if exported, should this be `isAcpRule()` so
 * as not to clash with `isAclRule()`.
 *
 * @param thing the [[Thing]] to check to see if it's an ACP rule or not
 */
function isRule(thing: Thing): thing is Rule {
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
 * @param policy The [[Policy]] to which the rule should be added.
 * @param rule The rule to add to the policy.
 * @returns A new [[Policy]] clone of the original one, with the new rule added.
 * @since Unreleased
 */
export function addAllOfRuleUrl<P extends Policy | ResourcePolicy>(
  policy: P,
  rule: Rule | Url | UrlString
): P {
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
 * @since Unreleased
 */
export function removeAllOfRuleUrl<P extends Policy | ResourcePolicy>(
  policy: P,
  rule: Rule | Url | UrlString
): P {
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
 * @since Unreleased
 */
export function setAllOfRuleUrl<P extends Policy | ResourcePolicy>(
  policy: P,
  rule: Rule | Url | UrlString
): P {
  return setIri(policy, acp.allOf, rule);
}

/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the "All Of" [[Rule]]'s for the given [[Policy]]
 * @param policy The [[policy]] from which the rules should be read.
 * @returns A list of the "All Of" [[Rule]]'s
 * @since unreleased
 */
export function getAllOfRuleUrlAll<P extends Policy | ResourcePolicy>(
  policy: P
): UrlString[] {
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
 * @param policy The [[Policy]] to which the rule should be added.
 * @param rule The rule to add to the policy.
 * @returns A new [[Policy]] clone of the original one, with the new rule added.
 * @since Unreleased
 */
export function addAnyOfRuleUrl<P extends Policy | ResourcePolicy>(
  policy: P,
  rule: Rule | Url | UrlString
): P {
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
 * @since Unreleased
 */
export function removeAnyOfRuleUrl<P extends Policy | ResourcePolicy>(
  policy: P,
  rule: Rule | Url | UrlString
): P {
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
 * @since Unreleased
 */
export function setAnyOfRuleUrl<P extends Policy | ResourcePolicy>(
  policy: P,
  rule: Rule | Url | UrlString
): P {
  return setIri(policy, acp.anyOf, rule);
}

/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the [[Rule]]'s accepted by the given [[Policy]]
 * @param policy The [[policy]] from which the rules should be read.
 * @returns A list of the "Any Of" [[Rule]]'s
 * @since unreleased
 */
export function getAnyOfRuleUrlAll<P extends Policy | ResourcePolicy>(
  policy: P
): UrlString[] {
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
 * @param policy The [[Policy]] to which the rule should be added.
 * @param rule The rule to add to the policy.
 * @returns A new [[Policy]] clone of the original one, with the new rule added.
 * @since Unreleased
 */
export function addNoneOfRuleUrl<P extends Policy | ResourcePolicy>(
  policy: P,
  rule: Rule | Url | UrlString
): P {
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
 * @since Unreleased
 */
export function removeNoneOfRuleUrl<P extends Policy | ResourcePolicy>(
  policy: P,
  rule: Rule | Url | UrlString
): P {
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
 * @since Unreleased
 */
export function setNoneOfRuleUrl<P extends Policy | ResourcePolicy>(
  policy: P,
  rule: Rule | Url | UrlString
): P {
  return setIri(policy, acp.noneOf, rule);
}

/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the [[Rule]]'s forbidden by the given [[Policy]]
 * @param policy The [[policy]] from which the rules should be read.
 * @returns A list of the forbidden [[Rule]]'s
 * @since unreleased
 */
export function getNoneOfRuleUrlAll<P extends Policy | ResourcePolicy>(
  policy: P
): UrlString[] {
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
 */
export function createRule(url: Url | UrlString): Rule {
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
 * Get the [[Rule]] with the given URL from an [[RuleDataset]].
 *
 * @param ruleResource The Resource that contains the given [[Rule]].
 * @param url URL that identifies this [[Rule]].
 * @returns The requested [[Rule]], if it exists, or `null` if it does not.
 */
export function getRule(
  ruleResource: SolidDataset,
  url: Url | UrlString
): Rule | null {
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
 * Gets the [[Rule]]s from a [[SolidDataset]].
 *
 * @param ruleResource The Resource that contains (zero of more) [[Rule]]s.
 * @returns The [[Rule]]s contained in this resource.
 */
export function getRuleAll(ruleResource: SolidDataset): Rule[] {
  const things = getThingAll(ruleResource);
  return things.filter(isRule);
}

/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Removes the given [[Rule]] from the given [[SolidDataset]].
 *
 * @param ruleResource The Resource that contains (zero of more) [[Rule]]s.
 * @returns A new RuleDataset equal to the given Rule Resource, but without the given Rule.
 */
export function removeRule<Dataset extends SolidDataset>(
  ruleResource: Dataset,
  rule: Url | UrlString | Rule
): Dataset {
  return removeThing(ruleResource, rule);
}

/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Insert the given [[Rule]] into the given [[SolidDataset]], replacing previous
 * instances of that Rule.
 *
 * @param ruleResource The Resource that contains (zero of more) [[Rule]]s.
 * @returns A new RuleDataset equal to the given Rule Resource, but with the given Rule.
 */
export function setRule<Dataset extends SolidDataset>(
  ruleResource: Dataset,
  rule: Rule
): Dataset {
  return setThing(ruleResource, rule);
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
 * @since Unreleased
 */
export function getAgentAll(rule: Rule): WebId[] {
  return getIriAll(rule, acp.agent).filter(
    (agent: WebId) =>
      agent !== acp.PublicAgent &&
      agent !== acp.AuthenticatedAgent &&
      agent !== acp.CreatorAgent
  );
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
 * @since Unreleased
 */
export function setAgent(rule: Rule, agent: WebId): Rule {
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
 * @since Unreleased
 */
export function addAgent(rule: Rule, agent: WebId): Rule {
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
 * @since Unreleased
 */
export function removeAgent(rule: Rule, agent: WebId): Rule {
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
 * @since Unreleased
 */
export function getGroupAll(rule: Rule): UrlString[] {
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
 * @since Unreleased
 */
export function setGroup(rule: Rule, group: UrlString): Rule {
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
 * @since Unreleased
 */
export function addGroup(rule: Rule, group: UrlString): Rule {
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
 * @since Unreleased
 */
export function removeGroup(rule: Rule, group: UrlString): Rule {
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
 */
export function hasPublic(rule: Rule): boolean {
  return (
    getIriAll(rule, acp.agent).filter((agent) => agent === acp.PublicAgent)
      .length > 0
  );
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
 * @status Unreleased
 */
export function setPublic(rule: Rule): Rule {
  // The second argument should not be part of the function signature,
  // so it's not in the parameter list:
  // eslint-disable-next-line prefer-rest-params
  if (typeof arguments === "object" && typeof arguments[1] === "boolean") {
    throw new Error(
      "The function `setPublic` no longer takes a second parameter. It is now used together with `removePublic` instead."
    );
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
 * @status Unreleased
 */
export function removePublic(rule: Rule): Rule {
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
 */
export function hasAuthenticated(rule: Rule): boolean {
  return (
    getIriAll(rule, acp.agent).filter(
      (agent) => agent === acp.AuthenticatedAgent
    ).length > 0
  );
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
 * @status Unreleased
 */
export function setAuthenticated(rule: Rule): Rule {
  // The second argument should not be part of the function signature,
  // so it's not in the parameter list:
  // eslint-disable-next-line prefer-rest-params
  if (typeof arguments === "object" && typeof arguments[1] === "boolean") {
    throw new Error(
      "The function `setAuthenticated` no longer takes a second parameter. It is now used together with `removeAuthenticated` instead."
    );
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
 * @status Unreleased
 */
export function removeAuthenticated(rule: Rule): Rule {
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
 */
export function hasCreator(rule: Rule): boolean {
  return (
    getIriAll(rule, acp.agent).filter((agent) => agent === acp.CreatorAgent)
      .length > 0
  );
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
 * @status Unreleased
 */
export function setCreator(rule: Rule): Rule {
  // The second argument should not be part of the function signature,
  // so it's not in the parameter list:
  // eslint-disable-next-line prefer-rest-params
  if (typeof arguments === "object" && typeof arguments[1] === "boolean") {
    throw new Error(
      "The function `setCreator` no longer takes a second parameter. It is now used together with `removeCreator` instead."
    );
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
 * @status Unreleased
 */
export function removeCreator(rule: Rule): Rule {
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
 * @since Unreleased
 */
export function getClientAll(rule: Rule): WebId[] {
  return getIriAll(rule, acp.client).filter(
    (client: WebId) => client !== solid.PublicOidcClient
  );
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
 * @since Unreleased
 */
export function setClient(rule: Rule, client: WebId): Rule {
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
 * @since Unreleased
 */
export function addClient(rule: Rule, client: WebId): Rule {
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
 * @since Unreleased
 */
export function removeClient(rule: Rule, client: WebId): Rule {
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
 */
export function hasAnyClient(rule: Rule): boolean {
  return (
    getIriAll(rule, acp.client).filter(
      (client) => client === solid.PublicOidcClient
    ).length > 0
  );
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
 * @since Unreleased
 */
export function setAnyClient(rule: Rule): Rule {
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
 * @since Unreleased
 */
export function removeAnyClient(rule: Rule): Rule {
  return removeIri(rule, acp.client, solid.PublicOidcClient);
}

/**
 * Gets a human-readable representation of the given [[Rule]] to aid debugging.
 *
 * Note that changes to the exact format of the return value are not considered a breaking change;
 * it is intended to aid in debugging, not as a serialisation method that can be reliably parsed.
 *
 * @param rule The Rule to get a human-readable representation of.
 */
export function ruleAsMarkdown(rule: Rule): string {
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
