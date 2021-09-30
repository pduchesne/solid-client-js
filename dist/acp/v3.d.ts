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
import { createPolicy, getAllowModesV1, getDenyModesV1, getPolicy, getPolicyAll, policyAsMarkdown, removePolicy, setAllowModesV1, setDenyModesV1, setPolicy, createResourcePolicyFor, getResourceAcrPolicy, getResourceAcrPolicyAll, getResourcePolicy, getResourcePolicyAll, removeResourceAcrPolicy, removeResourcePolicy, setResourceAcrPolicy, setResourcePolicy } from "./policy";
import { addAgent, addNoneOfRuleUrl, addGroup, addAnyOfRuleUrl, addAllOfRuleUrl, createRule, getAgentAll, getNoneOfRuleUrlAll, getGroupAll, getAnyOfRuleUrlAll, getAllOfRuleUrlAll, getRule, getRuleAll, hasAuthenticated, hasCreator, hasPublic, removeAgent, removeNoneOfRuleUrl, removeGroup, removeAnyOfRuleUrl, removeAllOfRuleUrl, removeRule, ruleAsMarkdown, setAgent, setAuthenticated, setCreator, setNoneOfRuleUrl, setGroup, setAnyOfRuleUrl, setPublic, setAllOfRuleUrl, setRule, addClient, getClientAll, hasAnyClient, removeClient, setAnyClient, setClient, removeAnyClient, removeAuthenticated, removeCreator, removePublic, createResourceRuleFor, getResourceRule, getResourceRuleAll, removeResourceRule, setResourceRule } from "./rule";
import { addMockAcrTo, mockAcrFor } from "./mock";
/**
 * @hidden
 * @deprecated Please import directly from the "acp/*" modules.
 */
export declare const acp_v3: {
    addMockAcrTo: typeof addMockAcrTo;
    mockAcrFor: typeof mockAcrFor;
    addAgent: typeof addAgent;
    addGroup: typeof addGroup;
    createRule: typeof createRule;
    getAgentAll: typeof getAgentAll;
    getGroupAll: typeof getGroupAll;
    getRule: typeof getRule;
    getRuleAll: typeof getRuleAll;
    removeAgent: typeof removeAgent;
    removeGroup: typeof removeGroup;
    removeRule: typeof removeRule;
    ruleAsMarkdown: typeof ruleAsMarkdown;
    setAgent: typeof setAgent;
    setGroup: typeof setGroup;
    setRule: typeof setRule;
    addClient: typeof addClient;
    getClientAll: typeof getClientAll;
    hasAnyClient: typeof hasAnyClient;
    removeClient: typeof removeClient;
    setAnyClient: typeof setAnyClient;
    setClient: typeof setClient;
    removeAnyClient: typeof removeAnyClient;
    hasAuthenticated: typeof hasAuthenticated;
    hasCreator: typeof hasCreator;
    hasPublic: typeof hasPublic;
    setAuthenticated: typeof setAuthenticated;
    setCreator: typeof setCreator;
    setPublic: typeof setPublic;
    removeAuthenticated: typeof removeAuthenticated;
    removeCreator: typeof removeCreator;
    removePublic: typeof removePublic;
    getAnyOfRuleUrlAll: typeof getAnyOfRuleUrlAll;
    addAnyOfRuleUrl: typeof addAnyOfRuleUrl;
    removeAnyOfRuleUrl: typeof removeAnyOfRuleUrl;
    setAnyOfRuleUrl: typeof setAnyOfRuleUrl;
    getAllOfRuleUrlAll: typeof getAllOfRuleUrlAll;
    addAllOfRuleUrl: typeof addAllOfRuleUrl;
    removeAllOfRuleUrl: typeof removeAllOfRuleUrl;
    setAllOfRuleUrl: typeof setAllOfRuleUrl;
    getNoneOfRuleUrlAll: typeof getNoneOfRuleUrlAll;
    addNoneOfRuleUrl: typeof addNoneOfRuleUrl;
    removeNoneOfRuleUrl: typeof removeNoneOfRuleUrl;
    setNoneOfRuleUrl: typeof setNoneOfRuleUrl;
    createResourceRuleFor: typeof createResourceRuleFor;
    getResourceRule: typeof getResourceRule;
    getResourceRuleAll: typeof getResourceRuleAll;
    removeResourceRule: typeof removeResourceRule;
    setResourceRule: typeof setResourceRule;
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
    createResourcePolicyFor: typeof createResourcePolicyFor;
    getResourceAcrPolicy: typeof getResourceAcrPolicy;
    getResourceAcrPolicyAll: typeof getResourceAcrPolicyAll;
    getResourcePolicy: typeof getResourcePolicy;
    getResourcePolicyAll: typeof getResourcePolicyAll;
    removeResourceAcrPolicy: typeof removeResourceAcrPolicy;
    removeResourcePolicy: typeof removeResourcePolicy;
    setResourceAcrPolicy: typeof setResourceAcrPolicy;
    setResourcePolicy: typeof setResourcePolicy;
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
