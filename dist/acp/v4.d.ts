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
import { createPolicy, getPolicy, getPolicyAll, policyAsMarkdown, removePolicy, setPolicy, createResourcePolicyFor, getResourceAcrPolicy, getResourceAcrPolicyAll, getResourcePolicy, getResourcePolicyAll, removeResourceAcrPolicy, removeResourcePolicy, setResourceAcrPolicy, setResourcePolicy, getAllowModesV2, getDenyModesV2, setAllowModesV2, setDenyModesV2 } from "./policy";
import { addAgent, addNoneOfMatcherUrl, addAnyOfMatcherUrl, addAllOfMatcherUrl, createMatcher, getAgentAll, getNoneOfMatcherUrlAll, getAnyOfMatcherUrlAll, getAllOfMatcherUrlAll, getMatcher, getMatcherAll, hasAuthenticated, hasCreator, hasPublic, removeAgent, removeNoneOfMatcherUrl, removeAnyOfMatcherUrl, removeAllOfMatcherUrl, removeMatcher, matcherAsMarkdown, setAgent, setAuthenticated, setCreator, setNoneOfMatcherUrl, setAnyOfMatcherUrl, setPublic, setAllOfMatcherUrl, setMatcher, addClient, getClientAll, hasAnyClient, removeClient, setAnyClient, setClient, removeAnyClient, removeAuthenticated, removeCreator, removePublic, createResourceMatcherFor, getResourceMatcher, getResourceMatcherAll, removeResourceMatcher, setResourceMatcher } from "./matcher";
import { addMockAcrTo, mockAcrFor } from "./mock";
/**
 * @hidden
 * @deprecated Please import directly from the "acp/*" modules.
 */
export declare const acp_v4: {
    addMockAcrTo: typeof addMockAcrTo;
    mockAcrFor: typeof mockAcrFor;
    addAgent: typeof addAgent;
    createMatcher: typeof createMatcher;
    getAgentAll: typeof getAgentAll;
    getMatcher: typeof getMatcher;
    getMatcherAll: typeof getMatcherAll;
    removeAgent: typeof removeAgent;
    removeMatcher: typeof removeMatcher;
    matcherAsMarkdown: typeof matcherAsMarkdown;
    setAgent: typeof setAgent;
    setMatcher: typeof setMatcher;
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
    getAnyOfMatcherUrlAll: typeof getAnyOfMatcherUrlAll;
    addAnyOfMatcherUrl: typeof addAnyOfMatcherUrl;
    removeAnyOfMatcherUrl: typeof removeAnyOfMatcherUrl;
    setAnyOfMatcherUrl: typeof setAnyOfMatcherUrl;
    getAllOfMatcherUrlAll: typeof getAllOfMatcherUrlAll;
    addAllOfMatcherUrl: typeof addAllOfMatcherUrl;
    removeAllOfMatcherUrl: typeof removeAllOfMatcherUrl;
    setAllOfMatcherUrl: typeof setAllOfMatcherUrl;
    getNoneOfMatcherUrlAll: typeof getNoneOfMatcherUrlAll;
    addNoneOfMatcherUrl: typeof addNoneOfMatcherUrl;
    removeNoneOfMatcherUrl: typeof removeNoneOfMatcherUrl;
    setNoneOfMatcherUrl: typeof setNoneOfMatcherUrl;
    createResourceMatcherFor: typeof createResourceMatcherFor;
    getResourceMatcher: typeof getResourceMatcher;
    getResourceMatcherAll: typeof getResourceMatcherAll;
    removeResourceMatcher: typeof removeResourceMatcher;
    setResourceMatcher: typeof setResourceMatcher;
    createPolicy: typeof createPolicy;
    getAllowModes: typeof getAllowModesV2;
    getDenyModes: typeof getDenyModesV2;
    getPolicy: typeof getPolicy;
    getPolicyAll: typeof getPolicyAll;
    policyAsMarkdown: typeof policyAsMarkdown;
    removePolicy: typeof removePolicy;
    setAllowModes: typeof setAllowModesV2;
    setDenyModes: typeof setDenyModesV2;
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
