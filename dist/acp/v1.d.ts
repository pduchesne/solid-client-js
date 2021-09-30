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
import { getFileWithAccessDatasets, getFileWithAcr, getReferencedPolicyUrlAll, getResourceInfoWithAccessDatasets, getResourceInfoWithAcr, getSolidDatasetWithAccessDatasets, getSolidDatasetWithAcr, hasAccessibleAcr, saveAcrFor, WithAccessibleAcr } from "./acp";
import { createPolicy, getAllowModesV1, getDenyModesV1, getPolicy, getPolicyAll, policyAsMarkdown, removePolicy, setAllowModesV1, setDenyModesV1, setPolicy } from "./policy";
import { addAgent, addNoneOfRuleUrl, addGroup, addAnyOfRuleUrl, addAllOfRuleUrl, createRule, getAgentAll, getNoneOfRuleUrlAll, getGroupAll, getAnyOfRuleUrlAll, getAllOfRuleUrlAll, getRule, getRuleAll, hasAuthenticated, hasCreator, hasPublic, removeAgent, removeNoneOfRuleUrl, removeGroup, removeAnyOfRuleUrl, removeAllOfRuleUrl, removeRule, ruleAsMarkdown, setAgent, setNoneOfRuleUrl, setGroup, setAnyOfRuleUrl, setAllOfRuleUrl, setRule } from "./rule";
import { addMockAcrTo, mockAcrFor } from "./mock";
import { hasLinkedAcr, addAcrPolicyUrl, addMemberAcrPolicyUrl, getAcrPolicyUrlAll, getMemberAcrPolicyUrlAll, removeAcrPolicyUrl, removeAcrPolicyUrlAll, removeMemberAcrPolicyUrl, removeMemberAcrPolicyUrlAll, Control } from "./control";
import { internal_addMemberPolicyUrl, internal_addPolicyUrl, internal_createControl, internal_getControl, internal_getControlAll, internal_getMemberPolicyUrlAll, internal_getPolicyUrlAll, internal_removeMemberPolicyUrlAll, internal_removePolicyUrl, internal_removePolicyUrlAll, internal_setControl } from "./control.internal";
import { previousSetAuthenticatedSignature, previousSetCreatorSignature, previousSetPublicSignature } from "./v2";
/**
 * @hidden
 * @deprecated Replaced by [[acp_v2]].
 */
export declare const acp_v1: {
    createControl: typeof internal_createControl;
    getControl: typeof internal_getControl;
    getAllControl: typeof internal_getControlAll;
    getControlAll: typeof internal_getControlAll;
    setControl: typeof internal_setControl;
    removeControl: typeof removeControl;
    addPolicyUrl: typeof internal_addPolicyUrl;
    getPolicyUrlAll: typeof internal_getPolicyUrlAll;
    removePolicyUrl: typeof internal_removePolicyUrl;
    removePolicyUrlAll: typeof internal_removePolicyUrlAll;
    addMemberPolicyUrl: typeof internal_addMemberPolicyUrl;
    getMemberPolicyUrlAll: typeof internal_getMemberPolicyUrlAll;
    removeMemberPolicyUrl: typeof internal_getMemberPolicyUrlAll;
    removeMemberPolicyUrlAll: typeof internal_removeMemberPolicyUrlAll;
    /** @deprecated This misspelling was included accidentally. The correct function is [[getForbiddenRuleUrlAll]]. */
    getForbiddenRuleurlAll: typeof getNoneOfRuleUrlAll;
    setPublic: typeof previousSetPublicSignature;
    setAuthenticated: typeof previousSetAuthenticatedSignature;
    setCreator: typeof previousSetCreatorSignature;
    hasLinkedAcr: typeof hasLinkedAcr;
    addAcrPolicyUrl: typeof addAcrPolicyUrl;
    addMemberAcrPolicyUrl: typeof addMemberAcrPolicyUrl;
    getAcrPolicyUrlAll: typeof getAcrPolicyUrlAll;
    getMemberAcrPolicyUrlAll: typeof getMemberAcrPolicyUrlAll;
    removeAcrPolicyUrl: typeof removeAcrPolicyUrl;
    removeAcrPolicyUrlAll: typeof removeAcrPolicyUrlAll;
    removeMemberAcrPolicyUrl: typeof removeMemberAcrPolicyUrl;
    removeMemberAcrPolicyUrlAll: typeof removeMemberAcrPolicyUrlAll;
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
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Remove an [[Control]] from the [[AccessControlResource]] of a Resource.
 *
 * @param withAccessControlResource A Resource with the Access Control Resource from which to remove an Access Control.
 * @param control The [[Control]] to remove from the given Access Control Resource.
 * @returns The given Resource with a new Access Control Resource equal to the original Access Control Resource, excluding the given Access Control.
 * @hidden Developers don't need to care about initialising Controls - they can just add Policies directly.
 * @deprecated
 */
export declare function removeControl<ResourceExt extends WithAccessibleAcr>(withAccessControlResource: ResourceExt, control: Control): ResourceExt;
