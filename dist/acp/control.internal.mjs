import { acp, rdf } from '../constants.mjs';
import { getSourceUrl } from '../resource/resource.mjs';
import { internal_cloneResource } from '../resource/resource.internal.mjs';
import { addIri } from '../thing/add.mjs';
import { getIriAll } from '../thing/get.mjs';
import { removeIri, removeAll } from '../thing/remove.mjs';
import { setIri } from '../thing/set.mjs';
import { createThing, getThing, getThingAll, setThing } from '../thing/thing.mjs';
import { hasAccessibleAcr } from './acp.mjs';

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
/** @hidden */
function internal_getAcr(resource) {
    if (!hasAccessibleAcr(resource)) {
        throw new Error(`An Access Control Resource for [${getSourceUrl(resource)}] is not available. This could be because the current user is not allowed to see it, or because their Pod Server does not support Access Control Resources.`);
    }
    return resource.internal_acp.acr;
}
/** @hidden */
function internal_setAcr(resource, acr) {
    return Object.assign(internal_cloneResource(resource), {
        internal_acp: Object.assign(Object.assign({}, resource.internal_acp), { acr: acr }),
    });
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Initialise a new [[Control]].
 * @hidden Developers don't need to care about initialising Controls - they can just add Policies directly.
 * @deprecated
 */
function internal_createControl(options) {
    let control = createThing(options);
    control = setIri(control, rdf.type, acp.AccessControl);
    return control;
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Find an [[Control]] with a given URL in a given Resource with an Access Control Resource.
 *
 * @returns The requested Access Control, or `null` if it could not be found.
 * @hidden Developers don't need to care about initialising Controls - they can just add Policies directly.
 * @deprecated
 */
function internal_getControl(withAccessControlResource, url, options) {
    const acr = internal_getAcr(withAccessControlResource);
    const foundThing = getThing(acr, url, options);
    if (foundThing === null ||
        !getIriAll(foundThing, rdf.type).includes(acp.AccessControl)) {
        return null;
    }
    return foundThing;
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get all [[Control]]s in the Access Control Resource of a given Resource.
 * @hidden Developers don't need to care about initialising Controls - they can just add Policies directly.
 * @deprecated
 */
function internal_getControlAll(withAccessControlResource, options) {
    const acr = internal_getAcr(withAccessControlResource);
    const foundThings = getThingAll(acr, options);
    return foundThings.filter((foundThing) => getIriAll(foundThing, rdf.type).includes(acp.AccessControl));
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Insert an [[Control]] into the [[AccessControlResource]] of a Resource, replacing previous
 * instances of that Access Control.
 *
 * @param withAccessControlResource A Resource with the Access Control Resource into which to insert an Access Control.
 * @param control The Control to insert into the Access Control Resource.
 * @returns The given Resource with a new Access Control Resource equal to the original Access Control Resource, but with the given Access Control.
 * @hidden Developers don't need to care about initialising Controls - they can just add Policies directly.
 * @deprecated
 */
function internal_setControl(withAccessControlResource, control) {
    const acr = internal_getAcr(withAccessControlResource);
    const updatedAcr = setThing(acr, control);
    const updatedResource = internal_setAcr(withAccessControlResource, updatedAcr);
    return updatedResource;
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Add a [[Policy]] to an [[Control]] such that that Policy applies to the Resource to which
 * the [[Control]] is linked.
 *
 * @param accessControl The [[Control]] to which the Policy should be added.
 * @param policyUrl URL of the Policy that should apply to the Resource to which the [[Control]] is linked.
 * @returns A new [[Control]] equal to the given [[Control]], but with the given policy added to it.
 * @hidden Developers don't need to care about working with Controls - they can just add Policies to the Resource directly.
 * @deprecated
 */
function internal_addPolicyUrl(accessControl, policyUrl) {
    return addIri(accessControl, acp.apply, policyUrl);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get all Policies that apply to the Resource to which the given [[Control]] is linked, and
 * which can be removed by anyone with Write access to the Access Control Resource that contains the
 * [[Control]].
 *
 * @param accessControl The [[Control]] of which to get the Policies.
 * @returns The Policies that are listed in this [[Control]] as applying to the Resource it is linked to, and as removable by anyone with Write access to the Access Control Resource.
 * @hidden Developers don't need to care about working with Controls - they can just add Policies to the Resource directly.
 * @deprecated
 */
function internal_getPolicyUrlAll(accessControl) {
    return getIriAll(accessControl, acp.apply);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Remove a given Policy that applies to the Resource to which the given [[Control]] is linked,
 * and which can be removed by anyone with Write access to the Access Control Resource that contains
 * the Access Control.
 *
 * @param accessControl The [[Control]] of which to remove the Policies.
 * @param policyUrl URL of the Policy that should no longer apply to the Resource to which the [[Control]] is linked.
 * @returns A new [[Control]] equal to the given [[Control]], but with the given Policy removed from it.
 * @hidden Developers don't need to care about working with Controls - they can just add Policies to the Resource directly.
 * @deprecated
 */
function internal_removePolicyUrl(accessControl, policyUrl) {
    return removeIri(accessControl, acp.apply, policyUrl);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Remove all Policies that apply to the Resource to which the given [[Control]] is linked, and
 * which can be removed by anyone with Write access to the Access Control Resource that contains the
 * [[Control]].
 *
 * @param accessControl The [[Control]] of which to remove the Policies.
 * @returns A new [[Control]] equal to the given [[Control]], but with all Policies removed from it.
 * @hidden Developers don't need to care about working with Controls - they can just add Policies to the Resource directly.
 * @deprecated
 */
function internal_removePolicyUrlAll(accessControl) {
    return removeAll(accessControl, acp.apply);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Add a [[Policy]] to an [[Control]] such that that Policy applies to the children of the
 * Resource to which the [[Control]] is linked.
 *
 * @param accessControl The [[Control]] to which the Policy should be added.
 * @param policyUrl URL of the Policy that should apply to the children of the Resource to which the [[Control]] is linked.
 * @returns A new [[Control]] equal to the given [[Control]], but with the given policy added to it as a Member Policy.
 * @hidden Developers don't need to care about working with Controls - they can just add Policies to the Resource directly.
 * @deprecated
 */
function internal_addMemberPolicyUrl(accessControl, policyUrl) {
    return addIri(accessControl, acp.applyMembers, policyUrl);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get all Policies that apply to the children of the Resource to which the given [[Control]] is
 * linked, and which can be removed by anyone with Write access to the Access Control Resource that
 * contains the [[Control]].
 *
 * @param accessControl The [[Control]] of which to get the Policies.
 * @returns The Policies that are listed in this [[Control]] as applying to the children of the Resource it is linked to, and as removable by anyone with Write access to the Access Control Resource.
 * @hidden Developers don't need to care about working with Controls - they can just add Policies to the Resource directly.
 * @deprecated
 */
function internal_getMemberPolicyUrlAll(accessControl) {
    return getIriAll(accessControl, acp.applyMembers);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Remove a given Policy that applies to the children of the Resource to which the given Access
 * Control is linked, and which can be removed by anyone with Write access to the Access Control
 * Resource that contains the Access Control.
 *
 * @param accessControl The [[Control]] of which to remove the Member Policy.
 * @param policyUrl URL of the Member Policy that should no longer apply to the Resource to which the [[Control]] is linked.
 * @returns A new [[Control]] equal to the given [[Control]], but with the given Member Policy removed from it.
 * @hidden Developers don't need to care about working with Controls - they can just add Policies to the Resource directly.
 * @deprecated
 */
function internal_removeMemberPolicyUrl(accessControl, policyUrl) {
    return removeIri(accessControl, acp.applyMembers, policyUrl);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Remove all Policies that apply to the children of the Resource to which the given Access Control
 * is linked, and which can be removed by anyone with Write access to the Access Control Resource
 * that contains the Access Control.
 *
 * @param accessControl The [[Control]] of which to remove the Member Policies.
 * @returns A new [[Control]] equal to the given [[Control]], but with all Member Policies removed from it.
 * @hidden Developers don't need to care about working with Controls - they can just add Policies to the Resource directly.
 * @deprecated
 */
function internal_removeMemberPolicyUrlAll(accessControl) {
    return removeAll(accessControl, acp.applyMembers);
}
function internal_getInitialisedControl(resourceWithAcr) {
    const allControls = internal_getControlAll(resourceWithAcr);
    return allControls.length === 0 ? internal_createControl() : allControls[0];
}

export { internal_addMemberPolicyUrl, internal_addPolicyUrl, internal_createControl, internal_getAcr, internal_getControl, internal_getControlAll, internal_getInitialisedControl, internal_getMemberPolicyUrlAll, internal_getPolicyUrlAll, internal_removeMemberPolicyUrl, internal_removeMemberPolicyUrlAll, internal_removePolicyUrl, internal_removePolicyUrlAll, internal_setAcr, internal_setControl };
