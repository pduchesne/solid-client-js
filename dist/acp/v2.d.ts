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
import { getFileWithAccessDatasets, getFileWithAcr, getReferencedPolicyUrlAll, getResourceInfoWithAccessDatasets, getResourceInfoWithAcr, getSolidDatasetWithAccessDatasets, getSolidDatasetWithAcr, hasAccessibleAcr, saveAcrFor } from "./acp";
import { acrAsMarkdown, addAcrPolicyUrl, addMemberAcrPolicyUrl, addMemberPolicyUrl, addPolicyUrl, getAcrPolicyUrlAll, getMemberAcrPolicyUrlAll, getMemberPolicyUrlAll, getPolicyUrlAll, hasLinkedAcr, removeAcrPolicyUrl, removeAcrPolicyUrlAll, removeMemberAcrPolicyUrl, removeMemberAcrPolicyUrlAll, removeMemberPolicyUrl, removeMemberPolicyUrlAll, removePolicyUrl, removePolicyUrlAll } from "./control";
import { createPolicy, getAllowModesV1, getDenyModesV1, getPolicy, getPolicyAll, policyAsMarkdown, removePolicy, setAllowModesV1, setDenyModesV1, setPolicy } from "./policy";
import { addAgent, addNoneOfRuleUrl, addGroup, addAnyOfRuleUrl, addAllOfRuleUrl, createRule, getAgentAll, getNoneOfRuleUrlAll, getGroupAll, getAnyOfRuleUrlAll, getAllOfRuleUrlAll, getRule, getRuleAll, hasAuthenticated, hasCreator, hasPublic, removeAgent, removeNoneOfRuleUrl, removeGroup, removeAnyOfRuleUrl, removeAllOfRuleUrl, removeRule, Rule, ruleAsMarkdown, setAgent, setNoneOfRuleUrl, setGroup, setAnyOfRuleUrl, setAllOfRuleUrl, setRule } from "./rule";
import { addMockAcrTo, mockAcrFor } from "./mock";
/** @deprecated Replaced by [[setPublic]] */
export declare function previousSetPublicSignature(rule: Rule, enable: boolean): Rule;
/** @deprecated Replaced by [[setAuthenticated]] */
export declare function previousSetAuthenticatedSignature(rule: Rule, enable: boolean): Rule;
/** @deprecated Replaced by [[setCreator]] */
export declare function previousSetCreatorSignature(rule: Rule, enable: boolean): Rule;
/**
 * @hidden
 * @deprecated Replaced by [[acp_v3]].
 */
export declare const acp_v2: {
    /** @deprecated This misspelling was included accidentally. The correct function is [[getForbiddenRuleUrlAll]]. */
    getForbiddenRuleurlAll: typeof getNoneOfRuleUrlAll;
    setPublic: typeof previousSetPublicSignature;
    setAuthenticated: typeof previousSetAuthenticatedSignature;
    setCreator: typeof previousSetCreatorSignature;
    addMockAcrTo: typeof addMockAcrTo;
    mockAcrFor: typeof mockAcrFor;
    addAgent: typeof addAgent;
    addForbiddenRuleUrl: typeof addNoneOfRuleUrl;
    addGroup: typeof addGroup;
    addOptionalRuleUrl: typeof addAnyOfRuleUrl;
    addRequiredRuleUrl: typeof addAllOfRuleUrl;
    createRule: typeof createRule;
    getAgentAll: typeof getAgentAll;
    getForbiddenRuleUrlAll: typeof getNoneOfRuleUrlAll;
    getGroupAll: typeof getGroupAll;
    getOptionalRuleUrlAll: typeof getAnyOfRuleUrlAll;
    getRequiredRuleUrlAll: typeof getAllOfRuleUrlAll;
    getRule: typeof getRule;
    getRuleAll: typeof getRuleAll;
    hasAuthenticated: typeof hasAuthenticated;
    hasCreator: typeof hasCreator;
    hasPublic: typeof hasPublic;
    removeAgent: typeof removeAgent;
    removeForbiddenRuleUrl: typeof removeNoneOfRuleUrl;
    removeGroup: typeof removeGroup;
    removeOptionalRuleUrl: typeof removeAnyOfRuleUrl;
    removeRequiredRuleUrl: typeof removeAllOfRuleUrl;
    removeRule: typeof removeRule;
    ruleAsMarkdown: typeof ruleAsMarkdown;
    setAgent: typeof setAgent;
    setForbiddenRuleUrl: typeof setNoneOfRuleUrl;
    setGroup: typeof setGroup;
    setOptionalRuleUrl: typeof setAnyOfRuleUrl;
    setRequiredRuleUrl: typeof setAllOfRuleUrl;
    setRule: typeof setRule;
    createPolicy: typeof createPolicy;
    getAllowModes: typeof getAllowModesV1;
    getDenyModes: typeof getDenyModesV1;
    getPolicy: typeof getPolicy;
    getPolicyAll: typeof getPolicyAll;
    policyAsMarkdown: typeof policyAsMarkdown;
    removePolicy: typeof removePolicy;
    setAllowModes: typeof setAllowModesV1;
    setDenyModes: typeof setDenyModesV1;
    setPolicy: typeof setPolicy;
    acrAsMarkdown: typeof acrAsMarkdown;
    addAcrPolicyUrl: typeof addAcrPolicyUrl;
    addMemberAcrPolicyUrl: typeof addMemberAcrPolicyUrl;
    addMemberPolicyUrl: typeof addMemberPolicyUrl;
    addPolicyUrl: typeof addPolicyUrl;
    getAcrPolicyUrlAll: typeof getAcrPolicyUrlAll;
    getMemberAcrPolicyUrlAll: typeof getMemberAcrPolicyUrlAll;
    getMemberPolicyUrlAll: typeof getMemberPolicyUrlAll;
    getPolicyUrlAll: typeof getPolicyUrlAll;
    hasLinkedAcr: typeof hasLinkedAcr;
    removeAcrPolicyUrl: typeof removeAcrPolicyUrl;
    removeAcrPolicyUrlAll: typeof removeAcrPolicyUrlAll;
    removeMemberAcrPolicyUrl: typeof removeMemberAcrPolicyUrl;
    removeMemberAcrPolicyUrlAll: typeof removeMemberAcrPolicyUrlAll;
    removeMemberPolicyUrl: typeof removeMemberPolicyUrl;
    removeMemberPolicyUrlAll: typeof removeMemberPolicyUrlAll;
    removePolicyUrl: typeof removePolicyUrl;
    removePolicyUrlAll: typeof removePolicyUrlAll;
    getFileWithAccessDatasets: typeof getFileWithAccessDatasets;
    getFileWithAcr: typeof getFileWithAcr;
    getReferencedPolicyUrlAll: typeof getReferencedPolicyUrlAll;
    getResourceInfoWithAccessDatasets: typeof getResourceInfoWithAccessDatasets;
    getResourceInfoWithAcr: typeof getResourceInfoWithAcr;
    getSolidDatasetWithAccessDatasets: typeof getSolidDatasetWithAccessDatasets;
    getSolidDatasetWithAcr: typeof getSolidDatasetWithAcr;
    hasAccessibleAcr: typeof hasAccessibleAcr;
    saveAcrFor: typeof saveAcrFor;
};
