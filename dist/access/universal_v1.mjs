import { hasAccessibleAcl } from '../acl/acl.mjs';
import { getResourceInfoWithAcr, hasAccessibleAcr, saveAcrFor } from '../acp/acp.mjs';
import { internal_defaultFetchOptions, getSourceIri } from '../resource/resource.mjs';
import { internal_getPoliciesAndRules, internal_getAgentAccess, internal_setAgentAccess, internal_getAgentAccessAll, internal_getGroupAccess, internal_getGroupAccessAll, internal_setGroupAccess, internal_getPublicAccess, internal_setPublicAccess } from './acp_v1.mjs';
import { getAgentAccess as getAgentAccess$1, setAgentResourceAccess, getAgentAccessAll as getAgentAccessAll$1, getGroupAccess as getGroupAccess$1, getGroupAccessAll as getGroupAccessAll$1, setGroupResourceAccess, getPublicAccess as getPublicAccess$1, setPublicResourceAccess } from './wac.mjs';
export { getAccessFor, getAccessForAll, setAccessFor } from './for.mjs';

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
 * Get an overview of what access is defined for a given Agent.
 *
 * This function works with Solid Pods that implement either the Web Access
 * Control spec or the Access Control Policies proposal, with some caveats:
 *
 * - If access to the given Resource has been set using anything other than the
 *   functions in this module, it is possible that it has been set in a way that
 *   prevents this function from reliably reading access, in which case it will
 *   resolve to `null`.
 * - It will only return access specified explicitly for the given Agent. If
 *   additional restrictions are set up to apply to the given Agent in a
 *   particular situation, those will not be reflected in the return value of
 *   this function.
 * - It will only return access specified explicitly for the given Resource.
 *   In other words, if the Resource is a Container, the returned Access may not
 *   apply to contained Resources.
 * - If the current user does not have permission to view access for the given
 *   Resource, this function will resolve to `null`.
 *
 * @param resourceUrl URL of the Resource you want to read the access for.
 * @param webId WebID of the Agent you want to get the access for.
 * @since 1.5.0
 */
async function getAgentAccess(resourceUrl, webId, options = internal_defaultFetchOptions) {
    const resourceInfo = await getResourceInfoWithAcr(resourceUrl, options);
    if (hasAccessibleAcr(resourceInfo)) {
        const acpData = await internal_getPoliciesAndRules(resourceInfo, options);
        return internal_getAgentAccess(acpData, webId);
    }
    if (hasAccessibleAcl(resourceInfo)) {
        return await getAgentAccess$1(resourceInfo, webId, options);
    }
    return null;
}
/**
 * Set access to a Resource for a specific Agent.
 *
 * This function works with Solid Pods that implement either the Web Access
 * Control spec or the Access Control Policies proposal, with some caveats:
 *
 * - If access to the given Resource has been set using anything other than the
 *   functions in this module, it is possible that it has been set in a way that
 *   prevents this function from reliably setting access, in which case it will
 *   resolve to `null`.
 * - It will only set access explicitly for the given Agent. In other words,
 *   additional restrictions could be present that further restrict or loosen
 *   what access the given Agent has in particular circumstances.
 * - The provided access will only apply to the given Resource. In other words,
 *   if the Resource is a Container, the configured Access may not apply to
 *   contained Resources.
 * - If the current user does not have permission to view or change access for
 *   the given Resource, this function will resolve to `null`.
 *
 * Additionally, two caveats apply to users with a Pod server that uses WAC:
 * - If the Resource did not have an ACL yet, a new one will be initialised.
 *   This means that changes to the ACL of a parent Container can no longer
 *   affect access people have to this Resource, although existing access will
 *   be preserved.
 * - Setting different values for `controlRead` and `controlWrite` is not
 *   supported, and **will throw an error**. If you expect (some of) your users
 *   to have Pods implementing WAC, be sure to pass the same value for both.
 *
 * @param resourceUrl URL of the Resource you want to change the Agent's access to.
 * @param webId WebID of the Agent you want to set access for.
 * @param access What access permissions you want to set for the given Agent to the given Resource. Possible properties are `read`, `append`, `write`, `controlRead` and `controlWrite`: set to `true` to allow, to `false` to stop allowing, or `undefined` to leave unchanged. Take note that `controlRead` and `controlWrite` can not have distinct values for a Pod server implementing Web Access Control; trying this will throw an error.
 * @returns What access has been set for the given Agent explicitly.
 * @since 1.5.0
 */
async function setAgentAccess(resourceUrl, webId, access, options = internal_defaultFetchOptions) {
    const resourceInfo = await getResourceInfoWithAcr(resourceUrl, options);
    if (hasAccessibleAcr(resourceInfo)) {
        const acpData = await internal_getPoliciesAndRules(resourceInfo, options);
        const updatedResource = internal_setAgentAccess(resourceInfo, acpData, webId, access);
        if (updatedResource) {
            try {
                await saveAcrFor(updatedResource, options);
                return await getAgentAccess(resourceUrl, webId, options);
            }
            catch (e) {
                return null;
            }
        }
        return null;
    }
    if (hasAccessibleAcl(resourceInfo)) {
        if (access.controlRead != access.controlWrite) {
            throw new Error(`When setting access for a Resource in a Pod implementing Web Access Control (i.e. [${getSourceIri(resourceInfo)}]), ` + "`controlRead` and `controlWrite` should have the same value.");
        }
        const wacAccess = access;
        await setAgentResourceAccess(resourceInfo, webId, wacAccess, options);
        return await getAgentAccess$1(resourceInfo, webId, options);
    }
    return null;
}
/**
 * Get an overview of what access is defined for all Agents with respect to a given
 * Resource.
 *
 * This function works with Solid Pods that implement either the Web Access
 * Control spec or the Access Control Policies proposal, with some caveats:
 *
 * - If access to the given Resource has been set using anything other than the
 *   functions in this module, it is possible that it has been set in a way that
 *   prevents this function from reliably reading access, in which case it will
 *   resolve to `null`.
 * - It will only return access specified explicitly for the returned Agents. If
 *   additional restrictions are set up to apply to the listed Agents in a
 *   particular situation, those will not be reflected in the return value of
 *   this function.
 * - It will only return access specified explicitly for the given Resource.
 *   In other words, if the Resource is a Container, the returned Access may not
 *   apply to contained Resources.
 * - If the current user does not have permission to view access for the given
 *   Resource, this function will resolve to `null`.
 *
 * @param resourceUrl URL of the Resource you want to read the access for.
 * @returns The access information to the Resource, grouped by Agent.
 * @since 1.5.0
 */
async function getAgentAccessAll(resourceUrl, options = internal_defaultFetchOptions) {
    const resourceInfo = await getResourceInfoWithAcr(resourceUrl, options);
    if (hasAccessibleAcr(resourceInfo)) {
        const acpData = await internal_getPoliciesAndRules(resourceInfo, options);
        return internal_getAgentAccessAll(acpData);
    }
    if (hasAccessibleAcl(resourceInfo)) {
        return await getAgentAccessAll$1(resourceInfo, options);
    }
    return null;
}
/**
 * Get an overview of what access is defined for a given Group.
 *
 * This function works with Solid Pods that implement either the Web Access
 * Control spec or the Access Control Policies proposal, with some caveats:
 *
 * - If access to the given Resource has been set using anything other than the
 *   functions in this module, it is possible that it has been set in a way that
 *   prevents this function from reliably reading access, in which case it will
 *   resolve to `null`.
 * - It will only return access specified explicitly for the given Group. If
 *   additional restrictions are set up to apply to the given Group in a
 *   particular situation, those will not be reflected in the return value of
 *   this function.
 * - It will only return access specified explicitly for the given Resource.
 *   In other words, if the Resource is a Container, the returned Access may not
 *   apply to contained Resources.
 * - If the current user does not have permission to view access for the given
 *   Resource, this function will resolve to `null`.
 *
 * @param resourceUrl URL of the Resource you want to read the access for.
 * @param webId WebID of the Group you want to get the access for.
 * @since 1.5.0
 * @deprecated Access Control Policies will no longer support vcard:Group. Use the mechanism-specific access API's if you want to define access for groups of people.
 */
async function getGroupAccess(resourceUrl, webId, options = internal_defaultFetchOptions) {
    const resourceInfo = await getResourceInfoWithAcr(resourceUrl, options);
    if (hasAccessibleAcr(resourceInfo)) {
        const acpData = await internal_getPoliciesAndRules(resourceInfo, options);
        return internal_getGroupAccess(acpData, webId);
    }
    if (hasAccessibleAcl(resourceInfo)) {
        return await getGroupAccess$1(resourceInfo, webId, options);
    }
    return null;
}
/**
 * Get an overview of what access is defined for all Groups with respect to a given
 * Resource.
 *
 * This function works with Solid Pods that implement either the Web Access
 * Control spec or the Access Control Policies proposal, with some caveats:
 *
 * - If access to the given Resource has been set using anything other than the
 *   functions in this module, it is possible that it has been set in a way that
 *   prevents this function from reliably reading access, in which case it will
 *   resolve to `null`.
 * - It will only return access specified explicitly for the returned Groups. If
 *   additional restrictions are set up to apply to the listed Groups in a
 *   particular situation, those will not be reflected in the return value of
 *   this function.
 * - It will only return access specified explicitly for the given Resource.
 *   In other words, if the Resource is a Container, the returned Access may not
 *   apply to contained Resources.
 * - If the current user does not have permission to view access for the given
 *   Resource, this function will resolve to `null`.
 *
 * @param resourceUrl URL of the Resource you want to read the access for.
 * @returns The access information to the Resource, sorted by Group.
 * @since 1.5.0
 * @deprecated Access Control Policies will no longer support vcard:Group. Use the mechanism-specific access API's if you want to define access for groups of people.
 */
async function getGroupAccessAll(resourceUrl, options = internal_defaultFetchOptions) {
    const resourceInfo = await getResourceInfoWithAcr(resourceUrl, options);
    if (hasAccessibleAcr(resourceInfo)) {
        const acpData = await internal_getPoliciesAndRules(resourceInfo, options);
        return internal_getGroupAccessAll(acpData);
    }
    if (hasAccessibleAcl(resourceInfo)) {
        return await getGroupAccessAll$1(resourceInfo, options);
    }
    return null;
}
/**
 * Set access to a Resource for a specific Group.
 *
 * This function works with Solid Pods that implement either the Web Access
 * Control spec or the Access Control Policies proposal, with some caveats:
 *
 * - If access to the given Resource has been set using anything other than the
 *   functions in this module, it is possible that it has been set in a way that
 *   prevents this function from reliably setting access, in which case it will
 *   resolve to `null`.
 * - It will only set access explicitly for the given Group. In other words,
 *   additional restrictions could be present that further restrict or loosen
 *   what access the given Group has in particular circumstances.
 * - The provided access will only apply to the given Resource. In other words,
 *   if the Resource is a Container, the configured Access may not apply to
 *   contained Resources.
 * - If the current user does not have permission to view or change access for
 *   the given Resource, this function will resolve to `null`.
 *
 * Additionally, two caveats apply to users with a Pod server that uses WAC:
 * - If the Resource did not have an ACL yet, a new one will be initialised.
 *   This means that changes to the ACL of a parent Container can no longer
 *   affect access people have to this Resource, although existing access will
 *   be preserved.
 * - Setting different values for `controlRead` and `controlWrite` is not
 *   supported, and **will throw an error**. If you expect (some of) your users
 *   to have Pods implementing WAC, be sure to pass the same value for both.
 *
 * @param resourceUrl URL of the Resource you want to change the Group's access to.
 * @param groupUrl URL of the Group you want to set access for.
 * @param access What access permissions you want to set for the given Group to the given Resource. Possible properties are `read`, `append`, `write`, `controlRead` and `controlWrite`: set to `true` to allow, to `false` to stop allowing, or `undefined` to leave unchanged. Take note that `controlRead` and `controlWrite` can not have distinct values for a Pod server implementing Web Access Control; trying this will throw an error.
 * @returns What access has been set for the given Group explicitly.
 * @since 1.5.0
 * @deprecated Access Control Policies will no longer support vcard:Group. Use the mechanism-specific access API's if you want to define access for groups of people.
 */
async function setGroupAccess(resourceUrl, groupUrl, access, options = internal_defaultFetchOptions) {
    const resourceInfo = await getResourceInfoWithAcr(resourceUrl, options);
    if (hasAccessibleAcr(resourceInfo)) {
        const acpData = await internal_getPoliciesAndRules(resourceInfo, options);
        const updatedResource = internal_setGroupAccess(resourceInfo, acpData, groupUrl, access);
        if (updatedResource) {
            try {
                await saveAcrFor(updatedResource, options);
                return getGroupAccess(resourceUrl, groupUrl, options);
            }
            catch (e) {
                return null;
            }
        }
        return null;
    }
    if (hasAccessibleAcl(resourceInfo)) {
        if (access.controlRead != access.controlWrite) {
            throw new Error(`When setting access for a Resource in a Pod implementing Web Access Control (i.e. [${getSourceIri(resourceInfo)}]), ` + "`controlRead` and `controlWrite` should have the same value.");
        }
        const wacAccess = access;
        await setGroupResourceAccess(resourceInfo, groupUrl, wacAccess, options);
        return await getGroupAccess$1(resourceInfo, groupUrl, options);
    }
    return null;
}
/**
 * Get an overview of what access is defined for everyone.
 *
 * This function works with Solid Pods that implement either the Web Access
 * Control spec or the Access Control Policies proposal, with some caveats:
 *
 * - If access to the given Resource has been set using anything other than the
 *   functions in this module, it is possible that it has been set in a way that
 *   prevents this function from reliably reading access, in which case it will
 *   resolve to `null`.
 * - It will only return access specified explicitly for everyone. If
 *   additional restrictions are set up to apply to users in a particular
 *   situation, those will not be reflected in the return value of this
 *   function.
 * - It will only return access specified explicitly for the given Resource.
 *   In other words, if the Resource is a Container, the returned Access may not
 *   apply to contained Resources.
 * - If the current user does not have permission to view access for the given
 *   Resource, this function will resolve to `null`.
 *
 * @param resourceUrl URL of the Resource you want to read the access for.
 * @since 1.5.0
 */
async function getPublicAccess(resourceUrl, options = internal_defaultFetchOptions) {
    const resourceInfo = await getResourceInfoWithAcr(resourceUrl, options);
    if (hasAccessibleAcr(resourceInfo)) {
        const acpData = await internal_getPoliciesAndRules(resourceInfo, options);
        return internal_getPublicAccess(acpData);
    }
    if (hasAccessibleAcl(resourceInfo)) {
        return await getPublicAccess$1(resourceInfo, options);
    }
    return null;
}
/**
 * Set access to a Resource for everybody.
 *
 * This function works with Solid Pods that implement either the Web Access
 * Control spec or the Access Control Policies proposal, with some caveats:
 *
 * - If access to the given Resource has been set using anything other than the
 *   functions in this module, it is possible that it has been set in a way that
 *   prevents this function from reliably setting access, in which case it will
 *   resolve to `null`.
 * - It will only set access explicitly for everybody. In other words,
 *   additional restrictions could be present that further restrict or loosen
 *   what access a user has in particular circumstances.
 * - The provided access will only apply to the given Resource. In other words,
 *   if the Resource is a Container, the configured Access may not apply to
 *   contained Resources.
 * - If the current user does not have permission to view or change access for
 *   the given Resource, this function will resolve to `null`.
 *
 * Additionally, two caveats apply to users with a Pod server that uses WAC:
 * - If the Resource did not have an ACL yet, a new one will be initialised.
 *   This means that changes to the ACL of a parent Container can no longer
 *   affect access people have to this Resource, although existing access will
 *   be preserved.
 * - Setting different values for `controlRead` and `controlWrite` is not
 *   supported, and **will throw an error**. If you expect (some of) your users
 *   to have Pods implementing WAC, be sure to pass the same value for both.
 *
 * @param resourceUrl URL of the Resource you want to change public access to.
 * @param access What access permissions you want to set for everybody to the given Resource. Possible properties are `read`, `append`, `write`, `controlRead` and `controlWrite`: set to `true` to allow, to `false` to stop allowing, or `undefined` to leave unchanged. Take note that `controlRead` and `controlWrite` can not have distinct values for a Pod server implementing Web Access Control; trying this will throw an error.
 * @returns What access has been set for everybody explicitly.
 * @since 1.5.0
 */
async function setPublicAccess(resourceUrl, access, options = internal_defaultFetchOptions) {
    const resourceInfo = await getResourceInfoWithAcr(resourceUrl, options);
    if (hasAccessibleAcr(resourceInfo)) {
        const acpData = await internal_getPoliciesAndRules(resourceInfo, options);
        const updatedResource = internal_setPublicAccess(resourceInfo, acpData, access);
        if (updatedResource) {
            try {
                await saveAcrFor(updatedResource, options);
                return getPublicAccess(resourceUrl, options);
            }
            catch (e) {
                return null;
            }
        }
        return null;
    }
    if (hasAccessibleAcl(resourceInfo)) {
        if (access.controlRead != access.controlWrite) {
            throw new Error(`When setting access for a Resource in a Pod implementing Web Access Control (i.e. [${getSourceIri(resourceInfo)}]), ` + "`controlRead` and `controlWrite` should have the same value.");
        }
        const wacAccess = access;
        await setPublicResourceAccess(resourceInfo, wacAccess, options);
        return await getPublicAccess$1(resourceInfo, options);
    }
    return null;
}

export { getAgentAccess, getAgentAccessAll, getGroupAccess, getGroupAccessAll, getPublicAccess, setAgentAccess, setGroupAccess, setPublicAccess };
