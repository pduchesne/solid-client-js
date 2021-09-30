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
import { UrlString, WebId, WithServerResourceInfo } from "../interfaces";
import { internal_defaultFetchOptions } from "../resource/resource";
import { Access } from "./universal";
import { WithResourceAcl } from "../acl/acl";
export declare type WacAccess = ({
    controlRead: true;
    controlWrite: true;
} | {
    controlRead: false;
    controlWrite: false;
}) & {
    read: boolean;
    append: boolean;
    write: boolean;
};
/**
 * For a given Resource, look up its metadata, and read the Access permissions
 * granted to the given Agent.
 *
 * Note that this only lists permissions granted to the given Agent individually,
 * and will not exhaustively list modes the given Agent may have access to because
 * they apply to everyone, or because they apply to the Agent through a group for
 * instance.
 *
 * @param resource The URL of the Resource for which we want to list Access
 * @param agent The Agent for which the Access is granted
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns What Access modes are granted to the given Agent explicitly, or null if it could not be determined.
 */
export declare function getAgentAccess(resource: WithServerResourceInfo, agent: WebId, options?: Partial<typeof internal_defaultFetchOptions>): Promise<Access | null>;
/**
 * For a given Resource, look up its metadata, and read the Access permissions
 * granted to the given Group.
 *
 * Note that this only lists permissions granted to the given Group individually,
 * and will not exhaustively list modes the given Group may have access to because
 * they apply to everyone, or because they apply to the Group through another
 * Group that may contain it for instance.
 *
 * @param resource The URL of the Resource for which we want to list Access
 * @param group The Group for which the Access is granted
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns What Access modes are granted to the given Group explicitly, or null if it could not be determined.
 */
export declare function getGroupAccess(resource: WithServerResourceInfo, group: UrlString, options?: Partial<typeof internal_defaultFetchOptions>): Promise<Access | null>;
/**
 * For a given Resource, look up its metadata, and read the Access permissions
 * granted to everyone.
 *
 * Note that this only lists permissions explicitly granted to everyone as a whole,
 * and will not exhaustively list modes any individual Agent or Group may have
 * access to because they specifically apply to them only.
 *
 * @param resource The URL of the Resource for which we want to list public Access
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns What Access modes are granted to the everyone explicitly, or null if it could not be determined.
 */
export declare function getPublicAccess(resource: WithServerResourceInfo, options?: Partial<typeof internal_defaultFetchOptions>): Promise<Access | null>;
/**
 * For a given Resource, look up its metadata, and read the Access permissions
 * granted explicitly to each individual Agent.
 *
 * Note that this only lists permissions granted to each Agent individually,
 * and will not exhaustively list modes any Agent may have access to because
 * they apply to everyone, or because they apply to an Agent through a group for
 * instance.
 *
 * @param resource The URL of the Resource for which we want to list Agents Access
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns A map of Agent WebIDs and the access granted to them, or null if it could not be determined.
 */
export declare function getAgentAccessAll(resource: WithServerResourceInfo, options?: Partial<typeof internal_defaultFetchOptions>): Promise<Record<WebId, WacAccess> | null>;
/**
 * For a given Resource, look up its metadata, and read the Access permissions
 * granted explicitly to each individual Group.
 *
 * Note that this only lists permissions granted to each Group individually,
 * and will not exhaustively list modes any Group may have access to because
 * they apply individually to all of the Agents in the Group, or to everyone
 * for instance.
 *
 * @param resource The URL of the Resource for which we want to list Agents Access
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns A map of Group URLs and the access granted to them, or null if it could not be determined.
 */
export declare function getGroupAccessAll(resource: WithServerResourceInfo, options?: Partial<typeof internal_defaultFetchOptions>): Promise<Record<WebId, WacAccess> | null>;
/**
 * Set the Access modes for a given Agent to a given Resource.
 *
 * Important note: if the target resource did not have a Resource ACL, and its
 * Access was regulated by its Fallback ACL, said Fallback ACL is copied to create
 * a new Resource ACL. This has the side effect that the next time the Fallback
 * ACL is updated, the changes _will not impact_ the target resource.
 *
 * If the target Resource's Access mode cannot be determined, e.g. the user does
 * not have Read and Write access to the target Resource's ACL, or to its
 * fallback ACL if it does not have a Resource ACL, then `null` is returned.
 *
 * @param resource The Resource for which Access is being set
 * @param agent The Agent for whom Access is being set
 * @param access The Access being set
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns The Resource, with its ACL updated, or null if the new Access could not
 * be set.
 */
export declare function setAgentResourceAccess<T extends WithServerResourceInfo>(resource: T, agent: WebId, access: Partial<WacAccess>, options?: Partial<typeof internal_defaultFetchOptions>): Promise<(T & WithResourceAcl) | null>;
/**
 * Set the Access modes for a given Group to a given Resource.
 *
 * Important note: if the target resource did not have a Resource ACL, and its
 * Access was regulated by its Fallback ACL, said Fallback ACL is copied to create
 * a new Resource ACL. This has the side effect that the next time the Fallback
 * ACL is updated, the changes _will not impact_ the target resource.
 *
 * If the target Resource's Access mode cannot be determined, e.g. the user does
 * not have Read and Write access to the target Resource's ACL, or to its
 * fallback ACL if it does not have a Resource ACL, then `null` is returned.
 *
 * @param resource The Resource for which Access is being set
 * @param agent The Group for which Access is being set
 * @param access The Access being set
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns The Resource, with its ACL updated, or null if the new Access could not
 * be set.
 */
export declare function setGroupResourceAccess<T extends WithServerResourceInfo>(resource: T, group: UrlString, access: Partial<WacAccess>, options?: Partial<typeof internal_defaultFetchOptions>): Promise<(T & WithResourceAcl) | null>;
/**
 * Set the Access modes for everyone to a given Resource.
 *
 * Important note: if the target resource did not have a Resource ACL, and its
 * Access was regulated by its Fallback ACL, said Fallback ACL is copied to create
 * a new Resource ACL. This has the side effect that the next time the Fallback
 * ACL is updated, the changes _will not impact_ the target resource.
 *
 * If the target Resource's Access mode cannot be determined, e.g. the user does
 * not have Read and Write access to the target Resource's ACL, or to its
 * fallback ACL if it does not have a Resource ACL, then `null` is returned.
 *
 * @param resource The Resource for which Access is being set
 * @param access The Access being set
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns The Resource, with its ACL updated, or null if the new Access could not
 * be set.
 */
export declare function setPublicResourceAccess<T extends WithServerResourceInfo>(resource: T, access: Partial<WacAccess>, options?: Partial<typeof internal_defaultFetchOptions>): Promise<(T & WithResourceAcl) | null>;
