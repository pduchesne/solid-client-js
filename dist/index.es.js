import LinkHeader from 'http-link-header';
import RdfJsDataFactory from '@rdfjs/data-model';
import rdfJsDatasetModule from '@rdfjs/dataset';
import * as jsonld from 'jsonld';
import * as crossFetch from 'cross-fetch';

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
 * Verify whether a given SolidDataset includes metadata about where it was sent to.
 *
 * @param dataset A [[SolidDataset]] that may have metadata attached about the Resource it was retrieved from.
 * @returns True if `dataset` includes metadata about the Resource it was sent to, false if not.
 * @since 0.2.0
 */
function hasResourceInfo(resource) {
    const potentialResourceInfo = resource;
    return (typeof potentialResourceInfo === "object" &&
        typeof potentialResourceInfo.internal_resourceInfo === "object");
}
/**
 * Verify whether a given SolidDataset includes metadata about where it was retrieved from.
 *
 * @param dataset A [[SolidDataset]] that may have metadata attached about the Resource it was retrieved from.
 * @returns True if `dataset` includes metadata about the Resource it was retrieved from, false if not.
 * @since 0.6.0
 */
function hasServerResourceInfo(resource) {
    const potentialResourceInfo = resource;
    return (typeof potentialResourceInfo === "object" &&
        typeof potentialResourceInfo.internal_resourceInfo === "object" &&
        typeof potentialResourceInfo.internal_resourceInfo.linkedResources ===
            "object");
}
/** @internal */
function hasChangelog(dataset) {
    const potentialChangeLog = dataset;
    return (typeof potentialChangeLog.internal_changeLog === "object" &&
        Array.isArray(potentialChangeLog.internal_changeLog.additions) &&
        Array.isArray(potentialChangeLog.internal_changeLog.deletions));
}
/**
 * Errors thrown by solid-client extend this class, and can thereby be distinguished from errors
 * thrown in lower-level libraries.
 * @since 1.2.0
 */
class SolidClientError extends Error {
}

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
/** @internal */
function internal_toIriString(iri) {
    return typeof iri === "string" ? iri : iri.value;
}

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
 * @ignore Internal fallback for when no fetcher is provided; not to be used downstream.
 */
const fetch = async (resource, init) => {
    /* istanbul ignore if: `require` is always defined in the unit test environment */
    if (typeof window === "object" && typeof require !== "function") {
        return await window.fetch(resource, init);
    }
    /* istanbul ignore if: `require` is always defined in the unit test environment */
    if (typeof require !== "function") {
        // When using Node.js with ES Modules, require is not defined:
        const crossFetchModule = await import('cross-fetch');
        const fetch = crossFetchModule.default;
        return fetch(resource, init);
    }
    // Implementation note: it's up to the client application to resolve these module names to the
    // respective npm packages. At least one commonly used tool (Webpack) is only able to do that if
    // the module names are literal strings.
    // Additionally, Webpack throws a warning in a way that halts compilation for at least Next.js
    // when using native Javascript dynamic imports (`import()`), whereas `require()` just logs a
    // warning. Since the use of package names instead of file names requires a bundles anyway, this
    // should not have any practical consequences. For more background, see:
    // https://github.com/webpack/webpack/issues/7713
    let fetch;
    // Unfortunately solid-client-authn-browser does not support a default session yet.
    // Once it does, we can auto-detect if it is available and use it as follows:
    // try {
    //   fetch = require("solid-client-authn-browser").fetch;
    // } catch (e) {
    // When enabling the above, make sure to add a similar try {...} catch block using `import`
    // statements in the elseif above.
    // eslint-disable-next-line prefer-const
    fetch = require("cross-fetch");
    // }
    return await fetch(resource, init);
};

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
 * @internal
 */
function internal_parseResourceInfo(response) {
    var _a, _b, _c;
    const contentTypeParts = (_b = (_a = response.headers.get("Content-Type")) === null || _a === void 0 ? void 0 : _a.split(";")) !== null && _b !== void 0 ? _b : [];
    // If the server offers a Turtle or JSON-LD serialisation on its own accord,
    // that tells us whether it is RDF data that the server can understand
    // (and hence can be updated with a PATCH request with SPARQL INSERT and DELETE statements),
    // in which case our SolidDataset-related functions should handle it.
    // For more context, see https://github.com/inrupt/solid-client-js/pull/214.
    const isSolidDataset = contentTypeParts.length > 0 &&
        ["text/turtle", "application/ld+json"].includes(contentTypeParts[0]);
    const resourceInfo = {
        sourceIri: response.url,
        isRawData: !isSolidDataset,
        contentType: (_c = response.headers.get("Content-Type")) !== null && _c !== void 0 ? _c : undefined,
        linkedResources: {},
    };
    const linkHeader = response.headers.get("Link");
    if (linkHeader) {
        const parsedLinks = LinkHeader.parse(linkHeader);
        // Set ACL link
        const aclLinks = parsedLinks.get("rel", "acl");
        if (aclLinks.length === 1) {
            resourceInfo.aclUrl = new URL(aclLinks[0].uri, resourceInfo.sourceIri).href;
        }
        // Parse all link headers and expose them in a standard way
        // (this can replace the parsing of the ACL link above):
        resourceInfo.linkedResources = parsedLinks.refs.reduce((rels, ref) => {
            var _a;
            var _b;
            (_a = rels[_b = ref.rel]) !== null && _a !== void 0 ? _a : (rels[_b] = []);
            rels[ref.rel].push(new URL(ref.uri, resourceInfo.sourceIri).href);
            return rels;
        }, resourceInfo.linkedResources);
    }
    const wacAllowHeader = response.headers.get("WAC-Allow");
    if (wacAllowHeader) {
        resourceInfo.permissions = parseWacAllowHeader(wacAllowHeader);
    }
    return resourceInfo;
}
/**
 * Parse a WAC-Allow header into user and public access booleans.
 *
 * @param wacAllowHeader A WAC-Allow header in the format `user="read append write control",public="read"`
 * @see https://github.com/solid/solid-spec/blob/cb1373a369398d561b909009bd0e5a8c3fec953b/api-rest.md#wac-allow-headers
 */
function parseWacAllowHeader(wacAllowHeader) {
    function parsePermissionStatement(permissionStatement) {
        const permissions = permissionStatement.split(" ");
        const writePermission = permissions.includes("write");
        return writePermission
            ? {
                read: permissions.includes("read"),
                append: true,
                write: true,
                control: permissions.includes("control"),
            }
            : {
                read: permissions.includes("read"),
                append: permissions.includes("append"),
                write: false,
                control: permissions.includes("control"),
            };
    }
    function getStatementFor(header, scope) {
        const relevantEntries = header
            .split(",")
            .map((rawEntry) => rawEntry.split("="))
            .filter((parts) => parts.length === 2 && parts[0].trim() === scope);
        // There should only be one statement with the given scope:
        if (relevantEntries.length !== 1) {
            return "";
        }
        const relevantStatement = relevantEntries[0][1].trim();
        // The given statement should be wrapped in double quotes to be valid:
        if (relevantStatement.charAt(0) !== '"' ||
            relevantStatement.charAt(relevantStatement.length - 1) !== '"') {
            return "";
        }
        // Return the statment without the wrapping quotes, e.g.: read append write control
        return relevantStatement.substring(1, relevantStatement.length - 1);
    }
    return {
        user: parsePermissionStatement(getStatementFor(wacAllowHeader, "user")),
        public: parsePermissionStatement(getStatementFor(wacAllowHeader, "public")),
    };
}
/** @hidden Used to instantiate a separate instance from input parameters */
function internal_cloneResource(resource) {
    let clonedResource;
    if (typeof resource.slice === "function") {
        // If given Resource is a File:
        clonedResource = Object.assign(resource.slice(), Object.assign({}, resource));
    }
    else {
        // If it is just a plain object containing metadata:
        clonedResource = Object.assign({}, resource);
    }
    return clonedResource;
}
/** @internal */
function internal_isUnsuccessfulResponse(response) {
    return !response.ok;
}

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
// TODO: These should be replaced by auto-generated constants,
//       if we can ensure that unused constants will be excluded from bundles.
/** @hidden */
const acl = {
    Authorization: "http://www.w3.org/ns/auth/acl#Authorization",
    AuthenticatedAgent: "http://www.w3.org/ns/auth/acl#AuthenticatedAgent",
    accessTo: "http://www.w3.org/ns/auth/acl#accessTo",
    agent: "http://www.w3.org/ns/auth/acl#agent",
    agentGroup: "http://www.w3.org/ns/auth/acl#agentGroup",
    agentClass: "http://www.w3.org/ns/auth/acl#agentClass",
    default: "http://www.w3.org/ns/auth/acl#default",
    defaultForNew: "http://www.w3.org/ns/auth/acl#defaultForNew",
    mode: "http://www.w3.org/ns/auth/acl#mode",
    origin: "http://www.w3.org/ns/auth/acl#origin",
};
/** @hidden */
const rdf = {
    type: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
};
/** @hidden */
const ldp = {
    BasicContainer: "http://www.w3.org/ns/ldp#BasicContainer",
    Container: "http://www.w3.org/ns/ldp#Container",
    Resource: "http://www.w3.org/ns/ldp#Resource",
    contains: "http://www.w3.org/ns/ldp#contains",
};
/** @hidden */
const foaf = {
    Agent: "http://xmlns.com/foaf/0.1/Agent",
};
/** @hidden */
const acp = {
    AccessControlResource: "http://www.w3.org/ns/solid/acp#AccessControlResource",
    Policy: "http://www.w3.org/ns/solid/acp#Policy",
    AccessControl: "http://www.w3.org/ns/solid/acp#AccessControl",
    Read: "http://www.w3.org/ns/solid/acp#Read",
    Append: "http://www.w3.org/ns/solid/acp#Append",
    Write: "http://www.w3.org/ns/solid/acp#Write",
    /** @deprecated Removed from the ACP proposal, to be replaced by Matchers. */
    Rule: "http://www.w3.org/ns/solid/acp#Rule",
    Matcher: "http://www.w3.org/ns/solid/acp#Matcher",
    accessControl: "http://www.w3.org/ns/solid/acp#accessControl",
    apply: "http://www.w3.org/ns/solid/acp#apply",
    applyMembers: "http://www.w3.org/ns/solid/acp#applyMembers",
    allow: "http://www.w3.org/ns/solid/acp#allow",
    deny: "http://www.w3.org/ns/solid/acp#deny",
    allOf: "http://www.w3.org/ns/solid/acp#allOf",
    anyOf: "http://www.w3.org/ns/solid/acp#anyOf",
    noneOf: "http://www.w3.org/ns/solid/acp#noneOf",
    access: "http://www.w3.org/ns/solid/acp#access",
    accessMembers: "http://www.w3.org/ns/solid/acp#accessMembers",
    agent: "http://www.w3.org/ns/solid/acp#agent",
    group: "http://www.w3.org/ns/solid/acp#group",
    client: "http://www.w3.org/ns/solid/acp#client",
    PublicAgent: "http://www.w3.org/ns/solid/acp#PublicAgent",
    AuthenticatedAgent: "http://www.w3.org/ns/solid/acp#AuthenticatedAgent",
    CreatorAgent: "http://www.w3.org/ns/solid/acp#CreatorAgent",
};
/** @hidden */
const solid = {
    PublicOidcClient: "http://www.w3.org/ns/solid/terms#PublicOidcClient",
};
/** @hidden */
const security = {
    publicKey: "https://w3id.org/security#publicKey",
};
/** @hidden */
const pim = {
    storage: "http://www.w3.org/ns/pim/space#storage",
};

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
/** @ignore For internal use only. */
const internal_defaultFetchOptions = {
    fetch: fetch,
};
/**
 * Retrieve the information about a resource (e.g. access permissions) without
 * fetching the resource itself.
 *
 * @param url URL to fetch Resource metadata from.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters).
 * @returns Promise resolving to the metadata describing the given Resource, or rejecting if fetching it failed.
 * @since 0.4.0
 */
async function getResourceInfo(url, options = internal_defaultFetchOptions) {
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const response = await config.fetch(url, { method: "HEAD" });
    return responseToResourceInfo(response);
}
/**
 * Parse Solid metadata from a Response obtained by fetching a Resource from a Solid Pod,
 *
 * @param response A Fetch API Response. See {@link https://developer.mozilla.org/en-US/docs/Web/API/Response MDN}.
 * @returns Resource metadata readable by functions such as [[getSourceUrl]].
 * @hidden This interface is not exposed yet until we've tried it out in practice.
 */
function responseToResourceInfo(response) {
    if (internal_isUnsuccessfulResponse(response)) {
        throw new FetchError(`Fetching the metadata of the Resource at [${response.url}] failed: [${response.status}] [${response.statusText}].`, response);
    }
    const resourceInfo = internal_parseResourceInfo(response);
    return { internal_resourceInfo: resourceInfo };
}
/**
 * @param resource Resource for which to check whether it is a Container.
 * @returns Whether `resource` is a Container.
 */
function isContainer(resource) {
    const containerUrl = hasResourceInfo(resource)
        ? getSourceUrl(resource)
        : internal_toIriString(resource);
    return containerUrl.endsWith("/");
}
/**
 * This function will tell you whether a given Resource contains raw data, or a SolidDataset.
 *
 * @param resource Resource for which to check whether it contains raw data.
 * @return Whether `resource` contains raw data.
 */
function isRawData(resource) {
    return resource.internal_resourceInfo.isRawData;
}
/**
 * @param resource Resource for which to determine the Content Type.
 * @returns The Content Type, if known, or null if not known.
 */
function getContentType$1(resource) {
    var _a;
    return (_a = resource.internal_resourceInfo.contentType) !== null && _a !== void 0 ? _a : null;
}
function getSourceUrl(resource) {
    if (hasResourceInfo(resource)) {
        return resource.internal_resourceInfo.sourceIri;
    }
    return null;
}
/** @hidden Alias of getSourceUrl for those who prefer to use IRI terminology. */
const getSourceIri = getSourceUrl;
/**
 * Given a Resource that exposes information about the owner of the Pod it is in, returns the WebID of that owner.
 *
 * Data about the owner of the Pod is exposed when the following conditions hold:
 * - The Pod server supports exposing the Pod owner
 * - The current user is allowed to see who the Pod owner is.
 *
 * If one or more of those conditions are false, this function will return `null`.
 *
 * @param resource A Resource that contains information about the owner of the Pod it is in.
 * @returns The WebID of the owner of the Pod the Resource is in, if provided, or `null` if not.
 * @since 0.6.0
 */
function getPodOwner(resource) {
    var _a;
    if (!hasServerResourceInfo(resource)) {
        return null;
    }
    const podOwners = (_a = getLinkedResourceUrlAll(resource)["http://www.w3.org/ns/solid/terms#podOwner"]) !== null && _a !== void 0 ? _a : [];
    return podOwners.length === 1 ? podOwners[0] : null;
}
/**
 * Given a WebID and a Resource that exposes information about the owner of the Pod it is in, returns whether the given WebID is the owner of the Pod.
 *
 * Data about the owner of the Pod is exposed when the following conditions hold:
 * - The Pod server supports exposing the Pod owner
 * - The current user is allowed to see who the Pod owner is.
 *
 * If one or more of those conditions are false, this function will return `null`.
 *
 * @param webId The WebID of which to check whether it is the Pod Owner's.
 * @param resource A Resource that contains information about the owner of the Pod it is in.
 * @returns Whether the given WebID is the Pod Owner's, if the Pod Owner is exposed, or `null` if it is not exposed.
 * @since 0.6.0
 */
function isPodOwner(webId, resource) {
    const podOwner = getPodOwner(resource);
    if (typeof podOwner !== "string") {
        return null;
    }
    return podOwner === webId;
}
/**
 * Get the URLs of Resources linked to the given Resource.
 *
 * Solid servers can link Resources to each other. For example, in servers
 * implementing Web Access Control, Resources can have an Access Control List
 * Resource linked to it via the `acl` relation.
 *
 * @param resource A Resource fetched from a Solid Pod.
 * @returns The URLs of Resources linked to the given Resource, indexed by the key that links them.
 * @since 1.7.0
 */
function getLinkedResourceUrlAll(resource) {
    return resource.internal_resourceInfo.linkedResources;
}
/**
 * Get what access the current user has to the given Resource.
 *
 * This function can tell you what access the current user has for the given
 * Resource, allowing you to e.g. determine that changes to it will be rejected
 * before attempting to do so.
 * Additionally, for servers adhering to the Web Access Control specification,
 * it will tell you what access unauthenticated users have to the given Resource.
 *
 * @param resource A Resource fetched from a Solid Pod.
 * @returns What access the current user and, if supported by the server, unauthenticated users have to the given Resource.
 * @since 1.7.0
 */
function getEffectiveAccess(resource) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (typeof resource.internal_resourceInfo.permissions === "object") {
        return {
            user: {
                read: resource.internal_resourceInfo.permissions.user.read,
                append: resource.internal_resourceInfo.permissions.user.append,
                write: resource.internal_resourceInfo.permissions.user.write,
            },
            public: {
                read: resource.internal_resourceInfo.permissions.public.read,
                append: resource.internal_resourceInfo.permissions.public.append,
                write: resource.internal_resourceInfo.permissions.public.write,
            },
        };
    }
    const linkedResourceUrls = getLinkedResourceUrlAll(resource);
    return {
        user: {
            read: (_b = (_a = linkedResourceUrls[acp.allow]) === null || _a === void 0 ? void 0 : _a.includes(acp.Read)) !== null && _b !== void 0 ? _b : false,
            append: (_e = (((_c = linkedResourceUrls[acp.allow]) === null || _c === void 0 ? void 0 : _c.includes(acp.Append)) ||
                ((_d = linkedResourceUrls[acp.allow]) === null || _d === void 0 ? void 0 : _d.includes(acp.Write)))) !== null && _e !== void 0 ? _e : false,
            write: (_g = (_f = linkedResourceUrls[acp.allow]) === null || _f === void 0 ? void 0 : _f.includes(acp.Write)) !== null && _g !== void 0 ? _g : false,
        },
    };
}
/**
 * Extends the regular JavaScript error object with access to the status code and status message.
 * @since 1.2.0
 */
class FetchError extends SolidClientError {
    constructor(message, errorResponse) {
        super(message);
        this.response = errorResponse;
    }
    get statusCode() {
        return this.response.status;
    }
    get statusText() {
        return this.response.statusText;
    }
}

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
const defaultGetFileOptions = {
    fetch: fetch,
};
const RESERVED_HEADERS = ["Slug", "If-None-Match", "Content-Type"];
/**
 * Some of the headers must be set by the library, rather than directly.
 */
function containsReserved(header) {
    return RESERVED_HEADERS.some((reserved) => header[reserved] !== undefined);
}
/**
 * ```{note} This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Retrieves a file from a URL and returns the file as a blob.
 *
 * For example:
 *
 * ```
 * const fileBlob = await getFile("https://pod.example.com/some/file", { fetch: fetch });
 * ```
 *
 * For additional examples, see
 * [Read/Write Files](https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/read-write-files/#retrieve-a-file).
 *
 * @param url The URL of the file to return
 * @param options Fetching options: a custom fetcher and/or headers.
 * @returns The file as a blob.
 */
async function getFile(input, options = defaultGetFileOptions) {
    const config = Object.assign(Object.assign({}, defaultGetFileOptions), options);
    const url = internal_toIriString(input);
    const response = await config.fetch(url, config.init);
    if (internal_isUnsuccessfulResponse(response)) {
        throw new FetchError(`Fetching the File failed: [${response.status}] [${response.statusText}].`, response);
    }
    const resourceInfo = internal_parseResourceInfo(response);
    const data = await response.blob();
    const fileWithResourceInfo = Object.assign(data, {
        internal_resourceInfo: resourceInfo,
    });
    return fileWithResourceInfo;
}
/**
 * ```{note} This function is still experimental and subject to change, even in a non-major release.
 * ```
 * Deletes a file at a given URL.
 *
 * For example:
 *
 * ```
 * await deleteFile( "https://pod.example.com/some/file", { fetch: fetch });
 * ```
 *
 * For additional examples, see
 * [Read/Write Files](https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/read-write-files/#delete-a-file).
 *
 * @param file The URL of the file to delete
 */
async function deleteFile(file, options = defaultGetFileOptions) {
    const config = Object.assign(Object.assign({}, defaultGetFileOptions), options);
    const url = hasResourceInfo(file)
        ? internal_toIriString(getSourceIri(file))
        : internal_toIriString(file);
    const response = await config.fetch(url, Object.assign(Object.assign({}, config.init), { method: "DELETE" }));
    if (internal_isUnsuccessfulResponse(response)) {
        throw new FetchError(`Deleting the file at [${url}] failed: [${response.status}] [${response.statusText}].`, response);
    }
}
/**
 * ```{note} This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Saves a file in an existing folder/Container associated with the given URL.
 *
 * For example:
 *
 * ```
 * const savedFile = await saveFileInContainer(
 *   "https://pod.example.com/some/existing/container/",
 *   new Blob(["This is a plain piece of text"], { type: "plain/text" }),
 *   { slug: "suggestedFileName.txt", contentType: "text/plain", fetch: fetch }
 * );
 * ```
 *
 * For additional example, see
 * [Read/Write Files](https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/read-write-files/#save-a-file-into-an-existing-container).
 *
 * In the `options` parameter,
 *
 * - You can suggest a file name in the `slug` field.  However, the Solid
 *   Server may or may not use the suggested `slug` as the file name.
 *
 * - *Recommended:* You can specify the [media type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type)
 *   of the file in the `contentType`.  If unspecified, the function uses the default type of
 *   `application/octet-stream`, indicating a binary data file.
 *
 * The function saves a file into an *existing* Container. If the
 * Container does not exist, either:
 * - Create the Container first using [[createContainerAt]], and then
 *   use the function, or
 * - Use [[overwriteFile]] to save the file. [[overwriteFile]] creates
 *   the Containers in the saved file path as needed.
 *
 * Users who only have `Append` but not `Write` access to a Container
 * can use [[saveFileInContainer]] to save new files to the Container.
 * That is, [[saveFileInContainer]] is useful in situations where users
 * can add new files to a Container but not change existing files in
 * the Container, such as users given access to send notifications to
 * another's Pod but not to view or delete existing notifications in that Pod.
 *
 * Users with `Write` access to the given folder/Container may prefer to
 * use [[overwriteFile]].
 *
 * @param folderUrl The URL of an existing folder where the new file is saved.
 * @param file The file to be written.
 * @param options Additional parameters for file creation (e.g. a slug).
 * @returns A Promise that resolves to the saved file, if available, or `null` if the current user does not have Read access to the newly-saved file. It rejects if saving fails.
 */
async function saveFileInContainer(folderUrl, file, options = defaultGetFileOptions) {
    const folderUrlString = internal_toIriString(folderUrl);
    const response = await writeFile(folderUrlString, file, "POST", options);
    if (internal_isUnsuccessfulResponse(response)) {
        throw new FetchError(`Saving the file in [${folderUrl}] failed: [${response.status}] [${response.statusText}].`, response);
    }
    const locationHeader = response.headers.get("Location");
    if (locationHeader === null) {
        throw new Error("Could not determine the location of the newly saved file.");
    }
    const fileIri = new URL(locationHeader, new URL(folderUrlString).origin).href;
    const blobClone = internal_cloneResource(file);
    const resourceInfo = {
        internal_resourceInfo: {
            isRawData: true,
            sourceIri: fileIri,
            contentType: getContentType(file, options.contentType),
        },
    };
    return Object.assign(blobClone, resourceInfo);
}
/**
 * ```{note} This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Saves a file at a given URL. If a file already exists at the URL,
 * the function overwrites the existing file.
 *
 * For example:
 *
 * ```
 * const savedFile = await overwriteFile(
 *   "https://pod.example.com/some/container/myFile.txt",
 *   new Blob(["This is a plain piece of text"], { type: "plain/text" }),
 *   { contentType: "text/plain", fetch: fetch }
 * );
 * ```
 *
 * For additional example, see
 * [Read/Write Files](https://docs.inrupt.com/developer-tools/javascript/client-libraries/tutorial/read-write-files/#write-a-file-to-a-specific-url).
 *
 * *Recommended:* In the `options` parameter, you can specify the
 * [media type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type)
 * of the file in the `contentType`.  If unspecified, the function uses the default type of
 * `application/octet-stream`, indicating a binary data file.
 *
 * When saving a file with [[overwriteFile]], the Solid server creates any
 * intermediary Containers as needed; i.e., the Containers do not
 * need to be created in advance. For example, when saving a file to the target URL of
 * https://example.pod/container/resource, if https://example.pod/container/ does not exist,
 * the container is created as part of the save.
 *
 * @param fileUrl The URL where the file is saved.
 * @param file The file to be written.
 * @param options Additional parameters for file creation (e.g., media type).
 */
async function overwriteFile(fileUrl, file, options = defaultGetFileOptions) {
    const fileUrlString = internal_toIriString(fileUrl);
    const response = await writeFile(fileUrlString, file, "PUT", options);
    if (internal_isUnsuccessfulResponse(response)) {
        throw new FetchError(`Overwriting the file at [${fileUrlString}] failed: [${response.status}] [${response.statusText}].`, response);
    }
    const blobClone = internal_cloneResource(file);
    const resourceInfo = internal_parseResourceInfo(response);
    resourceInfo.sourceIri = fileUrlString;
    resourceInfo.isRawData = true;
    return Object.assign(blobClone, { internal_resourceInfo: resourceInfo });
}
function isHeadersArray(headers) {
    return Array.isArray(headers);
}
/**
 * The return type of this function is misleading: it should ONLY be used to check
 * whether an object has a forEach method that returns <key, value> pairs.
 *
 * @param headers A headers object that might have a forEach
 */
function hasHeadersObjectForEach(headers) {
    return typeof headers.forEach === "function";
}
/**
 * @hidden
 * This function feels unnecessarily complicated, but is required in order to
 * have Headers according to type definitions in both Node and browser environments.
 * This might require a fix upstream to be cleaned up.
 *
 * @param headersToFlatten A structure containing headers potentially in several formats
 */
function flattenHeaders(headersToFlatten) {
    if (typeof headersToFlatten === "undefined") {
        return {};
    }
    let flatHeaders = {};
    if (isHeadersArray(headersToFlatten)) {
        headersToFlatten.forEach(([key, value]) => {
            flatHeaders[key] = value;
        });
        // Note that the following line must be a elsif, because string[][] has a forEach,
        // but it returns string[] instead of <key, value>
    }
    else if (hasHeadersObjectForEach(headersToFlatten)) {
        headersToFlatten.forEach((value, key) => {
            flatHeaders[key] = value;
        });
    }
    else {
        // If the headers are already a Record<string, string>,
        // they can directly be returned.
        flatHeaders = headersToFlatten;
    }
    return flatHeaders;
}
/**
 * Internal function that performs the actual write HTTP query, either POST
 * or PUT depending on the use case.
 *
 * @param fileUrl The URL where the file is saved
 * @param file The file to be written
 * @param method The HTTP method
 * @param options Additional parameters for file creation (e.g. a slug, or media type)
 */
async function writeFile(targetUrl, file, method, options) {
    var _a, _b;
    const config = Object.assign(Object.assign({}, defaultGetFileOptions), options);
    const headers = flattenHeaders((_b = (_a = config.init) === null || _a === void 0 ? void 0 : _a.headers) !== null && _b !== void 0 ? _b : {});
    if (containsReserved(headers)) {
        throw new Error(`No reserved header (${RESERVED_HEADERS.join(", ")}) should be set in the optional RequestInit.`);
    }
    // If a slug is in the parameters, set the request headers accordingly
    if (config.slug !== undefined) {
        headers["Slug"] = config.slug;
    }
    headers["Content-Type"] = getContentType(file, options.contentType);
    const targetUrlString = internal_toIriString(targetUrl);
    return await config.fetch(targetUrlString, Object.assign(Object.assign({}, config.init), { headers,
        method, body: file }));
}
function getContentType(file, contentTypeOverride) {
    if (typeof contentTypeOverride === "string") {
        return contentTypeOverride;
    }
    const fileType = typeof file === "object" &&
        file !== null &&
        typeof file.type === "string" &&
        file.type.length > 0
        ? file.type
        : undefined;
    return fileType !== null && fileType !== void 0 ? fileType : "application/octet-stream";
}

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
rdfJsDatasetModule.dataset;
const localNodeSkolemPrefix = "https://inrupt.com/.well-known/sdk-local-node/";
/**
 * Runtime freezing might be too much overhead;
 * if so, this function allows us to replace it by a function
 * that merely marks its input as Readonly<> for static analysis.
 */
const freeze = Object.freeze;
function isLocalNodeIri(iri) {
    return (iri.substring(0, localNodeSkolemPrefix.length) === localNodeSkolemPrefix);
}
function getLocalNodeName(localNodeIri) {
    return localNodeIri.substring(localNodeSkolemPrefix.length);
}
function getLocalNodeIri(localNodeName) {
    return `${localNodeSkolemPrefix}${localNodeName}`;
}
function isBlankNodeId(value) {
    return typeof value === "string" && value.substring(0, 2) === "_:";
}
function getBlankNodeValue(blankNodeId) {
    return blankNodeId.substring(2);
}
function getBlankNodeId(blankNode) {
    return `_:${blankNode.value}`;
}

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
 * IRIs of the XML Schema data types we support
 * @internal
 */
const xmlSchemaTypes = {
    boolean: "http://www.w3.org/2001/XMLSchema#boolean",
    dateTime: "http://www.w3.org/2001/XMLSchema#dateTime",
    date: "http://www.w3.org/2001/XMLSchema#date",
    time: "http://www.w3.org/2001/XMLSchema#time",
    decimal: "http://www.w3.org/2001/XMLSchema#decimal",
    integer: "http://www.w3.org/2001/XMLSchema#integer",
    string: "http://www.w3.org/2001/XMLSchema#string",
    langString: "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString",
};
/**
 * @internal
 * @param value Value to serialise.
 * @returns String representation of `value`.
 * @see https://www.w3.org/TR/xmlschema-2/#boolean-lexical-representation
 */
function serializeBoolean(value) {
    return value ? "true" : "false";
}
/**
 * @internal
 * @param value Value to deserialise.
 * @returns Deserialized boolean, or null if the given value is not a valid serialised boolean.
 * @see https://www.w3.org/TR/xmlschema-2/#boolean-lexical-representation
 */
function deserializeBoolean(value) {
    if (value === "true" || value === "1") {
        return true;
    }
    else if (value === "false" || value === "0") {
        return false;
    }
    else {
        return null;
    }
}
/**
 * @internal
 * @param value Value to serialise.
 * @returns String representation of `value` in UTC.
 * @see https://www.w3.org/TR/xmlschema-2/#time-lexical-repr
 */
function serializeTime(value) {
    let millisecondString;
    let timezoneString;
    if (value.millisecond) {
        if (value.millisecond < 10) {
            millisecondString = "00" + value.millisecond;
        }
        else if (value.millisecond < 100) {
            millisecondString = "0" + value.millisecond;
        }
        else {
            millisecondString = value.millisecond;
        }
    }
    if (typeof value.timezoneHourOffset === "number") {
        const timezoneFormatted = Math.abs(value.timezoneHourOffset) < 10
            ? "0" + Math.abs(value.timezoneHourOffset)
            : Math.abs(value.timezoneHourOffset);
        timezoneString =
            value.timezoneHourOffset >= 0
                ? "+" + timezoneFormatted
                : "-" + timezoneFormatted;
        if (value.timezoneMinuteOffset) {
            timezoneString =
                timezoneString +
                    ":" +
                    (value.timezoneMinuteOffset < 10
                        ? "0" + value.timezoneMinuteOffset
                        : value.timezoneMinuteOffset);
        }
        else {
            timezoneString = timezoneString + ":00";
        }
    }
    return ((value.hour < 10 ? "0" + value.hour : value.hour) +
        ":" +
        (value.minute < 10 ? "0" + value.minute : value.minute) +
        ":" +
        (value.second < 10 ? "0" + value.second : value.second) +
        (value.millisecond ? "." + millisecondString : "") +
        (timezoneString ? timezoneString : ""));
}
/**
 * @internal
 * @param literalString Value to deserialise.
 * @returns Deserialized time, or null if the given value is not a valid serialised datetime.
 * @see https://www.w3.org/TR/xmlschema-2/#time-lexical-repr
 */
function deserializeTime(literalString) {
    // Time in the format described at
    // https://www.w3.org/TR/xmlschema-2/#time-lexical-repr
    // \d\d:\d\d:\d\d - Two digits for the hour, minute and second, respectively, separated by a `:`.
    //                  Example: "13:37:42".
    // (\.\d+)? - Optionally a `.` followed by one or more digits representing milliseconds.
    //            Example: ".1337".
    // (Z|(\+|-)\d\d:\d\d) - The letter Z indicating UTC, or a `+` or `-` followed by two digits for
    //                       the hour offset and two for the minute offset, separated by a `:`.
    //                       Example: "+13:37".
    const timeRegEx = /\d\d:\d\d:\d\d(\.\d+)?(Z|(\+|-)\d\d:\d\d)?/;
    if (!timeRegEx.test(literalString)) {
        return null;
    }
    const [timeString, timezoneString] = splitTimeFromTimezone(literalString);
    const [hourString, minuteString, timeRest] = timeString.split(":");
    let utcHours = Number.parseInt(hourString, 10);
    let utcMinutes = Number.parseInt(minuteString, 10);
    const [secondString, optionalMillisecondString] = timeRest.split(".");
    const utcSeconds = Number.parseInt(secondString, 10);
    const utcMilliseconds = optionalMillisecondString
        ? Number.parseInt(optionalMillisecondString, 10)
        : undefined;
    if (utcMinutes >= 60) {
        utcHours = utcHours + 1;
        utcMinutes = utcMinutes - 60;
    }
    const deserializedTime = {
        hour: utcHours,
        minute: utcMinutes,
        second: utcSeconds,
    };
    if (typeof utcMilliseconds === "number") {
        deserializedTime.millisecond = utcMilliseconds;
    }
    if (typeof timezoneString === "string") {
        const [hourOffset, minuteOffset] = getTimezoneOffsets(timezoneString);
        if (typeof hourOffset !== "number" ||
            hourOffset > 24 ||
            typeof minuteOffset !== "number" ||
            minuteOffset > 59) {
            return null;
        }
        deserializedTime.timezoneHourOffset = hourOffset;
        deserializedTime.timezoneMinuteOffset = minuteOffset;
    }
    return deserializedTime;
}
/**
 * @internal
 * @param value Value to serialise.
 * @returns String representation of `value`.
 * @see https://www.w3.org/TR/xmlschema-2/#dateTime-lexical-representation
 */
function serializeDatetime(value) {
    // Although the XML Schema DateTime is not _exactly_ an ISO 8601 string
    // (see https://www.w3.org/TR/xmlschema-2/#deviantformats),
    // the deviations only affect the parsing, not the serialisation.
    // Therefore, we can just use .toISOString():
    return value.toISOString();
}
/**
 * @internal
 * @param value Value to deserialise.
 * @returns Deserialized datetime, or null if the given value is not a valid serialised datetime.
 * @see https://www.w3.org/TR/xmlschema-2/#dateTime-lexical-representation
 */
function deserializeDatetime(literalString) {
    // DateTime in the format described at
    // https://www.w3.org/TR/xmlschema-2/#dateTime-lexical-representation
    // (without constraints on the value).
    // -? - An optional leading `-`.
    // \d{4,}- - Four or more digits followed by a `-` representing the year. Example: "3000-".
    // \d\d-\d\d - Two digits representing the month and two representing the day of the month,
    //             separated by a `-`. Example: "11-03".
    // T - The letter T, separating the date from the time.
    // \d\d:\d\d:\d\d - Two digits for the hour, minute and second, respectively, separated by a `:`.
    //                  Example: "13:37:42".
    // (\.\d+)? - Optionally a `.` followed by one or more digits representing milliseconds.
    //            Example: ".1337".
    // (Z|(\+|-)\d\d:\d\d) - The letter Z indicating UTC, or a `+` or `-` followed by two digits for
    //                       the hour offset and two for the minute offset, separated by a `:`.
    //                       Example: "+13:37".
    const datetimeRegEx = /-?\d{4,}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(Z|(\+|-)\d\d:\d\d)?/;
    if (!datetimeRegEx.test(literalString)) {
        return null;
    }
    const [signedDateString, rest] = literalString.split("T");
    // The date string can optionally be prefixed with `-`,
    // in which case the year is negative:
    const [yearMultiplier, dateString] = signedDateString.charAt(0) === "-"
        ? [-1, signedDateString.substring(1)]
        : [1, signedDateString];
    const [yearString, monthString, dayString] = dateString.split("-");
    const utcFullYear = Number.parseInt(yearString, 10) * yearMultiplier;
    const utcMonth = Number.parseInt(monthString, 10) - 1;
    const utcDate = Number.parseInt(dayString, 10);
    const [timeString, timezoneString] = splitTimeFromTimezone(rest);
    const [hourOffset, minuteOffset] = typeof timezoneString === "string"
        ? getTimezoneOffsets(timezoneString)
        : [0, 0];
    const [hourString, minuteString, timeRest] = timeString.split(":");
    const utcHours = Number.parseInt(hourString, 10) + hourOffset;
    const utcMinutes = Number.parseInt(minuteString, 10) + minuteOffset;
    const [secondString, optionalMillisecondString] = timeRest.split(".");
    const utcSeconds = Number.parseInt(secondString, 10);
    const utcMilliseconds = optionalMillisecondString
        ? Number.parseInt(optionalMillisecondString, 10)
        : 0;
    const date = new Date(Date.UTC(utcFullYear, utcMonth, utcDate, utcHours, utcMinutes, utcSeconds, utcMilliseconds));
    // For the year, values from 0 to 99 map to the years 1900 to 1999. Since the serialisation
    // always writes out the years fully, we should correct this to actually map to the years 0 to 99.
    // See
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#Individual_date_and_time_component_values
    if (utcFullYear >= 0 && utcFullYear < 100) {
        // Note that we base it on the calculated year, rather than the year that was actually read.
        // This is because the year might actually differ from the value listed in the serialisation,
        // i.e. when moving the timezone offset to UTC pushes it into a different year:
        date.setUTCFullYear(date.getUTCFullYear() - 1900);
    }
    return date;
}
/**
 * @internal
 * @param value Value to serialise.
 * @returns String representation of `value`.
 * @see https://www.w3.org/TR/xmlschema-2/#date-lexical-representation
 */
function serializeDate(value) {
    const year = value.getFullYear();
    const month = value.getMonth() + 1;
    const day = value.getDate();
    const [_, timezone] = splitTimeFromTimezone(value.toISOString());
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}${timezone}`;
}
/**
 * @internal
 * @param value Value to deserialise.
 * @returns Deserialized datetime, or null if the given value is not a valid serialised datetime.
 * @see https://www.w3.org/TR/xmlschema-2/#date-lexical-representation
 */
function deserializeDate(literalString) {
    // Date in the format described at
    // https://www.w3.org/TR/xmlschema-2/#date-lexical-representation
    // (without constraints on the value).
    // -? - An optional leading `-`.
    // \d{4,}- - Four or more digits followed by a `-` representing the year. Example: "3000-".
    // \d\d-\d\d - Two digits representing the month and two representing the day of the month,
    //             separated by a `-`. Example: "11-03".
    // (Z|(\+|-)\d\d:\d\d) - Optionally, the letter Z indicating UTC, or a `+` or `-` followed by two digits for
    //                       the hour offset and two for the minute offset, separated by a `:`.
    //                       Example: "+13:37".
    const dateRegEx = /-?\d{4,}-\d\d-\d\d(Z|(\+|-)\d\d:\d\d)?/;
    if (!dateRegEx.test(literalString)) {
        return null;
    }
    const signedDateString = literalString;
    // The date string can optionally be prefixed with `-`,
    // in which case the year is negative:
    const [yearMultiplier, dateString] = signedDateString.charAt(0) === "-"
        ? [-1, signedDateString.substring(1)]
        : [1, signedDateString];
    const [yearString, monthString, dayAndTimezoneString] = dateString.split("-");
    const dayString = dayAndTimezoneString.length > 2
        ? dayAndTimezoneString.substring(0, 2)
        : dayAndTimezoneString;
    const utcFullYear = Number.parseInt(yearString, 10) * yearMultiplier;
    const utcMonth = Number.parseInt(monthString, 10) - 1;
    const utcDate = Number.parseInt(dayString, 10);
    const hour = 12;
    // setting at 12:00 avoids all timezones
    const date = new Date(Date.UTC(utcFullYear, utcMonth, utcDate, hour));
    // For the year, values from 0 to 99 map to the years 1900 to 1999. Since the serialisation
    // always writes out the years fully, we should correct this to actually map to the years 0 to 99.
    // See
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#Individual_date_and_time_component_values
    if (utcFullYear >= 0 && utcFullYear < 100) {
        date.setUTCFullYear(date.getUTCFullYear() - 1900);
    }
    return date;
}
/**
 * @param timeString An XML Schema time string.
 * @returns A tuple [timeString, timezoneString].
 * @see https://www.w3.org/TR/xmlschema-2/#time-lexical-repr
 */
function splitTimeFromTimezone(timeString) {
    if (timeString.endsWith("Z")) {
        return [timeString.substring(0, timeString.length - 1), "Z"];
    }
    const splitOnPlus = timeString.split("+");
    const splitOnMinus = timeString.split("-");
    if (splitOnPlus.length === 1 && splitOnMinus.length === 1) {
        return [splitOnPlus[0], undefined];
    }
    return splitOnPlus.length > splitOnMinus.length
        ? [splitOnPlus[0], "+" + splitOnPlus[1]]
        : [splitOnMinus[0], "-" + splitOnMinus[1]];
}
/**
 * @param timezoneString Lexical representation of a time zone in XML Schema.
 * @returns A tuple of the hour and minute offset of the time zone.
 * @see https://www.w3.org/TR/xmlschema-2/#dateTime-timezones
 */
function getTimezoneOffsets(timezoneString) {
    if (timezoneString === "Z") {
        return [0, 0];
    }
    const multiplier = timezoneString.charAt(0) === "+" ? 1 : -1;
    const [hourString, minuteString] = timezoneString.substring(1).split(":");
    const hours = Number.parseInt(hourString, 10);
    const minutes = Number.parseInt(minuteString, 10);
    return [hours * multiplier, minutes * multiplier];
}
/**
 * @internal
 * @param value Value to serialise.
 * @returns String representation of `value`.
 * @see https://www.w3.org/TR/xmlschema-2/#decimal-lexical-representation
 */
function serializeDecimal(value) {
    return value.toString();
}
/**
 * @internal
 * @param value Value to deserialise.
 * @returns Deserialized decimal, or null if the given value is not a valid serialised decimal.
 * @see https://www.w3.org/TR/xmlschema-2/#decimal-lexical-representation
 */
function deserializeDecimal(literalString) {
    const deserialized = Number.parseFloat(literalString);
    if (Number.isNaN(deserialized)) {
        return null;
    }
    return deserialized;
}
/**
 * @internal
 * @param value Value to serialise.
 * @returns String representation of `value`.
 */
function serializeInteger(value) {
    return value.toString();
}
/**
 * @internal
 * @param value Value to deserialise.
 * @returns Deserialized integer, or null if the given value is not a valid serialised integer.
 */
function deserializeInteger(literalString) {
    const deserialized = Number.parseInt(literalString, 10);
    if (Number.isNaN(deserialized)) {
        return null;
    }
    return deserialized;
}
/**
 * @internal
 * @param locale Locale to transform into a consistent format.
 */
function normalizeLocale(locale) {
    return locale.toLowerCase();
}
/**
 * @internal Library users shouldn't need to be exposed to raw NamedNodes.
 * @param value The value that might or might not be a Named Node.
 * @returns Whether `value` is a Named Node.
 */
function isNamedNode(value) {
    return isTerm(value) && value.termType === "NamedNode";
}
/**
 * @internal Library users shouldn't need to be exposed to raw Literals.
 * @param value The value that might or might not be a Literal.
 * @returns Whether `value` is a Literal.
 */
function isLiteral(value) {
    return isTerm(value) && value.termType === "Literal";
}
/**
 * @internal Library users shouldn't need to be exposed to raw Terms.
 * @param value The value that might or might not be a Term.
 * @returns Whether `value` is a Term.
 */
function isTerm(value) {
    return (value !== null &&
        typeof value === "object" &&
        typeof value.termType === "string" &&
        typeof value.value === "string" &&
        typeof value.equals === "function");
}
/**
 * @internal Library users shouldn't need to be exposed to LocalNodes.
 * @param value The value that might or might not be a Node with no known IRI yet.
 * @returns Whether `value` is a Node with no known IRI yet.
 */
function isLocalNode(value) {
    return isNamedNode(value) && isLocalNodeIri(value.value);
}
/**
 * Ensure that a given value is a valid URL.
 *
 * @internal Library users shouldn't need to be exposed to raw URLs.
 * @param iri The value of which to verify that it is a valid URL.
 */
function internal_isValidUrl(iri) {
    const iriString = internal_toIriString(iri);
    // If the runtime environment supports URL, instantiate one.
    // If the given IRI is not a valid URL, it will throw an error.
    // See: https://developer.mozilla.org/en-US/docs/Web/API/URL
    /* istanbul ignore if [URL is available in our testing environment, so we cannot test the alternative] */
    if (typeof URL !== "function") {
        // If we can't validate the URL, do not throw an error:
        return true;
    }
    try {
        new URL(iriString);
    }
    catch (_a) {
        return false;
    }
    return true;
}
/**
 * @internal Utility method; library users should not need to interact with LocalNodes directly.
 * @param localNode The LocalNode to resolve to a NamedNode.
 * @param resourceIri The Resource in which the Node will be saved.
 */
function resolveIriForLocalNode(localNode, resourceIri) {
    return DataFactory.namedNode(resolveLocalIri(getLocalNodeName(localNode.value), resourceIri));
}
/**
 * @internal API for internal use only.
 * @param name The name identifying a Thing.
 * @param resourceIri The Resource in which the Thing can be found.
 */
function resolveLocalIri(name, resourceIri) {
    /* istanbul ignore if [The URL interface is available in the testing environment, so we cannot test this] */
    if (typeof URL !== "function") {
        throw new Error("The URL interface is not available, so an IRI cannot be determined.");
    }
    const thingIri = new URL(resourceIri);
    thingIri.hash = name;
    return thingIri.href;
}

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
const DataFactory = RdfJsDataFactory;
function addRdfJsQuadToDataset(dataset, quad, quadParseOptions = {}) {
    var _a;
    const supportedGraphTypes = [
        "NamedNode",
        "DefaultGraph",
    ];
    if (!supportedGraphTypes.includes(quad.graph.termType)) {
        throw new Error(`Cannot parse Quads with nodes of type [${quad.graph.termType}] as their Graph node.`);
    }
    const graphId = quad.graph.termType === "DefaultGraph" ? "default" : quad.graph.value;
    const graph = (_a = dataset.graphs[graphId]) !== null && _a !== void 0 ? _a : {};
    return freeze(Object.assign(Object.assign({}, dataset), { graphs: freeze(Object.assign(Object.assign({}, dataset.graphs), { [graphId]: addRdfJsQuadToGraph(graph, quad, quadParseOptions) })) }));
}
function addRdfJsQuadToGraph(graph, quad, quadParseOptions) {
    var _a;
    const supportedSubjectTypes = [
        "NamedNode",
        "BlankNode",
    ];
    if (!supportedSubjectTypes.includes(quad.subject.termType)) {
        throw new Error(`Cannot parse Quads with nodes of type [${quad.subject.termType}] as their Subject node.`);
    }
    const subjectIri = quad.subject.termType === "BlankNode"
        ? `_:${quad.subject.value}`
        : quad.subject.value;
    const subject = (_a = graph[subjectIri]) !== null && _a !== void 0 ? _a : {
        type: "Subject",
        url: subjectIri,
        predicates: {},
    };
    return freeze(Object.assign(Object.assign({}, graph), { [subjectIri]: addRdfJsQuadToSubject(subject, quad, quadParseOptions) }));
}
function addRdfJsQuadToSubject(subject, quad, quadParseOptions) {
    return freeze(Object.assign(Object.assign({}, subject), { predicates: addRdfJsQuadToPredicates(subject.predicates, quad, quadParseOptions) }));
}
function addRdfJsQuadToPredicates(predicates, quad, quadParseOptions) {
    var _a;
    const supportedPredicateTypes = [
        "NamedNode",
    ];
    if (!supportedPredicateTypes.includes(quad.predicate.termType)) {
        throw new Error(`Cannot parse Quads with nodes of type [${quad.predicate.termType}] as their Predicate node.`);
    }
    const predicateIri = quad.predicate.value;
    const objects = (_a = predicates[predicateIri]) !== null && _a !== void 0 ? _a : {};
    return freeze(Object.assign(Object.assign({}, predicates), { [predicateIri]: addRdfJsQuadToObjects(objects, quad, quadParseOptions) }));
}
function addRdfJsQuadToObjects(objects, quad, quadParseOptions) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (quad.object.termType === "NamedNode") {
        const namedNodes = freeze([
            ...((_a = objects.namedNodes) !== null && _a !== void 0 ? _a : []),
            quad.object.value,
        ]);
        return freeze(Object.assign(Object.assign({}, objects), { namedNodes: namedNodes }));
    }
    if (quad.object.termType === "Literal") {
        if (quad.object.datatype.value === xmlSchemaTypes.langString) {
            const locale = quad.object.language.toLowerCase();
            const thisLocaleStrings = freeze([
                ...((_c = (_b = objects.langStrings) === null || _b === void 0 ? void 0 : _b[locale]) !== null && _c !== void 0 ? _c : []),
                quad.object.value,
            ]);
            const langStrings = freeze(Object.assign(Object.assign({}, ((_d = objects.langStrings) !== null && _d !== void 0 ? _d : {})), { [locale]: thisLocaleStrings }));
            return freeze(Object.assign(Object.assign({}, objects), { langStrings: langStrings }));
        }
        // If the Object is a non-langString Literal
        const thisTypeValues = freeze([
            ...((_f = (_e = objects.literals) === null || _e === void 0 ? void 0 : _e[quad.object.datatype.value]) !== null && _f !== void 0 ? _f : []),
            quad.object.value,
        ]);
        const literals = freeze(Object.assign(Object.assign({}, ((_g = objects.literals) !== null && _g !== void 0 ? _g : {})), { [quad.object.datatype.value]: thisTypeValues }));
        return freeze(Object.assign(Object.assign({}, objects), { literals: literals }));
    }
    if (quad.object.termType === "BlankNode") {
        const blankNodePredicates = getPredicatesForBlankNode(quad.object, quadParseOptions);
        const blankNodes = freeze([
            ...((_h = objects.blankNodes) !== null && _h !== void 0 ? _h : []),
            blankNodePredicates,
        ]);
        return freeze(Object.assign(Object.assign({}, objects), { blankNodes: blankNodes }));
    }
    throw new Error(`Objects of type [${quad.object.termType}] are not supported.`);
}
function getPredicatesForBlankNode(node, quadParseOptions) {
    var _a, _b;
    const chainBlankNodes = (_a = quadParseOptions.chainBlankNodes) !== null && _a !== void 0 ? _a : [];
    if (chainBlankNodes.find((chainBlankNode) => chainBlankNode.equals(node)) ===
        undefined) {
        // If this Blank Node is not used to provide nested values for another Subject,
        // just return its identifier.
        // That identifier will also be listed among the Subjects in the Graph.
        return getBlankNodeId(node);
    }
    /* istanbul ignore next: If there are chain nodes, there will always be other Quads, so the `?? []` can't be reached: */
    const quads = (_b = quadParseOptions.otherQuads) !== null && _b !== void 0 ? _b : [];
    const quadsWithNodeAsSubject = quads.filter((quad) => quad.subject.equals(node));
    // First add the Quads with regular Objects
    const predicates = quadsWithNodeAsSubject
        .filter((quad) => !isBlankNode(quad.object))
        .reduce((predicatesAcc, quad) => {
        var _a;
        const supportedPredicateTypes = [
            "NamedNode",
        ];
        if (!supportedPredicateTypes.includes(quad.predicate.termType)) {
            throw new Error(`Cannot parse Quads with nodes of type [${quad.predicate.termType}] as their Predicate node.`);
        }
        const objects = (_a = predicatesAcc[quad.predicate.value]) !== null && _a !== void 0 ? _a : {};
        return freeze(Object.assign(Object.assign({}, predicatesAcc), { [quad.predicate.value]: addRdfJsQuadToObjects(objects, quad, quadParseOptions) }));
    }, {});
    // And then also add the Quads that have another Blank Node as the Object
    // in addition to the Blank Node `node` as the Subject:
    const blankNodeObjectQuads = quadsWithNodeAsSubject.filter((quad) => isBlankNode(quad.object));
    return blankNodeObjectQuads.reduce((predicatesAcc, quad) => {
        var _a, _b;
        const supportedPredicateTypes = [
            "NamedNode",
        ];
        if (!supportedPredicateTypes.includes(quad.predicate.termType)) {
            throw new Error(`Cannot parse Quads with nodes of type [${quad.predicate.termType}] as their Predicate node.`);
        }
        /* istanbul ignore next: The `?? {}` doesn't get hit; presumably it's initialised above. */
        const objects = (_a = predicatesAcc[quad.predicate.value]) !== null && _a !== void 0 ? _a : {};
        /* istanbul ignore next: The `?? []` doesn't get hit; presumably it's initialised above. */
        const blankNodes = (_b = objects.blankNodes) !== null && _b !== void 0 ? _b : [];
        return freeze(Object.assign(Object.assign({}, predicatesAcc), { 
            // The BlankNode assertions are valid because we filtered on BlankNodes above:
            [quad.predicate.value]: Object.assign(Object.assign({}, objects), { blankNodes: [
                    ...blankNodes,
                    getPredicatesForBlankNode(quad.object, quadParseOptions),
                ] }) }));
    }, predicates);
}
/**
 * Given an array of Quads, returns all Blank Nodes that are used in a single chain of Nodes.
 *
 * This allows you to obtain which Blank Nodes are involved in e.g. RDF lists.
 * This is useful because those can be represented as nested data that will have
 * a deterministic structure, whereas a representation of Blank Nodes that
 * create a cycle or are re-used will need ad-hoc, non-deterministic identifiers
 * to allow for representation without inifinite nesting.
 */
function getChainBlankNodes(quads) {
    // All Blank Nodes that occur in Subject position:
    const blankNodeSubjects = quads
        .map((quad) => quad.subject)
        .filter(isBlankNode);
    // All Blank Nodes that occur in Object position:
    const blankNodeObjects = quads.map((quad) => quad.object).filter(isBlankNode);
    // Makes sure that all given Nodes are the same,
    // which will be used to verify that a set of Quads all have the same Subject:
    function everyNodeTheSame(nodes) {
        // This could potentially be made more performant by mapping every term
        // to their value and using native JS comparisons, assuming every node is
        // either a Blank or a Named Node.
        return nodes.every((otherNode) => nodes.every((anotherNode) => otherNode.equals(anotherNode)));
    }
    // Get all Blank Nodes that are part of a cycle in the graph:
    const cycleBlankNodes = [];
    blankNodeObjects.forEach((blankNodeObject) => {
        cycleBlankNodes.push(...getCycleBlankNodes(blankNodeObject, quads));
    });
    // Get Blank Nodes that are used to provide nested values for a single Subject,
    // which we'll represent as nested values as well
    // (this allows us to avoid generating a non-deterministic, ad-hoc identifier
    // for those Blank Nodes).
    // We'll do this by taking all Blank Nodes in the given Quads...
    const chainBlankNodes = blankNodeSubjects
        .concat(blankNodeObjects)
        .filter((blankNode) => {
        // ....removing those Blank Nodes that are part of a cycle...
        if (cycleBlankNodes.some((cycleBlankNode) => cycleBlankNode.equals(blankNode))) {
            return false;
        }
        // ...and then returning only those Blank Nodes that only occur in the
        // Object position for a single Subject, i.e. that are part of a single
        // chain:
        const subjectsWithThisNodeAsObject = quads
            .filter((quad) => quad.object.equals(blankNode))
            .map((quad) => quad.subject);
        return (subjectsWithThisNodeAsObject.length > 0 &&
            everyNodeTheSame(subjectsWithThisNodeAsObject));
    });
    return chainBlankNodes;
}
function toRdfJsQuads(dataset, options = {}) {
    var _a;
    const quads = [];
    const dataFactory = (_a = options.dataFactory) !== null && _a !== void 0 ? _a : RdfJsDataFactory;
    Object.keys(dataset.graphs).forEach((graphIri) => {
        const graph = dataset.graphs[graphIri];
        const graphNode = graphIri === "default"
            ? dataFactory.defaultGraph()
            : dataFactory.namedNode(graphIri);
        Object.keys(graph).forEach((subjectIri) => {
            const predicates = graph[subjectIri].predicates;
            const subjectNode = isBlankNodeId(subjectIri)
                ? dataFactory.blankNode(getBlankNodeValue(subjectIri))
                : dataFactory.namedNode(subjectIri);
            quads.push(...subjectToRdfJsQuads(predicates, subjectNode, graphNode, options));
        });
    });
    return quads;
}
function subjectToRdfJsQuads(predicates, subjectNode, graphNode, options = {}) {
    var _a;
    const quads = [];
    const dataFactory = (_a = options.dataFactory) !== null && _a !== void 0 ? _a : RdfJsDataFactory;
    Object.keys(predicates).forEach((predicateIri) => {
        var _a, _b, _c, _d;
        const predicateNode = dataFactory.namedNode(predicateIri);
        const langStrings = (_a = predicates[predicateIri].langStrings) !== null && _a !== void 0 ? _a : {};
        const namedNodes = (_b = predicates[predicateIri].namedNodes) !== null && _b !== void 0 ? _b : [];
        const literals = (_c = predicates[predicateIri].literals) !== null && _c !== void 0 ? _c : {};
        const blankNodes = (_d = predicates[predicateIri].blankNodes) !== null && _d !== void 0 ? _d : [];
        const literalTypes = Object.keys(literals);
        literalTypes.forEach((typeIri) => {
            const typeNode = dataFactory.namedNode(typeIri);
            const literalValues = literals[typeIri];
            literalValues.forEach((value) => {
                const literalNode = dataFactory.literal(value, typeNode);
                quads.push(dataFactory.quad(subjectNode, predicateNode, literalNode, graphNode));
            });
        });
        const locales = Object.keys(langStrings);
        locales.forEach((locale) => {
            const localeValues = langStrings[locale];
            localeValues.forEach((value) => {
                const langStringNode = dataFactory.literal(value, locale);
                quads.push(dataFactory.quad(subjectNode, predicateNode, langStringNode, graphNode));
            });
        });
        namedNodes.forEach((namedNodeIri) => {
            const node = dataFactory.namedNode(namedNodeIri);
            quads.push(dataFactory.quad(subjectNode, predicateNode, node, graphNode));
        });
        blankNodes.forEach((blankNodeIdOrPredicates) => {
            if (isBlankNodeId(blankNodeIdOrPredicates)) {
                const blankNode = dataFactory.blankNode(getBlankNodeValue(blankNodeIdOrPredicates));
                quads.push(dataFactory.quad(subjectNode, predicateNode, blankNode, graphNode));
            }
            else {
                const node = dataFactory.blankNode();
                const blankNodeObjectQuad = dataFactory.quad(subjectNode, predicateNode, node, graphNode);
                const blankNodeSubjectQuads = subjectToRdfJsQuads(blankNodeIdOrPredicates, node, graphNode);
                quads.push(blankNodeObjectQuad);
                quads.push(...blankNodeSubjectQuads);
            }
        });
    });
    return quads;
}
/**
 * A recursive function that finds all Blank Nodes in an array of Quads that create a cycle in the graph.
 *
 * This function will traverse the graph starting from `currentNode`, keeping
 * track of all the Blank Nodes it encounters twice while doing so, and
 * returning those.
 */
function getCycleBlankNodes(currentNode, quads, traversedBlankNodes = []) {
    // If we've encountered `currentNode` before, all the Blank Nodes we've
    // encountered so far are part of a cycle. Return those.
    if (traversedBlankNodes.find((traversedBlankNode) => traversedBlankNode.equals(currentNode)) !== undefined) {
        return traversedBlankNodes;
    }
    // Find all Blank Nodes that are connected to `currentNode`:
    const blankNodeObjects = quads
        .filter((quad) => quad.subject.equals(currentNode) && isBlankNode(quad.object))
        .map((quad) => quad.object);
    // If no Blank Nodes are connected to `currentNode`, and `currentNode` is not
    // part of a cycle, we're done; the currently traversed Nodes do not form a
    // cycle:
    if (blankNodeObjects.length === 0) {
        return [];
    }
    // Store that we've traversed `currentNode`, then move on to all the Blank
    // Nodes connected to it, which will then take up the role of `currentNode`:
    const nextTraversedNodes = [...traversedBlankNodes, currentNode];
    const cycleBlankNodeArrays = blankNodeObjects.map((nextNode) => getCycleBlankNodes(nextNode, quads, nextTraversedNodes));
    // Collect all the cycle Blank Nodes found in those traverals,
    // then return them:
    const allCycleBlankNodes = [];
    for (const cycleBlankNodes of cycleBlankNodeArrays) {
        allCycleBlankNodes.push(...cycleBlankNodes);
    }
    return allCycleBlankNodes;
}
function isBlankNode(term) {
    return term.termType === "BlankNode";
}

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
const getJsonLdParser = () => {
    const onQuadCallbacks = [];
    const onCompleteCallbacks = [];
    const onErrorCallbacks = [];
    return {
        onQuad: (callback) => {
            onQuadCallbacks.push(callback);
        },
        onError: (callback) => {
            onErrorCallbacks.push(callback);
        },
        onComplete: (callback) => {
            onCompleteCallbacks.push(callback);
        },
        parse: async (source, resourceInfo) => {
            let quads = [];
            try {
                const plainQuads = (await jsonld.toRDF(JSON.parse(source), {
                    base: getSourceUrl(resourceInfo),
                }));
                quads = fixQuads(plainQuads);
            }
            catch (error) {
                onErrorCallbacks.forEach((callback) => callback(error));
            }
            quads.forEach((quad) => {
                onQuadCallbacks.forEach((callback) => callback(quad));
            });
            onCompleteCallbacks.forEach((callback) => callback());
        },
    };
};
/* Quads returned by jsonld parser are not spec-compliant
 * see https://github.com/digitalbazaar/jsonld.js/issues/243
 * Also, no specific type for these 'quads' is exposed by the library
 */
function fixQuads(plainQuads) {
    const fixedQuads = plainQuads.map((plainQuad) => DataFactory.quad(term(plainQuad.subject), term(plainQuad.predicate), term(plainQuad.object), term(plainQuad.graph)));
    return fixedQuads;
}
function term(term) {
    switch (term.termType) {
        case "NamedNode":
            return DataFactory.namedNode(term.value);
        case "BlankNode":
            return DataFactory.blankNode(term.value.substr(2)); // Remove the '_:' prefix. see https://github.com/digitalbazaar/jsonld.js/issues/244
        case "Literal":
            return DataFactory.literal(term.value, term.language || term.datatype);
        case "DefaultGraph":
            return DataFactory.defaultGraph();
        default:
            throw Error("unknown termType: " + term.termType);
    }
}

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
const getTurtleParser = () => {
    const onQuadCallbacks = [];
    const onCompleteCallbacks = [];
    const onErrorCallbacks = [];
    return {
        onQuad: (callback) => {
            onQuadCallbacks.push(callback);
        },
        onError: (callback) => {
            onErrorCallbacks.push(callback);
        },
        onComplete: (callback) => {
            onCompleteCallbacks.push(callback);
        },
        parse: async (source, resourceInfo) => {
            const parser = await getParser(getSourceUrl(resourceInfo));
            parser.parse(source, (error, quad, _prefixes) => {
                if (error) {
                    onErrorCallbacks.forEach((callback) => callback(error));
                }
                else if (quad) {
                    onQuadCallbacks.forEach((callback) => callback(quad));
                }
                else {
                    onCompleteCallbacks.forEach((callback) => callback());
                }
            });
        },
    };
};
async function getParser(baseIri) {
    const n3 = await loadN3();
    return new n3.Parser({ format: "text/turtle", baseIRI: baseIri });
}
/**
 * @param quads Triples that should be serialised to Turtle
 * @internal Utility method for internal use; not part of the public API.
 */
async function triplesToTurtle(quads) {
    const n3 = await loadN3();
    const format = "text/turtle";
    const writer = new n3.Writer({ format: format });
    // Remove any potentially lingering references to Named Graphs in Quads;
    // they'll be determined by the URL the Turtle will be sent to:
    const triples = quads.map((quad) => DataFactory.quad(quad.subject, quad.predicate, quad.object, undefined));
    writer.addQuads(triples);
    const writePromise = new Promise((resolve, reject) => {
        writer.end((error, result) => {
            /* istanbul ignore if [n3.js doesn't actually pass an error nor a result, apparently: https://github.com/rdfjs/N3.js/blob/62682e48c02d8965b4d728cb5f2cbec6b5d1b1b8/src/N3Writer.js#L290] */
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
    const rawTurtle = await writePromise;
    return rawTurtle;
}
async function loadN3() {
    // When loaded via Webpack or another bundler that looks at the `modules` field in package.json,
    // N3 serves up ES modules with named exports.
    // However, when it is loaded in Node, it serves up a CommonJS module, which, when imported from
    // a Node ES module, is in the shape of a default export that is an object with all the named
    // exports as its properties.
    // This means that if we were to import the default module, our code would fail in Webpack,
    // whereas if we imported the named exports, our code would fail in Node.
    // As a workaround, we use a dynamic import. This way, we can use the same syntax in every
    // environment, where the differences between the environments are in whether the returned object
    // includes a `default` property that contains all exported functions, or whether those functions
    // are available on the returned object directly. We can then respond to those different
    // situations at runtime.
    // Unfortunately, that does mean that tree shaking will not work until N3 also provides ES modules
    // for Node, or adds a default export for Webpack. See
    // https://github.com/rdfjs/N3.js/issues/196
    const n3Module = await import('n3');
    /* istanbul ignore if: the package provides named exports in the unit test environment */
    if (typeof n3Module.default !== "undefined") {
        return n3Module.default;
    }
    return n3Module;
}

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
/** @hidden For internal use only. */
function internal_getReadableValue(value) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (isNamedNode(value)) {
        return `<${value.value}> (URL)`;
    }
    if (isLiteral(value)) {
        /* istanbul ignore if: thingAsMarkdown always instantiates a NamedNode, so we can't hit this code path in tests. */
        if (!isNamedNode(value.datatype)) {
            return `[${value.value}] (RDF/JS Literal of unknown type)`;
        }
        let val;
        switch (value.datatype.value) {
            case xmlSchemaTypes.boolean:
                val =
                    (_b = (_a = deserializeBoolean(value.value)) === null || _a === void 0 ? void 0 : _a.valueOf()) !== null && _b !== void 0 ? _b : `Invalid data: \`${value.value}\``;
                return val + " (boolean)";
            case xmlSchemaTypes.dateTime:
                val =
                    (_d = (_c = deserializeDatetime(value.value)) === null || _c === void 0 ? void 0 : _c.toUTCString()) !== null && _d !== void 0 ? _d : `Invalid data: \`${value.value}\``;
                return val + " (datetime)";
            case xmlSchemaTypes.decimal:
                val =
                    (_f = (_e = deserializeDecimal(value.value)) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : `Invalid data: \`${value.value}\``;
                return val + " (decimal)";
            case xmlSchemaTypes.integer:
                val =
                    (_h = (_g = deserializeInteger(value.value)) === null || _g === void 0 ? void 0 : _g.toString()) !== null && _h !== void 0 ? _h : `Invalid data: \`${value.value}\``;
                return val + " (integer)";
            case xmlSchemaTypes.langString:
                return `"${value.value}" (${value.language} string)`;
            case xmlSchemaTypes.string:
                return `"${value.value}" (string)`;
            default:
                return `[${value.value}] (RDF/JS Literal of type: \`${value.datatype.value}\`)`;
        }
    }
    /* istanbul ignore else: thingAsMarkdown doesn't generate other Nodes, so we can't hit this path in tests. */
    if (value.termType === "BlankNode") {
        return `[${value.value}] (RDF/JS BlankNode)`;
    }
    /* istanbul ignore next: thingAsMarkdown doesn't generate Quad Nodes, so we can't hit this path in tests. */
    if (value.termType === "Quad") {
        return `??? (nested RDF* Quad)`;
    }
    /* istanbul ignore else: The if statements are exhaustive; if not, TypeScript will complain. */
    /* istanbul ignore next: thingAsMarkdown doesn't generate Variable Nodes, so we can't hit this path in tests. */
    if (value.termType === "Variable") {
        return `?${value.value} (RDF/JS Variable)`;
    }
    /* istanbul ignore next: The if statements are exhaustive; if not, TypeScript will complain. */
    return value;
}
/**
 * @hidden
 */
function internal_throwIfNotThing(thing) {
    if (!isThing(thing)) {
        throw new ThingExpectedError(thing);
    }
}
/**
 * @hidden
 * @param solidDataset
 */
function internal_addAdditionsToChangeLog(solidDataset, additions) {
    const changeLog = hasChangelog(solidDataset)
        ? solidDataset.internal_changeLog
        : /* istanbul ignore next: This function always gets called after addDeletionsToChangeLog, so the ChangeLog always already exists in tests: */
            { additions: [], deletions: [] };
    const [newAdditions, newDeletions] = additions
        .filter((addition) => !containsBlankNode(addition))
        .reduce(([additionsAcc, deletionsAcc], addition) => {
        const existingDeletion = deletionsAcc.find((deletion) => deletion.equals(addition));
        if (typeof existingDeletion !== "undefined") {
            return [
                additionsAcc,
                deletionsAcc.filter((deletion) => !deletion.equals(addition)),
            ];
        }
        return [additionsAcc.concat(addition), deletionsAcc];
    }, [changeLog.additions, changeLog.deletions]);
    return freeze(Object.assign(Object.assign({}, solidDataset), { internal_changeLog: {
            additions: newAdditions,
            deletions: newDeletions,
        } }));
}
/**
 * @hidden
 * @param solidDataset
 */
function internal_addDeletionsToChangeLog(solidDataset, deletions) {
    const changeLog = hasChangelog(solidDataset)
        ? solidDataset.internal_changeLog
        : { additions: [], deletions: [] };
    const [newAdditions, newDeletions] = deletions
        .filter((deletion) => !containsBlankNode(deletion))
        .reduce(([additionsAcc, deletionsAcc], deletion) => {
        const existingAddition = additionsAcc.find((addition) => addition.equals(deletion));
        if (typeof existingAddition !== "undefined") {
            return [
                additionsAcc.filter((addition) => !addition.equals(deletion)),
                deletionsAcc,
            ];
        }
        return [additionsAcc, deletionsAcc.concat(deletion)];
    }, [changeLog.additions, changeLog.deletions]);
    return freeze(Object.assign(Object.assign({}, solidDataset), { internal_changeLog: {
            additions: newAdditions,
            deletions: newDeletions,
        } }));
}
/**
 * Enforces the presence of a Changelog for a given dataset. If a changelog is
 * already present, it is unchanged. Otherwise, an empty changelog is created.
 * @hidden
 * @param solidDataset
 */
function internal_withChangeLog(solidDataset) {
    const newSolidDataset = hasChangelog(solidDataset)
        ? solidDataset
        : freeze(Object.assign(Object.assign({}, solidDataset), { internal_changeLog: { additions: [], deletions: [] } }));
    return newSolidDataset;
}
/**
 * We don't currently support reading and writing Blank Nodes, so this function can be used to skip those Quads.
 *
 * This is needed because we cannot reconcile Blank Nodes in additions and
 * deletions. Down the road, we should do a diff before saving a SolidDataset
 * against a saved copy of the originally-fetched one, based on our own data
 * structures, which should make it easier to reconcile.
 */
function containsBlankNode(quad) {
    return (quad.subject.termType === "BlankNode" ||
        quad.object.termType === "BlankNode");
}

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
 * Returns the URLs of all Properties that the given [[Thing ]]has values for.b
 *
 * @param thing The [[Thing]] of which to get that Property URLs that have a value.
 * @returns The URLs of the Properties for which values are defined for the given Thing.
 * @hidden This is an advanced API that should not be needed for most Solid use cases. If you do find yourself needing this, please file a feature request sharing your use case.
 */
function getPropertyAll(thing) {
    return Object.keys(thing.predicates).filter((predicate) => getTerm(thing, predicate) !== null);
}
/**
 * Returns the URL value of the specified Property from a [[Thing]].
 * If the Property is not present or its value is not of type URL, returns null.
 * If the Property has multiple URL values, returns one of its URL values.
 *
 * @param thing The [[Thing]] to read a URL value from.
 * @param property The Property whose URL value to return.
 * @returns A URL value for the given Property if present, or null if the Property is not present or the value is not of type URL.
 */
function getUrl(thing, property) {
    var _a, _b, _c;
    internal_throwIfNotThing(thing);
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    const predicateUrl = internal_toIriString(property);
    const firstUrl = (_c = (_b = (_a = thing.predicates[predicateUrl]) === null || _a === void 0 ? void 0 : _a.namedNodes) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : null;
    if (firstUrl === null) {
        return null;
    }
    return isLocalNodeIri(firstUrl) ? `#${getLocalNodeName(firstUrl)}` : firstUrl;
}
/** @hidden Alias of [[getUrl]] for those who prefer IRI terminology. */
const getIri = getUrl;
/**
 * Returns the URL values of the specified Property from a [[Thing]].
 * If the Property is not present, returns an empty array.
 * If the Property's value is not of type URL, omits that value in the array.
 *
 * @param thing The [[Thing]] to read the URL values from.
 * @param property The Property whose URL values to return.
 * @returns An array of URL values for the given Property.
 */
function getUrlAll(thing, property) {
    var _a, _b, _c;
    internal_throwIfNotThing(thing);
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    const predicateUrl = internal_toIriString(property);
    return ((_c = (_b = (_a = thing.predicates[predicateUrl]) === null || _a === void 0 ? void 0 : _a.namedNodes) === null || _b === void 0 ? void 0 : _b.map((iri) => isLocalNodeIri(iri) ? `#${getLocalNodeName(iri)}` : iri)) !== null && _c !== void 0 ? _c : []);
}
/** @hidden Alias of [[getUrlAll]] for those who prefer IRI terminology. */
const getIriAll = getUrlAll;
/**
 * Returns the boolean value of the specified Property from a [[Thing]].
 * If the Property is not present or its value is not of type boolean, returns null.
 * If the Property has multiple boolean values, returns one of its values.
 *
 * @param thing The [[Thing]] to read a boolean value from.
 * @param property The Property whose boolean value to return.
 * @returns A boolean value for the given Property if present, or null if the Property is not present or the value is not of type boolean.
 */
function getBoolean(thing, property) {
    internal_throwIfNotThing(thing);
    const literalString = getLiteralOfType(thing, property, xmlSchemaTypes.boolean);
    if (literalString === null) {
        return null;
    }
    return deserializeBoolean(literalString);
}
/**
 * Returns the boolean values of the specified Property from a [[Thing]].
 * If the Property is not present, returns an empty array.
 * If the Property's value is not of type boolean, omits that value in the array.
 *
 * @param thing The [[Thing]] to read the boolean values from.
 * @param property The Property whose boolean values to return.
 * @returns An array of boolean values for the given Property.
 */
function getBooleanAll(thing, property) {
    internal_throwIfNotThing(thing);
    const literalStrings = getLiteralAllOfType(thing, property, xmlSchemaTypes.boolean);
    return literalStrings
        .map(deserializeBoolean)
        .filter((possibleBoolean) => possibleBoolean !== null);
}
/**
 * Returns the datetime value of the specified Property from a [[Thing]].
 * If the Property is not present or its value is not of type datetime, returns null.
 * If the Property has multiple datetime values, returns one of its values.
 *
 * @param thing The [[Thing]] to read a datetime value from.
 * @param property The Property whose datetime value to return.
 * @returns A datetime value for the given Property if present, or null if the Property is not present or the value is not of type datetime.
 */
function getDatetime(thing, property) {
    internal_throwIfNotThing(thing);
    const literalString = getLiteralOfType(thing, property, xmlSchemaTypes.dateTime);
    if (literalString === null) {
        return null;
    }
    return deserializeDatetime(literalString);
}
/**
 * Returns the datetime values of the specified Property from a [[Thing]].
 * If the Property is not present, returns an empty array.
 * If the Property's value is not of type datetime, omits that value in the array.
 *
 * @param thing The [[Thing]] to read the datetime values from.
 * @param property The Property whose datetime values to return.
 * @returns An array of datetime values for the given Property.
 */
function getDatetimeAll(thing, property) {
    internal_throwIfNotThing(thing);
    const literalStrings = getLiteralAllOfType(thing, property, xmlSchemaTypes.dateTime);
    return literalStrings
        .map(deserializeDatetime)
        .filter((potentialDatetime) => potentialDatetime !== null);
}
/**
 * Returns the date value of the specified Property from a [[Thing]].
 * If the Property is not present or its value is not of type date, returns null.
 * If the Property has multiple date values, returns one of its values.
 *
 * @param thing The [[Thing]] to read a date value from.
 * @param property The Property whose date value to return.
 * @returns A date value for the given Property if present, or null if the Property is not present or the value is not of type date.
 * @since 1.10.0
 */
function getDate(thing, property) {
    internal_throwIfNotThing(thing);
    const literalString = getLiteralOfType(thing, property, xmlSchemaTypes.date);
    if (literalString === null) {
        return null;
    }
    return deserializeDate(literalString);
}
/**
 * Returns the date values of the specified Property from a [[Thing]].
 * If the Property is not present, returns an empty array.
 * If the Property's value is not of type date, omits that value in the array.
 *
 * @param thing The [[Thing]] to read the date values from.
 * @param property The Property whose date values to return.
 * @returns An array of date values for the given Property.
 * @since 1.10.0
 */
function getDateAll(thing, property) {
    internal_throwIfNotThing(thing);
    const literalStrings = getLiteralAllOfType(thing, property, xmlSchemaTypes.date);
    return literalStrings
        .map(deserializeDate)
        .filter((potentialDate) => potentialDate !== null);
}
/**
 * Returns the time value of the specified Property from a [[Thing]].
 * If the Property is not present or its value is not of type time, returns null.
 * If the Property has multiple time values, returns one of its values.
 *
 * @param thing The [[Thing]] to read a time value from.
 * @param property The Property whose time value to return.
 * @returns A time value for the given Property if present, or null if the Property is not present or the value is not of type time.
 * @since 1.10.0
 */
function getTime(thing, property) {
    internal_throwIfNotThing(thing);
    const literalString = getLiteralOfType(thing, property, xmlSchemaTypes.time);
    if (literalString === null) {
        return null;
    }
    return deserializeTime(literalString);
}
/**
 * Returns the time values of the specified Property from a [[Thing]].
 * If the Property is not present, returns an empty array.
 * If the Property's value is not of type time, omits that value in the array.
 *
 * @param thing The [[Thing]] to read the time values from.
 * @param property The Property whose time values to return.
 * @returns An array of time values for the given Property.
 * @since 1.10.0
 */
function getTimeAll(thing, property) {
    internal_throwIfNotThing(thing);
    const literalStrings = getLiteralAllOfType(thing, property, xmlSchemaTypes.time);
    return literalStrings
        .map(deserializeTime)
        .filter((potentialTime) => potentialTime !== null);
}
/**
 * Returns the decimal value of the specified Property from a [[Thing]].
 * If the Property is not present or its value is not of type decimal, returns null.
 * If the Property has multiple decimal values, returns one of its values.
 *
 * @param thing The [[Thing]] to read a decimal value from.
 * @param property The Property whose decimal value to return.
 * @returns A decimal value for the given Property if present, or null if the Property is not present or the value is not of type decimal.
 */
function getDecimal(thing, property) {
    internal_throwIfNotThing(thing);
    const literalString = getLiteralOfType(thing, property, xmlSchemaTypes.decimal);
    if (literalString === null) {
        return null;
    }
    return deserializeDecimal(literalString);
}
/**
 * Returns the decimal values of the specified Property from a [[Thing]].
 * If the Property is not present, returns an empty array.
 * If the Property's value is not of type decimal, omits that value in the array.
 *
 * @param thing The [[Thing]] to read the decimal values from.
 * @param property The Property whose decimal values to return.
 * @returns An array of decimal values for the given Property.
 */
function getDecimalAll(thing, property) {
    internal_throwIfNotThing(thing);
    const literalStrings = getLiteralAllOfType(thing, property, xmlSchemaTypes.decimal);
    return literalStrings
        .map((literalString) => deserializeDecimal(literalString))
        .filter((potentialDecimal) => potentialDecimal !== null);
}
/**
 * Returns the integer value of the specified Property from a [[Thing]].
 * If the Property is not present or its value is not of type integer, returns null.
 * If the Property has multiple integer values, returns one of its values.
 *
 * @param thing The [[Thing]] to read an integer value from.
 * @param property The Property whose integer value to return.
 * @returns A integer value for the given Property if present, or null if the Property is not present or the value is not of type datetime.
 */
function getInteger(thing, property) {
    internal_throwIfNotThing(thing);
    const literalString = getLiteralOfType(thing, property, xmlSchemaTypes.integer);
    if (literalString === null) {
        return null;
    }
    return deserializeInteger(literalString);
}
/**
 * Returns the integer values of the specified Property from a [[Thing]].
 * If the Property is not present, returns an empty array.
 * If the Property's value is not of type integer, omits that value in the array.
 *
 * @param thing The [[Thing]] to read the integer values from.
 * @param property The Property whose integer values to return.
 * @returns An array of integer values for the given Property.
 */
function getIntegerAll(thing, property) {
    internal_throwIfNotThing(thing);
    const literalStrings = getLiteralAllOfType(thing, property, xmlSchemaTypes.integer);
    return literalStrings
        .map((literalString) => deserializeInteger(literalString))
        .filter((potentialInteger) => potentialInteger !== null);
}
/**
 * Returns the English (language tag "en") string value of the specified Property from a [[Thing]].
 * If the Property is not present as a string in English, returns null.
 * If the Property has multiple English string values, returns one of its values.
 *
 * @param thing The [[Thing]] to read a localised string value from.
 * @param property The Property whose localised string value to return.
 * @returns An English string value for the given Property if present, or null otherwise.
 * @since 1.13.0
 */
function getStringEnglish(thing, property) {
    return getStringWithLocale(thing, property, "en");
}
/**
 * Returns the localized string value of the specified Property from a [[Thing]].
 * If the Property is not present as a string in the specified locale, returns null.
 * If the Property has multiple string values for the specified locale, returns one of its values.
 *
 * @param thing The [[Thing]] to read a localised string value from.
 * @param property The Property whose localised string value to return.
 * @param locale The desired locale for the string value.
 * @returns A localised string value for the given Property if present in the specified `locale`, or null otherwise.
 */
function getStringWithLocale(thing, property, locale) {
    var _a, _b;
    internal_throwIfNotThing(thing);
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    const predicateIri = internal_toIriString(property);
    const langStrings = (_b = (_a = thing.predicates[predicateIri]) === null || _a === void 0 ? void 0 : _a.langStrings) !== null && _b !== void 0 ? _b : {};
    const existingLocales = Object.keys(langStrings);
    const matchingLocale = existingLocales.find((existingLocale) => existingLocale.toLowerCase() === locale.toLowerCase() &&
        Array.isArray(langStrings[existingLocale]) &&
        langStrings[existingLocale].length > 0);
    return typeof matchingLocale === "string"
        ? langStrings[matchingLocale][0]
        : null;
}
/**
 * Returns the English (language tag "en") string values of the specified Property from a [[Thing]].
 * If the Property is not present, returns an empty array.
 * If the Property's value is not an English string, omits that value in the array.
 *
 * @param thing The [[Thing]] to read a localised string value from.
 * @param property The Property whose localised string value to return.
 * @returns An array of English string values for the given Property.
 */
function getStringEnglishAll(thing, property) {
    return getStringWithLocaleAll(thing, property, "en");
}
/**
 * Returns the localized string values of the specified Property from a [[Thing]].
 * If the Property is not present, returns an empty array.
 * If the Property's value is not a string of the specified locale, omits that value in the array.
 *
 * @param thing The [[Thing]] to read the localised string values from.
 * @param property The Property whose localised string values to return.
 * @param locale The desired locale for the string values.
 * @returns An array of localised string values for the given Property.
 */
function getStringWithLocaleAll(thing, property, locale) {
    var _a, _b;
    internal_throwIfNotThing(thing);
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    const predicateIri = internal_toIriString(property);
    const langStrings = (_b = (_a = thing.predicates[predicateIri]) === null || _a === void 0 ? void 0 : _a.langStrings) !== null && _b !== void 0 ? _b : {};
    const existingLocales = Object.keys(langStrings);
    const matchingLocale = existingLocales.find((existingLocale) => existingLocale.toLowerCase() === locale.toLowerCase() &&
        Array.isArray(langStrings[existingLocale]) &&
        langStrings[existingLocale].length > 0);
    return typeof matchingLocale === "string"
        ? [...langStrings[matchingLocale]]
        : [];
}
/**
 * Returns all localized string values mapped by the locales for the specified property from the
 * specified [[Thing]] (explicitly filters out non-language string literals).
 *
 * @param thing The [[Thing]] to read the localised string values from.
 * @param property The Property whose localised string values to return.
 * @returns A Map of objects, keyed on locale with the value an array of string values (for that locale).
 */
function getStringByLocaleAll(thing, property) {
    var _a, _b;
    internal_throwIfNotThing(thing);
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    const predicateIri = internal_toIriString(property);
    const stringsByLocale = (_b = (_a = thing.predicates[predicateIri]) === null || _a === void 0 ? void 0 : _a.langStrings) !== null && _b !== void 0 ? _b : {};
    return new Map(Object.entries(stringsByLocale).map(([locale, values]) => [
        locale,
        [...values],
    ]));
}
/**
 * Returns the string value of the specified Property from a [[Thing]].
 * If the Property is not present or its value is not of type string, returns null.
 * If the Property has multiple string values, returns one of its values.
 *
 * @param thing The [[Thing]] to read a string value from.
 * @param property The Property whose string value to return.
 * @returns A string value for the given Property if present, or null if the Property is not present or the value is not of type string.
 */
function getStringNoLocale(thing, property) {
    internal_throwIfNotThing(thing);
    const literalString = getLiteralOfType(thing, property, xmlSchemaTypes.string);
    return literalString;
}
/**
 * Returns the string values of the specified Property from a [[Thing]].
 * If the Property is not present, returns an empty array.
 * If the Property's value is not of type string, omits that value in the array.
 *
 * @param thing The [[Thing]] to read the string values from.
 * @param property The Property whose string values to return.
 * @returns An array of string values for the given Property.
 */
function getStringNoLocaleAll(thing, property) {
    internal_throwIfNotThing(thing);
    const literalStrings = getLiteralAllOfType(thing, property, xmlSchemaTypes.string);
    return literalStrings;
}
/**
 * @param thing The [[Thing]] to read a NamedNode value from.
 * @param property The given Property for which you want the NamedNode value.
 * @returns A NamedNode value for the given Property, if present, or null otherwise.
 * @ignore This should not be needed due to the other get*() functions. If you do find yourself needing it, please file a feature request for your use case.
 * @see https://rdf.js.org/data-model-spec/#namednode-interface
 */
function getNamedNode(thing, property) {
    const iriString = getIri(thing, property);
    if (iriString === null) {
        return null;
    }
    return DataFactory.namedNode(iriString);
}
/**
 * @param thing The [[Thing]] to read the NamedNode values from.
 * @param property The given Property for which you want the NamedNode values.
 * @returns The NamedNode values for the given Property.
 * @ignore This should not be needed due to the other get*() functions. If you do find yourself needing it, please file a feature request for your use case.
 * @see https://rdf.js.org/data-model-spec/#namednode-interface
 */
function getNamedNodeAll(thing, property) {
    const iriStrings = getIriAll(thing, property);
    return iriStrings.map((iriString) => DataFactory.namedNode(iriString));
}
/**
 * @param thing The [[Thing]] to read a Literal value from.
 * @param property The given Property for which you want the Literal value.
 * @returns A Literal value for the given Property, if present, or null otherwise.
 * @ignore This should not be needed due to the other get*() functions. If you do find yourself needing it, please file a feature request for your use case.
 * @see https://rdf.js.org/data-model-spec/#literal-interface
 */
function getLiteral(thing, property) {
    var _a, _b, _c, _d;
    internal_throwIfNotThing(thing);
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    const predicateIri = internal_toIriString(property);
    const langStrings = (_b = (_a = thing.predicates[predicateIri]) === null || _a === void 0 ? void 0 : _a.langStrings) !== null && _b !== void 0 ? _b : {};
    const locales = Object.keys(langStrings);
    if (locales.length > 0) {
        const nonEmptyLocale = locales.find((locale) => Array.isArray(langStrings[locale]) && langStrings[locale].length > 0);
        if (typeof nonEmptyLocale === "string") {
            return DataFactory.literal(langStrings[nonEmptyLocale][0], nonEmptyLocale);
        }
    }
    const otherLiterals = (_d = (_c = thing.predicates[predicateIri]) === null || _c === void 0 ? void 0 : _c.literals) !== null && _d !== void 0 ? _d : {};
    const dataTypes = Object.keys(otherLiterals);
    if (dataTypes.length > 0) {
        const nonEmptyDataType = dataTypes.find((dataType) => Array.isArray(otherLiterals[dataType]) &&
            otherLiterals[dataType].length > 0);
        if (typeof nonEmptyDataType === "string") {
            return DataFactory.literal(otherLiterals[nonEmptyDataType][0], DataFactory.namedNode(nonEmptyDataType));
        }
    }
    return null;
}
/**
 * @param thing The [[Thing]] to read the Literal values from.
 * @param property The given Property for which you want the Literal values.
 * @returns The Literal values for the given Property.
 * @ignore This should not be needed due to the other get*All() functions. If you do find yourself needing it, please file a feature request for your use case.
 * @see https://rdf.js.org/data-model-spec/#literal-interface
 */
function getLiteralAll(thing, property) {
    var _a, _b, _c, _d;
    internal_throwIfNotThing(thing);
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    const predicateIri = internal_toIriString(property);
    let literals = [];
    const langStrings = (_b = (_a = thing.predicates[predicateIri]) === null || _a === void 0 ? void 0 : _a.langStrings) !== null && _b !== void 0 ? _b : {};
    const locales = Object.keys(langStrings);
    for (const locale of locales) {
        const stringsInLocale = langStrings[locale];
        const localeLiterals = stringsInLocale.map((langString) => DataFactory.literal(langString, locale));
        literals = literals.concat(localeLiterals);
    }
    const otherLiterals = (_d = (_c = thing.predicates[predicateIri]) === null || _c === void 0 ? void 0 : _c.literals) !== null && _d !== void 0 ? _d : {};
    const dataTypes = Object.keys(otherLiterals);
    for (const dataType of dataTypes) {
        const values = otherLiterals[dataType];
        const typeNode = DataFactory.namedNode(dataType);
        const dataTypeLiterals = values.map((value) => DataFactory.literal(value, typeNode));
        literals = literals.concat(dataTypeLiterals);
    }
    return literals;
}
/**
 * @param thing The [[Thing]] to read a raw RDF/JS value from.
 * @param property The given Property for which you want the raw value.
 * @returns A Term for the given Property, if present, or null otherwise.
 * @ignore This should not be needed due to the other get*() functions. If you do find yourself needing it, please file a feature request for your use case.
 * @see https://rdf.js.org/data-model-spec/
 * @since 0.3.0
 */
function getTerm(thing, property) {
    var _a, _b;
    internal_throwIfNotThing(thing);
    const namedNode = getNamedNode(thing, property);
    if (namedNode !== null) {
        return namedNode;
    }
    const literal = getLiteral(thing, property);
    if (literal !== null) {
        return literal;
    }
    const predicateIri = internal_toIriString(property);
    const blankNodes = (_b = (_a = thing.predicates[predicateIri]) === null || _a === void 0 ? void 0 : _a.blankNodes) !== null && _b !== void 0 ? _b : [];
    if (blankNodes.length > 0) {
        const blankNodeValue = isBlankNodeId(blankNodes[0])
            ? getBlankNodeValue(blankNodes[0])
            : undefined;
        return DataFactory.blankNode(blankNodeValue);
    }
    return null;
}
/**
 * @param thing The [[Thing]] to read the raw RDF/JS values from.
 * @param property The given Property for which you want the raw values.
 * @returns The Terms for the given Property.
 * @ignore This should not be needed due to the other get*() functions. If you do find yourself needing it, please file a feature request for your use case.
 * @see https://rdf.js.org/data-model-spec/
 * @since 0.3.0
 */
function getTermAll(thing, property) {
    var _a, _b;
    internal_throwIfNotThing(thing);
    const namedNodes = getNamedNodeAll(thing, property);
    const literals = getLiteralAll(thing, property);
    const predicateIri = internal_toIriString(property);
    const blankNodeValues = (_b = (_a = thing.predicates[predicateIri]) === null || _a === void 0 ? void 0 : _a.blankNodes) !== null && _b !== void 0 ? _b : [];
    const blankNodes = blankNodeValues.map((rawBlankNode) => {
        const blankNodeName = isBlankNodeId(rawBlankNode)
            ? getBlankNodeValue(rawBlankNode)
            : undefined;
        return DataFactory.blankNode(blankNodeName);
    });
    const terms = namedNodes
        .concat(literals)
        .concat(blankNodes);
    return terms;
}
/**
 * @param thing The [Thing]] to read a Literal of the given type from.
 * @param property The given Property for which you want the Literal value.
 * @param literalType Set type of the Literal data.
 * @returns The stringified value for the given Property and type, if present, or null otherwise.
 */
function getLiteralOfType(thing, property, literalType) {
    var _a, _b, _c, _d;
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    const predicateIri = internal_toIriString(property);
    return (_d = (_c = (_b = (_a = thing.predicates[predicateIri]) === null || _a === void 0 ? void 0 : _a.literals) === null || _b === void 0 ? void 0 : _b[literalType]) === null || _c === void 0 ? void 0 : _c[0]) !== null && _d !== void 0 ? _d : null;
}
/**
 * @param thing The [Thing]] to read the Literals of the given type from.
 * @param property The given Property for which you want the Literal values.
 * @param literalType Set type of the Literal data.
 * @returns The stringified values for the given Property and type.
 */
function getLiteralAllOfType(thing, property, literalType) {
    var _a, _b, _c;
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    const predicateIri = internal_toIriString(property);
    const literalsOfType = (_c = (_b = (_a = thing.predicates[predicateIri]) === null || _a === void 0 ? void 0 : _a.literals) === null || _b === void 0 ? void 0 : _b[literalType]) !== null && _c !== void 0 ? _c : [];
    return [...literalsOfType];
}

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
 * Extract Quads with a given Subject from a [[SolidDataset]] into a [[Thing]].
 *
 * @param solidDataset The [[SolidDataset]] to extract the [[Thing]] from.
 * @param thingUrl The URL of the desired [[Thing]].
 * @param options Not yet implemented.
 */
function getThing(solidDataset, thingUrl, options = {}) {
    var _a;
    if (!internal_isValidUrl(thingUrl)) {
        throw new ValidThingUrlExpectedError(thingUrl);
    }
    const graph = typeof options.scope !== "undefined"
        ? internal_toIriString(options.scope)
        : "default";
    const thingsByIri = (_a = solidDataset.graphs[graph]) !== null && _a !== void 0 ? _a : {};
    const thingIri = internal_toIriString(thingUrl);
    const resolvedThingIri = isLocalNodeIri(thingIri) && hasServerResourceInfo(solidDataset)
        ? resolveLocalIri(getLocalNodeName(thingIri), getSourceUrl(solidDataset))
        : thingIri;
    const thing = thingsByIri[resolvedThingIri];
    if (typeof thing === "undefined") {
        return null;
    }
    return thing;
}
/**
 * Get all [[Thing]]s about which a [[SolidDataset]] contains Quads.
 *
 * @param solidDataset The [[SolidDataset]] to extract the [[Thing]]s from.
 * @param options Not yet implemented.
 */
function getThingAll(solidDataset, options = {}) {
    var _a;
    const graph = typeof options.scope !== "undefined"
        ? internal_toIriString(options.scope)
        : "default";
    const thingsByIri = (_a = solidDataset.graphs[graph]) !== null && _a !== void 0 ? _a : {};
    return Object.values(thingsByIri);
}
/**
 * Insert a [[Thing]] into a [[SolidDataset]], replacing previous instances of that Thing.
 *
 * @param solidDataset The SolidDataset to insert a Thing into.
 * @param thing The Thing to insert into the given SolidDataset.
 * @returns A new SolidDataset equal to the given SolidDataset, but with the given Thing.
 */
function setThing(solidDataset, thing) {
    var _a;
    const thingIri = isThingLocal(thing) && hasServerResourceInfo(solidDataset)
        ? resolveLocalIri(getLocalNodeName(thing.url), getSourceUrl(solidDataset))
        : thing.url;
    const defaultGraph = solidDataset.graphs.default;
    const updatedDefaultGraph = freeze(Object.assign(Object.assign({}, defaultGraph), { [thingIri]: freeze(Object.assign(Object.assign({}, thing), { url: thingIri })) }));
    const updatedGraphs = freeze(Object.assign(Object.assign({}, solidDataset.graphs), { default: updatedDefaultGraph }));
    const subjectNode = DataFactory.namedNode(thingIri);
    const deletedThingPredicates = (_a = solidDataset.graphs.default[thingIri]) === null || _a === void 0 ? void 0 : _a.predicates;
    const deletions = typeof deletedThingPredicates !== "undefined"
        ? subjectToRdfJsQuads(deletedThingPredicates, subjectNode, DataFactory.defaultGraph())
        : [];
    const additions = subjectToRdfJsQuads(thing.predicates, subjectNode, DataFactory.defaultGraph());
    return internal_addAdditionsToChangeLog(internal_addDeletionsToChangeLog(freeze(Object.assign(Object.assign({}, solidDataset), { graphs: updatedGraphs })), deletions), additions);
}
/**
 * Remove a Thing from a SolidDataset.
 *
 * @param solidDataset The SolidDataset to remove a Thing from.
 * @param thing The Thing to remove from `solidDataset`.
 * @returns A new [[SolidDataset]] equal to the input SolidDataset, excluding the given Thing.
 */
function removeThing(solidDataset, thing) {
    var _a;
    let thingIri;
    if (isNamedNode(thing)) {
        thingIri = thing.value;
    }
    else if (typeof thing === "string") {
        thingIri =
            isLocalNodeIri(thing) && hasServerResourceInfo(solidDataset)
                ? resolveLocalIri(getLocalNodeName(thing), getSourceUrl(solidDataset))
                : thing;
    }
    else if (isThingLocal(thing)) {
        thingIri = thing.url;
    }
    else {
        thingIri = asIri(thing);
    }
    const defaultGraph = solidDataset.graphs.default;
    const updatedDefaultGraph = Object.assign({}, defaultGraph);
    delete updatedDefaultGraph[thingIri];
    const updatedGraphs = freeze(Object.assign(Object.assign({}, solidDataset.graphs), { default: freeze(updatedDefaultGraph) }));
    const subjectNode = DataFactory.namedNode(thingIri);
    const deletedThingPredicates = (_a = solidDataset.graphs.default[thingIri]) === null || _a === void 0 ? void 0 : _a.predicates;
    const deletions = typeof deletedThingPredicates !== "undefined"
        ? subjectToRdfJsQuads(deletedThingPredicates, subjectNode, DataFactory.defaultGraph())
        : [];
    return internal_addDeletionsToChangeLog(freeze(Object.assign(Object.assign({}, solidDataset), { graphs: updatedGraphs })), deletions);
}
function createThing(options = {}) {
    var _a;
    if (typeof options.url !== "undefined") {
        const url = options.url;
        if (!internal_isValidUrl(url)) {
            throw new ValidThingUrlExpectedError(url);
        }
        const thing = freeze({
            type: "Subject",
            predicates: freeze({}),
            url: url,
        });
        return thing;
    }
    const name = (_a = options.name) !== null && _a !== void 0 ? _a : generateName();
    const localNodeIri = getLocalNodeIri(name);
    const thing = freeze({
        type: "Subject",
        predicates: freeze({}),
        url: localNodeIri,
    });
    return thing;
}
/**
 * @param input An value that might be a [[Thing]].
 * @returns Whether `input` is a Thing.
 * @since 0.2.0
 */
function isThing(input) {
    return (typeof input === "object" &&
        input !== null &&
        typeof input.type === "string" &&
        input.type === "Subject");
}
function asUrl(thing, baseUrl) {
    if (isThingLocal(thing)) {
        if (typeof baseUrl === "undefined") {
            throw new Error("The URL of a Thing that has not been persisted cannot be determined without a base URL.");
        }
        return resolveLocalIri(getLocalNodeName(thing.url), baseUrl);
    }
    return thing.url;
}
/** @hidden Alias of [[asUrl]] for those who prefer IRI terminology. */
const asIri = asUrl;
/**
 * Gets a human-readable representation of the given Thing to aid debugging.
 *
 * Note that changes to the exact format of the return value are not considered a breaking change;
 * it is intended to aid in debugging, not as a serialisation method that can be reliably parsed.
 *
 * @param thing The Thing to get a human-readable representation of.
 * @since 0.3.0
 */
function thingAsMarkdown(thing) {
    let thingAsMarkdown = "";
    if (isThingLocal(thing)) {
        thingAsMarkdown += `## Thing (no URL yet — identifier: \`#${getLocalNodeName(thing.url)}\`)\n`;
    }
    else {
        thingAsMarkdown += `## Thing: ${thing.url}\n`;
    }
    const predicateIris = Object.keys(thing.predicates);
    if (predicateIris.length === 0) {
        thingAsMarkdown += "\n<empty>\n";
    }
    else {
        for (const predicate of predicateIris) {
            thingAsMarkdown += `\nProperty: ${predicate}\n`;
            const values = getTermAll(thing, predicate);
            values.forEach((value) => {
                thingAsMarkdown += `- ${internal_getReadableValue(value)}\n`;
            });
        }
    }
    return thingAsMarkdown;
}
/**
 * @param thing The [[Thing]] of which a URL might or might not be known.
 * @return `true` if `thing` has no known URL yet.
 * @since 1.7.0
 */
function isThingLocal(thing) {
    return isLocalNodeIri(thing.url);
}
/**
 * This error is thrown when a function expected to receive a [[Thing]] but received something else.
 * @since 1.2.0
 */
class ThingExpectedError extends SolidClientError {
    constructor(receivedValue) {
        const message = `Expected a Thing, but received: [${receivedValue}].`;
        super(message);
        this.receivedValue = receivedValue;
    }
}
/**
 * This error is thrown when a function expected to receive a valid URL to identify a property but received something else.
 */
class ValidPropertyUrlExpectedError extends SolidClientError {
    constructor(receivedValue) {
        const value = isNamedNode(receivedValue)
            ? receivedValue.value
            : receivedValue;
        const message = `Expected a valid URL to identify a property, but received: [${value}].`;
        super(message);
        this.receivedProperty = value;
    }
}
/**
 * This error is thrown when a function expected to receive a valid URL value but received something else.
 */
class ValidValueUrlExpectedError extends SolidClientError {
    constructor(receivedValue) {
        const value = isNamedNode(receivedValue)
            ? receivedValue.value
            : receivedValue;
        const message = `Expected a valid URL value, but received: [${value}].`;
        super(message);
        this.receivedValue = value;
    }
}
/**
 * This error is thrown when a function expected to receive a valid URL to identify a [[Thing]] but received something else.
 */
class ValidThingUrlExpectedError extends SolidClientError {
    constructor(receivedValue) {
        const value = isNamedNode(receivedValue)
            ? receivedValue.value
            : receivedValue;
        const message = `Expected a valid URL to identify a Thing, but received: [${value}].`;
        super(message);
        this.receivedValue = value;
    }
}
/**
 * Generate a string that can be used as the unique identifier for a Thing
 *
 * This function works by starting with a date string (so that Things can be
 * sorted chronologically), followed by a random number generated by taking a
 * random number between 0 and 1, and cutting off the `0.`.
 *
 * @internal
 * @returns An string that's likely to be unique
 */
const generateName = () => {
    return (Date.now().toString() + Math.random().toString().substring("0.".length));
};

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
 * This function normalizes IRIs as managed by the server to ease accurate comparison.
 * @param iri
 * @hidden
 */
function normalizeServerSideIri(iri) {
    const iriObj = new URL(iri);
    iriObj.hash = "";
    return iriObj.href;
}

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
 * Initialise a new [[SolidDataset]] in memory.
 *
 * @returns An empty [[SolidDataset]].
 */
function createSolidDataset() {
    return freeze({
        type: "Dataset",
        graphs: {
            default: {},
        },
    });
}
/**
 * @hidden This interface is not exposed yet until we've tried it out in practice.
 */
async function responseToSolidDataset(response, parseOptions = {}) {
    if (internal_isUnsuccessfulResponse(response)) {
        throw new FetchError(`Fetching the SolidDataset at [${response.url}] failed: [${response.status}] [${response.statusText}].`, response);
    }
    const resourceInfo = responseToResourceInfo(response);
    const parsers = Object.assign({ "text/turtle": getTurtleParser() }, parseOptions.parsers);
    const contentType = getContentType$1(resourceInfo);
    if (contentType === null) {
        throw new Error(`Could not determine the content type of the Resource at [${getSourceUrl(resourceInfo)}].`);
    }
    const mimeType = contentType.split(";")[0];
    const parser = parsers[mimeType];
    if (typeof parser === "undefined") {
        throw new Error(`The Resource at [${getSourceUrl(resourceInfo)}] has a MIME type of [${mimeType}], but the only parsers available are for the following MIME types: [${Object.keys(parsers).join(", ")}].`);
    }
    const data = await response.text();
    const parsingPromise = new Promise((resolve, reject) => {
        let solidDataset = freeze({
            graphs: freeze({ default: freeze({}) }),
            type: "Dataset",
        });
        // While Quads without Blank Nodes can be added to the SolidDataset as we
        // encounter them, to parse Quads with Blank Nodes, we'll have to wait until
        // we've seen all the Quads, so that we can reconcile equal Blank Nodes.
        const quadsWithBlankNodes = [];
        const allQuads = [];
        parser.onError((error) => {
            reject(new Error(`Encountered an error parsing the Resource at [${getSourceUrl(resourceInfo)}] with content type [${contentType}]: ${error}`));
        });
        parser.onQuad((quad) => {
            allQuads.push(quad);
            if (quad.subject.termType === "BlankNode" ||
                quad.object.termType === "BlankNode") {
                // Quads with Blank Nodes will be parsed when all Quads are known,
                // so that equal Blank Nodes can be reconciled:
                quadsWithBlankNodes.push(quad);
            }
            else {
                solidDataset = addRdfJsQuadToDataset(solidDataset, quad);
            }
        });
        parser.onComplete(async () => {
            // If a Resource contains more than this number of Blank Nodes,
            // we consider the detection of chains (O(n^2), I think) to be too
            // expensive, and just incorporate them as regular Blank Nodes with
            // non-deterministic, ad-hoc identifiers into the SolidDataset:
            const maxBlankNodesToDetectChainsFor = 20;
            // Some Blank Nodes only serve to use a set of Quads as the Object for a
            // single Subject. Those Quads will be added to the SolidDataset when
            // their Subject's Blank Node is encountered in the Object position.
            const chainBlankNodes = quadsWithBlankNodes.length <= maxBlankNodesToDetectChainsFor
                ? getChainBlankNodes(quadsWithBlankNodes)
                : [];
            const quadsWithoutChainBlankNodeSubjects = quadsWithBlankNodes.filter((quad) => chainBlankNodes.every((chainBlankNode) => !chainBlankNode.equals(quad.subject)));
            solidDataset = quadsWithoutChainBlankNodeSubjects.reduce((datasetAcc, quad) => addRdfJsQuadToDataset(datasetAcc, quad, {
                otherQuads: allQuads,
                chainBlankNodes: chainBlankNodes,
            }), solidDataset);
            const solidDatasetWithResourceInfo = freeze(Object.assign(Object.assign({}, solidDataset), resourceInfo));
            resolve(solidDatasetWithResourceInfo);
        });
        parser.parse(data, resourceInfo);
    });
    return await parsingPromise;
}
/**
 * Fetch a SolidDataset from the given URL. Currently requires the SolidDataset to be available as [Turtle](https://www.w3.org/TR/turtle/).
 *
 * @param url URL to fetch a [[SolidDataset]] from.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns Promise resolving to a [[SolidDataset]] containing the data at the given Resource, or rejecting if fetching it failed.
 */
async function getSolidDataset(url, options = internal_defaultFetchOptions) {
    var _a;
    url = internal_toIriString(url);
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const parserContentTypes = Object.keys((_a = options.parsers) !== null && _a !== void 0 ? _a : {});
    const acceptedContentTypes = parserContentTypes.length > 0
        ? parserContentTypes.join(", ")
        : "text/turtle";
    const response = await config.fetch(url, {
        headers: {
            Accept: acceptedContentTypes,
        },
    });
    if (internal_isUnsuccessfulResponse(response)) {
        throw new FetchError(`Fetching the Resource at [${url}] failed: [${response.status}] [${response.statusText}].`, response);
    }
    const solidDataset = await responseToSolidDataset(response, options);
    return solidDataset;
}
/**
 * Create a SPARQL UPDATE Patch request from a [[SolidDataset]] with a changelog.
 * @param solidDataset the [[SolidDataset]] that has been locally updated, and that should be persisted.
 * @returns an HTTP PATCH request configuration object, aligned with the [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters), containing a SPARQL UPDATE.
 * @hidden
 */
async function prepareSolidDatasetUpdate(solidDataset) {
    const deleteStatement = solidDataset.internal_changeLog.deletions.length > 0
        ? `DELETE DATA {${(await triplesToTurtle(solidDataset.internal_changeLog.deletions.map(getNamedNodesForLocalNodes))).trim()}};`
        : "";
    const insertStatement = solidDataset.internal_changeLog.additions.length > 0
        ? `INSERT DATA {${(await triplesToTurtle(solidDataset.internal_changeLog.additions.map(getNamedNodesForLocalNodes))).trim()}};`
        : "";
    return {
        method: "PATCH",
        body: `${deleteStatement} ${insertStatement}`,
        headers: {
            "Content-Type": "application/sparql-update",
        },
    };
}
/**
 * Create a Put request to write a locally created [[SolidDataset]] to a Pod.
 * @param solidDataset the [[SolidDataset]] that has been locally updated, and that should be persisted.
 * @returns an HTTP PUT request configuration object, aligned with the [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters), containing a serialization of the [[SolidDataset]].
 * @hidden
 */
async function prepareSolidDatasetCreation(solidDataset) {
    return {
        method: "PUT",
        body: await triplesToTurtle(toRdfJsQuads(solidDataset).map(getNamedNodesForLocalNodes)),
        headers: {
            "Content-Type": "text/turtle",
            "If-None-Match": "*",
            Link: `<${ldp.Resource}>; rel="type"`,
        },
    };
}
/**
 * Given a SolidDataset, store it in a Solid Pod (overwriting the existing data at the given URL).
 *
 * A SolidDataset keeps track of the data changes compared to the data in the Pod; i.e.,
 * the changelog tracks both the old value and new values of the property being modified. This
 * function applies the changes to the current SolidDataset. If the old value specified in the
 * changelog does not correspond to the value currently in the Pod, this function will throw an
 * error.
 * The SolidDataset returned by this function will contain the data sent to the Pod, and a ChangeLog
 * up-to-date with the saved data. Note that if the data on the server was modified in between the
 * first fetch and saving it, the updated data will not be reflected in the returned SolidDataset.
 * To make sure you have the latest data, call [[getSolidDataset]] again after saving the data.
 *
 * The Solid server will create any intermediary Containers that do not exist yet, so they do not
 * need to be created in advance. For example, if the target URL is
 * https://example.pod/container/resource and https://example.pod/container/ does not exist yet,
 * it will exist after this function resolves successfully.
 *
 * @param url URL to save `solidDataset` to.
 * @param solidDataset The [[SolidDataset]] to save.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns A Promise resolving to a [[SolidDataset]] containing the stored data, or rejecting if saving it failed.
 */
async function saveSolidDatasetAt(url, solidDataset, options = internal_defaultFetchOptions) {
    url = internal_toIriString(url);
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const datasetWithChangelog = internal_withChangeLog(solidDataset);
    const requestInit = isUpdate(datasetWithChangelog, url)
        ? await prepareSolidDatasetUpdate(datasetWithChangelog)
        : await prepareSolidDatasetCreation(datasetWithChangelog);
    const response = await config.fetch(url, requestInit);
    if (internal_isUnsuccessfulResponse(response)) {
        const diagnostics = isUpdate(datasetWithChangelog, url)
            ? "The changes that were sent to the Pod are listed below.\n\n" +
                changeLogAsMarkdown(datasetWithChangelog)
            : "The SolidDataset that was sent to the Pod is listed below.\n\n" +
                solidDatasetAsMarkdown(datasetWithChangelog);
        throw new FetchError(`Storing the Resource at [${url}] failed: [${response.status}] [${response.statusText}].\n\n` +
            diagnostics, response);
    }
    const resourceInfo = Object.assign(Object.assign({}, internal_parseResourceInfo(response)), { isRawData: false });
    const storedDataset = freeze(Object.assign(Object.assign({}, solidDataset), { internal_changeLog: { additions: [], deletions: [] }, internal_resourceInfo: resourceInfo }));
    const storedDatasetWithResolvedIris = resolveLocalIrisInSolidDataset(storedDataset);
    return storedDatasetWithResolvedIris;
}
/**
 * Deletes the SolidDataset at a given URL.
 *
 * If operating on a container, the container must be empty otherwise a 409 CONFLICT will be raised.
 *
 * @param file The (URL of the) SolidDataset to delete
 * @since 0.6.0
 */
async function deleteSolidDataset(solidDataset, options = internal_defaultFetchOptions) {
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const url = hasResourceInfo(solidDataset)
        ? internal_toIriString(getSourceUrl(solidDataset))
        : internal_toIriString(solidDataset);
    const response = await config.fetch(url, { method: "DELETE" });
    if (internal_isUnsuccessfulResponse(response)) {
        throw new FetchError(`Deleting the SolidDataset at [${url}] failed: [${response.status}] [${response.statusText}].`, response);
    }
}
/**
 * Create an empty Container at the given URL.
 *
 * Throws an error if creating the Container failed, e.g. because the current user does not have
 * permissions to, or because the Container already exists.
 *
 * Note that a Solid server will automatically create the necessary Containers when storing a
 * Resource; i.e. there is no need to call this function if it is immediately followed by
 * [[saveSolidDatasetAt]] or [[overwriteFile]].
 *
 * @param url URL of the empty Container that is to be created.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @since 0.2.0
 */
async function createContainerAt(url, options = internal_defaultFetchOptions) {
    url = internal_toIriString(url);
    url = url.endsWith("/") ? url : url + "/";
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const response = await config.fetch(url, {
        method: "PUT",
        headers: {
            Accept: "text/turtle",
            "Content-Type": "text/turtle",
            "If-None-Match": "*",
            // This header should not be required to create a Container,
            // but ESS currently expects it:
            Link: `<${ldp.BasicContainer}>; rel="type"`,
        },
    });
    if (internal_isUnsuccessfulResponse(response)) {
        if (response.status === 409 &&
            response.statusText === "Conflict" &&
            (await response.text()).trim() ===
                internal_NSS_CREATE_CONTAINER_SPEC_NONCOMPLIANCE_DETECTION_ERROR_MESSAGE_TO_WORKAROUND_THEIR_ISSUE_1465) {
            return createContainerWithNssWorkaroundAt(url, options);
        }
        throw new FetchError(`Creating the empty Container at [${url}] failed: [${response.status}] [${response.statusText}].`, response);
    }
    const resourceInfo = internal_parseResourceInfo(response);
    const containerDataset = freeze(Object.assign(Object.assign({}, createSolidDataset()), { internal_changeLog: { additions: [], deletions: [] }, internal_resourceInfo: resourceInfo }));
    return containerDataset;
}
/**
 * Unfortunately Node Solid Server does not confirm to the Solid spec when it comes to Container
 * creation. When we make the (valid, according to the Solid protocol) request to create a
 * Container, NSS responds with the following exact error message. Thus, when we encounter exactly
 * this message, we use an NSS-specific workaround ([[createContainerWithNssWorkaroundAt]]). Both
 * this constant and that workaround should be removed once the NSS issue has been fixed and
 * no versions of NSS with the issue are in common use/supported anymore.
 *
 * @see https://github.com/solid/node-solid-server/issues/1465
 * @internal
 */
const internal_NSS_CREATE_CONTAINER_SPEC_NONCOMPLIANCE_DETECTION_ERROR_MESSAGE_TO_WORKAROUND_THEIR_ISSUE_1465 = "Can't write file: PUT not supported on containers, use POST instead";
/**
 * Unfortunately Node Solid Server does not confirm to the Solid spec when it comes to Container
 * creation. As a workaround, we create a dummy file _inside_ the desired Container (which should
 * create the desired Container on the fly), and then delete it again.
 *
 * @see https://github.com/solid/node-solid-server/issues/1465
 */
const createContainerWithNssWorkaroundAt = async (url, options) => {
    url = internal_toIriString(url);
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    let existingContainer;
    try {
        existingContainer = await getResourceInfo(url, options);
    }
    catch (e) {
        // To create the Container, we'd want it to not exist yet. In other words, we'd expect to get
        // a 404 error here in the happy path - so do nothing if that's the case.
        if (!(e instanceof FetchError) || e.statusCode !== 404) {
            // (But if we get an error other than a 404, just throw that error like we usually would.)
            throw e;
        }
    }
    if (typeof existingContainer !== "undefined") {
        throw new Error(`The Container at [${url}] already exists, and therefore cannot be created again.`);
    }
    const dummyUrl = url + ".dummy";
    const createResponse = await config.fetch(dummyUrl, {
        method: "PUT",
        headers: {
            Accept: "text/turtle",
            "Content-Type": "text/turtle",
        },
    });
    if (internal_isUnsuccessfulResponse(createResponse)) {
        throw new FetchError(`Creating the empty Container at [${url}] failed: [${createResponse.status}] [${createResponse.statusText}].`, createResponse);
    }
    await config.fetch(dummyUrl, { method: "DELETE" });
    const containerInfoResponse = await config.fetch(url, { method: "HEAD" });
    const resourceInfo = internal_parseResourceInfo(containerInfoResponse);
    const containerDataset = freeze(Object.assign(Object.assign({}, createSolidDataset()), { internal_changeLog: { additions: [], deletions: [] }, internal_resourceInfo: resourceInfo }));
    return containerDataset;
};
function isSourceIriEqualTo(dataset, iri) {
    return (normalizeServerSideIri(dataset.internal_resourceInfo.sourceIri) ===
        normalizeServerSideIri(iri));
}
function isUpdate(solidDataset, url) {
    return (hasChangelog(solidDataset) &&
        hasResourceInfo(solidDataset) &&
        typeof solidDataset.internal_resourceInfo.sourceIri === "string" &&
        isSourceIriEqualTo(solidDataset, url));
}
/**
 * Given a SolidDataset, store it in a Solid Pod in a new Resource inside a Container.
 *
 * The Container at the given URL should already exist; if it does not, you can initialise it first
 * using [[createContainerAt]], or directly save the SolidDataset at the desired location using
 * [[saveSolidDatasetAt]].
 *
 * This function is primarily useful if the current user does not have access to change existing files in
 * a Container, but is allowed to add new files; in other words, they have Append, but not Write
 * access to a Container. This is useful in situations where someone wants to allow others to,
 * for example, send notifications to their Pod, but not to view or delete existing notifications.
 * You can pass a suggestion for the new Resource's name, but the server may decide to give it
 * another name — for example, if a Resource with that name already exists inside the given
 * Container.
 * If the user does have access to write directly to a given location, [[saveSolidDatasetAt]]
 * will do the job just fine, and does not require the parent Container to exist in advance.
 *
 * @param containerUrl URL of the Container in which to create a new Resource.
 * @param solidDataset The [[SolidDataset]] to save to a new Resource in the given Container.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns A Promise resolving to a [[SolidDataset]] containing the saved data. The Promise rejects if the save failed.
 */
async function saveSolidDatasetInContainer(containerUrl, solidDataset, options = internal_defaultFetchOptions) {
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    containerUrl = internal_toIriString(containerUrl);
    const rawTurtle = await triplesToTurtle(toRdfJsQuads(solidDataset).map(getNamedNodesForLocalNodes));
    const headers = {
        "Content-Type": "text/turtle",
        Link: `<${ldp.Resource}>; rel="type"`,
    };
    if (options.slugSuggestion) {
        headers.slug = options.slugSuggestion;
    }
    const response = await config.fetch(containerUrl, {
        method: "POST",
        body: rawTurtle,
        headers: headers,
    });
    if (internal_isUnsuccessfulResponse(response)) {
        throw new FetchError(`Storing the Resource in the Container at [${containerUrl}] failed: [${response.status}] [${response.statusText}].\n\n` +
            "The SolidDataset that was sent to the Pod is listed below.\n\n" +
            solidDatasetAsMarkdown(solidDataset), response);
    }
    const locationHeader = response.headers.get("Location");
    if (locationHeader === null) {
        throw new Error("Could not determine the location of the newly saved SolidDataset.");
    }
    const resourceIri = new URL(locationHeader, response.url).href;
    const resourceInfo = {
        internal_resourceInfo: {
            isRawData: false,
            sourceIri: resourceIri,
        },
    };
    const resourceWithResourceInfo = freeze(Object.assign(Object.assign({}, solidDataset), resourceInfo));
    const resourceWithResolvedIris = resolveLocalIrisInSolidDataset(resourceWithResourceInfo);
    return resourceWithResolvedIris;
}
/**
 * Create an empty Container inside the Container at the given URL.
 *
 * Throws an error if creating the Container failed, e.g. because the current user does not have
 * permissions to.
 *
 * The Container in which to create the new Container should itself already exist.
 *
 * This function is primarily useful if the current user does not have access to change existing files in
 * a Container, but is allowed to add new files; in other words, they have Append, but not Write
 * access to a Container. This is useful in situations where someone wants to allow others to,
 * for example, send notifications to their Pod, but not to view or delete existing notifications.
 * You can pass a suggestion for the new Resource's name, but the server may decide to give it
 * another name — for example, if a Resource with that name already exists inside the given
 * Container.
 * If the user does have access to write directly to a given location, [[createContainerAt]]
 * will do the job just fine, and does not require the parent Container to exist in advance.
 *
 * @param containerUrl URL of the Container in which the empty Container is to be created.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @since 0.2.0
 */
async function createContainerInContainer(containerUrl, options = internal_defaultFetchOptions) {
    containerUrl = internal_toIriString(containerUrl);
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const headers = {
        "Content-Type": "text/turtle",
        Link: `<${ldp.BasicContainer}>; rel="type"`,
    };
    if (options.slugSuggestion) {
        headers.slug = options.slugSuggestion;
    }
    const response = await config.fetch(containerUrl, {
        method: "POST",
        headers: headers,
    });
    if (internal_isUnsuccessfulResponse(response)) {
        throw new FetchError(`Creating an empty Container in the Container at [${containerUrl}] failed: [${response.status}] [${response.statusText}].`, response);
    }
    const locationHeader = response.headers.get("Location");
    if (locationHeader === null) {
        throw new Error("Could not determine the location of the newly created Container.");
    }
    const resourceIri = new URL(locationHeader, response.url).href;
    const resourceInfo = {
        internal_resourceInfo: {
            isRawData: false,
            sourceIri: resourceIri,
        },
    };
    const resourceWithResourceInfo = freeze(Object.assign(Object.assign({}, createSolidDataset()), resourceInfo));
    return resourceWithResourceInfo;
}
/**
 * Deletes the Container at a given URL.
 *
 * @param file The (URL of the) Container to delete
 * @since 0.6.0
 */
async function deleteContainer(container, options = internal_defaultFetchOptions) {
    const url = hasResourceInfo(container)
        ? internal_toIriString(getSourceUrl(container))
        : internal_toIriString(container);
    if (!isContainer(container)) {
        throw new Error(`You're trying to delete the Container at [${url}], but Container URLs should end in a \`/\`. Are you sure this is a Container?`);
    }
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const response = await config.fetch(url, { method: "DELETE" });
    if (internal_isUnsuccessfulResponse(response)) {
        throw new FetchError(`Deleting the Container at [${url}] failed: [${response.status}] [${response.statusText}].`, response);
    }
}
/**
 * Given a [[SolidDataset]] representing a Container (see [[isContainer]]), fetch the URLs of all
 * contained resources.
 * If the solidDataset given is not a container, or is missing resourceInfo, throw an error.
 *
 * @param solidDataset The container from which to fetch all contained Resource URLs.
 * @returns A list of URLs, each of which points to a contained Resource of the given SolidDataset.
 * @since 1.3.0
 */
function getContainedResourceUrlAll(solidDataset) {
    const container = getThing(solidDataset, getSourceUrl(solidDataset));
    // See https://www.w3.org/TR/2015/REC-ldp-20150226/#h-ldpc-http_post:
    // > a containment triple MUST be added to the state of the LDPC whose subject is the LDPC URI,
    // > whose predicate is ldp:contains and whose object is the URI for the newly created document
    return container !== null ? getIriAll(container, ldp.contains) : [];
}
/**
 * Gets a human-readable representation of the given SolidDataset to aid debugging.
 *
 * Note that changes to the exact format of the return value are not considered a breaking change;
 * it is intended to aid in debugging, not as a serialisation method that can be reliably parsed.
 *
 * @param solidDataset The [[SolidDataset]] to get a human-readable representation of.
 * @since 0.3.0
 */
function solidDatasetAsMarkdown(solidDataset) {
    let readableSolidDataset = "";
    if (hasResourceInfo(solidDataset)) {
        readableSolidDataset += `# SolidDataset: ${getSourceUrl(solidDataset)}\n`;
    }
    else {
        readableSolidDataset += `# SolidDataset (no URL yet)\n`;
    }
    const things = getThingAll(solidDataset);
    if (things.length === 0) {
        readableSolidDataset += "\n<empty>\n";
    }
    else {
        things.forEach((thing) => {
            readableSolidDataset += "\n" + thingAsMarkdown(thing);
            if (hasChangelog(solidDataset)) {
                readableSolidDataset +=
                    "\n" + getReadableChangeLogSummary(solidDataset, thing) + "\n";
            }
        });
    }
    return readableSolidDataset;
}
/**
 * Gets a human-readable representation of the local changes to a Resource to aid debugging.
 *
 * Note that changes to the exact format of the return value are not considered a breaking change;
 * it is intended to aid in debugging, not as a serialisation method that can be reliably parsed.
 *
 * @param solidDataset The Resource of which to get a human-readable representation of the changes applied to it locally.
 * @since 0.3.0
 */
function changeLogAsMarkdown(solidDataset) {
    if (!hasResourceInfo(solidDataset)) {
        return "This is a newly initialized SolidDataset, so there is no source to compare it to.";
    }
    if (!hasChangelog(solidDataset) ||
        (solidDataset.internal_changeLog.additions.length === 0 &&
            solidDataset.internal_changeLog.deletions.length === 0)) {
        return (`## Changes compared to ${getSourceUrl(solidDataset)}\n\n` +
            `This SolidDataset has not been modified since it was fetched from ${getSourceUrl(solidDataset)}.\n`);
    }
    let readableChangeLog = `## Changes compared to ${getSourceUrl(solidDataset)}\n`;
    const changeLogsByThingAndProperty = sortChangeLogByThingAndProperty(solidDataset);
    Object.keys(changeLogsByThingAndProperty).forEach((thingUrl) => {
        readableChangeLog += `\n### Thing: ${thingUrl}\n`;
        const changeLogByProperty = changeLogsByThingAndProperty[thingUrl];
        Object.keys(changeLogByProperty).forEach((propertyUrl) => {
            readableChangeLog += `\nProperty: ${propertyUrl}\n`;
            const deleted = changeLogByProperty[propertyUrl].deleted;
            const added = changeLogByProperty[propertyUrl].added;
            if (deleted.length > 0) {
                readableChangeLog += "- Removed:\n";
                deleted.forEach((deletedValue) => (readableChangeLog += `  - ${internal_getReadableValue(deletedValue)}\n`));
            }
            if (added.length > 0) {
                readableChangeLog += "- Added:\n";
                added.forEach((addedValue) => (readableChangeLog += `  - ${internal_getReadableValue(addedValue)}\n`));
            }
        });
    });
    return readableChangeLog;
}
function sortChangeLogByThingAndProperty(solidDataset) {
    const changeLogsByThingAndProperty = {};
    solidDataset.internal_changeLog.deletions.forEach((deletion) => {
        var _a, _b;
        var _c;
        const subjectNode = isLocalNode(deletion.subject)
            ? /* istanbul ignore next: Unsaved deletions should be removed from the additions list instead, so this code path shouldn't be hit: */
                resolveIriForLocalNode(deletion.subject, getSourceUrl(solidDataset))
            : deletion.subject;
        if (!isNamedNode(subjectNode) || !isNamedNode(deletion.predicate)) {
            return;
        }
        const thingUrl = internal_toIriString(subjectNode);
        const propertyUrl = internal_toIriString(deletion.predicate);
        (_a = changeLogsByThingAndProperty[thingUrl]) !== null && _a !== void 0 ? _a : (changeLogsByThingAndProperty[thingUrl] = {});
        (_b = (_c = changeLogsByThingAndProperty[thingUrl])[propertyUrl]) !== null && _b !== void 0 ? _b : (_c[propertyUrl] = {
            added: [],
            deleted: [],
        });
        changeLogsByThingAndProperty[thingUrl][propertyUrl].deleted.push(deletion.object);
    });
    solidDataset.internal_changeLog.additions.forEach((addition) => {
        var _a, _b;
        var _c;
        const subjectNode = isLocalNode(addition.subject)
            ? /* istanbul ignore next: setThing already resolves local Subjects when adding them, so this code path should never be hit. */
                resolveIriForLocalNode(addition.subject, getSourceUrl(solidDataset))
            : addition.subject;
        if (!isNamedNode(subjectNode) || !isNamedNode(addition.predicate)) {
            return;
        }
        const thingUrl = internal_toIriString(subjectNode);
        const propertyUrl = internal_toIriString(addition.predicate);
        (_a = changeLogsByThingAndProperty[thingUrl]) !== null && _a !== void 0 ? _a : (changeLogsByThingAndProperty[thingUrl] = {});
        (_b = (_c = changeLogsByThingAndProperty[thingUrl])[propertyUrl]) !== null && _b !== void 0 ? _b : (_c[propertyUrl] = {
            added: [],
            deleted: [],
        });
        changeLogsByThingAndProperty[thingUrl][propertyUrl].added.push(addition.object);
    });
    return changeLogsByThingAndProperty;
}
function getReadableChangeLogSummary(solidDataset, thing) {
    const subject = DataFactory.namedNode(thing.url);
    const nrOfAdditions = solidDataset.internal_changeLog.additions.reduce((count, addition) => (addition.subject.equals(subject) ? count + 1 : count), 0);
    const nrOfDeletions = solidDataset.internal_changeLog.deletions.reduce((count, deletion) => (deletion.subject.equals(subject) ? count + 1 : count), 0);
    const additionString = nrOfAdditions === 1
        ? "1 new value added"
        : nrOfAdditions + " new values added";
    const deletionString = nrOfDeletions === 1 ? "1 value removed" : nrOfDeletions + " values removed";
    return `(${additionString} / ${deletionString})`;
}
function getNamedNodesForLocalNodes(quad) {
    const subject = isNamedNode(quad.subject)
        ? getNamedNodeFromLocalNode(quad.subject)
        : /* istanbul ignore next: We don't allow non-NamedNodes as the Subject, so this code path should never be hit: */
            quad.subject;
    const object = isNamedNode(quad.object)
        ? getNamedNodeFromLocalNode(quad.object)
        : quad.object;
    return DataFactory.quad(subject, quad.predicate, object, quad.graph);
}
function getNamedNodeFromLocalNode(node) {
    if (isLocalNodeIri(node.value)) {
        return DataFactory.namedNode("#" + getLocalNodeName(node.value));
    }
    return node;
}
function resolveLocalIrisInSolidDataset(solidDataset) {
    const resourceIri = getSourceUrl(solidDataset);
    const defaultGraph = solidDataset.graphs.default;
    const thingIris = Object.keys(defaultGraph);
    const updatedDefaultGraph = thingIris.reduce((graphAcc, thingIri) => {
        const resolvedThing = resolveLocalIrisInThing(graphAcc[thingIri], resourceIri);
        const resolvedThingIri = isLocalNodeIri(thingIri)
            ? `${resourceIri}#${getLocalNodeName(thingIri)}`
            : thingIri;
        const updatedGraph = Object.assign({}, graphAcc);
        delete updatedGraph[thingIri];
        updatedGraph[resolvedThingIri] = resolvedThing;
        return freeze(updatedGraph);
    }, defaultGraph);
    const updatedGraphs = freeze(Object.assign(Object.assign({}, solidDataset.graphs), { default: updatedDefaultGraph }));
    return freeze(Object.assign(Object.assign({}, solidDataset), { graphs: updatedGraphs }));
}
function resolveLocalIrisInThing(thing, baseIri) {
    const predicateIris = Object.keys(thing.predicates);
    const updatedPredicates = predicateIris.reduce((predicatesAcc, predicateIri) => {
        var _a;
        const namedNodes = (_a = predicatesAcc[predicateIri].namedNodes) !== null && _a !== void 0 ? _a : [];
        if (namedNodes.every((namedNode) => !isLocalNodeIri(namedNode))) {
            // This Predicate has no local node Objects, so return it unmodified:
            return predicatesAcc;
        }
        const updatedNamedNodes = freeze(namedNodes.map((namedNode) => isLocalNodeIri(namedNode)
            ? `${baseIri}#${getLocalNodeName(namedNode)}`
            : namedNode));
        const updatedPredicate = freeze(Object.assign(Object.assign({}, predicatesAcc[predicateIri]), { namedNodes: updatedNamedNodes }));
        return freeze(Object.assign(Object.assign({}, predicatesAcc), { [predicateIri]: updatedPredicate }));
    }, thing.predicates);
    return freeze(Object.assign(Object.assign({}, thing), { predicates: updatedPredicates, url: isLocalNodeIri(thing.url)
            ? `${baseIri}#${getLocalNodeName(thing.url)}`
            : thing.url }));
}
/**
 * Fetch the contents of '.well-known/solid' for a given resource URL.
 *
 * The contents of the '.well-known/solid' endpoint define the capabilities of the server, and provide their associated endpoints/locations.
 * This behaves similarly to the use of '.well-known' endpoints in e.g. (OIDC servers)[https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig]
 *
 * @param url URL of a Resource.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns Promise resolving to a [[SolidDataset]] containing the data at '.well-known/solid' for the given Resource, or rejecting if fetching it failed.
 * @since 1.12.0
 */
async function getWellKnownSolid(url, options = internal_defaultFetchOptions) {
    const urlString = internal_toIriString(url);
    const resourceMetadata = await getResourceInfo(urlString, options);
    const linkedResources = getLinkedResourceUrlAll(resourceMetadata);
    const rootResources = linkedResources[pim.storage];
    const rootResource = (rootResources === null || rootResources === void 0 ? void 0 : rootResources.length) === 1 ? rootResources[0] : null;
    if (rootResource === null) {
        throw new SolidClientError(`Unable to determine root resource for Resource at [${url}].`);
    }
    const wellKnownSolidUrl = new URL(".well-known/solid", rootResource).href;
    return getSolidDataset(wellKnownSolidUrl, Object.assign(Object.assign({}, options), { parsers: {
            "application/ld+json": getJsonLdParser(),
        } }));
}

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
const { Response } = crossFetch;
/**
 * ```{warning}
 * Do not use this function in production code. For use in **unit tests**.
 * ```
 *
 * This function initialises a new [[SolidDataset]] with metadata as though the
 * SolidDataset has been retrieved from the given URL. The mock SolidDataset can be used in
 * unit tests that require persisted SolidDatasets; e.g., unit tests that call [[getSourceUrl]].
 *
 * @param url The URL from which the returned SolidDataset appears to be retrieved.
 * @returns A mock SolidDataset that appears to be retrieved from the `url`.
 * @since 0.2.0
 */
function mockSolidDatasetFrom(url) {
    const solidDataset = createSolidDataset();
    const solidDatasetWithResourceInfo = Object.assign(Object.assign({}, solidDataset), { internal_resourceInfo: {
            sourceIri: internal_toIriString(url),
            isRawData: false,
            contentType: "text/turtle",
            linkedResources: {},
        } });
    return solidDatasetWithResourceInfo;
}
/**
 * ```{warning}
 * Do not use this function in production code. For use in **unit tests**.
 * ```
 *
 * This function initialises a new Container [[SolidDataset]] with metadata as though the
 * Container has been retrieved from the given URL. The mock SolidDataset can be used in
 * unit tests that require persisted Containers; e.g., unit tests that call [[isContainer]].
 *
 * @param url The URL from which the returned Container appears to be retrieved. The `url` must end in a slash.
 * @returns A mock SolidDataset that appears to be retrieved from the `url`.
 * @since 0.2.0
 */
function mockContainerFrom(url) {
    const sourceIri = internal_toIriString(url);
    if (!sourceIri.endsWith("/")) {
        throw new Error("A Container's URL should end in a slash. Please update your tests.");
    }
    return mockSolidDatasetFrom(sourceIri);
}
/**
 * ```{warning}
 * Do not use this function in production code. For use in **unit tests**.
 * ```
 *
 * This function initialises a new File with metadata as though the
 * File has been retrieved from the given URL. The mock File can be used in
 * unit tests that require persisted Files; e.g. unit tests that call [[getSourceUrl]].
 *
 * @param url The URL from which the returned File appears to be retrieved.
 * @returns A mock File that appears to be retrieved from the `url`.
 * @since 0.2.0
 */
function mockFileFrom(url, options) {
    const file = new Blob();
    const fileWithResourceInfo = Object.assign(file, {
        internal_resourceInfo: {
            sourceIri: internal_toIriString(url),
            isRawData: true,
            contentType: options === null || options === void 0 ? void 0 : options.contentType,
            linkedResources: {},
        },
    });
    return fileWithResourceInfo;
}
/**
 * ```{warning}
 * Do not use this function in production code. For use in **unit tests**.
 * ```
 *
 * This function initialises a new Error object with metadata as though the
 * it was the result of getting a 404 when trying to fetch the Resource at the
 * given URL. The mock Error can be used in unit tests that require functions
 * that fetch Resources (like [[getSolidDataset]]) to fail.
 *
 * @param url The URL of the Resource that could not be fetched according to the error.
 * @param statusCode Optional status code (defaults to 404) that caused the error.
 * @returns A mock Error that represents not having been able to fetch the Resource at `url` due to a 404 Response.
 * @since 1.1.0
 */
function mockFetchError(fetchedUrl, statusCode = 404) {
    const failedResponse = new Response(undefined, {
        status: statusCode,
    });
    return new FetchError(`Fetching the Resource at [${fetchedUrl}] failed: [${failedResponse.status}] [${failedResponse.statusText}].`, failedResponse);
}

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
 * Create a new Thing with a URL added for a Property.
 *
 * This preserves existing values for the given Property. To replace them, see [[setUrl]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to add a URL value to.
 * @param property Property for which to add the given URL value.
 * @param url URL to add to `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value added for the given Property.
 */
const addUrl = (thing, property, url) => {
    var _a, _b;
    internal_throwIfNotThing(thing);
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    if (!isThing(url) && !internal_isValidUrl(url)) {
        throw new ValidValueUrlExpectedError(url);
    }
    const predicateIri = internal_toIriString(property);
    const existingPredicate = (_a = thing.predicates[predicateIri]) !== null && _a !== void 0 ? _a : {};
    const existingNamedNodes = (_b = existingPredicate.namedNodes) !== null && _b !== void 0 ? _b : [];
    let iriToAdd;
    if (isNamedNode(url)) {
        iriToAdd = url.value;
    }
    else if (typeof url === "string") {
        iriToAdd = url;
    }
    else if (isThingLocal(url)) {
        iriToAdd = url.url;
    }
    else {
        iriToAdd = asIri(url);
    }
    const updatedNamedNodes = freeze(existingNamedNodes.concat(internal_toIriString(iriToAdd)));
    const updatedPredicate = freeze(Object.assign(Object.assign({}, existingPredicate), { namedNodes: updatedNamedNodes }));
    const updatedPredicates = freeze(Object.assign(Object.assign({}, thing.predicates), { [predicateIri]: updatedPredicate }));
    const updatedThing = freeze(Object.assign(Object.assign({}, thing), { predicates: updatedPredicates }));
    return updatedThing;
};
/** @hidden Alias for [[addUrl]] for those who prefer IRI terminology. */
const addIri = addUrl;
/**
 * Create a new Thing with a boolean added for a Property.
 *
 * This preserves existing values for the given Property. To replace them, see [[setBoolean]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to add a boolean value to.
 * @param property Property for which to add the given boolean value.
 * @param value Boolean to add to `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value added for the given Property.
 */
const addBoolean = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return addLiteralOfType(thing, property, serializeBoolean(value), xmlSchemaTypes.boolean);
};
/**
 * Create a new Thing with a datetime added for a Property.
 *
 * This preserves existing values for the given Property. To replace them, see [[setDatetime]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to add a datetime value to.
 * @param property Property for which to add the given datetime value.
 * @param value Datetime to add to `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value added for the given Property.
 */
const addDatetime = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return addLiteralOfType(thing, property, serializeDatetime(value), xmlSchemaTypes.dateTime);
};
/**
 * Create a new Thing with a date added for a Property.
 *
 * This preserves existing values for the given Property. To replace them, see [[setDate]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to add a date value to.
 * @param property Property for which to add the given date value.
 * @param value Date to add to `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value added for the given Property.
 * @since 1.10.0
 */
const addDate = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return addLiteralOfType(thing, property, serializeDate(value), xmlSchemaTypes.date);
};
/**
 * Create a new Thing with a time added for a Property.
 *
 * This preserves existing values for the given Property. To replace them, see [[setDatetime]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to add a datetime value to.
 * @param property Property for which to add the given datetime value.
 * @param value time to add to `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value added for the given Property.
 * @since 1.10.0
 */
const addTime = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return addLiteralOfType(thing, property, serializeTime(value), xmlSchemaTypes.time);
};
/**
 * Create a new Thing with a decimal added for a Property.
 *
 * This preserves existing values for the given Property. To replace them, see [[setDecimal]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to add a decimal value to.
 * @param property Property for which to add the given decimal value.
 * @param value Decimal to add to `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value added for the given Property.
 */
const addDecimal = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return addLiteralOfType(thing, property, serializeDecimal(value), xmlSchemaTypes.decimal);
};
/**
 * Create a new Thing with an integer added for a Property.
 *
 * This preserves existing values for the given Property. To replace them, see [[setInteger]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to add an integer value to.
 * @param property Property for which to add the given integer value.
 * @param value Integer to add to `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value added for the given Property.
 */
const addInteger = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return addLiteralOfType(thing, property, serializeInteger(value), xmlSchemaTypes.integer);
};
/**
 * Create a new Thing with an English string added for a Property.
 *
 * This preserves existing values for the given Property. To replace them, see [[setStringEnglish]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to add a localised string value to.
 * @param property Property for which to add the given string value.
 * @param value String to add to `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value added for the given Property.
 * @since 1.13.0
 */
function addStringEnglish(thing, property, value) {
    return addStringWithLocale(thing, property, value, "en");
}
/**
 * Create a new Thing with a localised string added for a Property.
 *
 * This preserves existing values for the given Property. To replace them, see [[setStringWithLocale]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to add a localised string value to.
 * @param property Property for which to add the given string value.
 * @param value String to add to `thing` for the given `property`.
 * @param locale Locale of the added string.
 * @returns A new Thing equal to the input Thing with the given value added for the given Property.
 */
function addStringWithLocale(thing, property, value, locale) {
    var _a, _b, _c;
    internal_throwIfNotThing(thing);
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    const predicateIri = internal_toIriString(property);
    const normalizedLocale = normalizeLocale(locale);
    const existingPredicate = (_a = thing.predicates[predicateIri]) !== null && _a !== void 0 ? _a : {};
    const existingLangStrings = (_b = existingPredicate.langStrings) !== null && _b !== void 0 ? _b : {};
    const existingStringsInLocale = (_c = existingLangStrings[normalizedLocale]) !== null && _c !== void 0 ? _c : [];
    const updatedStringsInLocale = freeze(existingStringsInLocale.concat(value));
    const updatedLangStrings = freeze(Object.assign(Object.assign({}, existingLangStrings), { [normalizedLocale]: updatedStringsInLocale }));
    const updatedPredicate = freeze(Object.assign(Object.assign({}, existingPredicate), { langStrings: updatedLangStrings }));
    const updatedPredicates = freeze(Object.assign(Object.assign({}, thing.predicates), { [predicateIri]: updatedPredicate }));
    const updatedThing = freeze(Object.assign(Object.assign({}, thing), { predicates: updatedPredicates }));
    return updatedThing;
}
/**
 * Create a new Thing with an unlocalised string added for a Property.
 *
 * This preserves existing values for the given Property. To replace them, see [[setStringNoLocale]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to add an unlocalised string value to.
 * @param property Property for which to add the given string value.
 * @param value String to add to `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value added for the given Property.
 */
const addStringNoLocale = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return addLiteralOfType(thing, property, value, xmlSchemaTypes.string);
};
/**
 * Create a new Thing with a Named Node added for a Property.
 *
 * This preserves existing values for the given Property. To replace them, see [[setNamedNode]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @ignore This should not be needed due to the other add*() functions. If you do find yourself needing it, please file a feature request for your use case.
 * @param thing The [[Thing]] to add a Named Node to.
 * @param property Property for which to add a value.
 * @param value The Named Node to add.
 * @returns A new Thing equal to the input Thing with the given value added for the given Property.
 */
function addNamedNode(thing, property, value) {
    return addUrl(thing, property, value.value);
}
/**
 * Create a new Thing with a Literal added for a Property.
 *
 * This preserves existing values for the given Property. To replace them, see [[setLiteral]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @ignore This should not be needed due to the other add*() functions. If you do find yourself needing it, please file a feature request for your use case.
 * @param thing The [[Thing]] to add a Literal to.
 * @param property Property for which to add a value.
 * @param value The Literal to add.
 * @returns A new Thing equal to the input Thing with the given value added for the given Property.
 */
function addLiteral(thing, property, value) {
    internal_throwIfNotThing(thing);
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    const typeIri = value.datatype.value;
    if (typeIri === xmlSchemaTypes.langString) {
        return addStringWithLocale(thing, property, value.value, value.language);
    }
    return addLiteralOfType(thing, property, value.value, value.datatype.value);
}
/**
 * Creates a new Thing with a Term added for a Property.
 *
 * This preserves existing values for the given Property. To replace them, see [[setTerm]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @ignore This should not be needed due to the other add*() functions. If you do find yourself needing it, please file a feature request for your use case.
 * @param thing The [[Thing]] to add a Term to.
 * @param property Property for which to add a value.
 * @param value The Term to add.
 * @returns A new Thing equal to the input Thing with the given value added for the given Property.
 * @since 0.3.0
 */
function addTerm(thing, property, value) {
    var _a, _b;
    if (value.termType === "NamedNode") {
        return addNamedNode(thing, property, value);
    }
    if (value.termType === "Literal") {
        return addLiteral(thing, property, value);
    }
    if (value.termType === "BlankNode") {
        internal_throwIfNotThing(thing);
        if (!internal_isValidUrl(property)) {
            throw new ValidPropertyUrlExpectedError(property);
        }
        const predicateIri = internal_toIriString(property);
        const existingPredicate = (_a = thing.predicates[predicateIri]) !== null && _a !== void 0 ? _a : {};
        const existingBlankNodes = (_b = existingPredicate.blankNodes) !== null && _b !== void 0 ? _b : [];
        const updatedBlankNodes = freeze(existingBlankNodes.concat(getBlankNodeId(value)));
        const updatedPredicate = freeze(Object.assign(Object.assign({}, existingPredicate), { blankNodes: updatedBlankNodes }));
        const updatedPredicates = freeze(Object.assign(Object.assign({}, thing.predicates), { [predicateIri]: updatedPredicate }));
        const updatedThing = freeze(Object.assign(Object.assign({}, thing), { predicates: updatedPredicates }));
        return updatedThing;
    }
    throw new Error(`Term type [${value.termType}] is not supported by @inrupt/solid-client.`);
}
function addLiteralOfType(thing, property, value, type) {
    var _a, _b, _c;
    internal_throwIfNotThing(thing);
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    const predicateIri = internal_toIriString(property);
    const existingPredicate = (_a = thing.predicates[predicateIri]) !== null && _a !== void 0 ? _a : {};
    const existingLiterals = (_b = existingPredicate.literals) !== null && _b !== void 0 ? _b : {};
    const existingValuesOfType = (_c = existingLiterals[type]) !== null && _c !== void 0 ? _c : [];
    const updatedValuesOfType = freeze(existingValuesOfType.concat(value));
    const updatedLiterals = freeze(Object.assign(Object.assign({}, existingLiterals), { [type]: updatedValuesOfType }));
    const updatedPredicate = freeze(Object.assign(Object.assign({}, existingPredicate), { literals: updatedLiterals }));
    const updatedPredicates = freeze(Object.assign(Object.assign({}, thing.predicates), { [predicateIri]: updatedPredicate }));
    const updatedThing = freeze(Object.assign(Object.assign({}, thing), { predicates: updatedPredicates }));
    return updatedThing;
}

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
function removeAll(thing, property) {
    internal_throwIfNotThing(thing);
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    const predicateIri = internal_toIriString(property);
    const newPredicates = Object.assign({}, thing.predicates);
    delete newPredicates[predicateIri];
    return freeze(Object.assign(Object.assign({}, thing), { predicates: freeze(newPredicates) }));
}
/**
 * Create a new Thing with the given URL removed for the given Property.
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to remove a URL value from.
 * @param property Property for which to remove the given URL value.
 * @param value URL to remove from `thing` for the given `Property`.
 * @returns A new Thing equal to the input Thing with the given value removed for the given Property.
 */
const removeUrl = (thing, property, value) => {
    var _a, _b, _c;
    internal_throwIfNotThing(thing);
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    const predicateIri = internal_toIriString(property);
    if (!isThing(value) && !internal_isValidUrl(value)) {
        throw new ValidValueUrlExpectedError(value);
    }
    const iriToRemove = isNamedNode(value)
        ? value.value
        : typeof value === "string"
            ? value
            : asIri(value);
    const updatedNamedNodes = freeze((_c = (_b = (_a = thing.predicates[predicateIri]) === null || _a === void 0 ? void 0 : _a.namedNodes) === null || _b === void 0 ? void 0 : _b.filter((namedNode) => namedNode.toLowerCase() !== iriToRemove.toLowerCase())) !== null && _c !== void 0 ? _c : []);
    const updatedPredicate = freeze(Object.assign(Object.assign({}, thing.predicates[predicateIri]), { namedNodes: updatedNamedNodes }));
    const updatedPredicates = freeze(Object.assign(Object.assign({}, thing.predicates), { [predicateIri]: updatedPredicate }));
    return freeze(Object.assign(Object.assign({}, thing), { predicates: updatedPredicates }));
};
/** @hidden Alias of [[removeUrl]] for those who prefer IRI terminology. */
const removeIri = removeUrl;
/**
 * Create a new Thing with the given boolean removed for the given Property.
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to remove a boolean value from.
 * @param property Property for which to remove the given boolean value.
 * @param value Boolean to remove from `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value removed for the given Property.
 */
const removeBoolean = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return removeLiteralMatching(thing, property, xmlSchemaTypes.boolean, (foundBoolean) => deserializeBoolean(foundBoolean) === value);
};
/**
 * Create a new Thing with the given datetime removed for the given Property.
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to remove a datetime value from.
 * @param property Property for which to remove the given datetime value.
 * @param value Datetime to remove from `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value removed for the given Property.
 */
const removeDatetime = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return removeLiteralMatching(thing, property, xmlSchemaTypes.dateTime, (foundDatetime) => { var _a; return ((_a = deserializeDatetime(foundDatetime)) === null || _a === void 0 ? void 0 : _a.getTime()) === value.getTime(); });
};
/**
 * Create a new Thing with the given date removed for the given Property.
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to remove a date value from.
 * @param property Property for which to remove the given date value.
 * @param value Date to remove from `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value removed for the given Property.
 * @since 1.10.0
 */
const removeDate = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return removeLiteralMatching(thing, property, xmlSchemaTypes.date, function (foundDate) {
        const deserializedDate = deserializeDate(foundDate);
        if (deserializedDate) {
            return (deserializedDate.getFullYear() === value.getFullYear() &&
                deserializedDate.getMonth() === value.getMonth() &&
                deserializedDate.getDate() === value.getDate());
        }
        else {
            return false;
        }
    });
};
/**
 * Create a new Thing with the given datetime removed for the given Property.
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to remove a datetime value from.
 * @param property Property for which to remove the given datetime value.
 * @param value Time to remove from `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value removed for the given Property.
 * @since 1.10.0
 */
const removeTime = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return removeLiteralMatching(thing, property, xmlSchemaTypes.time, function (foundTime) {
        const deserializedTime = deserializeTime(foundTime);
        if (deserializedTime) {
            return (deserializedTime.hour === value.hour &&
                deserializedTime.minute === value.minute &&
                deserializedTime.second === value.second &&
                deserializedTime.millisecond === value.millisecond &&
                deserializedTime.timezoneHourOffset === value.timezoneHourOffset &&
                deserializedTime.timezoneMinuteOffset === value.timezoneMinuteOffset);
        }
        else {
            return false;
        }
    });
};
/**
 * Create a new Thing with the given decimal removed for the given Property.
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to remove a decimal value from.
 * @param property Property for which to remove the given decimal value.
 * @param value Decimal to remove from `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value removed for the given Property.
 */
const removeDecimal = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return removeLiteralMatching(thing, property, xmlSchemaTypes.decimal, (foundDecimal) => deserializeDecimal(foundDecimal) === value);
};
/**
 * Create a new Thing with the given integer removed for the given Property.
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to remove an integer value from.
 * @param property Property for which to remove the given integer value.
 * @param value Integer to remove from `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value removed for the given Property.
 */
const removeInteger = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return removeLiteralMatching(thing, property, xmlSchemaTypes.integer, (foundInteger) => deserializeInteger(foundInteger) === value);
};
/**
 * Create a new Thing with the given English string removed for the given Property.
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to remove a localised string value from.
 * @param property Property for which to remove the given localised string value.
 * @param value String to remove from `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value removed for the given Property.
 * @since 1.13.0
 */
function removeStringEnglish(thing, property, value) {
    return removeStringWithLocale(thing, property, value, "en");
}
/**
 * Create a new Thing with the given localised string removed for the given Property.
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to remove a localised string value from.
 * @param property Property for which to remove the given localised string value.
 * @param value String to remove from `thing` for the given `property`.
 * @param locale Locale of the string to remove.
 * @returns A new Thing equal to the input Thing with the given value removed for the given Property.
 */
function removeStringWithLocale(thing, property, value, locale) {
    var _a, _b;
    internal_throwIfNotThing(thing);
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    const predicateIri = internal_toIriString(property);
    const existingLangStrings = (_b = (_a = thing.predicates[predicateIri]) === null || _a === void 0 ? void 0 : _a.langStrings) !== null && _b !== void 0 ? _b : {};
    const matchingLocale = Object.keys(existingLangStrings).find((existingLocale) => normalizeLocale(existingLocale) === normalizeLocale(locale) &&
        Array.isArray(existingLangStrings[existingLocale]) &&
        existingLangStrings[existingLocale].length > 0);
    if (typeof matchingLocale !== "string") {
        // Nothing to remove.
        return thing;
    }
    const existingStringsInLocale = existingLangStrings[matchingLocale];
    const updatedStringsInLocale = freeze(existingStringsInLocale.filter((existingString) => existingString !== value));
    const updatedLangStrings = freeze(Object.assign(Object.assign({}, existingLangStrings), { [matchingLocale]: updatedStringsInLocale }));
    const updatedPredicate = freeze(Object.assign(Object.assign({}, thing.predicates[predicateIri]), { langStrings: updatedLangStrings }));
    const updatedPredicates = freeze(Object.assign(Object.assign({}, thing.predicates), { [predicateIri]: updatedPredicate }));
    return freeze(Object.assign(Object.assign({}, thing), { predicates: updatedPredicates }));
}
/**
 * Create a new Thing with the given unlocalised string removed for the given Property.
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to remove an unlocalised string value from.
 * @param property Property for which to remove the given string value.
 * @param value String to remove from `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value removed for the given Property.
 */
const removeStringNoLocale = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return removeLiteralMatching(thing, property, xmlSchemaTypes.string, (foundString) => foundString === value);
};
/**
 * @ignore This should not be needed due to the other remove*() functions. If you do find yourself needing it, please file a feature request for your use case.
 * @param thing Thing to remove a NamedNode value from.
 * @param property Property for which to remove the given NamedNode value.
 * @param value NamedNode to remove from `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value removed for the given Property.
 */
function removeNamedNode(thing, property, value) {
    return removeUrl(thing, property, value.value);
}
/**
 * @ignore This should not be needed due to the other remove*() functions. If you do find yourself needing it, please file a feature request for your use case.
 * @param thing Thing to remove a Literal value from.
 * @param property Property for which to remove the given Literal value.
 * @param value Literal to remove from `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with the given value removed for the given Property.
 */
function removeLiteral(thing, property, value) {
    var _a, _b, _c;
    internal_throwIfNotThing(thing);
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    const typeIri = value.datatype.value;
    if (typeIri === xmlSchemaTypes.langString) {
        return removeStringWithLocale(thing, property, value.value, value.language);
    }
    const predicateIri = internal_toIriString(property);
    const existingPredicateValues = (_a = thing.predicates[predicateIri]) !== null && _a !== void 0 ? _a : {};
    const existingLiterals = (_b = existingPredicateValues.literals) !== null && _b !== void 0 ? _b : {};
    const existingValuesOfType = (_c = existingLiterals[typeIri]) !== null && _c !== void 0 ? _c : [];
    const updatedValues = freeze(existingValuesOfType.filter((existingValue) => existingValue !== value.value));
    const updatedLiterals = freeze(Object.assign(Object.assign({}, existingLiterals), { [typeIri]: updatedValues }));
    const updatedPredicate = freeze(Object.assign(Object.assign({}, existingPredicateValues), { literals: updatedLiterals }));
    const updatedPredicates = freeze(Object.assign(Object.assign({}, thing.predicates), { [predicateIri]: updatedPredicate }));
    const updatedThing = freeze(Object.assign(Object.assign({}, thing), { predicates: updatedPredicates }));
    return updatedThing;
}
/**
 * @param thing Thing to remove a Literal value from.
 * @param property Property for which to remove the given Literal value.
 * @param type Data type that the Literal should be stored as.
 * @param matcher Function that returns true if the given value is an equivalent serialisation of the value to remove. For example, when removing a `false` boolean, the matcher should return true for both "0" and "false".
 */
function removeLiteralMatching(thing, property, type, matcher) {
    var _a, _b, _c;
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    const predicateIri = internal_toIriString(property);
    const existingPredicateValues = (_a = thing.predicates[predicateIri]) !== null && _a !== void 0 ? _a : {};
    const existingLiterals = (_b = existingPredicateValues.literals) !== null && _b !== void 0 ? _b : {};
    const existingValuesOfType = (_c = existingLiterals[type]) !== null && _c !== void 0 ? _c : [];
    const updatedValues = freeze(existingValuesOfType.filter((existingValue) => !matcher(existingValue)));
    const updatedLiterals = freeze(Object.assign(Object.assign({}, existingLiterals), { [type]: updatedValues }));
    const updatedPredicate = freeze(Object.assign(Object.assign({}, existingPredicateValues), { literals: updatedLiterals }));
    const updatedPredicates = freeze(Object.assign(Object.assign({}, thing.predicates), { [predicateIri]: updatedPredicate }));
    const updatedThing = freeze(Object.assign(Object.assign({}, thing), { predicates: updatedPredicates }));
    return updatedThing;
}

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
 * Create a new Thing with existing values replaced by the given URL for the given Property.
 *
 * To preserve existing values, see [[addUrl]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to set a URL value on.
 * @param property Property for which to set the given URL value.
 * @param url URL to set on `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with existing values replaced by the given value for the given Property.
 */
const setUrl = (thing, property, url) => {
    internal_throwIfNotThing(thing);
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    if (!isThing(url) && !internal_isValidUrl(url)) {
        throw new ValidValueUrlExpectedError(url);
    }
    return addUrl(removeAll(thing, property), property, url);
};
/** @hidden Alias of [[setUrl]] for those who prefer IRI terminology. */
const setIri = setUrl;
/**
 * Create a new Thing with existing values replaced by the given boolean for the given Property.
 *
 * To preserve existing values, see [[addBoolean]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to set a boolean value on.
 * @param property Property for which to set the given boolean value.
 * @param value Boolean to set on `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with existing values replaced by the given value for the given Property.
 */
const setBoolean = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return addBoolean(removeAll(thing, property), property, value);
};
/**
 * Create a new Thing with existing values replaced by the given datetime for the given Property.
 *
 * To preserve existing values, see [[addDatetime]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to set an datetime value on.
 * @param property Property for which to set the given datetime value.
 * @param value Datetime to set on `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with existing values replaced by the given value for the given Property.
 */
const setDatetime = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return addDatetime(removeAll(thing, property), property, value);
};
/**
 * Create a new Thing with existing values replaced by the given date for the given Property.
 *
 * To preserve existing values, see [[addDate]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to set an date value on.
 * @param property Property for which to set the given date value.
 * @param value Date to set on `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with existing values replaced by the given value for the given Property.
 * @since 1.10.0
 */
const setDate = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return addDate(removeAll(thing, property), property, value);
};
/**
 * Create a new Thing with existing values replaced by the given time for the given Property.
 *
 * To preserve existing values, see [[addTime]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to set an time value on.
 * @param property Property for which to set the given time value.
 * @param value time to set on `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with existing values replaced by the given value for the given Property.
 * @since 1.10.0
 */
const setTime = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return addTime(removeAll(thing, property), property, value);
};
/**
 * Create a new Thing with existing values replaced by the given decimal for the given Property.
 *
 * To preserve existing values, see [[addDecimal]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to set a decimal value on.
 * @param property Property for which to set the given decimal value.
 * @param value Decimal to set on `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with existing values replaced by the given value for the given Property.
 */
const setDecimal = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return addDecimal(removeAll(thing, property), property, value);
};
/**
 * Create a new Thing with existing values replaced by the given integer for the given Property.
 *
 * To preserve existing values, see [[addInteger]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to set an integer value on.
 * @param property Property for which to set the given integer value.
 * @param value Integer to set on `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with existing values replaced by the given value for the given Property.
 */
const setInteger = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return addInteger(removeAll(thing, property), property, value);
};
/**
 * Create a new Thing with existing values replaced by the given localised string for the given Property.
 *
 * To preserve existing values, see [[addStringWithLocale]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to set a localised string value on.
 * @param property Property for which to set the given localised string value.
 * @param value Localised string to set on `thing` for the given `property`.
 * @param locale Locale of the added string.
 * @returns A new Thing equal to the input Thing with existing values replaced by the given value for the given Property.
 */
function setStringWithLocale(thing, property, value, locale) {
    internal_throwIfNotThing(thing);
    return addStringWithLocale(removeAll(thing, property), property, value, locale);
}
/**
 * Create a new Thing with existing values replaced by the given unlocalised string for the given Property.
 *
 * To preserve existing values, see [[addStringNoLocale]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @param thing Thing to set an unlocalised string value on.
 * @param property Property for which to set the given unlocalised string value.
 * @param value Unlocalised string to set on `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with existing values replaced by the given value for the given Property.
 */
const setStringNoLocale = (thing, property, value) => {
    internal_throwIfNotThing(thing);
    return addStringNoLocale(removeAll(thing, property), property, value);
};
/**
 * Create a new Thing with existing values replaced by the given Named Node for the given Property.
 *
 * This replaces existing values for the given Property. To preserve them, see [[addNamedNode]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @ignore This should not be needed due to the other set*() functions. If you do find yourself needing it, please file a feature request for your use case.
 * @param thing The [[Thing]] to set a NamedNode on.
 * @param property Property for which to set the value.
 * @param value The NamedNode to set on `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with existing values replaced by the given value for the given Property.
 */
function setNamedNode(thing, property, value) {
    internal_throwIfNotThing(thing);
    return addNamedNode(removeAll(thing, property), property, value);
}
/**
 * Create a new Thing with existing values replaced by the given Literal for the given Property.
 *
 * This replaces existing values for the given Property. To preserve them, see [[addLiteral]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @ignore This should not be needed due to the other set*() functions. If you do find yourself needing it, please file a feature request for your use case.
 * @param thing The [[Thing]] to set a Literal on.
 * @param property Property for which to set the value.
 * @param value The Literal to set on `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with existing values replaced by the given value for the given Property.
 */
function setLiteral(thing, property, value) {
    internal_throwIfNotThing(thing);
    return addLiteral(removeAll(thing, property), property, value);
}
/**
 * Creates a new Thing with existing values replaced by the given Term for the given Property.
 *
 * This replaces existing values for the given Property. To preserve them, see [[addTerm]].
 *
 * The original `thing` is not modified; this function returns a cloned Thing with updated values.
 *
 * @ignore This should not be needed due to the other set*() functions. If you do find yourself needing it, please file a feature request for your use case.
 * @param thing The [[Thing]] to set a Term on.
 * @param property Property for which to set the value.
 * @param value The raw RDF/JS value to set on `thing` for the given `property`.
 * @returns A new Thing equal to the input Thing with existing values replaced by the given value for the given Property.
 * @since 0.3.0
 */
function setTerm(thing, property, value) {
    internal_throwIfNotThing(thing);
    if (!internal_isValidUrl(property)) {
        throw new ValidPropertyUrlExpectedError(property);
    }
    return addTerm(removeAll(thing, property), property, value);
}

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
 * Create or modify a [[Thing]], setting multiple properties in a single expresssion.
 *
 * For example, you can create a new Thing and initialise several properties as follows:
 *
 *     const me = buildThing()
 *       .addUrl(rdf.type, schema.Person)
 *       .addStringNoLocale(schema.givenName, "Vincent")
 *       .build();
 *
 * Take note of the final call to `.build()` to obtain the actual Thing.
 *
 * @param init Optionally pass an existing [[Thing]] to modify the properties of. If left empty, `buildThing` will initialise a new Thing.
 * @returns a [[ThingBuilder]], a Fluent API that allows you to set multiple properties in a single expression.
 * @since 1.9.0
 */
function buildThing(init = createThing()) {
    let thing = isThing(init) ? init : createThing(init);
    function getAdder(adder) {
        return (property, value) => {
            thing = adder(thing, property, value);
            return builder;
        };
    }
    function getSetter(setter) {
        return (property, value) => {
            thing = setter(thing, property, value);
            return builder;
        };
    }
    function getRemover(remover) {
        return (property, value) => {
            thing = remover(thing, property, value);
            return builder;
        };
    }
    const builder = {
        build: () => thing,
        addUrl: getAdder(addUrl),
        addIri: getAdder(addIri),
        addBoolean: getAdder(addBoolean),
        addDatetime: getAdder(addDatetime),
        addDate: getAdder(addDate),
        addTime: getAdder(addTime),
        addDecimal: getAdder(addDecimal),
        addInteger: getAdder(addInteger),
        addStringNoLocale: getAdder(addStringNoLocale),
        addStringEnglish: (property, value) => {
            thing = addStringWithLocale(thing, property, value, "en");
            return builder;
        },
        addStringWithLocale: (property, value, locale) => {
            thing = addStringWithLocale(thing, property, value, locale);
            return builder;
        },
        addNamedNode: getAdder(addNamedNode),
        addLiteral: getAdder(addLiteral),
        addTerm: getAdder(addTerm),
        setUrl: getSetter(setUrl),
        setIri: getSetter(setIri),
        setBoolean: getSetter(setBoolean),
        setDatetime: getSetter(setDatetime),
        setDate: getSetter(setDate),
        setTime: getSetter(setTime),
        setDecimal: getSetter(setDecimal),
        setInteger: getSetter(setInteger),
        setStringNoLocale: getSetter(setStringNoLocale),
        setStringEnglish: (property, value) => {
            thing = setStringWithLocale(thing, property, value, "en");
            return builder;
        },
        setStringWithLocale: (property, value, locale) => {
            thing = setStringWithLocale(thing, property, value, locale);
            return builder;
        },
        setNamedNode: getSetter(setNamedNode),
        setLiteral: getSetter(setLiteral),
        setTerm: getSetter(setTerm),
        removeAll: (property) => {
            thing = removeAll(thing, property);
            return builder;
        },
        removeUrl: getRemover(removeUrl),
        removeIri: getRemover(removeIri),
        removeBoolean: getRemover(removeBoolean),
        removeDatetime: getRemover(removeDatetime),
        removeDate: getRemover(removeDate),
        removeTime: getRemover(removeTime),
        removeDecimal: getRemover(removeDecimal),
        removeInteger: getRemover(removeInteger),
        removeStringNoLocale: getRemover(removeStringNoLocale),
        removeStringEnglish: (property, value) => buildThing(removeStringWithLocale(thing, property, value, "en")),
        removeStringWithLocale: (property, value, locale) => buildThing(removeStringWithLocale(thing, property, value, locale)),
        removeNamedNode: getRemover(removeNamedNode),
        removeLiteral: getRemover(removeLiteral),
    };
    return builder;
}

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
 * Function for use in unit tests to mock a [[Thing]] with a given URL.
 *
 * Warning: do not use this function in actual production code.
 * This function initialises a new empty Thing and sets its URL to a given URL.
 * This is useful to mock a Thing in tests of code that call e.g.
 * [[asUrl]].
 *
 * @param url The URL that the mocked Thing pretends identifies it.
 * @returns A new Thing, pretending to be identified by the given URL.
 * @since 0.2.0
 */
function mockThingFrom(url) {
    const iri = internal_toIriString(url);
    const thing = {
        type: "Subject",
        predicates: {},
        url: iri,
    };
    return thing;
}

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
 * @param linkedAccessResource A Resource exposed via the Link header of another Resource with rel="acl".
 * @returns Whether that Resource is an ACP ACR or not (in which case it's likely a WAC ACL).
 */
function isAcr(linkedAccessResource) {
    const relTypeLinks = getLinkedResourceUrlAll(linkedAccessResource)["type"];
    return (Array.isArray(relTypeLinks) &&
        relTypeLinks.includes(acp.AccessControlResource));
}

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
 * This (currently internal) function fetches the ACL indicated in the [[WithServerResourceInfo]]
 * attached to a resource.
 *
 * @internal
 * @param resourceInfo The Resource info with the ACL URL
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters).
 */
async function internal_fetchAcl(resourceInfo, options = internal_defaultFetchOptions) {
    if (!hasAccessibleAcl(resourceInfo)) {
        return {
            resourceAcl: null,
            fallbackAcl: null,
        };
    }
    try {
        const resourceAcl = await internal_fetchResourceAcl(resourceInfo, options);
        const acl = resourceAcl === null
            ? {
                resourceAcl: null,
                fallbackAcl: await internal_fetchFallbackAcl(resourceInfo, options),
            }
            : { resourceAcl: resourceAcl, fallbackAcl: null };
        return acl;
    }
    catch (e) {
        /* istanbul ignore else: fetchResourceAcl swallows all non-AclIsAcrErrors */
        if (e instanceof AclIsAcrError) {
            return {
                resourceAcl: null,
                fallbackAcl: null,
            };
        }
        /* istanbul ignore next: fetchResourceAcl swallows all non-AclIsAcrErrors */
        throw e;
    }
}
/** @internal */
async function internal_fetchResourceAcl(dataset, options = internal_defaultFetchOptions) {
    if (!hasAccessibleAcl(dataset)) {
        return null;
    }
    try {
        const aclSolidDataset = await getSolidDataset(dataset.internal_resourceInfo.aclUrl, options);
        if (isAcr(aclSolidDataset)) {
            throw new AclIsAcrError(dataset, aclSolidDataset);
        }
        return freeze(Object.assign(Object.assign({}, aclSolidDataset), { internal_accessTo: getSourceUrl(dataset) }));
    }
    catch (e) {
        if (e instanceof AclIsAcrError) {
            throw e;
        }
        // Since a Solid server adds a `Link` header to an ACL even if that ACL does not exist,
        // failure to fetch the ACL is expected to happen - we just return `null` and let callers deal
        // with it.
        return null;
    }
}
/** @internal */
async function internal_fetchFallbackAcl(resource, options = internal_defaultFetchOptions) {
    const resourceUrl = new URL(getSourceUrl(resource));
    const resourcePath = resourceUrl.pathname;
    // Note: we're currently assuming that the Origin is the root of the Pod. However, it is not yet
    //       set in stone that that will always be the case. We might need to check the Container's
    //       metadata at some point in time to check whether it is actually the root of the Pod.
    //       See: https://github.com/solid/specification/issues/153#issuecomment-624630022
    if (resourcePath === "/") {
        // We're already at the root, so there's no Container we can retrieve:
        return null;
    }
    const containerPath = internal_getContainerPath(resourcePath);
    const containerIri = new URL(containerPath, resourceUrl.origin).href;
    const containerInfo = await getResourceInfo(containerIri, options);
    if (!hasAccessibleAcl(containerInfo)) {
        // If the current user does not have access to this Container's ACL,
        // we cannot determine whether its ACL is the one that applies. Thus, return null:
        return null;
    }
    const containerAcl = await internal_fetchResourceAcl(containerInfo, options);
    if (containerAcl === null) {
        return internal_fetchFallbackAcl(containerInfo, options);
    }
    return containerAcl;
}
/**
 * Given the path to a Resource, get the URL of the Container one level up in the hierarchy.
 * @param resourcePath The path of the Resource of which we need to determine the Container's path.
 * @hidden For internal use only.
 */
function internal_getContainerPath(resourcePath) {
    const resourcePathWithoutTrailingSlash = resourcePath.substring(resourcePath.length - 1) === "/"
        ? resourcePath.substring(0, resourcePath.length - 1)
        : resourcePath;
    const containerPath = resourcePath.substring(0, resourcePathWithoutTrailingSlash.lastIndexOf("/")) + "/";
    return containerPath;
}
/** @internal */
function internal_getAclRules(aclDataset) {
    const things = getThingAll(aclDataset);
    return things.filter(isAclRule);
}
function isAclRule(thing) {
    return getIriAll(thing, rdf.type).includes(acl.Authorization);
}
/** @internal */
function internal_getResourceAclRulesForResource(aclRules, resource) {
    return aclRules.filter((rule) => appliesToResource(rule, resource));
}
function appliesToResource(aclRule, resource) {
    return getIriAll(aclRule, acl.accessTo).includes(resource);
}
/** @internal */
function internal_getDefaultAclRulesForResource(aclRules, resource) {
    return aclRules.filter((rule) => isDefaultForResource(rule, resource));
}
function isDefaultForResource(aclRule, resource) {
    return (getIriAll(aclRule, acl.default).includes(resource) ||
        getIriAll(aclRule, acl.defaultForNew).includes(resource));
}
/** @internal */
function internal_getAccess(rule) {
    const ruleAccessModes = getIriAll(rule, acl.mode);
    const writeAccess = ruleAccessModes.includes(internal_accessModeIriStrings.write);
    return writeAccess
        ? {
            read: ruleAccessModes.includes(internal_accessModeIriStrings.read),
            append: true,
            write: true,
            control: ruleAccessModes.includes(internal_accessModeIriStrings.control),
        }
        : {
            read: ruleAccessModes.includes(internal_accessModeIriStrings.read),
            append: ruleAccessModes.includes(internal_accessModeIriStrings.append),
            write: false,
            control: ruleAccessModes.includes(internal_accessModeIriStrings.control),
        };
}
/** @internal */
function internal_combineAccessModes(modes) {
    return modes.reduce((accumulator, current) => {
        const writeAccess = accumulator.write || current.write;
        return writeAccess
            ? {
                read: accumulator.read || current.read,
                append: true,
                write: true,
                control: accumulator.control || current.control,
            }
            : {
                read: accumulator.read || current.read,
                append: accumulator.append || current.append,
                write: false,
                control: accumulator.control || current.control,
            };
    }, { read: false, append: false, write: false, control: false });
}
/** @internal */
function internal_removeEmptyAclRules(aclDataset) {
    const aclRules = internal_getAclRules(aclDataset);
    const aclRulesToRemove = aclRules.filter(isEmptyAclRule);
    // Is this too clever? It iterates over aclRulesToRemove, one by one removing them from aclDataset.
    const updatedAclDataset = aclRulesToRemove.reduce(removeThing, aclDataset);
    return updatedAclDataset;
}
function isEmptyAclRule(aclRule) {
    // If there are Quads in there unrelated to Access Control,
    // this is not an empty ACL rule that can be deleted:
    if (subjectToRdfJsQuads(aclRule.predicates, DataFactory.namedNode(aclRule.url), DataFactory.defaultGraph()).some((quad) => !isAclQuad(quad))) {
        return false;
    }
    // If the rule does not apply to any Resource, it is no longer working:
    if (getIri(aclRule, acl.accessTo) === null &&
        getIri(aclRule, acl.default) === null &&
        getIri(aclRule, acl.defaultForNew) === null) {
        return true;
    }
    // If the rule does not specify Access Modes, it is no longer working:
    if (getIri(aclRule, acl.mode) === null) {
        return true;
    }
    // If the rule does not specify whom it applies to, it is no longer working:
    if (getIri(aclRule, acl.agent) === null &&
        getIri(aclRule, acl.agentGroup) === null &&
        getIri(aclRule, acl.agentClass) === null) {
        return true;
    }
    return false;
}
function isAclQuad(quad) {
    const predicate = quad.predicate;
    const object = quad.object;
    if (predicate.equals(DataFactory.namedNode(rdf.type)) &&
        object.equals(DataFactory.namedNode(acl.Authorization))) {
        return true;
    }
    if (predicate.equals(DataFactory.namedNode(acl.accessTo)) ||
        predicate.equals(DataFactory.namedNode(acl.default)) ||
        predicate.equals(DataFactory.namedNode(acl.defaultForNew))) {
        return true;
    }
    if (predicate.equals(DataFactory.namedNode(acl.mode)) &&
        Object.values(internal_accessModeIriStrings).some((mode) => object.equals(DataFactory.namedNode(mode)))) {
        return true;
    }
    if (predicate.equals(DataFactory.namedNode(acl.agent)) ||
        predicate.equals(DataFactory.namedNode(acl.agentGroup)) ||
        predicate.equals(DataFactory.namedNode(acl.agentClass))) {
        return true;
    }
    if (predicate.equals(DataFactory.namedNode(acl.origin))) {
        return true;
    }
    return false;
}
/**
 * IRIs of potential Access Modes
 * @internal
 */
const internal_accessModeIriStrings = {
    read: "http://www.w3.org/ns/auth/acl#Read",
    append: "http://www.w3.org/ns/auth/acl#Append",
    write: "http://www.w3.org/ns/auth/acl#Write",
    control: "http://www.w3.org/ns/auth/acl#Control",
};
/** @internal
 * This function finds, among a set of ACL rules, the ones granting access to a given entity (the target)
 * and identifying it with a specific property (`acl:agent` or `acl:agentGroup`).
 * @param aclRules The set of rules to filter
 * @param targetIri The IRI of the target
 * @param targetType The property linking the rule to the target
 */
function internal_getAclRulesForIri(aclRules, targetIri, targetType) {
    return aclRules.filter((rule) => getIriAll(rule, targetType).includes(targetIri));
}
/** @internal
 * This function transforms a given set of rules into a map associating the IRIs
 * of the entities to which permissions are granted by these rules, and the permissions
 * granted to them. Additionally, it filters these entities based on the predicate
 * that refers to them in the rule.
 */
function internal_getAccessByIri(aclRules, targetType) {
    const targetIriAccess = {};
    aclRules.forEach((rule) => {
        const ruleTargetIri = getIriAll(rule, targetType);
        const access = internal_getAccess(rule);
        // A rule might apply to multiple agents. If multiple rules apply to the same agent, the Access
        // Modes granted by those rules should be combined:
        ruleTargetIri.forEach((targetIri) => {
            targetIriAccess[targetIri] =
                typeof targetIriAccess[targetIri] === "undefined"
                    ? access
                    : internal_combineAccessModes([targetIriAccess[targetIri], access]);
        });
    });
    return targetIriAccess;
}
/**
 * Initialises a new ACL Rule that grants some access - but does not yet specify to whom.
 *
 * @hidden This is an internal utility function that should not be used directly by downstreams.
 * @param access Access mode that this Rule will grant
 */
function internal_initialiseAclRule(access) {
    let newRule = createThing();
    newRule = setIri(newRule, rdf.type, acl.Authorization);
    if (access.read) {
        newRule = addIri(newRule, acl.mode, internal_accessModeIriStrings.read);
    }
    if (access.append && !access.write) {
        newRule = addIri(newRule, acl.mode, internal_accessModeIriStrings.append);
    }
    if (access.write) {
        newRule = addIri(newRule, acl.mode, internal_accessModeIriStrings.write);
    }
    if (access.control) {
        newRule = addIri(newRule, acl.mode, internal_accessModeIriStrings.control);
    }
    return newRule;
}
/**
 * Creates a new ACL Rule with the same ACL values as the input ACL Rule, but having a different IRI.
 *
 * Note that non-ACL values will not be copied over.
 *
 * @hidden This is an internal utility function that should not be used directly by downstreams.
 * @param sourceRule ACL rule to duplicate.
 */
function internal_duplicateAclRule(sourceRule) {
    let targetRule = createThing();
    targetRule = setIri(targetRule, rdf.type, acl.Authorization);
    function copyIris(inputRule, outputRule, predicate) {
        return getIriAll(inputRule, predicate).reduce((outputRule, iriTarget) => addIri(outputRule, predicate, iriTarget), outputRule);
    }
    targetRule = copyIris(sourceRule, targetRule, acl.accessTo);
    targetRule = copyIris(sourceRule, targetRule, acl.default);
    targetRule = copyIris(sourceRule, targetRule, acl.defaultForNew);
    targetRule = copyIris(sourceRule, targetRule, acl.agent);
    targetRule = copyIris(sourceRule, targetRule, acl.agentGroup);
    targetRule = copyIris(sourceRule, targetRule, acl.agentClass);
    targetRule = copyIris(sourceRule, targetRule, acl.origin);
    targetRule = copyIris(sourceRule, targetRule, acl.mode);
    return targetRule;
}
function internal_setAcl(resource, acl) {
    return Object.assign(internal_cloneResource(resource), { internal_acl: acl });
}
const supportedActorPredicates = [
    acl.agent,
    acl.agentClass,
    acl.agentGroup,
    acl.origin,
];
/**
 * Given an ACL Rule, returns two new ACL Rules that cover all the input Rule's use cases,
 * except for giving the given Actor access to the given Resource.
 *
 * @param rule The ACL Rule that should no longer apply for a given Actor to a given Resource.
 * @param actor The Actor that should be removed from the Rule for the given Resource.
 * @param resourceIri The Resource to which the Rule should no longer apply for the given Actor.
 * @returns A tuple with the original ACL Rule without the given Actor, and a new ACL Rule for the given Actor for the remaining Resources, respectively.
 */
function internal_removeActorFromRule(rule, actor, actorPredicate, resourceIri, ruleType) {
    // If the existing Rule does not apply to the given Actor, we don't need to split up.
    // Without this check, we'd be creating a new rule for the given Actor (ruleForOtherTargets)
    // that would give it access it does not currently have:
    if (!getIriAll(rule, actorPredicate).includes(actor)) {
        const emptyRule = internal_initialiseAclRule({
            read: false,
            append: false,
            write: false,
            control: false,
        });
        return [rule, emptyRule];
    }
    // The existing rule will keep applying to Actors other than the given one:
    const ruleWithoutActor = removeIri(rule, actorPredicate, actor);
    // The actor might have been given other access in the existing rule, so duplicate it...
    let ruleForOtherTargets = internal_duplicateAclRule(rule);
    // ...but remove access to the original Resource...
    ruleForOtherTargets = removeIri(ruleForOtherTargets, ruleType === "resource" ? acl.accessTo : acl.default, resourceIri);
    // Prevents the legacy predicate 'acl:defaultForNew' to lead to privilege escalation
    if (ruleType === "default") {
        ruleForOtherTargets = removeIri(ruleForOtherTargets, acl.defaultForNew, resourceIri);
    }
    // ...and only apply the new Rule to the given Actor (because the existing Rule covers the others):
    ruleForOtherTargets = setIri(ruleForOtherTargets, actorPredicate, actor);
    supportedActorPredicates
        .filter((predicate) => predicate !== actorPredicate)
        .forEach((predicate) => {
        ruleForOtherTargets = removeAll(ruleForOtherTargets, predicate);
    });
    return [ruleWithoutActor, ruleForOtherTargets];
}
/**
 * ```{note}
 * This function is still experimental and subject to change, even in a non-major release.
 * ```
 * Modifies the resource ACL (Access Control List) to set the Access Modes for the given Agent.
 * Specifically, the function returns a new resource ACL initialised with the given ACL and
 * new rules for the Actor's access.
 *
 * If rules for Actor's access already exist in the given ACL, in the returned ACL,
 * they are replaced by the new rules.
 *
 * This function does not modify:
 *
 * - Access Modes granted indirectly to Actors through other ACL rules, e.g., public or group-specific permissions.
 * - Access Modes granted to Actors for the child Resources if the associated Resource is a Container.
 * - The original ACL.
 *
 * @param aclDataset The SolidDataset that contains Access-Control List rules.
 * @param actor The Actor to grant specific Access Modes.
 * @param access The Access Modes to grant to the Actor for the Resource.
 * @returns A new resource ACL initialised with the given `aclDataset` and `access` for the `agent`.
 */
function internal_setActorAccess$2(aclDataset, access, actorPredicate, accessType, actor) {
    // First make sure that none of the pre-existing rules in the given ACL SolidDataset
    // give the Agent access to the Resource:
    let filteredAcl = aclDataset;
    getThingAll(aclDataset).forEach((aclRule) => {
        // Obtain both the Rule that no longer includes the given Actor,
        // and a new Rule that includes all ACL Quads
        // that do not pertain to the given Actor-Resource combination.
        // Note that usually, the latter will no longer include any meaningful statements;
        // we'll clean them up afterwards.
        const [filteredRule, remainingRule] = internal_removeActorFromRule(aclRule, actor, actorPredicate, aclDataset.internal_accessTo, accessType);
        filteredAcl = setThing(filteredAcl, filteredRule);
        filteredAcl = setThing(filteredAcl, remainingRule);
    });
    // Create a new Rule that only grants the given Actor the given Access Modes:
    let newRule = internal_initialiseAclRule(access);
    newRule = setIri(newRule, accessType === "resource" ? acl.accessTo : acl.default, aclDataset.internal_accessTo);
    newRule = setIri(newRule, actorPredicate, actor);
    const updatedAcl = setThing(filteredAcl, newRule);
    // Remove any remaining Rules that do not contain any meaningful statements:
    return internal_removeEmptyAclRules(updatedAcl);
}
function internal_setResourceAcl(resource, acl) {
    const newAcl = {
        resourceAcl: acl,
        fallbackAcl: null,
    };
    return internal_setAcl(resource, newAcl);
}
function internal_getResourceAcl(resource) {
    return resource.internal_acl.resourceAcl;
}
/**
 * This error indicates that, if we're following a Link with rel="acl",
 * it does not result in a WAC ACL, but in an ACP ACR.
 */
class AclIsAcrError extends Error {
    constructor(sourceResource, aclResource) {
        super(`[${getSourceIri(sourceResource)}] is governed by Access Control Policies in [${getSourceIri(aclResource)}] rather than by Web Access Control.`);
    }
}

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
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Verify whether a given SolidDataset was fetched together with its Access Control List.
 *
 * @param dataset A [[SolidDataset]] that may have its ACLs attached.
 * @returns True if `dataset` was fetched together with its ACLs.
 */
function hasAcl(dataset) {
    const potentialAcl = dataset;
    return typeof potentialAcl.internal_acl === "object";
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Verifies whether the given Resource has a resource ACL (Access Control List) attached.
 *
 * The [[hasResourceAcl]] function checks that:
 * - a given Resource has a resource ACL attached, and
 * - the user calling [[hasResourceAcl]] has Control access to the Resource.
 *
 * To retrieve a Resource with its ACLs, see [[getSolidDatasetWithAcl]].
 *
 * @param resource A Resource that might have an ACL attached.
 * @returns `true` if the Resource has a resource ACL attached that is accessible by the user.
 */
function hasResourceAcl(resource) {
    return (resource.internal_acl.resourceAcl !== null &&
        getSourceUrl(resource) ===
            resource.internal_acl.resourceAcl.internal_accessTo &&
        resource.internal_resourceInfo.aclUrl ===
            getSourceUrl(resource.internal_acl.resourceAcl));
}
/**
 * Experimental: fetch a SolidDataset and its associated Access Control List.
 *
 * This is an experimental function that fetches both a Resource, the linked ACL Resource (if
 * available), and the ACL that applies to it if the linked ACL Resource is not available. This can
 * result in many HTTP requests being executed, in lieu of the Solid spec mandating servers to
 * provide this info in a single request. Therefore, and because this function is still
 * experimental, prefer [[getSolidDataset]] instead.
 *
 * If the Resource does not advertise the ACL Resource (because the authenticated user does not have
 * access to it), the `acl` property in the returned value will be null. `acl.resourceAcl` will be
 * undefined if the Resource's linked ACL Resource could not be fetched (because it does not exist),
 * and `acl.fallbackAcl` will be null if the applicable Container's ACL is not accessible to the
 * authenticated user.
 *
 * @param url URL of the SolidDataset to fetch.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns A SolidDataset and the ACLs that apply to it, if available to the authenticated user.
 */
async function getSolidDatasetWithAcl(url, options = internal_defaultFetchOptions) {
    const solidDataset = await getSolidDataset(url, options);
    const acl = await internal_fetchAcl(solidDataset, options);
    return internal_setAcl(solidDataset, acl);
}
/**
 * ```{note} This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Retrieves a file, its resource ACL (Access Control List) if available,
 * and its fallback ACL from a URL and returns them as a blob.
 *
 * If the user calling the function does not have access to the file's resource ACL,
 * [[hasAccessibleAcl]] on the returned blob returns false.
 * If the user has access to the file's resource ACL but the resource ACL does not exist,
 * [[getResourceAcl]] on the returned blob returns null.
 * If the fallback ACL is inaccessible by the user,
 * [[getFallbackAcl]] on the returned blob returns null.
 *
 * ```{tip}
 * To retrieve the ACLs, the function results in multiple HTTP requests rather than a single
 * request as mandated by the Solid spec. As such, prefer [[getFile]] instead if you do not need the ACL.
 * ```
 *
 * @param url The URL of the fetched file
 * @param options Fetching options: a custom fetcher and/or headers.
 * @returns A file and its ACLs, if available to the authenticated user, as a blob.
 * @since 0.2.0
 */
async function getFileWithAcl(input, options = internal_defaultFetchOptions) {
    const file = await getFile(input, options);
    const acl = await internal_fetchAcl(file, options);
    return internal_setAcl(file, acl);
}
/**
 * Experimental: fetch a Resource's metadata and its associated Access Control List.
 *
 * This is an experimental function that fetches both a Resource's metadata, the linked ACL Resource (if
 * available), and the ACL that applies to it if the linked ACL Resource is not available (if accessible). This can
 * result in many HTTP requests being executed, in lieu of the Solid spec mandating servers to
 * provide this info in a single request.
 *
 * If the Resource's linked ACL Resource could not be fetched (because it does not exist, or because
 * the authenticated user does not have access to it), `acl.resourceAcl` will be `null`. If the
 * applicable Container's ACL is not accessible to the authenticated user, `acl.fallbackAcl` will be
 * `null`.
 *
 * @param url URL of the SolidDataset to fetch.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns A Resource's metadata and the ACLs that apply to the Resource, if available to the authenticated user.
 */
async function getResourceInfoWithAcl(url, options = internal_defaultFetchOptions) {
    const resourceInfo = await getResourceInfo(url, options);
    const acl = await internal_fetchAcl(resourceInfo, options);
    return internal_setAcl(resourceInfo, acl);
}
function getResourceAcl(resource) {
    if (!hasResourceAcl(resource)) {
        return null;
    }
    return resource.internal_acl.resourceAcl;
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Verifies whether the given Resource has a fallback ACL (Access Control List) attached.
 *
 * A fallback ACL for a Resource is inherited from the Resource's parent Container
 * (or another of its ancestor Containers) and applies if the Resource does
 * not have its own resource ACL.
 *
 * The [[hasFallbackAcl]] function checks that:
 * - a given Resource has a fallback ACL attached, and
 * - the user calling [[hasFallbackAcl]] has Control access to the Container
 * from which the Resource inherits its ACL.
 *
 * To retrieve a Resource with its ACLs, see [[getSolidDatasetWithAcl]].
 *
 * @param resource A [[SolidDataset]] that might have a fallback ACL attached.
 *
 * @returns `true` if the Resource has a fallback ACL attached that is accessible to the user.
 */
function hasFallbackAcl(resource) {
    return resource.internal_acl.fallbackAcl !== null;
}
function getFallbackAcl(dataset) {
    if (!hasFallbackAcl(dataset)) {
        return null;
    }
    return dataset.internal_acl.fallbackAcl;
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Creates an empty resource ACL (Access Control List) for a given Resource.
 *
 * @param targetResource A Resource that does not have its own ACL yet (see [[hasResourceAcl]]).
 * @returns An empty resource ACL for the given Resource.
 */
function createAcl(targetResource) {
    const emptyResourceAcl = freeze(Object.assign(Object.assign({}, createSolidDataset()), { internal_accessTo: getSourceUrl(targetResource), internal_resourceInfo: {
            sourceIri: targetResource.internal_resourceInfo.aclUrl,
            isRawData: false,
            linkedResources: {},
        } }));
    return emptyResourceAcl;
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Creates a resource ACL (Access Control List), initialised from the fallback ACL
 * inherited from the given Resource's Container (or another of its ancestor Containers).
 * That is, the new ACL has the same rules/entries as the fallback ACL that currently
 * applies to the Resource.
 *
 * @param resource A Resource without its own resource ACL (see [[hasResourceAcl]]) but with an accessible fallback ACL (see [[hasFallbackAcl]]).
 * @returns A resource ACL initialised with the rules/entries from the Resource's fallback ACL.
 */
function createAclFromFallbackAcl(resource) {
    const emptyResourceAcl = createAcl(resource);
    const fallbackAclRules = internal_getAclRules(resource.internal_acl.fallbackAcl);
    const defaultAclRules = internal_getDefaultAclRulesForResource(fallbackAclRules, resource.internal_acl.fallbackAcl.internal_accessTo);
    const newAclRules = defaultAclRules.map((rule) => {
        rule = removeAll(rule, acl.default);
        rule = removeAll(rule, acl.defaultForNew);
        rule = setIri(rule, acl.accessTo, getSourceUrl(resource));
        rule = setIri(rule, acl.default, getSourceUrl(resource));
        return rule;
    });
    // Iterate over every ACL Rule we want to import, inserting them into `emptyResourceAcl` one by one:
    const initialisedResourceAcl = newAclRules.reduce(setThing, emptyResourceAcl);
    return initialisedResourceAcl;
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Saves the resource ACL for a Resource.
 *
 * @param resource The Resource to which the given resource ACL applies.
 * @param resourceAcl An [[AclDataset]] whose ACL Rules will apply to `resource`.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 */
async function saveAclFor(resource, resourceAcl, options = internal_defaultFetchOptions) {
    if (!hasAccessibleAcl(resource)) {
        throw new Error(`Could not determine the location of the ACL for the Resource at [${getSourceUrl(resource)}]; possibly the current user does not have Control access to that Resource. Try calling \`hasAccessibleAcl()\` before calling \`saveAclFor()\`.`);
    }
    const savedDataset = await saveSolidDatasetAt(resource.internal_resourceInfo.aclUrl, resourceAcl, options);
    const savedAclDataset = Object.assign(Object.assign({}, savedDataset), { internal_accessTo: getSourceUrl(resource) });
    return savedAclDataset;
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Removes the resource ACL (Access Control List) from a Resource.
 *
 * Once the resource ACL is removed from the Resource, the Resource relies on the
 * fallback ACL inherited from the Resource's parent Container (or another of its ancestor Containers).
 *
 * @param resource The Resource for which you want to delete the ACL.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 */
async function deleteAclFor(resource, options = internal_defaultFetchOptions) {
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const response = await config.fetch(resource.internal_resourceInfo.aclUrl, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(`Deleting the ACL of the Resource at [${getSourceUrl(resource)}] failed: [${response.status}] [${response.statusText}].`);
    }
    const storedResource = Object.assign(internal_cloneResource(resource), {
        acl: {
            resourceAcl: null,
        },
    });
    return storedResource;
}
/**
 * Given a [[SolidDataset]], verify whether its Access Control List is accessible to the current user.
 *
 * This should generally only be true for SolidDatasets fetched by
 * [[getSolidDatasetWithAcl]].
 *
 * Please note that the Web Access Control specification is not yet finalised, and hence, this
 * function is still experimental and can change in a non-major release.
 *
 * @param dataset A [[SolidDataset]].
 * @returns Whether the given `dataset` has a an ACL that is accessible to the current user.
 */
function hasAccessibleAcl(dataset) {
    return typeof dataset.internal_resourceInfo.aclUrl === "string";
}

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
 * ```{note}
 * This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Returns an Agent's explicitly-granted Access Modes for the given Resource.
 *
 * The function does not return Access Modes granted indirectly to the Agent through other
 * ACL rules, e.g., public or group-specific permissions.
 *
 * @param resourceInfo Information about the Resource to which the given Agent may have been granted access.
 * @param agent WebID of the Agent for which to retrieve what access it has to the Resource.
 * @returns Access Modes that have been explicitly granted to the Agent for the given Resource, or `null` if it could not be determined (e.g. because the current user does not have Control access to a given Resource or its Container).
 */
function getAgentAccess$3(resourceInfo, agent) {
    if (hasResourceAcl(resourceInfo)) {
        return getAgentResourceAccess(resourceInfo.internal_acl.resourceAcl, agent);
    }
    if (hasFallbackAcl(resourceInfo)) {
        return getAgentDefaultAccess(resourceInfo.internal_acl.fallbackAcl, agent);
    }
    return null;
}
/**
 * ```{note}
 * This function is still experimental and subject to change, even in a non-major release.
 * ```
 * Returns all explicitly-granted Access Modes per Agent for the given Resource.
 *
 * The function does not return Access Modes granted indirectly to Agents through other
 * ACL rules, e.g., public or group-specific permissions.
 *
 * @param resourceInfo Information about the Resource to which Agents may have been granted access.
 * @returns Access Modes per Agent that have been explicitly granted for the given Resource, or `null` if it could not be determined (e.g. because the current user does not have Control access to a given Resource or its Container).
 */
function getAgentAccessAll$3(resourceInfo) {
    if (hasResourceAcl(resourceInfo)) {
        const resourceAcl = getResourceAcl(resourceInfo);
        return getAgentResourceAccessAll(resourceAcl);
    }
    if (hasFallbackAcl(resourceInfo)) {
        const fallbackAcl = getFallbackAcl(resourceInfo);
        return getAgentDefaultAccessAll(fallbackAcl);
    }
    return null;
}
/**
 * ```{note}
 * This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Returns the Access Modes explicitly granted to an Agent for the Resource
 * associated with an ACL (Access ControlList).
 *
 * The function does not return:
 *
 * - Access Modes granted indirectly to the Agent through other ACL rules, e.g., public or group-specific permissions.
 * - Access Modes granted to the Agent for the child Resources if the associated Resource is a Container (see [[getAgentDefaultAccess]] instead).
 *
 * @param aclDataset The SolidDataset that contains ACL rules.
 * @param agent WebID of the Agent for which to retrieve what access it has to the Resource.
 * @returns Access Modes that have been explicitly granted to an Agent for the Resource associated with an ACL SolidDataset.
 */
function getAgentResourceAccess(aclDataset, agent) {
    const allRules = internal_getAclRules(aclDataset);
    const resourceRules = internal_getResourceAclRulesForResource(allRules, aclDataset.internal_accessTo);
    const agentResourceRules = getAgentAclRulesForAgent(resourceRules, agent);
    const agentAccessModes = agentResourceRules.map(internal_getAccess);
    return internal_combineAccessModes(agentAccessModes);
}
/**
 * ```{note}
 * This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Returns the explicitly granted Access Modes per Agent for the Resource associated
 * with an ACL (Access Control List).
 *
 * The function does not return:
 *
 * - Access Modes granted indirectly to Agents through other ACL rules, e.g., public or group-specific permissions.
 * - Access Modes granted to Agents for the child Resources if the associated Resource is a Container.
 *
 * @param aclDataset The SolidDataset that contains ACL rules.
 * @returns Access Modes per Agent that have been explicitly granted for the Resource associated with an ACL SolidDataset.
 */
function getAgentResourceAccessAll(aclDataset) {
    const allRules = internal_getAclRules(aclDataset);
    const resourceRules = internal_getResourceAclRulesForResource(allRules, aclDataset.internal_accessTo);
    const agentResourceRules = getAgentAclRules(resourceRules);
    return getAccessByAgent(agentResourceRules);
}
/**
 * ```{note}
 * This function is still experimental and subject to change, even in a non-major release.
 * ```
 * Modifies the resource ACL (Access Control List) to set the Access Modes for the given Agent.
 * Specifically, the function returns a new resource ACL initialised with the given ACL and
 * new rules for the Agent's access.
 *
 * If rules for Agent's access already exist in the given ACL, in the returned ACL,
 * they are replaced by the new rules.
 *
 * This function does not modify:
 *
 * - Access Modes granted indirectly to Agents through other ACL rules, e.g., public or group-specific permissions.
 * - Access Modes granted to Agents for the child Resources if the associated Resource is a Container.
 * - The original ACL.
 *
 * @param aclDataset The SolidDataset that contains Access-Control List rules.
 * @param agent The Agent to grant specific Access Modes.
 * @param access The Access Modes to grant to the Agent for the Resource.
 * @returns A new resource ACL initialised with the given `aclDataset` and `access` for the `agent`.
 */
function setAgentResourceAccess$1(aclDataset, agent, access) {
    return internal_setActorAccess$2(aclDataset, access, acl.agent, "resource", agent);
}
/**
 * ```{note}
 * This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Returns an Agent's Access Modes explicitly granted for the children of the
 * Container associated with the given ACL (Access Control List).
 *
 * The function does not return:
 * - Access Modes granted indirectly to the Agent through other ACL rules, e.g. public or group-specific permissions.
 * - Access Modes granted to the Agent for the Container Resource itself (see [[getAgentResourceAccess]] instead).
 *
 * @param aclDataset The SolidDataset that contains Access-Control List rules for a certain Container.
 * @param agent WebID of the Agent for which to retrieve what access it has to the Container's children.
 * @returns Access Modes that have been explicitly granted to an Agent for the children of the Container associated with the given ACL.
 */
function getAgentDefaultAccess(aclDataset, agent) {
    const allRules = internal_getAclRules(aclDataset);
    const resourceRules = internal_getDefaultAclRulesForResource(allRules, aclDataset.internal_accessTo);
    const agentResourceRules = getAgentAclRulesForAgent(resourceRules, agent);
    const agentAccessModes = agentResourceRules.map(internal_getAccess);
    return internal_combineAccessModes(agentAccessModes);
}
/**
 * ```{note}
 * This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Returns the Access Modes, per Agent, that have been explicitly granted for the children
 * of the Container associated with the given ACL (Access Control List).
 *
 * The function does not return:
 *
 * - Access Modes granted indirectly to the Agents through other ACL rules, e.g. public or group-specific permissions.
 * - Access Modes granted to the Agents for the Container Resource itself (see [[getAgentResourceAccessAll]] instead).
 *
 * @param aclDataset The SolidDataset that contains Access-Control List rules.
 * @returns Access Modes, per Agent, that have been explicitly granted for the children of the Container associated with the given ACL.
 */
function getAgentDefaultAccessAll(aclDataset) {
    const allRules = internal_getAclRules(aclDataset);
    const resourceRules = internal_getDefaultAclRulesForResource(allRules, aclDataset.internal_accessTo);
    const agentResourceRules = getAgentAclRules(resourceRules);
    return getAccessByAgent(agentResourceRules);
}
/**
 * ```{note}
 * This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Modifies the default ACL (Access Control List) to set an Agent's Access Modes for the Container's children.
 * Specifically, the function returns a new default ACL initialised with the given ACL and
 * new rules for the Agent's access.
 *
 * If rules already exist for the Agent in the given ACL, in the returned ACL, they are replaced by the new rules.
 *
 * This function does not modify:
 * - Access Modes granted indirectly to the Agent through other ACL rules, e.g., public or group-specific permissions.
 * - Access Modes granted to the Agent for the Container Resource itself.
 * - The original ACL.
 *
 * @param aclDataset The SolidDataset that contains Access-Control List rules.
 * @param agent The Agent to grant specific Access Modes.
 * @param access The Access Modes to grant to the Agent.
 * @returns A new default ACL initialised with the given `aclDataset` and `access` for the `agent`.
 */
function setAgentDefaultAccess(aclDataset, agent, access) {
    return internal_setActorAccess$2(aclDataset, access, acl.agent, "default", agent);
}
function getAgentAclRulesForAgent(aclRules, agent) {
    return internal_getAclRulesForIri(aclRules, agent, acl.agent);
}
function getAgentAclRules(aclRules) {
    return aclRules.filter(isAgentAclRule);
}
function isAgentAclRule(aclRule) {
    return getIri(aclRule, acl.agent) !== null;
}
function getAccessByAgent(aclRules) {
    return internal_getAccessByIri(aclRules, acl.agent);
}

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
 * ```{note} This function is still experimental and subject to change, even in a non-major release.
 * ```
 * Returns a Group's explicity-granted Access Modes for a given Resource.
 *
 * The function does not return Access Modes granted indirectly to the Group through other
 * ACL rules, e.g., public permissions.
 *
 * @param resourceInfo Information about the Resource to which the given Group may have been granted access.
 * @param group URL of the Group for which to retrieve what access it has to the Resource.
 * @returns Access Modes that have been explicitly granted to the `group` for the given Resource, or `null` if it could not be determined (e.g. because the current user does not have Control Access to a given Resource or its Container).
 */
function getGroupAccess$2(resourceInfo, group) {
    if (hasResourceAcl(resourceInfo)) {
        return getGroupResourceAccess(resourceInfo.internal_acl.resourceAcl, group);
    }
    if (hasFallbackAcl(resourceInfo)) {
        return getGroupDefaultAccess(resourceInfo.internal_acl.fallbackAcl, group);
    }
    return null;
}
/**
 * ```{note} This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Returns all explicitly-granted Access Modes per Group for the given Resource.
 *
 * The function does not return Access Modes granted indirectly to the Group through other
 * ACL rules, e.g., public permissions.
 *
 * @param resourceInfo Information about the Resource to which the given Group may have been granted access.
 * @returns Access Modes per Group that have been explicitly granted for the given Resource, or `null` if it could not be determined (e.g. because the current user does not have Control Access to a given Resource or its Container).
 */
function getGroupAccessAll$2(resourceInfo) {
    if (hasResourceAcl(resourceInfo)) {
        const resourceAcl = getResourceAcl(resourceInfo);
        return getGroupResourceAccessAll(resourceAcl);
    }
    if (hasFallbackAcl(resourceInfo)) {
        const fallbackAcl = getFallbackAcl(resourceInfo);
        return getGroupDefaultAccessAll(fallbackAcl);
    }
    return null;
}
/**
 * ```{note} This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Returns the Access Modes explicitly granted to a Group for the Resource
 * associated with an ACL (Access Control List).
 *
 * The function does not return:
 * - Access Modes granted indirectly to the Group through other ACL rules, e.g., public permissions.
 * - Access Modes granted to the Group for the child Resources if the associated Resource is a Container
 *   (see [[getGroupDefaultAccess]] instead).
 *
 * @param aclDataset The SolidDataset that contains Access Control List rules.
 * @param group URL of the Group for which to retrieve what access it has to the Resource.
 * @returns Access Modes explicitly granted to a Group for the Resource associated with an ACL.
 */
function getGroupResourceAccess(aclDataset, group) {
    const allRules = internal_getAclRules(aclDataset);
    const resourceRules = internal_getResourceAclRulesForResource(allRules, aclDataset.internal_accessTo);
    const groupResourceRules = getGroupAclRuleForGroup(resourceRules, group);
    const groupAccessModes = groupResourceRules.map(internal_getAccess);
    return internal_combineAccessModes(groupAccessModes);
}
/**
 * ```{note} This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Returns the explicitly granted Access Modes per Group for the Resource associated
 * with an ACL (Access Control List).
 *
 * The function does not return:
 * - Access Modes granted indirectly to the Group through other ACL rules, e.g., public permissions.
 * - Access Modes granted to Groups for the child Resources if the associated Resource is a Container.
 *
 * @param aclDataset The SolidDataset that contains Access Control List rules.
 * @returns Access Modes per Group that have been explicitly granted for the Resource associated with an ACL.
 */
function getGroupResourceAccessAll(aclDataset) {
    const allRules = internal_getAclRules(aclDataset);
    const resourceRules = internal_getResourceAclRulesForResource(allRules, aclDataset.internal_accessTo);
    return getAccessByGroup(resourceRules);
}
/**
 * ```{note} This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Returns a Group's Access Modes explicitly granted for the children of the
 * Container associated with an ACL (Access ControlList).
 *
 * The function does not return:
 * - Access Modes granted indirectly to the Group through other ACL rules, e.g. public permissions.
 * - Access Modes granted to the Group for the Container Resource itself (see [[getGroupResourceAccess]] instead).
 *
 * @param aclDataset The SolidDataset that contains ACL rules for a certain Container.
 * @param group URL of the Group for which to retrieve what access it has to the child Resources of the given Container.
 * @returns Access Modes that have been explicitly granted to the Group for the children of the Container associated with the given ACL.
 */
function getGroupDefaultAccess(aclDataset, group) {
    const allRules = internal_getAclRules(aclDataset);
    const defaultRules = internal_getDefaultAclRulesForResource(allRules, aclDataset.internal_accessTo);
    const groupDefaultRules = getGroupAclRuleForGroup(defaultRules, group);
    const groupAccessModes = groupDefaultRules.map(internal_getAccess);
    return internal_combineAccessModes(groupAccessModes);
}
/**
 * ```{note} This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Returns the Access Modes, per Group, that have been explicitly granted for the children
 * of the Container associated with the given ACL (Access Control List).
 *
 * The function does not return:
 * - Access Modes granted indirectly to the Groups through other ACL rules, e.g. public permissions.
 * - Access Modes granted to the Groups for the Container Resource itself (see [[getGroupResourceAccessAll]] instead).
 *
 * @param aclDataset The SolidDataset that contains Access Control List rules for a certain Container.
 * @returns Access Modes per Group that have been explicitly granted for the children of the Container associated with the given ACL SolidDataset.
 */
function getGroupDefaultAccessAll(aclDataset) {
    const allRules = internal_getAclRules(aclDataset);
    const defaultRules = internal_getDefaultAclRulesForResource(allRules, aclDataset.internal_accessTo);
    return getAccessByGroup(defaultRules);
}
function getGroupAclRuleForGroup(rules, group) {
    return internal_getAclRulesForIri(rules, group, acl.agentGroup);
}
function getAccessByGroup(aclRules) {
    return internal_getAccessByIri(aclRules, acl.agentGroup);
}
/**
 * ```{note}
 * This function is still experimental and subject to change, even in a non-major release.
 * ```
 * Modifies the resource ACL (Access Control List) to set the Access Modes for the given Group.
 * Specifically, the function returns a new resource ACL initialised with the given ACL and
 * new rules for the Group's access.
 *
 * If rules for Groups's access already exist in the given ACL, in the returned ACL,
 * they are replaced by the new rules.
 *
 * This function does not modify:
 *
 * - Access Modes granted indirectly to Groups through other ACL rules, e.g., public or Agent-specific permissions.
 * - Access Modes granted to Groups for the child Resources if the associated Resource is a Container.
 * - The original ACL.
 *
 * @param aclDataset The SolidDataset that contains Access-Control List rules.
 * @param group The Group to grant specific Access Modes.
 * @param access The Access Modes to grant to the Group for the Resource.
 * @returns A new resource ACL initialised with the given `aclDataset` and `access` for the `group`.
 * @since 1.4.0
 */
function setGroupResourceAccess$1(aclDataset, group, access) {
    return internal_setActorAccess$2(aclDataset, access, acl.agentGroup, "resource", group);
}
/**
 * ```{note}
 * This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Modifies the default ACL (Access Control List) to set a Group's Access Modes for the Container's children.
 * Specifically, the function returns a new default ACL initialised with the given ACL and
 * new rules for the Group's access.
 *
 * If rules already exist for the Group in the given ACL, in the returned ACL, they are replaced by the new rules.
 *
 * This function does not modify:
 * - Access Modes granted indirectly to the Group through other ACL rules, e.g., public or Agent-specific permissions.
 * - Access Modes granted to the Group for the Container Resource itself.
 * - The original ACL.
 *
 * @param aclDataset The SolidDataset that contains Access-Control List rules.
 * @param group The Group to grant specific Access Modes.
 * @param access The Access Modes to grant to the Group.
 * @returns A new default ACL initialised with the given `aclDataset` and `access` for the `group`.
 * @since 1.4.0
 */
function setGroupDefaultAccess(aclDataset, group, access) {
    return internal_setActorAccess$2(aclDataset, access, acl.agentGroup, "default", group);
}

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
 * ```{note}
 * This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Returns the Access Modes granted to the public in general for a Resource.
 *
 * This function does not return Access Modes granted to specific Agents
 * through other ACL (Access Control List) rules, e.g., agent- or group-specific permissions.
 *
 * @param resourceInfo Information about the Resource to which the given Agent may have been granted access.
 * @returns Access Modes granted to the public in general for the Resource, or `null` if it could not be determined (e.g. because the current user does not have Control Access to a given Resource or its Container).
 */
function getPublicAccess$3(resourceInfo) {
    if (hasResourceAcl(resourceInfo)) {
        return getPublicResourceAccess(resourceInfo.internal_acl.resourceAcl);
    }
    if (hasFallbackAcl(resourceInfo)) {
        return getPublicDefaultAccess(resourceInfo.internal_acl.fallbackAcl);
    }
    return null;
}
/**
 * ```{note}
 * This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Returns the Access Modes granted to the public in general for the Resource
 * associated with an ACL (Access Control List).
 *
 * This function does not return:
 * - Access Modes granted to specific Agents through other ACL rules, e.g., agent- or group-specific permissions.
 * - Access Modes to child Resources if the associated Resource is a Container (see [[getPublicDefaultAccess]] instead).
 *
 * @param aclDataset The SolidDataset that contains Access Control List rules.
 * @returns Access Modes granted to the public in general for the Resource associated with the `aclDataset`.
 */
function getPublicResourceAccess(aclDataset) {
    const allRules = internal_getAclRules(aclDataset);
    const resourceRules = internal_getResourceAclRulesForResource(allRules, aclDataset.internal_accessTo);
    const publicResourceRules = getClassAclRulesForClass(resourceRules, foaf.Agent);
    const publicAccessModes = publicResourceRules.map(internal_getAccess);
    return internal_combineAccessModes(publicAccessModes);
}
/**
 * ```{note}
 * This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Returns the Access Modes granted to the public in general for the child Resources
 * of the Container associated with an ACL (Access Control List).
 *
 * This function does not return:
 * - Access Modes granted to Agents through other ACL rules, e.g., agent- or group-specific permissions.
 * - Access Modes to the Container Resource itself (see [[getPublicResourceAccess]] instead).
 *
 * @param aclDataset The SolidDataset that contains Access Control List rules for a certain Container.
 * @returns Access Modes granted to the public in general for the children of the Container associated with the given `aclDataset`.
 */
function getPublicDefaultAccess(aclDataset) {
    const allRules = internal_getAclRules(aclDataset);
    const resourceRules = internal_getDefaultAclRulesForResource(allRules, aclDataset.internal_accessTo);
    const publicResourceRules = getClassAclRulesForClass(resourceRules, foaf.Agent);
    const publicAccessModes = publicResourceRules.map(internal_getAccess);
    return internal_combineAccessModes(publicAccessModes);
}
/**
 * ```{note}
 * This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Modifies the resource ACL (Access Control List) to set the Access Modes for the public.
 * Specifically, the function returns a new resource ACL (Access Control List) initialised
 * with the given resource ACL and new rules for the given public access.
 *
 * If rules for public access already exist in the given ACL, in the *returned* ACL,
 * they are replaced by the new rules.
 *
 * This function does not modify:
 * - Access Modes granted to Agents through other ACL rules, e.g., agent- or group-specific permissions.
 * - Access Modes to child Resources if the associated Resource is a Container.
 * - The original ACL.
 *
 * @param aclDataset The SolidDataset that contains Access Control List rules.
 * @param access The Access Modes to grant to the public.
 * @returns A new resource ACL initialised with the given `aclDataset` and public `access`.
 */
function setPublicResourceAccess$1(aclDataset, access) {
    return internal_setActorAccess$2(aclDataset, access, acl.agentClass, "resource", foaf.Agent);
}
/**
 * ```{note}
 * This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Modifies the default ACL (Access Control List) to set the public's default Access Modes
 * to child resources. Specifically, the function returns a new default ACL initialised
 * with the given default ACL and new rules for the given public access.
 *
 * If rules for public access already exist in the given ACL, in the *returned* ACL,
 * they are replaced by the new rules.
 *
 * This function does not modify:
 * - Access Modes granted to Agents through other ACL rules, e.g., agent- or group-specific permissions.
 * - Access Modes to Container Resource itself.
 * - The original ACL.
 *
 * @param aclDataset The SolidDataset that contains Access Control List rules.
 * @param access The Access Modes to grant to the public.
 * @returns A new default ACL initialised with the given `aclDataset` and public `access`.
 */
function setPublicDefaultAccess(aclDataset, access) {
    return internal_setActorAccess$2(aclDataset, access, acl.agentClass, "default", foaf.Agent);
}
function getClassAclRulesForClass(aclRules, agentClass) {
    return aclRules.filter((rule) => appliesToClass(rule, agentClass));
}
function appliesToClass(aclRule, agentClass) {
    return getIriAll(aclRule, acl.agentClass).includes(agentClass);
}

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
function setMockAclUrl(resource, aclUrl) {
    const resourceWithAclUrl = Object.assign(internal_cloneResource(resource), {
        internal_resourceInfo: Object.assign(Object.assign({}, resource.internal_resourceInfo), { aclUrl: aclUrl }),
    });
    return resourceWithAclUrl;
}

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
 * ```{warning}
 * Do not use this function in production code. For use in **unit tests** that
 * require a [[SolidDataset]] with a resource ACL (Access Control List).
 * ```
 *
 * Initialises a new empty ACL and attaches it to a given [[SolidDataset]] for use
 * in **unit tests**; e.g., unit tests that call [[getResourceAcl]].
 *
 * @param resource The Resource to mock up with a new resource ACL.
 * @returns The input Resource with an empty resource ACL attached.
 * @since 0.2.0
 */
function addMockResourceAclTo(resource) {
    var _a;
    const aclUrl = (_a = resource.internal_resourceInfo.aclUrl) !== null && _a !== void 0 ? _a : "https://your.pod/mock-acl.ttl";
    const resourceWithAclUrl = Object.assign(internal_cloneResource(resource), {
        internal_resourceInfo: Object.assign(Object.assign({}, resource.internal_resourceInfo), { aclUrl: aclUrl }),
    });
    const aclDataset = createAcl(resourceWithAclUrl);
    const resourceWithResourceAcl = internal_setAcl(resourceWithAclUrl, {
        resourceAcl: aclDataset,
        fallbackAcl: null,
    });
    return resourceWithResourceAcl;
}
/**
 *
 * ```{warning}
 * Do not use this function in production code.  For use in **unit tests** that require a
 * [[SolidDataset]] with a fallback ACL (Access Control List).
 * ```
 *
 * Initialises a new empty fallback ACL and attaches it to a given [[SolidDataset]] for use
 * in **unit tests**; e.g., unit tests that call [[getFallbackAcl]].
 *
 * @param resource The Resource to mock up with new fallback ACL.
 * @returns The input Resource with an empty fallback ACL attached.
 * @since 0.2.0
 */
function addMockFallbackAclTo(resource) {
    const containerUrl = internal_getContainerPath(getSourceIri(resource));
    const aclUrl = containerUrl + ".acl";
    const mockContainer = setMockAclUrl(mockContainerFrom(containerUrl), aclUrl);
    const aclDataset = createAcl(mockContainer);
    const resourceWithFallbackAcl = internal_setAcl(internal_cloneResource(resource), {
        resourceAcl: null,
        fallbackAcl: aclDataset,
    });
    return resourceWithFallbackAcl;
}

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
const rdfJsDataset = rdfJsDatasetModule.dataset;
/**
 * Convert an RDF/JS Dataset into a [[SolidDataset]]
 *
 * Parse an RDF/JS
 * {@link https://rdf.js.org/dataset-spec/#datasetcore-interface DatasetCore},
 * into a [[SolidDataset]]. Note that, when saving the returned SolidDataset to
 * a Solid Pod, only Quads in the Default Graph will be stored.
 *
 * @param rdfJsDataset The source RDF/JS Dataset.
 * @returns A [[SolidDataset]] containing the same data as the given RDF/JS Dataset.
 * @since 1.9.0
 */
function fromRdfJsDataset(rdfJsDataset) {
    const dataset = {
        graphs: { default: {} },
        type: "Dataset",
    };
    const quads = Array.from(rdfJsDataset);
    const chainBlankNodes = getChainBlankNodes(quads);
    // Quads with chain Blank Nodes as their Subject will be parsed when those
    // Blank Nodes are referred to in an Object. See `addRdfJsQuadToObjects`.
    const quadsWithoutChainBlankNodeSubjects = quads.filter((quad) => chainBlankNodes.every((chainBlankNode) => !chainBlankNode.equals(quad.subject)));
    return quadsWithoutChainBlankNodeSubjects.reduce((datasetAcc, quad) => addRdfJsQuadToDataset(datasetAcc, quad, {
        otherQuads: quads,
        chainBlankNodes: chainBlankNodes,
    }), dataset);
}
/**
 * Convert a [[SolidDataset]] into an RDF/JS Dataset
 *
 * Export a [[SolidDataset]] into an RDF/JS
 * {@link https://rdf.js.org/dataset-spec/#datasetcore-interface DatasetCore}.
 *
 * @param set A [[SolidDataset]] to export into an RDF/JS Dataset.
 * @param options Optional parameter that allows you to pass in your own RDF/JS DataFactory or DatasetCoreFactory.
 * @returns An RDF/JS Dataset containing the data from the given SolidDataset.
 * @since 1.9.0
 */
function toRdfJsDataset(set, options = {}) {
    var _a, _b;
    const datasetFactory = (_b = (_a = options.datasetFactory) === null || _a === void 0 ? void 0 : _a.dataset) !== null && _b !== void 0 ? _b : rdfJsDataset;
    return datasetFactory(toRdfJsQuads(set, options));
}

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
function getProfileFromProfileDoc(profileDataset, webId) {
    const profile = getThing(profileDataset, webId);
    if (profile === null) {
        throw new Error(`Profile document [${getSourceUrl(profileDataset)}] does not include WebID [${webId}]`);
    }
    return profile;
}
/**
 * Set a JWKS IRI associated with a WebID in a profile document.
 *
 * @param profileDocument The profile document dataset.
 * @param webId The WebID associated with the profile document.
 * @param jwksIri The JWKS IRI to be set.
 * @returns A modified copy of the profile document, with the JWKS IRI set.
 * @since 1.12.0
 */
function setProfileJwks(profileDocument, webId, jwksIri) {
    return setThing(profileDocument, setIri(getProfileFromProfileDoc(profileDocument, webId), security.publicKey, jwksIri));
}
/**
 * Look for a JWKS IRI optionally advertized from a profile document.
 *
 * @param profileDocument The profile document.
 * @param webId The WebID featured in the profile document.
 * @returns The JWKS IRI associated with the WebID, if any.
 * @since 1.12.0
 */
function getProfileJwksIri(profileDocument, webId) {
    return getUrl(getProfileFromProfileDoc(profileDocument, webId), security.publicKey);
}
const isJwks = (jwksDocument) => {
    return typeof jwksDocument.keys !== "undefined";
};
/**
 * Fetch a JWKS at a given IRI, and add the given JWK to the obtained key set.
 *
 * @param jwk The JWK to add to the set.
 * @param jwksIri The IRI where the key set should be looked up.
 * @param options @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns Promise resolving to a JWKS where the given key has been added.
 * @since 1.12.0
 */
async function addJwkToJwks(jwk, jwksIri, options = internal_defaultFetchOptions) {
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const jwksResponse = await config.fetch(jwksIri);
    if (!jwksResponse.ok) {
        throw new Error(`Fetching [${jwksIri}] returned an error: ${jwksResponse.status} ${jwksResponse.statusText}`);
    }
    try {
        const jwksDocument = await jwksResponse.json();
        if (!isJwks(jwksDocument)) {
            throw new Error(`[${jwksIri}] does not dereference to a valid JWKS: ${JSON.stringify(jwksDocument)}`);
        }
        return {
            keys: [...jwksDocument.keys, jwk],
        };
    }
    catch (e) {
        throw new Error(`Parsing the document at [${jwksIri}] failed: ${e}`);
    }
}
/**
 * Adds a public key to the JWKS listed in the profile associated to the given WebID.
 * Retrieves the profile document for the specified WebID and looks up the associated
 * JWKS. Having added the given key to the JWKS, this function overwrites the
 * previous JWKS so that the new version is saved. This assumes the JWKS is hosted
 * at a read-write IRI, such as in a Solid Pod.
 *
 * @param publicKey The public key value to set.
 * @param webId The WebID whose profile document references the key set to which we wish to add the specified public key.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @since 1.12.0
 */
async function addPublicKeyToProfileJwks(publicKey, webId, options = internal_defaultFetchOptions) {
    const profileDataset = await getSolidDataset(webId, {
        fetch: options.fetch,
    });
    if (profileDataset === null) {
        throw new Error(`The profile document associated with WebID [${webId}] could not be retrieved.`);
    }
    const jwksIri = getProfileJwksIri(profileDataset, webId);
    if (jwksIri === null) {
        throw new Error(`No key set is declared for the property [${security.publicKey}] in the profile of [${webId}]`);
    }
    const updatedJwks = await addJwkToJwks(publicKey, jwksIri, options);
    return overwriteFile(jwksIri, new Blob([JSON.stringify(updatedJwks)]), {
        contentType: "application/json",
        fetch: options.fetch,
    });
}

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
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Given a Resource, check whether it is governed by Access Policies.
 * (Specifically, a Resource that is governed by Access Policies will refer to exactly one Access
 * Control Resource, and expose that to users who are allowed to see or modify access to the given
 * Resource.)
 *
 * @param resource Resource which may or may not be governed by Access Policies.
 * @returns True if the Resource refers to an Access Control Resource and is hence governed by Access Policies, or false if it does not.
 * @since 1.6.0
 */
function hasLinkedAcr(resource) {
    return (hasServerResourceInfo(resource) &&
        Array.isArray(resource.internal_resourceInfo.linkedResources[acp.accessControl]) &&
        resource.internal_resourceInfo.linkedResources[acp.accessControl].length ===
            1);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Add a [[Policy]] to an Access Control Resource such that that [[Policy]] applies to the Access
 * Control Resource itself, rather than the Resource it governs.
 *
 * @param resourceWithAcr The Resource with an Access Control Resource to which the ACR Policy should be added.
 * @param policyUrl URL of the Policy that should apply to the given Access Control Resource.
 * @returns A Resource with a new Access Control Resource equal to the original ACR, but with the given ACR Policy added to it.
 * @since 1.6.0
 */
function addAcrPolicyUrl(resourceWithAcr, policyUrl) {
    var _a;
    const acr = internal_getAcr(resourceWithAcr);
    const acrUrl = getSourceUrl(acr);
    let acrThing = (_a = getThing(acr, acrUrl)) !== null && _a !== void 0 ? _a : createThing({ url: acrUrl });
    acrThing = addIri(acrThing, acp.access, policyUrl);
    const updatedAcr = setThing(acr, acrThing);
    const updatedResource = internal_setAcr(resourceWithAcr, updatedAcr);
    return updatedResource;
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Add a [[Policy]] to a Resource's Access Control Resource such that that
 * Policy applies to the Access Control Resources of child Resources.
 *
 * @param resourceWithAcr The Resource with an Access Control Resource to which the ACR Policy should be added.
 * @param policyUrl URL of the Policy that should apply to the given Access Control Resources of children of the Resource.
 * @returns A Resource with a new Access Control Resource equal to the original ACR, but with the given ACR Policy added to it.
 * @since 1.6.0
 */
function addMemberAcrPolicyUrl(resourceWithAcr, policyUrl) {
    var _a;
    const acr = internal_getAcr(resourceWithAcr);
    const acrUrl = getSourceUrl(acr);
    let acrThing = (_a = getThing(acr, acrUrl)) !== null && _a !== void 0 ? _a : createThing({ url: acrUrl });
    acrThing = addIri(acrThing, acp.accessMembers, policyUrl);
    const updatedAcr = setThing(acr, acrThing);
    const updatedResource = internal_setAcr(resourceWithAcr, updatedAcr);
    return updatedResource;
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the URLs of the Access Policies that apply to an Access Control Resource itself, rather than
 * to the Resource it governs.
 *
 * @param resourceWithAcr The Resource with the Access Control Resource of which to get the URLs of the Policies that govern access to it.
 * @returns URLs of the Policies that govern access to the given Access Control Resource.
 * @since 1.6.0
 */
function getAcrPolicyUrlAll(resourceWithAcr) {
    const acr = internal_getAcr(resourceWithAcr);
    const acrUrl = getSourceUrl(acr);
    const acrThing = getThing(acr, acrUrl);
    if (acrThing === null) {
        return [];
    }
    return getIriAll(acrThing, acp.access);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the URLs of the Access Policies that apply to the Access Control Resources of the Resource's
 * children.
 *
 * @param resourceWithAcr The Resource with the Access Control Resource of which to get the URLs of the Policies that govern access to its children.
 * @returns URLs of the Policies that govern access to the Access Control Resources of the given Resource's children.
 * @since 1.6.0
 */
function getMemberAcrPolicyUrlAll(resourceWithAcr) {
    const acr = internal_getAcr(resourceWithAcr);
    const acrUrl = getSourceUrl(acr);
    const acrThing = getThing(acr, acrUrl);
    if (acrThing === null) {
        return [];
    }
    return getIriAll(acrThing, acp.accessMembers);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Stop the URL of a given [[Policy]] from applying to an Access Control Resource itself.
 *
 * @param resourceWithAcr The Resource with the Access Control Resource to which the given URL of a Policy should no longer apply.
 * @param policyUrl The URL of the Policy that should no longer apply.
 * @returns A Resource with a new Access Control Resource equal to the original ACR, but with the given ACR Policy removed from it.
 * @since 1.6.0
 */
function removeAcrPolicyUrl(resourceWithAcr, policyUrl) {
    const acr = internal_getAcr(resourceWithAcr);
    const acrUrl = getSourceUrl(acr);
    const acrThing = getThing(acr, acrUrl);
    if (acrThing === null) {
        return resourceWithAcr;
    }
    const updatedAcrThing = removeIri(acrThing, acp.access, policyUrl);
    const updatedAcr = setThing(acr, updatedAcrThing);
    return internal_setAcr(resourceWithAcr, updatedAcr);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Stop the URL of a given [[Policy]] from applying to the Access Control Resources of the
 * Resource's children.
 *
 * @param resourceWithAcr The Resource with the Access Control Resource to whose children's ACRs the given URL of a Policy should no longer apply.
 * @param policyUrl The URL of the Policy that should no longer apply.
 * @returns A Resource with a new Access Control Resource equal to the original ACR, but with the given member ACR Policy removed from it.
 * @since 1.6.0
 */
function removeMemberAcrPolicyUrl(resourceWithAcr, policyUrl) {
    const acr = internal_getAcr(resourceWithAcr);
    const acrUrl = getSourceUrl(acr);
    const acrThing = getThing(acr, acrUrl);
    if (acrThing === null) {
        return resourceWithAcr;
    }
    const updatedAcrThing = removeIri(acrThing, acp.accessMembers, policyUrl);
    const updatedAcr = setThing(acr, updatedAcrThing);
    return internal_setAcr(resourceWithAcr, updatedAcr);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Stop all URL of Access Policies from applying to an Access Control Resource itself.
 *
 * @param resourceWithAcr The Resource with the Access Control Resource to which no more Policies should apply.
 * @returns A Resource with a new Access Control Resource equal to the original ACR, but without any Policy applying to it.
 * @since 1.6.0
 */
function removeAcrPolicyUrlAll(resourceWithAcr) {
    const acr = internal_getAcr(resourceWithAcr);
    const acrUrl = getSourceUrl(acr);
    const acrThing = getThing(acr, acrUrl);
    if (acrThing === null) {
        return resourceWithAcr;
    }
    const updatedAcrThing = removeAll(acrThing, acp.access);
    const updatedAcr = setThing(acr, updatedAcrThing);
    return internal_setAcr(resourceWithAcr, updatedAcr);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Stop all URL of Access Policies from applying to the Access Control Resources of the Resource's
 * children.
 *
 * @param resourceWithAcr The Resource with the Access Control Resource that should no longer apply Policies to its children's ACRs.
 * @returns A Resource with a new Access Control Resource equal to the original ACR, but without any Policy applying to its children's ACRs.
 * @since 1.6.0
 */
function removeMemberAcrPolicyUrlAll(resourceWithAcr) {
    const acr = internal_getAcr(resourceWithAcr);
    const acrUrl = getSourceUrl(acr);
    const acrThing = getThing(acr, acrUrl);
    if (acrThing === null) {
        return resourceWithAcr;
    }
    const updatedAcrThing = removeAll(acrThing, acp.accessMembers);
    const updatedAcr = setThing(acr, updatedAcrThing);
    return internal_setAcr(resourceWithAcr, updatedAcr);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Add a [[Policy]] to an Access Control Resource such that that [[Policy]] applies to that Resource.
 *
 * @param resourceWithAcr The Resource to which the ACR Policy should be added.
 * @param policyUrl URL of the Policy that should apply to the given Resource.
 * @returns A Resource with a new Access Control Resource equal to the original ACR, but with the given Policy added to it.
 * @since 1.6.0
 */
function addPolicyUrl(resourceWithAcr, policyUrl) {
    const control = internal_getInitialisedControl(resourceWithAcr);
    const updatedControl = internal_addPolicyUrl(control, policyUrl);
    const updatedResource = internal_setControl(resourceWithAcr, updatedControl);
    return updatedResource;
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Add a [[Policy]] to a Resource's Access Control Resource such that that
 * Policy applies to that Resource's children.
 *
 * @param resourceWithAcr The Resource to whose Access Control Resource the Policy should be added.
 * @param policyUrl URL of the Policy that should apply to the given Resource's children.
 * @returns A new Resource equal to the given Resource, but with the given Member Policy added to its Access Control Resource.
 * @since 1.6.0
 */
function addMemberPolicyUrl(resourceWithAcr, policyUrl) {
    const control = internal_getInitialisedControl(resourceWithAcr);
    const updatedControl = internal_addMemberPolicyUrl(control, policyUrl);
    const updatedResource = internal_setControl(resourceWithAcr, updatedControl);
    return updatedResource;
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the URLs of the Access Policies that apply to a Resource.
 *
 * @param resourceWithAcr The Resource with the Access Control Resource of which to get the URLs of the Policies that govern access to it.
 * @returns URLs of the Policies that govern access to the given Resource.
 * @since 1.6.0
 */
function getPolicyUrlAll(resourceWithAcr) {
    const controls = internal_getControlAll(resourceWithAcr);
    const policyUrlsByControl = controls.map((control) => internal_getPolicyUrlAll(control));
    const uniquePolicyUrls = new Set();
    policyUrlsByControl.forEach((policyUrls) => {
        policyUrls.forEach((url) => uniquePolicyUrls.add(url));
    });
    return Array.from(uniquePolicyUrls);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the URLs of the Access Policies that apply to a Resource's children.
 *
 * @param resourceWithAcr The Resource with the Access Control Resource of which to get the URLs of the Policies that govern access to its children.
 * @returns URLs of the Policies that govern access to the given Resource's children.
 * @since 1.6.0
 */
function getMemberPolicyUrlAll(resourceWithAcr) {
    const controls = internal_getControlAll(resourceWithAcr);
    const memberPolicyUrlsByControl = controls.map((control) => internal_getMemberPolicyUrlAll(control));
    const uniquePolicyUrls = new Set();
    memberPolicyUrlsByControl.forEach((policyUrls) => {
        policyUrls.forEach((url) => uniquePolicyUrls.add(url));
    });
    return Array.from(uniquePolicyUrls);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Stop the URL of a given [[Policy]] from applying to a Resource.
 *
 * @param resourceWithAcr The Resource, with its Access Control Resource, to which the given URL of a Policy should no longer apply.
 * @param policyUrl The URL of the Policy that should no longer apply.
 * @returns A Resource with a new Access Control Resource equal to the original ACR, but with the given Policy removed from it.
 * @since 1.6.0
 */
function removePolicyUrl(resourceWithAcr, policyUrl) {
    const controls = internal_getControlAll(resourceWithAcr);
    const updatedControls = controls.map((control) => internal_removePolicyUrl(control, policyUrl));
    const updatedResource = updatedControls.reduce(internal_setControl, resourceWithAcr);
    return updatedResource;
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Stop the URL of a given [[Policy]] from applying to the Resource's children.
 *
 * @param resourceWithAcr The Resource with the Access Control Resource to whose children the given URL of a Policy should no longer apply.
 * @param policyUrl The URL of the Policy that should no longer apply.
 * @returns A Resource with a new Access Control Resource equal to the original ACR, but with the given Member Policy removed from it.
 * @since 1.6.0
 */
function removeMemberPolicyUrl(resourceWithAcr, policyUrl) {
    const controls = internal_getControlAll(resourceWithAcr);
    const updatedControls = controls.map((control) => internal_removeMemberPolicyUrl(control, policyUrl));
    const updatedResource = updatedControls.reduce(internal_setControl, resourceWithAcr);
    return updatedResource;
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Stop all URL of Access Policies from applying to a Resource.
 *
 * @param resourceWithAcr The Resource, with its Access Control Resource, to which no more Policies should apply.
 * @returns A Resource with a new Access Control Resource equal to the original ACR, but without any Policy applying to the Resource.
 * @since 1.6.0
 */
function removePolicyUrlAll(resourceWithAcr) {
    const controls = internal_getControlAll(resourceWithAcr);
    const updatedControls = controls.map((control) => internal_removePolicyUrlAll(control));
    const updatedResource = updatedControls.reduce(internal_setControl, resourceWithAcr);
    return updatedResource;
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Stop all URL of Access Policies from applying to the Resource's children.
 *
 * @param resourceWithAcr The Resource with the Access Control Resource that should no longer apply Policies to its children.
 * @returns A Resource with a new Access Control Resource equal to the original ACR, but without any Policy applying to the Resource's children.
 * @since 1.6.0
 */
function removeMemberPolicyUrlAll(resourceWithAcr) {
    const controls = internal_getControlAll(resourceWithAcr);
    const updatedControls = controls.map((control) => internal_removeMemberPolicyUrlAll(control));
    const updatedResource = updatedControls.reduce(internal_setControl, resourceWithAcr);
    return updatedResource;
}
/**
 * Gets a human-readable representation of the given [[Control]] to aid debugging.
 *
 * Note that changes to the exact format of the return value are not considered a breaking change;
 * it is intended to aid in debugging, not as a serialisation method that can be reliably parsed.
 *
 * @param resourceWithAcr The Resource with an attached Access Control Resource of which you want to get a human-readable representation.
 * @since 1.6.0
 */
function acrAsMarkdown(resourceWithAcr) {
    let markdown = `# Access controls for ${getSourceUrl(resourceWithAcr)}\n`;
    const policyUrls = getPolicyUrlAll(resourceWithAcr);
    const memberPolicyUrls = getMemberPolicyUrlAll(resourceWithAcr);
    const acrPolicyUrls = getAcrPolicyUrlAll(resourceWithAcr);
    const memberAcrPolicyUrls = getMemberAcrPolicyUrlAll(resourceWithAcr);
    if (policyUrls.length === 0 &&
        memberPolicyUrls.length === 0 &&
        acrPolicyUrls.length === 0 &&
        memberAcrPolicyUrls.length === 0) {
        markdown += "\n<no policies specified yet>\n";
    }
    if (policyUrls.length > 0) {
        markdown += "\nThe following policies apply to this resource:\n- ";
        markdown += policyUrls.join("\n- ") + "\n";
    }
    if (acrPolicyUrls.length > 0) {
        markdown +=
            "\nThe following policies apply to the access control resource for this resource:\n- ";
        markdown += acrPolicyUrls.join("\n- ") + "\n";
    }
    if (memberPolicyUrls.length > 0) {
        markdown +=
            "\nThe following policies apply to the children of this resource:\n- ";
        markdown += memberPolicyUrls.join("\n- ") + "\n";
    }
    if (memberAcrPolicyUrls.length > 0) {
        markdown +=
            "\nThe following policies apply to the access control resources for children of this resource:\n- ";
        markdown += memberAcrPolicyUrls.join("\n- ") + "\n";
    }
    return markdown;
}

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
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Fetch a SolidDataset and its associated Access Control Resource (if available to the current user).
 *
 * @param url URL of the SolidDataset to fetch.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns A SolidDataset and the ACR that applies to it, if available to the authenticated user.
 * @since 1.6.0
 */
async function getSolidDatasetWithAcr(url, options = internal_defaultFetchOptions) {
    const urlString = internal_toIriString(url);
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const solidDataset = await getSolidDataset(urlString, config);
    const acp = await fetchAcr(solidDataset, config);
    return Object.assign(Object.assign({}, solidDataset), acp);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Fetch a file and its associated Access Control Resource (if available to the current user).
 *
 * @param url URL of the file to fetch.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns A file and the ACR that applies to it, if available to the authenticated user.
 * @since 1.6.0
 */
async function getFileWithAcr(url, options = internal_defaultFetchOptions) {
    const urlString = internal_toIriString(url);
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const file = await getFile(urlString, config);
    const acp = await fetchAcr(file, config);
    return Object.assign(file, acp);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Retrieve information about a Resource and its associated Access Control Resource (if available to
 * the current user), without fetching the Resource itself.
 *
 * @param url URL of the Resource about which to fetch its information.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns Metadata describing a Resource, and the ACR that applies to it, if available to the authenticated user.
 * @since 1.6.0
 */
async function getResourceInfoWithAcr(url, options = internal_defaultFetchOptions) {
    const urlString = internal_toIriString(url);
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const resourceInfo = await getResourceInfo(urlString, config);
    const acp = await fetchAcr(resourceInfo, config);
    return Object.assign(Object.assign({}, resourceInfo), acp);
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Fetch a SolidDataset, and:
 * - if the Resource is governed by an ACR: its associated Access Control Resource (if available to
 *                                          the current user), and all the Access Control Policies
 *                                          referred to therein, if available to the current user.
 * - if the Resource is governed by an ACL: its associated Resource ACL (if available to the current
 *                                          user), or its Fallback ACL if it does not exist.
 *
 * @param url URL of the SolidDataset to fetch.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns A SolidDataset and either the ACL access data or the ACR access data, if available to the current user.
 * @since 1.6.0
 */
async function getSolidDatasetWithAccessDatasets(url, options = internal_defaultFetchOptions) {
    const urlString = internal_toIriString(url);
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const solidDataset = await getSolidDataset(urlString, config);
    if (hasAccessibleAcl(solidDataset)) {
        const acl = await internal_fetchAcl(solidDataset, config);
        return internal_setAcl(solidDataset, acl);
    }
    else {
        const acr = await fetchAcr(solidDataset, config);
        return Object.assign(Object.assign({}, solidDataset), acr);
    }
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Fetch a File, and:
 * - if the Resource is governed by an ACR: its associated Access Control Resource (if available to
 *                                          the current user), and all the Access Control Policies
 *                                          referred to therein, if available to the current user.
 * - if the Resource is governed by an ACL: its associated Resource ACL (if available to the current
 *                                          user), or its Fallback ACL if it does not exist.
 *
 * @param url URL of the File to fetch.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns A File and either the ACL access data or the ACR access data, if available to the current user.
 * @since 1.6.0
 */
async function getFileWithAccessDatasets(url, options = internal_defaultFetchOptions) {
    const urlString = internal_toIriString(url);
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const file = await getFile(urlString, config);
    if (hasAccessibleAcl(file)) {
        const acl = await internal_fetchAcl(file, config);
        return internal_setAcl(file, acl);
    }
    else {
        const acr = await fetchAcr(file, config);
        return Object.assign(file, acr);
    }
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Fetch information about a Resource, and:
 * - if the Resource is governed by an ACR: its associated Access Control Resource (if available to
 *                                          the current user), and all the Access Control Policies
 *                                          referred to therein, if available to the current user.
 * - if the Resource is governed by an ACL: its associated Resource ACL (if available to the current
 *                                          user), or its Fallback ACL if it does not exist.
 *
 * @param url URL of the Resource information about which to fetch.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @returns Information about a Resource and either the ACL access data or the ACR access data, if available to the current user.
 * @since 1.6.0
 */
async function getResourceInfoWithAccessDatasets(url, options = internal_defaultFetchOptions) {
    const urlString = internal_toIriString(url);
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const resourceInfo = await getResourceInfo(urlString, config);
    if (hasAccessibleAcl(resourceInfo)) {
        const acl = await internal_fetchAcl(resourceInfo, config);
        return internal_setAcl(resourceInfo, acl);
    }
    else {
        const acr = await fetchAcr(resourceInfo, config);
        return Object.assign(Object.assign({}, resourceInfo), acr);
    }
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Save a Resource's Access Control Resource.
 *
 * @param resource Resource with an Access Control Resource that should be saved.
 * @param options Optional parameter `options.fetch`: An alternative `fetch` function to make the HTTP request, compatible with the browser-native [fetch API](https://developer.mozilla.org/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters).
 * @since 1.6.0
 */
async function saveAcrFor(resource, options = internal_defaultFetchOptions) {
    const acr = internal_getAcr(resource);
    const config = Object.assign(Object.assign({}, internal_defaultFetchOptions), options);
    const savedAcr = await saveSolidDatasetAt(getSourceUrl(acr), acr, config);
    return internal_setAcr(resource, savedAcr);
}
/**
 * @param resource Resource of which to check whether it has an Access Control Resource attached.
 * @returns Boolean representing whether the given Resource has an Access Control Resource attached for use in e.g. [[getPolicyUrlAll]].
 * @since 1.6.0
 */
function hasAccessibleAcr(resource) {
    return (typeof resource.internal_acp === "object" &&
        resource.internal_acp !== null &&
        typeof resource.internal_acp.acr === "object" &&
        resource.internal_acp.acr !== null);
}
async function fetchAcr(resource, options) {
    let acrUrl = undefined;
    if (hasLinkedAcr(resource)) {
        // Whereas a Resource can generally have multiple linked Resources for the same relation,
        // it can only have one Access Control Resource for that ACR to be valid.
        // Hence the accessing of [0] directly:
        acrUrl =
            resource.internal_resourceInfo.linkedResources[acp.accessControl][0];
    }
    else if (hasAccessibleAcl(resource)) {
        // The ACP proposal will be updated to expose the Access Control Resource
        // via a Link header with rel="acl", just like WAC. That means that if
        // an ACL is advertised, we can still fetch its metadata — if that indicates
        // that it's actually an ACP Access Control Resource, then we can fetch that
        // instead.
        const aclResourceInfo = await getResourceInfo(resource.internal_resourceInfo.aclUrl, options);
        if (isAcr(aclResourceInfo)) {
            acrUrl = getSourceUrl(aclResourceInfo);
        }
    }
    // If the Resource doesn't advertise an ACR via the old Link header,
    // nor via a rel="acl" header, then return, indicating that no ACR could be
    // fetched:
    if (typeof acrUrl !== "string") {
        return {
            internal_acp: {
                acr: null,
            },
        };
    }
    let acr;
    try {
        acr = await getSolidDataset(acrUrl, options);
    }
    catch (e) {
        return {
            internal_acp: {
                acr: null,
            },
        };
    }
    const acrDataset = Object.assign(Object.assign({}, acr), { accessTo: getSourceUrl(resource) });
    const acpInfo = {
        internal_acp: {
            acr: acrDataset,
        },
    };
    return acpInfo;
}
/**
 * ```{note} The Web Access Control specification is not yet finalised. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * To make it easy to fetch all the relevant Access Policy Resources,
 * this function returns all referenced Access Policy Resources referenced in an
 * Access Control Resource.
 * In other words, if Access Controls refer to different Policies in the same
 * Access Policy Resource, this function will only return that Access Policy
 * Resource's URL once.
 *
 * @param withAcr A Resource with an Access Control Resource attached.
 * @returns List of all unique Access Policy Resources that are referenced in the given Access Control Resource.
 * @since 1.6.0
 */
function getReferencedPolicyUrlAll(withAcr) {
    const policyUrls = getPolicyUrlAll(withAcr)
        .map(normalizeServerSideIri)
        .concat(getMemberPolicyUrlAll(withAcr).map(normalizeServerSideIri))
        .concat(getAcrPolicyUrlAll(withAcr).map(normalizeServerSideIri))
        .concat(getMemberAcrPolicyUrlAll(withAcr).map(normalizeServerSideIri));
    const uniqueUrls = Array.from(new Set(policyUrls));
    return uniqueUrls;
}

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
function getAgentAll$1(rule) {
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
function setAgent$1(rule, agent) {
    // Preserve the special agent classes authenticated and public, which we
    // don't want to overwrite with this function.
    const isPublic = hasPublic$1(rule);
    const isAuthenticated = hasAuthenticated$1(rule);
    const isCreator = hasCreator$1(rule);
    let result = setIri(rule, acp.agent, agent);
    // Restore public and authenticated
    if (isPublic) {
        result = setPublic$1(result);
    }
    if (isAuthenticated) {
        result = setAuthenticated$1(result);
    }
    if (isCreator) {
        result = setCreator$1(result);
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
function addAgent$1(rule, agent) {
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
function removeAgent$1(rule, agent) {
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
function hasPublic$1(rule) {
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
function setPublic$1(rule) {
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
function removePublic$1(rule) {
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
function hasAuthenticated$1(rule) {
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
function setAuthenticated$1(rule) {
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
function removeAuthenticated$1(rule) {
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
function hasCreator$1(rule) {
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
function setCreator$1(rule) {
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
function removeCreator$1(rule) {
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
function getClientAll$1(rule) {
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
function setClient$1(rule, client) {
    // Preserve the special "any client" class, which we
    // don't want to overwrite with this function.
    const anyClientEnabled = hasAnyClient$1(rule);
    let result = setIri(rule, acp.client, client);
    // Restore the "any client" class
    if (anyClientEnabled) {
        result = setAnyClient$1(result);
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
function addClient$1(rule, client) {
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
function removeClient$1(rule, client) {
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
function hasAnyClient$1(rule) {
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
function setAnyClient$1(rule) {
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
function removeAnyClient$1(rule) {
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
    if (hasPublic$1(rule)) {
        targetEnumeration += "- Everyone\n";
    }
    if (hasAuthenticated$1(rule)) {
        targetEnumeration += "- All authenticated agents\n";
    }
    if (hasCreator$1(rule)) {
        targetEnumeration += "- The creator of this resource\n";
    }
    if (hasAnyClient$1(rule)) {
        targetEnumeration += "- Users of any client application\n";
    }
    const targetAgents = getAgentAll$1(rule);
    if (targetAgents.length > 0) {
        targetEnumeration += "- The following agents:\n  - ";
        targetEnumeration += targetAgents.join("\n  - ") + "\n";
    }
    const targetGroups = getGroupAll(rule);
    if (targetGroups.length > 0) {
        targetEnumeration += "- Members of the following groups:\n  - ";
        targetEnumeration += targetGroups.join("\n  - ") + "\n";
    }
    const targetClients = getClientAll$1(rule);
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
 * @param thing the [[Thing]] to check to see if it's an ACP Policy or not
 */
function isPolicy(thing) {
    return getIriAll(thing, rdf.type).includes(acp.Policy);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Initialise a new, empty [[Policy]].
 *
 * @param url URL that identifies this Policy.
 * @since 1.6.0
 */
function createPolicy(url) {
    const stringUrl = internal_toIriString(url);
    let policyThing = createThing({ url: stringUrl });
    policyThing = setUrl(policyThing, rdf.type, acp.Policy);
    return policyThing;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the [[Policy]] with the given URL from an [[SolidDataset]].
 *
 * @param policyResource The Resource that contains the given Policy.
 * @param url URL that identifies this Policy.
 * @returns The requested Policy, if it exists, or `null` if it does not.
 * @since 1.6.0
 */
function getPolicy(policyResource, url) {
    const foundThing = getThing(policyResource, url);
    if (foundThing === null || !isPolicy(foundThing)) {
        return null;
    }
    return foundThing;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get all [[Policy]]'s in a given [[SolidDataset]].
 *
 * @param policyResource The Resource that contains Access Policies.
 * @since 1.6.0
 */
function getPolicyAll(policyResource) {
    const foundThings = getThingAll(policyResource);
    const foundPolicies = foundThings.filter((thing) => !isThingLocal(thing) && isPolicy(thing));
    return foundPolicies;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Remove the given [[Policy]] from the given [[SolidDataset]].
 *
 * @param policyResource The Resource that contains Access Policies.
 * @param policy The Policy to remove from the resource.
 * @since 1.6.0
 */
function removePolicy(policyResource, policy) {
    return removeThing(policyResource, policy);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Insert the given [[Policy]] into the given [[SolidDataset]], replacing previous instances of that Policy.
 *
 * @param policyResource The Resource that contains Access Policies.
 * @param policy The Policy to insert into the Resource.
 * @returns A new dataset equal to the given resource, but with the given Policy.
 * @since 1.6.0
 */
function setPolicy(policyResource, policy) {
    return setThing(policyResource, policy);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Given a [[Policy]] and a set of [[AccessModes]], return a new Policy based on the given
 * Policy, but with the given Access Modes allowed on it.
 *
 * @param policy The Policy on which to set the modes to allow.
 * @param modes Modes to allow for this Policy.
 * @since Not released yet.
 */
function setAllowModesV2(policy, modes) {
    let newPolicy = removeAll(policy, acp.allow);
    if (modes.read === true) {
        newPolicy = addIri(newPolicy, acp.allow, internal_accessModeIriStrings.read);
    }
    if (modes.append === true) {
        newPolicy = addIri(newPolicy, acp.allow, internal_accessModeIriStrings.append);
    }
    if (modes.write === true) {
        newPolicy = addIri(newPolicy, acp.allow, internal_accessModeIriStrings.write);
    }
    return newPolicy;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Given a [[Policy]] and a set of [[AccessModes]], return a new Policy based on the given
 * Policy, but with the given Access Modes allowed on it.
 *
 * @param policy The Policy on which to set the modes to allow.
 * @param modes Modes to allow for this Policy.
 * @since 1.6.0
 * @deprecated The Access Control Policies proposal will be updated to use a different vocabulary for allow- and deny-modes. To be compatible with servers that implement that, use [[setAllowModesV2]].
 */
function setAllowModesV1(policy, modes) {
    let newPolicy = removeAll(policy, acp.allow);
    if (modes.read === true) {
        newPolicy = addIri(newPolicy, acp.allow, acp.Read);
    }
    if (modes.append === true) {
        newPolicy = addIri(newPolicy, acp.allow, acp.Append);
    }
    if (modes.write === true) {
        newPolicy = addIri(newPolicy, acp.allow, acp.Write);
    }
    return newPolicy;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Given a [[Policy]], return which [[AccessModes]] it allows.
 *
 * @param policy The Policy for which you want to know the Access Modes it allows.
 * @since Not released yet.
 */
function getAllowModesV2(policy) {
    const allowedModes = getIriAll(policy, acp.allow);
    return {
        read: allowedModes.includes(internal_accessModeIriStrings.read),
        append: allowedModes.includes(internal_accessModeIriStrings.append),
        write: allowedModes.includes(internal_accessModeIriStrings.write),
    };
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Given a [[Policy]], return which [[AccessModes]] it allows.
 *
 * @param policy The Policy for which you want to know the Access Modes it allows.
 * @since 1.6.0
 * @deprecated The Access Control Policies proposal will be updated to use a different vocabulary for allow- and deny-modes. To be compatible with servers that implement that, use [[getAllowModesV2]].
 */
function getAllowModesV1(policy) {
    const allowedModes = getIriAll(policy, acp.allow);
    return {
        read: allowedModes.includes(acp.Read),
        append: allowedModes.includes(acp.Append),
        write: allowedModes.includes(acp.Write),
    };
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Given a [[Policy]] and a set of [[AccessModes]], return a new Policy based on the given
 * Policy, but with the given Access Modes disallowed on it.
 *
 * @param policy The Policy on which to set the modes to disallow.
 * @param modes Modes to disallow for this Policy.
 * @since Not released yet.
 */
function setDenyModesV2(policy, modes) {
    let newPolicy = removeAll(policy, acp.deny);
    if (modes.read === true) {
        newPolicy = addIri(newPolicy, acp.deny, internal_accessModeIriStrings.read);
    }
    if (modes.append === true) {
        newPolicy = addIri(newPolicy, acp.deny, internal_accessModeIriStrings.append);
    }
    if (modes.write === true) {
        newPolicy = addIri(newPolicy, acp.deny, internal_accessModeIriStrings.write);
    }
    return newPolicy;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Given a [[Policy]] and a set of [[AccessModes]], return a new Policy based on the given
 * Policy, but with the given Access Modes disallowed on it.
 *
 * @param policy The Policy on which to set the modes to disallow.
 * @param modes Modes to disallow for this Policy.
 * @since 1.6.0
 * @deprecated The Access Control Policies proposal will be updated to use a different vocabulary for allow- and deny-modes. To be compatible with servers that implement that, use [[setDenyModesV2]].
 */
function setDenyModesV1(policy, modes) {
    let newPolicy = removeAll(policy, acp.deny);
    if (modes.read === true) {
        newPolicy = addIri(newPolicy, acp.deny, acp.Read);
    }
    if (modes.append === true) {
        newPolicy = addIri(newPolicy, acp.deny, acp.Append);
    }
    if (modes.write === true) {
        newPolicy = addIri(newPolicy, acp.deny, acp.Write);
    }
    return newPolicy;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Given a [[Policy]], return which [[AccessModes]] it disallows.
 *
 * @param policy The Policy on which you want to know the Access Modes it disallows.
 * @since Not released yet.
 */
function getDenyModesV2(policy) {
    const deniedModes = getIriAll(policy, acp.deny);
    return {
        read: deniedModes.includes(internal_accessModeIriStrings.read),
        append: deniedModes.includes(internal_accessModeIriStrings.append),
        write: deniedModes.includes(internal_accessModeIriStrings.write),
    };
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Given a [[Policy]], return which [[AccessModes]] it disallows.
 *
 * @param policy The Policy on which you want to know the Access Modes it disallows.
 * @since 1.6.0
 * @deprecated The Access Control Policies proposal will be updated to use a different vocabulary for allow- and deny-modes. To be compatible with servers that implement that, use [[getDenyModesV2]].
 */
function getDenyModesV1(policy) {
    const deniedModes = getIriAll(policy, acp.deny);
    return {
        read: deniedModes.includes(acp.Read),
        append: deniedModes.includes(acp.Append),
        write: deniedModes.includes(acp.Write),
    };
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Initialise a new, empty [[ResourcePolicy]] for the given Resource.
 *
 * @param resourceWithAcr The Resource to which the Policy is to apply.
 * @param name The name that identifies this Policy.
 * @since 1.6.0
 */
function createResourcePolicyFor(resourceWithAcr, name) {
    const acr = internal_getAcr(resourceWithAcr);
    const url = new URL(getSourceUrl(acr));
    url.hash = `#${name}`;
    let policyThing = createThing({ url: url.href });
    policyThing = setUrl(policyThing, rdf.type, acp.Policy);
    return policyThing;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the [[ResourcePolicy]] with the given name that applies to a Resource
 * from its Access Control Resource.
 *
 * @param resourceWithAcr The Resource whose ACR contains the given Policy.
 * @param name The name that identifies this Policy.
 * @returns The requested Policy, if it exists and applies to the given Resource, or `null` if it does not.
 * @since 1.6.0
 */
function getResourcePolicy(resourceWithAcr, name) {
    const acr = internal_getAcr(resourceWithAcr);
    const acrUrl = getSourceUrl(acr);
    const url = new URL(acrUrl);
    url.hash = `#${name}`;
    const foundThing = getThing(acr, url.href);
    if (!getPolicyUrlAll(resourceWithAcr).includes(url.href) ||
        foundThing === null ||
        !isPolicy(foundThing)) {
        return null;
    }
    return foundThing;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the [[ResourcePolicy]] with the given name that applies to a Resource's
 * Access Control Resource from that Access Control Resource.
 *
 * @param resourceWithAcr The Resource whose ACR contains the given Policy.
 * @param name The name that identifies this Policy.
 * @returns The requested Policy, if it exists and applies to the Resource's ACR, or `null` if it does not.
 * @since 1.6.0
 */
function getResourceAcrPolicy(resourceWithAcr, name) {
    const acr = internal_getAcr(resourceWithAcr);
    const acrUrl = getSourceUrl(acr);
    const url = new URL(acrUrl);
    url.hash = `#${name}`;
    const foundThing = getThing(acr, url.href);
    if (!getAcrPolicyUrlAll(resourceWithAcr).includes(url.href) ||
        foundThing === null ||
        !isPolicy(foundThing)) {
        return null;
    }
    return foundThing;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get all [[ResourcePolicy]]'s that apply to a Resource in its Access Control
 * Resource.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains Access Policies applying to it.
 * @since 1.6.0
 */
function getResourcePolicyAll(resourceWithAcr) {
    const acr = internal_getAcr(resourceWithAcr);
    const policyUrls = getPolicyUrlAll(resourceWithAcr);
    const foundThings = policyUrls.map((policyUrl) => getThing(acr, policyUrl));
    const foundPolicies = foundThings.filter((thing) => thing !== null && isPolicy(thing));
    return foundPolicies;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get all [[ResourcePolicy]]'s that apply to a given Resource's Access Control
 * Resource from that Access Control Resource.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains Access Policies.
 * @since 1.6.0
 */
function getResourceAcrPolicyAll(resourceWithAcr) {
    const acr = internal_getAcr(resourceWithAcr);
    const policyUrls = getAcrPolicyUrlAll(resourceWithAcr);
    const foundThings = policyUrls.map((policyUrl) => getThing(acr, policyUrl));
    const foundPolicies = foundThings.filter((thing) => thing !== null && isPolicy(thing));
    return foundPolicies;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Remove the given [[ResourcePolicy]] from the given Resource's Access Control
 * Resource.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains Access Policies.
 * @param policy The Policy to remove from the Resource's Access Control Resource.
 * @since 1.6.0
 */
function removeResourcePolicy(resourceWithAcr, policy) {
    const acr = internal_getAcr(resourceWithAcr);
    let policyToRemove = policy;
    if (typeof policyToRemove === "string") {
        try {
            new URL(policyToRemove);
        }
        catch (e) {
            // If the given Policy to remove is the name of the Policy,
            // resolve it to its full URL — developers usually refer to either the
            // Policy itself, or by its name, as they do not have access to the ACR
            // directly.
            const policyUrl = new URL(getSourceUrl(acr));
            policyUrl.hash = `#${policy}`;
            policyToRemove = policyUrl.href;
        }
    }
    let policyUrlString;
    if (typeof policyToRemove === "string") {
        policyUrlString = policyToRemove;
    }
    else if (isNamedNode(policyToRemove)) {
        policyUrlString = internal_toIriString(policyToRemove);
    }
    else {
        policyUrlString = asUrl(policyToRemove, getSourceUrl(acr));
    }
    // Check whether the actual Policy (i.e. with the Policy type) exists:
    const matchingRule = getResourcePolicy(resourceWithAcr, new URL(policyUrlString).hash.substring(1));
    if (matchingRule === null) {
        // No such Policy exists yet, so return the Resource+ACR unchanged:
        return resourceWithAcr;
    }
    const updatedAcr = removeThing(acr, policyToRemove);
    const updatedResource = internal_setAcr(resourceWithAcr, updatedAcr);
    return removePolicyUrl(updatedResource, policyUrlString);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Remove the given [[ResourcePolicy]] that applies to a given Resource's Access
 * Control Resource from that Access Control Resource.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains Access Policies.
 * @param policy The ACR Policy to remove from the Resource's Access Control Resource.
 * @since 1.6.0
 */
function removeResourceAcrPolicy(resourceWithAcr, policy) {
    const acr = internal_getAcr(resourceWithAcr);
    let policyToRemove = policy;
    if (typeof policyToRemove === "string") {
        try {
            new URL(policyToRemove);
        }
        catch (e) {
            // If the given Policy to remove is the name of the Policy,
            // resolve it to its full URL — developers usually refer to either the
            // Policy itself, or by its name, as they do not have access to the ACR
            // directly.
            const policyUrl = new URL(getSourceUrl(acr));
            policyUrl.hash = `#${policy}`;
            policyToRemove = policyUrl.href;
        }
    }
    let policyUrlString;
    if (typeof policyToRemove === "string") {
        policyUrlString = policyToRemove;
    }
    else if (isNamedNode(policyToRemove)) {
        policyUrlString = internal_toIriString(policyToRemove);
    }
    else {
        policyUrlString = asUrl(policyToRemove, getSourceUrl(acr));
    }
    // Check whether the actual Policy (i.e. with the Policy type) exists:
    const matchingRule = getResourceAcrPolicy(resourceWithAcr, new URL(policyUrlString).hash.substring(1));
    if (matchingRule === null) {
        // No such Policy exists yet, so return the Resource+ACR unchanged:
        return resourceWithAcr;
    }
    const updatedAcr = removeThing(acr, policyToRemove);
    const updatedResource = internal_setAcr(resourceWithAcr, updatedAcr);
    return removeAcrPolicyUrl(updatedResource, policyUrlString);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Insert the given [[ResourcePolicy]] into the given Resource's Acccess Control
 * Resource, replacing previous instances of that Policy.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains Access Policies.
 * @param policy The Policy to insert into the Resource's Access Control Resource.
 * @returns A new Resource equal to the given Resource, but with the given Policy in its Access Control Resource.
 * @since 1.6.0
 */
function setResourcePolicy(resourceWithAcr, policy) {
    const acr = internal_getAcr(resourceWithAcr);
    const updatedAcr = setThing(acr, policy);
    const updatedResource = internal_setAcr(resourceWithAcr, updatedAcr);
    const policyUrl = asUrl(policy, getSourceUrl(acr));
    return addPolicyUrl(updatedResource, policyUrl);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Insert the given [[ResourcePolicy]] into the given Resource's Acccess Control
 * Resource, replacing previous instances of that Policy, to apply to the Access
 * Control Resource itself.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains Access Policies.
 * @param policy The Policy to insert into the Resource's Access Control Resource.
 * @returns A new Resource equal to the given Resource, but with the given Policy in its Access Control Resource, applying to that Access Control Resource.
 * @since 1.6.0
 */
function setResourceAcrPolicy(resourceWithAcr, policy) {
    const acr = internal_getAcr(resourceWithAcr);
    const updatedAcr = setThing(acr, policy);
    const updatedResource = internal_setAcr(resourceWithAcr, updatedAcr);
    const policyUrl = asUrl(policy, getSourceUrl(acr));
    return addAcrPolicyUrl(updatedResource, policyUrl);
}
/**
 * Gets a human-readable representation of the given [[Policy]] to aid debugging.
 *
 * Note that changes to the exact format of the return value are not considered a breaking change;
 * it is intended to aid in debugging, not as a serialisation method that can be reliably parsed.
 *
 * @param policy The Policy to get a human-readable representation of.
 * @since 1.6.0
 */
function policyAsMarkdown(policy) {
    function getStatus(allow, deny) {
        if (deny) {
            return "denied";
        }
        if (allow) {
            return "allowed";
        }
        return "unspecified";
    }
    const allowModes = getAllowModesV1(policy);
    const denyModes = getDenyModesV1(policy);
    let markdown = `## Policy: ${asUrl(policy)}\n\n`;
    markdown += `- Read: ${getStatus(allowModes.read, denyModes.read)}\n`;
    markdown += `- Append: ${getStatus(allowModes.append, denyModes.append)}\n`;
    markdown += `- Write: ${getStatus(allowModes.write, denyModes.write)}\n`;
    const allOfRules = getAllOfRuleUrlAll(policy);
    const anyOfRules = getAnyOfRuleUrlAll(policy);
    const noneOfRules = getNoneOfRuleUrlAll(policy);
    if (allOfRules.length === 0 &&
        anyOfRules.length === 0 &&
        noneOfRules.length === 0) {
        markdown += "\n<no rules specified yet>\n";
    }
    if (allOfRules.length > 0) {
        markdown += "\nAll of these rules should match:\n";
        markdown += "- " + allOfRules.join("\n- ") + "\n";
    }
    if (anyOfRules.length > 0) {
        markdown += "\nAt least one of these rules should match:\n";
        markdown += "- " + anyOfRules.join("\n- ") + "\n";
    }
    if (noneOfRules.length > 0) {
        markdown += "\nNone of these rules should match:\n";
        markdown += "- " + noneOfRules.join("\n- ") + "\n";
    }
    return markdown;
}

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
 *
 * ```{warning}
 * Do not use this function in production code.  For use in **unit tests** that require a
 * [[AccessControlResource]].
 * ```
 *
 * Initialises a new empty Access Control Resource for a given Resource for use
 * in **unit tests**.
 *
 * @param resourceUrl The URL of the Resource to which the mocked ACR should apply.
 * @returns The mocked empty Access Control Resource for the given Resource.
 * @since 1.6.0
 */
function mockAcrFor(resourceUrl) {
    const acrUrl = new URL("access-control-resource", resourceUrl).href;
    const acr = Object.assign(Object.assign({}, mockSolidDatasetFrom(acrUrl)), { accessTo: resourceUrl });
    return acr;
}
/**
 * ```{warning}
 * Do not use this function in production code.  For use in **unit tests** that require a
 * Resource with an [[AccessControlResource]].
 * ```
 *
 * Attaches an Access Control Resource to a given [[SolidDataset]] for use
 * in **unit tests**; e.g., unit tests that call [[getPolicyUrlAll]].
 *
 * @param resource The Resource to mock up with a new resource ACL.
 * @param accessControlResource The Access Control Resource to attach to the given Resource.
 * @returns The input Resource with an empty resource ACL attached.
 * @since 1.6.0
 */
function addMockAcrTo(resource, accessControlResource = mockAcrFor(getSourceUrl(resource))) {
    const resourceWithAcr = Object.assign(internal_cloneResource(resource), {
        internal_acp: {
            acr: accessControlResource,
            aprs: {},
        },
    });
    return resourceWithAcr;
}

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
const v2AcpFunctions = {
    getFileWithAccessDatasets,
    getFileWithAcr,
    getReferencedPolicyUrlAll,
    getResourceInfoWithAccessDatasets,
    getResourceInfoWithAcr,
    getSolidDatasetWithAccessDatasets,
    getSolidDatasetWithAcr,
    hasAccessibleAcr,
    saveAcrFor,
};
const v2ControlFunctions = {
    acrAsMarkdown,
    addAcrPolicyUrl,
    addMemberAcrPolicyUrl,
    addMemberPolicyUrl,
    addPolicyUrl,
    getAcrPolicyUrlAll,
    getMemberAcrPolicyUrlAll,
    getMemberPolicyUrlAll,
    getPolicyUrlAll,
    hasLinkedAcr,
    removeAcrPolicyUrl,
    removeAcrPolicyUrlAll,
    removeMemberAcrPolicyUrl,
    removeMemberAcrPolicyUrlAll,
    removeMemberPolicyUrl,
    removeMemberPolicyUrlAll,
    removePolicyUrl,
    removePolicyUrlAll,
};
const v2PolicyFunctions = {
    createPolicy,
    getAllowModes: getAllowModesV1,
    getDenyModes: getDenyModesV1,
    getPolicy,
    getPolicyAll,
    policyAsMarkdown,
    removePolicy,
    setAllowModes: setAllowModesV1,
    setDenyModes: setDenyModesV1,
    setPolicy,
};
const v2RuleFunctions = {
    addAgent: addAgent$1,
    addForbiddenRuleUrl: addNoneOfRuleUrl,
    addGroup,
    addOptionalRuleUrl: addAnyOfRuleUrl,
    addRequiredRuleUrl: addAllOfRuleUrl,
    createRule,
    getAgentAll: getAgentAll$1,
    getForbiddenRuleUrlAll: getNoneOfRuleUrlAll,
    getGroupAll,
    getOptionalRuleUrlAll: getAnyOfRuleUrlAll,
    getRequiredRuleUrlAll: getAllOfRuleUrlAll,
    getRule,
    getRuleAll,
    hasAuthenticated: hasAuthenticated$1,
    hasCreator: hasCreator$1,
    hasPublic: hasPublic$1,
    removeAgent: removeAgent$1,
    removeForbiddenRuleUrl: removeNoneOfRuleUrl,
    removeGroup,
    removeOptionalRuleUrl: removeAnyOfRuleUrl,
    removeRequiredRuleUrl: removeAllOfRuleUrl,
    removeRule,
    ruleAsMarkdown,
    setAgent: setAgent$1,
    setForbiddenRuleUrl: setNoneOfRuleUrl,
    setGroup,
    setOptionalRuleUrl: setAnyOfRuleUrl,
    setRequiredRuleUrl: setAllOfRuleUrl,
    setRule,
};
const v2MockFunctions = {
    addMockAcrTo,
    mockAcrFor,
};
/* istanbul ignore next Not a supported public API: */
/** @deprecated Replaced by [[setPublic]] */
function previousSetPublicSignature(rule, enable) {
    return enable ? setPublic$1(rule) : removePublic$1(rule);
}
/* istanbul ignore next Not a supported public API: */
/** @deprecated Replaced by [[setAuthenticated]] */
function previousSetAuthenticatedSignature(rule, enable) {
    return enable ? setAuthenticated$1(rule) : removeAuthenticated$1(rule);
}
/* istanbul ignore next Not a supported public API: */
/** @deprecated Replaced by [[setCreator]] */
function previousSetCreatorSignature(rule, enable) {
    return enable ? setCreator$1(rule) : removeCreator$1(rule);
}
const deprecatedFunctions$1 = {
    /** @deprecated This misspelling was included accidentally. The correct function is [[getForbiddenRuleUrlAll]]. */
    getForbiddenRuleurlAll: getNoneOfRuleUrlAll,
    setPublic: previousSetPublicSignature,
    setAuthenticated: previousSetAuthenticatedSignature,
    setCreator: previousSetCreatorSignature,
};
/**
 * @hidden
 * @deprecated Replaced by [[acp_v3]].
 */
const acp_v2 = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, v2AcpFunctions), v2ControlFunctions), v2PolicyFunctions), v2RuleFunctions), v2MockFunctions), deprecatedFunctions$1);

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
const v1AcpFunctions = {
    getFileWithAccessDatasets,
    getFileWithAcr,
    getReferencedPolicyUrlAll,
    getResourceInfoWithAccessDatasets,
    getResourceInfoWithAcr,
    getSolidDatasetWithAccessDatasets,
    getSolidDatasetWithAcr,
    hasAccessibleAcr,
    saveAcrFor,
};
const v1PolicyFunctions = {
    createPolicy,
    getAllowModes: getAllowModesV1,
    getDenyModes: getDenyModesV1,
    getPolicy,
    getPolicyAll,
    policyAsMarkdown,
    removePolicy,
    setAllowModes: setAllowModesV1,
    setDenyModes: setDenyModesV1,
    setPolicy,
};
const v1RuleFunctions = {
    addAgent: addAgent$1,
    addForbiddenRuleUrl: addNoneOfRuleUrl,
    addGroup,
    addOptionalRuleUrl: addAnyOfRuleUrl,
    addRequiredRuleUrl: addAllOfRuleUrl,
    createRule,
    getAgentAll: getAgentAll$1,
    getForbiddenRuleUrlAll: getNoneOfRuleUrlAll,
    getGroupAll,
    getOptionalRuleUrlAll: getAnyOfRuleUrlAll,
    getRequiredRuleUrlAll: getAllOfRuleUrlAll,
    getRule,
    getRuleAll,
    hasAuthenticated: hasAuthenticated$1,
    hasCreator: hasCreator$1,
    hasPublic: hasPublic$1,
    removeAgent: removeAgent$1,
    removeForbiddenRuleUrl: removeNoneOfRuleUrl,
    removeGroup,
    removeOptionalRuleUrl: removeAnyOfRuleUrl,
    removeRequiredRuleUrl: removeAllOfRuleUrl,
    removeRule,
    ruleAsMarkdown,
    setAgent: setAgent$1,
    setForbiddenRuleUrl: setNoneOfRuleUrl,
    setGroup,
    setOptionalRuleUrl: setAnyOfRuleUrl,
    setRequiredRuleUrl: setAllOfRuleUrl,
    setRule,
};
const v1MockFunctions = {
    addMockAcrTo,
    mockAcrFor,
};
const v1ControlFunctions = {
    hasLinkedAcr,
    addAcrPolicyUrl,
    addMemberAcrPolicyUrl,
    getAcrPolicyUrlAll,
    getMemberAcrPolicyUrlAll,
    removeAcrPolicyUrl,
    removeAcrPolicyUrlAll,
    removeMemberAcrPolicyUrl,
    removeMemberAcrPolicyUrlAll,
};
const deprecatedFunctions = {
    createControl: internal_createControl,
    getControl: internal_getControl,
    getAllControl: internal_getControlAll,
    getControlAll: internal_getControlAll,
    setControl: internal_setControl,
    removeControl: removeControl,
    addPolicyUrl: internal_addPolicyUrl,
    getPolicyUrlAll: internal_getPolicyUrlAll,
    removePolicyUrl: internal_removePolicyUrl,
    removePolicyUrlAll: internal_removePolicyUrlAll,
    addMemberPolicyUrl: internal_addMemberPolicyUrl,
    getMemberPolicyUrlAll: internal_getMemberPolicyUrlAll,
    removeMemberPolicyUrl: internal_getMemberPolicyUrlAll,
    removeMemberPolicyUrlAll: internal_removeMemberPolicyUrlAll,
    /** @deprecated This misspelling was included accidentally. The correct function is [[getForbiddenRuleUrlAll]]. */
    getForbiddenRuleurlAll: getNoneOfRuleUrlAll,
    setPublic: previousSetPublicSignature,
    setAuthenticated: previousSetAuthenticatedSignature,
    setCreator: previousSetCreatorSignature,
};
/**
 * @hidden
 * @deprecated Replaced by [[acp_v2]].
 */
const acp_v1 = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, v1AcpFunctions), v1PolicyFunctions), v1RuleFunctions), v1MockFunctions), v1ControlFunctions), deprecatedFunctions);
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
function removeControl(withAccessControlResource, control) {
    const acr = internal_getAcr(withAccessControlResource);
    const updatedAcr = removeThing(acr, control);
    const updatedResource = internal_setAcr(withAccessControlResource, updatedAcr);
    return updatedResource;
}

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
const v3AcpFunctions = {
    getFileWithAccessDatasets,
    getFileWithAcr,
    getReferencedPolicyUrlAll,
    getResourceInfoWithAccessDatasets,
    getResourceInfoWithAcr,
    getSolidDatasetWithAccessDatasets,
    getSolidDatasetWithAcr,
    hasAccessibleAcr,
    saveAcrFor,
};
const v3ControlFunctions = {
    acrAsMarkdown,
    addAcrPolicyUrl,
    addMemberAcrPolicyUrl,
    addMemberPolicyUrl,
    addPolicyUrl,
    getAcrPolicyUrlAll,
    getMemberAcrPolicyUrlAll,
    getMemberPolicyUrlAll,
    getPolicyUrlAll,
    hasLinkedAcr,
    removeAcrPolicyUrl,
    removeAcrPolicyUrlAll,
    removeMemberAcrPolicyUrl,
    removeMemberAcrPolicyUrlAll,
    removeMemberPolicyUrl,
    removeMemberPolicyUrlAll,
    removePolicyUrl,
    removePolicyUrlAll,
};
const v3PolicyFunctions = {
    createPolicy,
    getAllowModes: getAllowModesV1,
    getDenyModes: getDenyModesV1,
    getPolicy,
    getPolicyAll,
    policyAsMarkdown,
    removePolicy,
    setAllowModes: setAllowModesV1,
    setDenyModes: setDenyModesV1,
    setPolicy,
    createResourcePolicyFor,
    getResourceAcrPolicy,
    getResourceAcrPolicyAll,
    getResourcePolicy,
    getResourcePolicyAll,
    removeResourceAcrPolicy,
    removeResourcePolicy,
    setResourceAcrPolicy,
    setResourcePolicy,
};
const v3RuleFunctions = {
    addAgent: addAgent$1,
    addGroup,
    createRule,
    getAgentAll: getAgentAll$1,
    getGroupAll,
    getRule,
    getRuleAll,
    removeAgent: removeAgent$1,
    removeGroup,
    removeRule,
    ruleAsMarkdown,
    setAgent: setAgent$1,
    setGroup,
    setRule,
    addClient: addClient$1,
    getClientAll: getClientAll$1,
    hasAnyClient: hasAnyClient$1,
    removeClient: removeClient$1,
    setAnyClient: setAnyClient$1,
    setClient: setClient$1,
    removeAnyClient: removeAnyClient$1,
    hasAuthenticated: hasAuthenticated$1,
    hasCreator: hasCreator$1,
    hasPublic: hasPublic$1,
    setAuthenticated: setAuthenticated$1,
    setCreator: setCreator$1,
    setPublic: setPublic$1,
    removeAuthenticated: removeAuthenticated$1,
    removeCreator: removeCreator$1,
    removePublic: removePublic$1,
    getAnyOfRuleUrlAll,
    addAnyOfRuleUrl,
    removeAnyOfRuleUrl,
    setAnyOfRuleUrl,
    getAllOfRuleUrlAll,
    addAllOfRuleUrl,
    removeAllOfRuleUrl,
    setAllOfRuleUrl,
    getNoneOfRuleUrlAll,
    addNoneOfRuleUrl,
    removeNoneOfRuleUrl,
    setNoneOfRuleUrl,
    createResourceRuleFor,
    getResourceRule,
    getResourceRuleAll,
    removeResourceRule,
    setResourceRule,
};
const v3MockFunctions = {
    addMockAcrTo,
    mockAcrFor,
};
/**
 * @hidden
 * @deprecated Please import directly from the "acp/*" modules.
 */
const acp_v3 = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, v3AcpFunctions), v3ControlFunctions), v3PolicyFunctions), v3RuleFunctions), v3MockFunctions);

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
 * @param thing the [[Thing]] to check to see if it's an ACP Matcher or not
 */
function isMatcher(thing) {
    return getIriAll(thing, rdf.type).includes(acp.Matcher);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Add a Matcher that refines the scope of a given the [[Policy]]. If an agent
 * requesting access to a resource is **not** present in **any** of the "All Of" Matchers,
 * they will not be granted access.
 *
 * Also see [[addAnyOfMatcherUrl]] and [[addNoneOfMatcherUrl]].
 *
 * @param policy The [[Policy]] to which the Matcher should be added.
 * @param matcher The Matcher to add to the policy.
 * @returns A new [[Policy]] clone of the original one, with the new Matcher added.
 * @since Not released yet.
 */
function addAllOfMatcherUrl(policy, matcher) {
    return addIri(policy, acp.allOf, matcher);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Removes a Matcher that refines the scope of a given the [[Policy]]. If an agent
 * requesting access to a resource is **not** present in **any** of the "All Of" Matchers,
 * they will not be granted access.
 * @param policy The [[Policy]] from which the Matcher should be removed.
 * @param matcher The Matcher to remove from the policy.
 * @returns A new [[Policy]] clone of the original one, with the Matcher removed.
 * @since Not released yet.
 */
function removeAllOfMatcherUrl(policy, matcher) {
    return removeIri(policy, acp.allOf, matcher);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Overwrites the Matcher refining the scope of a given the [[Policy]]. If an agent
 * requesting access to a resource is **not** present in **any** of the "All Of" Matchers,
 * they will not be granted access.
 * @param policy The [[Policy]] to which the Matcher should be added.
 * @param matcher The Matcher to set for the Policy.
 * @returns A new [[Policy]] clone of the original one, with the "All Of" Matchers replaced.
 * @since Not released yet.
 */
function setAllOfMatcherUrl(policy, matcher) {
    return setIri(policy, acp.allOf, matcher);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the "All Of" [[Matcher]]s for the given [[Policy]]
 * @param policy The [[policy]] from which the Matchers should be read.
 * @returns A list of the "All Of" [[Matcher]]s
 * @since Not released yet.
 */
function getAllOfMatcherUrlAll(policy) {
    return getIriAll(policy, acp.allOf);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Add a Matcher that extends the scope of a given the [[Policy]]. If an agent
 * requesting access to a resource is present in **any** of the "Any Of" Matchers,
 * they will be granted access.
 *
 * Also see [[addAllOfMatcherUrl]] and [[addNoneOfMatcherUrl]].
 *
 * @param policy The [[Policy]] to which the Matcher should be added.
 * @param matcher The Matcher to add to the policy.
 * @returns A new [[Policy]] clone of the original one, with the new Matcher added.
 * @since Not released yet.
 */
function addAnyOfMatcherUrl(policy, matcher) {
    return addIri(policy, acp.anyOf, matcher);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Removes a Matcher that extends the scope of a given the [[Policy]]. If an agent
 * requesting access to a resource is present in **any** of the "Any Of" Matchers,
 * they will be granted access.
 * @param policy The [[Policy]] from which the Matcher should be removed.
 * @param matcher The Matcher to remove from the policy.
 * @returns A new [[Policy]] clone of the original one, with the Matcher removed.
 * @since Not released yet.
 */
function removeAnyOfMatcherUrl(policy, matcher) {
    return removeIri(policy, acp.anyOf, matcher);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Overwrite the Matcher extending the scope of a given the [[Policy]]. If an agent
 * requesting access to a resource is present in **any** of the "Any Of" Matchers,
 * they will be granted access.
 * @param policy The [[Policy]] to which the Matcher should be added.
 * @param matcher The Matcher to set for the Policy.
 * @returns A new [[Policy]] clone of the original one, with the "Any Of" Matchers replaced.
 * @since Not released yet.
 */
function setAnyOfMatcherUrl(policy, matcher) {
    return setIri(policy, acp.anyOf, matcher);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the "Any Of" [[Matcher]]s for the given [[Policy]]
 * @param policy The [[policy]] from which the Matchers should be read.
 * @returns A list of the "Any Of" [[Matcher]]s
 * @since Not released yet.
 */
function getAnyOfMatcherUrlAll(policy) {
    return getIriAll(policy, acp.anyOf);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Add a Matcher that restricts the scope of a given the [[Policy]]. If an agent
 * requesting access to a resource is matched by another Matcher, but **also**
 * by the given Matcher, they will **not** be granted access.
 *
 * Also see [[addAllOfMatcherUrl]] and [[addAnyOfMatcherUrl]].
 *
 * @param policy The [[Policy]] to which the Matcher should be added.
 * @param matcher The Matcher to add to the policy.
 * @returns A new [[Policy]] clone of the original one, with the new Matcher added.
 * @since Not released yet.
 */
function addNoneOfMatcherUrl(policy, matcher) {
    return addIri(policy, acp.noneOf, matcher);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Removes a Matcher that restricts the scope of a given the [[Policy]]. If an agent
 * requesting access to a resource is matched by another Matcher, but **also**
 * in any of the "None Of" Matchers, they will **not** be granted access.
 *
 * @param policy The [[Policy]] from which the Matcher should be removed.
 * @param matcher The Matcher to remove from the policy.
 * @returns A new [[Policy]] clone of the original one, with the Matcher removed.
 * @since Not released yet.
 */
function removeNoneOfMatcherUrl(policy, matcher) {
    return removeIri(policy, acp.noneOf, matcher);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Set the Matchers restricting the scope of a given [[Policy]]. If an agent
 * requesting access to a resource is matched by another Matcher, but **also**
 * by any of the "None Of" Matchers, they will not be granted access.
 *
 * @param policy The [[Policy]] to which the Matcher should be added.
 * @param matcher The Matcher to set for the Policy.
 * @returns A new [[Policy]] clone of the original one, with the "None Of" Matchers replaced.
 * @since Not released yet.
 */
function setNoneOfMatcherUrl(policy, matcher) {
    return setIri(policy, acp.noneOf, matcher);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the "None Of" [[Matcher]]s for the given [[Policy]]
 * @param policy The [[policy]] from which the Matchers should be read.
 * @returns A list of the forbidden [[Matcher]]s
 * @since Not released yet.
 */
function getNoneOfMatcherUrlAll(policy) {
    return getIriAll(policy, acp.noneOf);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Initialise a new, empty [[Matcher]].
 *
 * @param url URL that identifies this [[Matcher]].
 * @since Not released yet.
 */
function createMatcher(url) {
    const stringUrl = internal_toIriString(url);
    let matcherThing = createThing({ url: stringUrl });
    matcherThing = setUrl(matcherThing, rdf.type, acp.Matcher);
    return matcherThing;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Initialise a new, empty [[ResourceMatcher]] for the given Resource.
 *
 * @param resourceWithAcr The Resource to which the new Matcher is to apply.
 * @param name Name that identifies this [[Matcher]].
 * @since Not released yet.
 */
function createResourceMatcherFor(resourceWithAcr, name) {
    const acr = internal_getAcr(resourceWithAcr);
    const url = new URL(getSourceUrl(acr));
    url.hash = `#${name}`;
    let matcherThing = createThing({ url: url.href });
    matcherThing = setUrl(matcherThing, rdf.type, acp.Matcher);
    return matcherThing;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the [[Matcher]] with the given URL from an [[SolidDataset]].
 *
 * @param matcherResource The Resource that contains the given [[Matcher]].
 * @param url URL that identifies this [[Matcher]].
 * @returns The requested [[Matcher]], if it exists, or `null` if it does not.
 * @since Not released yet.
 */
function getMatcher(matcherResource, url) {
    const foundThing = getThing(matcherResource, url);
    if (foundThing === null || !isMatcher(foundThing)) {
        return null;
    }
    return foundThing;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Get the [[ResourceMatcher]] with the given name from an Resource's Access Control
 * Resource.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains the given [[ResourceMatcher]].
 * @param name Name that identifies this [[ResourceMatcher]].
 * @returns The requested [[ResourceMatcher]], if it exists, or `null` if it does not.
 * @since Not released yet.
 */
function getResourceMatcher(resourceWithAcr, name) {
    const acr = internal_getAcr(resourceWithAcr);
    const acrUrl = getSourceUrl(acr);
    const url = new URL(acrUrl);
    url.hash = `#${name}`;
    const foundThing = getThing(acr, url.href);
    if (foundThing === null || !isMatcher(foundThing)) {
        return null;
    }
    return foundThing;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Gets the [[Matcher]]s from a [[SolidDataset]].
 *
 * @param matcherResource The Resource that contains (zero or more) [[Matcher]]s.
 * @returns The [[Matcher]]s contained in this resource.
 * @since Not released yet.
 */
function getMatcherAll(matcherResource) {
    const things = getThingAll(matcherResource);
    return things.filter(isMatcher);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Gets the [[ResourceMatcher]]s from a Resource's Access Control Resource.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains (zero or more) [[ResourceMatcher]]s.
 * @returns The [[ResourceMatcher]]s contained in this Resource's Access Control Resource.
 * @since Not released yet.
 */
function getResourceMatcherAll(resourceWithAcr) {
    const acr = internal_getAcr(resourceWithAcr);
    const things = getThingAll(acr);
    return things.filter(isMatcher);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Removes the given [[Matcher]] from the given [[SolidDataset]].
 *
 * @param matcherResource The Resource that contains (zero or more) [[Matcher]]s.
 * @returns A new SolidDataset equal to the given Matcher Resource, but without the given Matcher.
 * @since Not released yet.
 */
function removeMatcher(matcherResource, matcher) {
    return removeThing(matcherResource, matcher);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Removes the given [[ResourceMatcher]] from the given Resource's Access Control Resource.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains (zero or more) [[ResourceMatcher]]s.
 * @returns A new Resource equal to the given Resource, but without the given Matcher in its ACR.
 * @since Not released yet.
 */
function removeResourceMatcher(resourceWithAcr, matcher) {
    const acr = internal_getAcr(resourceWithAcr);
    let matcherToRemove;
    if (typeof matcher === "string") {
        try {
            new URL(matcher);
            matcherToRemove = matcher;
        }
        catch (e) {
            // If the given Matcher to remove is the name of the Matcher,
            // resolve it to its full URL — developers usually refer to either the
            // Matcher itself, or by its name, as they do not have access to the ACR
            // directly.
            const matcherUrl = new URL(getSourceUrl(acr));
            matcherUrl.hash = `#${matcher}`;
            matcherToRemove = matcherUrl.href;
        }
    }
    else if (isNamedNode(matcher)) {
        matcherToRemove = internal_toIriString(matcher);
    }
    else {
        matcherToRemove = asUrl(matcher);
    }
    // Check whether the actual Matcher (i.e. with the Matcher type) exists:
    const matchingMatcher = getResourceMatcher(resourceWithAcr, new URL(matcherToRemove).hash.substring(1));
    if (matchingMatcher === null) {
        // No such Matcher exists yet, so return the Resource+ACR unchanged:
        return resourceWithAcr;
    }
    const updatedAcr = removeThing(acr, matchingMatcher);
    const updatedResource = internal_setAcr(resourceWithAcr, updatedAcr);
    return updatedResource;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Insert the given [[Matcher]] into the given [[SolidDataset]], replacing previous
 * instances of that Matcher.
 *
 * @param matcherResource The Resource that contains (zero or more) [[Matcher]]s.
 * @returns A new SolidDataset equal to the given Matcher Resource, but with the given Matcher.
 * @since Not released yet.
 */
function setMatcher(matcherResource, matcher) {
    return setThing(matcherResource, matcher);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Insert the given [[ResourceMatcher]] into the given Resource's Access Control Resource,
 * replacing previous instances of that Matcher.
 *
 * @param resourceWithAcr The Resource whose Access Control Resource contains (zero or more) [[ResourceMatcher]]s.
 * @returns A new Resource equal to the given Resource, but with the given Matcher in its ACR.
 * @since Not released yet.
 */
function setResourceMatcher(resourceWithAcr, matcher) {
    const acr = internal_getAcr(resourceWithAcr);
    const updatedAcr = setThing(acr, matcher);
    const updatedResource = internal_setAcr(resourceWithAcr, updatedAcr);
    return updatedResource;
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * List all the agents a [[Matcher]] applies **directly** to. This will not include agents
 * that are matched on a property other than their WebID.
 *
 * @param matcher The matcher from which agents are read.
 * @returns A list of the WebIDs of agents included in the matcher.
 * @since Not released yet.
 */
function getAgentAll(matcher) {
    return getIriAll(matcher, acp.agent).filter((agent) => agent !== acp.PublicAgent &&
        agent !== acp.AuthenticatedAgent &&
        agent !== acp.CreatorAgent);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Overwrite the agents the [[Matcher]] applies to with the provided agents.
 *
 * @param matcher The matcher for which agents are set.
 * @param agent The agent the matcher should apply to.
 * @returns A copy of the input matcher, applying to a different set of agents.
 * @since Not released yet.
 */
function setAgent(matcher, agent) {
    // Preserve the special agent classes authenticated and public, which we
    // don't want to overwrite with this function.
    const isPublic = hasPublic(matcher);
    const isAuthenticated = hasAuthenticated(matcher);
    const isCreator = hasCreator(matcher);
    let result = setIri(matcher, acp.agent, agent);
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
 * Apply the [[Matcher]] to an additional agent.
 *
 * @param matcher The [[Matcher]] to be applied to an additional agent.
 * @param agent The agent the [[Matcher]] should apply to.
 * @returns A copy of the [[Matcher]], applying to an additional agent.
 * @since Not released yet.
 */
function addAgent(matcher, agent) {
    return addIri(matcher, acp.agent, agent);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Prevent the [[Matcher]] from applying to a given agent directly. This will not
 * prevent the agent from matching on other properties than its WebID.
 *
 * @param matcher The [[Matcher]] that should no longer apply to a given agent.
 * @param agent The agent the Matcher should no longer apply to.
 * @returns A copy of the Matcher, not applying to the given agent.
 * @since Not released yet.
 */
function removeAgent(matcher, agent) {
    return removeIri(matcher, acp.agent, agent);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Check if the Matcher applies to any agent.
 *
 * @param matcher The Matcher checked for public access.
 * @returns Whether the Matcher applies to any agent or not.
 * @since Not released yet.
 */
function hasPublic(matcher) {
    return (getIriAll(matcher, acp.agent).filter((agent) => agent === acp.PublicAgent)
        .length > 0);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Set a Matcher to apply to any Agent.
 *
 * @param matcher The Matcher being modified.
 * @returns A copy of the Matcher, updated to apply to any agent.
 * @since Not released yet.
 */
function setPublic(matcher) {
    // The second argument should not be part of the function signature,
    // so it's not in the parameter list:
    // eslint-disable-next-line prefer-rest-params
    if (typeof arguments === "object" && typeof arguments[1] === "boolean") {
        throw new Error("The function `setPublic` no longer takes a second parameter. It is now used together with `removePublic` instead.");
    }
    return addIri(matcher, acp.agent, acp.PublicAgent);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Set a Matcher to no longer apply to any Agent.
 *
 * @param matcher The Matcher being modified.
 * @returns A copy of the Matcher, updated to no longer apply to any agent.
 * @since Not released yet.
 */
function removePublic(matcher) {
    return removeIri(matcher, acp.agent, acp.PublicAgent);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Check if the Matcher applies to any authenticated agent.
 *
 * @param matcher The Matcher checked for authenticated access.
 * @returns Whether the Matcher applies to any authenticated agent or not.
 * @since Not released yet.
 */
function hasAuthenticated(matcher) {
    return (getIriAll(matcher, acp.agent).filter((agent) => agent === acp.AuthenticatedAgent).length > 0);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Set a Matcher to apply to any authenticated Agent.
 *
 * @param matcher The Matcher being modified.
 * @returns A copy of the Matcher, updated to apply to any authenticated Agent.
 * @since Not released yet.
 */
function setAuthenticated(matcher) {
    // The second argument should not be part of the function signature,
    // so it's not in the parameter list:
    // eslint-disable-next-line prefer-rest-params
    if (typeof arguments === "object" && typeof arguments[1] === "boolean") {
        throw new Error("The function `setAuthenticated` no longer takes a second parameter. It is now used together with `removeAuthenticated` instead.");
    }
    return addIri(matcher, acp.agent, acp.AuthenticatedAgent);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Set a Matcher to no longer apply to any authenticated Agent.
 *
 * @param matcher The Matcher being modified.
 * @returns A copy of the Matcher, updated to apply/not apply to any authenticated agent.
 * @since Not released yet.
 */
function removeAuthenticated(matcher) {
    return removeIri(matcher, acp.agent, acp.AuthenticatedAgent);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Check if the Matcher applies to the creator of the Resource.
 *
 * @param matcher The Matcher checked for authenticated access.
 * @returns Whether the Matcher applies to the creator of the Resource or not.
 * @since Not released yet.
 */
function hasCreator(matcher) {
    return (getIriAll(matcher, acp.agent).filter((agent) => agent === acp.CreatorAgent)
        .length > 0);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Set a Matcher to apply to the creator of a Resource.
 *
 * @param matcher The Matcher being modified.
 * @returns A copy of the Matcher, updated to apply to the creator of a Resource.
 * @since Not released yet.
 */
function setCreator(matcher) {
    // The second argument should not be part of the function signature,
    // so it's not in the parameter list:
    // eslint-disable-next-line prefer-rest-params
    if (typeof arguments === "object" && typeof arguments[1] === "boolean") {
        throw new Error("The function `setCreator` no longer takes a second parameter. It is now used together with `removeCreator` instead.");
    }
    return addIri(matcher, acp.agent, acp.CreatorAgent);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Set a Matcher to no longer apply to the creator of a Resource.
 *
 * @param matcher The Matcher being modified.
 * @returns A copy of the Matcher, updated to apply/not apply to the creator of a Resource.
 * @since Not released yet.
 */
function removeCreator(matcher) {
    return removeIri(matcher, acp.agent, acp.CreatorAgent);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * List all the clients a [[Matcher]] applies **directly** to. This will not include
 * specific client classes, such as public clients.
 *
 * @param matcher The Matcher from which clients are read.
 * @returns A list of the WebIDs of clients included in the Matcher.
 * @since Not released yet.
 */
function getClientAll(matcher) {
    return getIriAll(matcher, acp.client).filter((client) => client !== solid.PublicOidcClient);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Overwrite the clients the [[Matcher]] applies to with the provided Client.
 *
 * @param matcher The Matcher for which clients are set.
 * @param client The Client the Matcher should apply to.
 * @returns A copy of the input Matcher, applying to a different set of Clients.
 * @since Not released yet.
 */
function setClient(matcher, client) {
    // Preserve the special "any client" class, which we
    // don't want to overwrite with this function.
    const anyClientEnabled = hasAnyClient(matcher);
    let result = setIri(matcher, acp.client, client);
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
 * Apply the [[Matcher]] to an additional Client.
 *
 * @param matcher The [[Matcher]] to be applied to an additional Client.
 * @param client The Client the [[Matcher]] should apply to.
 * @returns A copy of the [[Matcher]], applying to an additional Client.
 * @since Not released yet.
 */
function addClient(matcher, client) {
    return addIri(matcher, acp.client, client);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Prevent the [[Matcher]] from applying to a given Client directly.
 *
 * @param matcher The [[Matcher]] that should no longer apply to a given Client.
 * @param client The Client the Matcher should no longer apply to.
 * @returns A copy of the Matcher, not applying to the given Client.
 * @since Not released yet.
 */
function removeClient(matcher, client) {
    return removeIri(matcher, acp.client, client);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Check if the Matcher applies to any client, i.e. all the applications
 * regardless of their identifier.
 *
 * @param matcher The Matcher checked for authenticated access.
 * @returns Whether the Matcher applies to public clients.
 * @since Not released yet.
 */
function hasAnyClient(matcher) {
    return (getIriAll(matcher, acp.client).filter((client) => client === solid.PublicOidcClient).length > 0);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Make the [[Matcher]] apply to any client application.
 *
 * @param matcher The Matcher for which clients are set.
 * @returns A copy of the Matcher, updated to apply to any client
 * @since Not released yet.
 */
function setAnyClient(matcher) {
    return addIri(matcher, acp.client, solid.PublicOidcClient);
}
/**
 * ```{note} There is no Access Control Policies specification yet. As such, this
 * function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Make the [[Matcher]] no longer apply to any client application.
 *
 * @param matcher The Matcher for which clients are set.
 * @returns A copy of the Matcher, updated to no longer apply to any client
 * @since Not released yet.
 */
function removeAnyClient(matcher) {
    return removeIri(matcher, acp.client, solid.PublicOidcClient);
}
/**
 * Gets a human-readable representation of the given [[Matcher]] to aid debugging.
 *
 * Note that changes to the exact format of the return value are not considered a breaking change;
 * it is intended to aid in debugging, not as a serialisation method that can be reliably parsed.
 *
 * @param matcher The Matcher to get a human-readable representation of.
 * @since Not released yet.
 */
function matcherAsMarkdown(matcher) {
    let markdown = `## Matcher: ${asUrl(matcher)}\n\n`;
    let targetEnumeration = "";
    if (hasPublic(matcher)) {
        targetEnumeration += "- Everyone\n";
    }
    if (hasAuthenticated(matcher)) {
        targetEnumeration += "- All authenticated agents\n";
    }
    if (hasCreator(matcher)) {
        targetEnumeration += "- The creator of this resource\n";
    }
    if (hasAnyClient(matcher)) {
        targetEnumeration += "- Users of any client application\n";
    }
    const targetAgents = getAgentAll(matcher);
    if (targetAgents.length > 0) {
        targetEnumeration += "- The following agents:\n  - ";
        targetEnumeration += targetAgents.join("\n  - ") + "\n";
    }
    const targetClients = getClientAll(matcher);
    if (targetClients.length > 0) {
        targetEnumeration += "- Users of the following client applications:\n  - ";
        targetEnumeration += targetClients.join("\n  - ") + "\n";
    }
    markdown +=
        targetEnumeration.length > 0
            ? "This Matcher matches:\n" + targetEnumeration
            : "<empty>\n";
    return markdown;
}

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
const v4AcpFunctions = {
    getFileWithAccessDatasets,
    getFileWithAcr,
    getReferencedPolicyUrlAll,
    getResourceInfoWithAccessDatasets,
    getResourceInfoWithAcr,
    getSolidDatasetWithAccessDatasets,
    getSolidDatasetWithAcr,
    hasAccessibleAcr,
    saveAcrFor,
};
const v4ControlFunctions = {
    acrAsMarkdown,
    addAcrPolicyUrl,
    addMemberAcrPolicyUrl,
    addMemberPolicyUrl,
    addPolicyUrl,
    getAcrPolicyUrlAll,
    getMemberAcrPolicyUrlAll,
    getMemberPolicyUrlAll,
    getPolicyUrlAll,
    hasLinkedAcr,
    removeAcrPolicyUrl,
    removeAcrPolicyUrlAll,
    removeMemberAcrPolicyUrl,
    removeMemberAcrPolicyUrlAll,
    removeMemberPolicyUrl,
    removeMemberPolicyUrlAll,
    removePolicyUrl,
    removePolicyUrlAll,
};
const v4PolicyFunctions = {
    createPolicy,
    getAllowModes: getAllowModesV2,
    getDenyModes: getDenyModesV2,
    getPolicy,
    getPolicyAll,
    policyAsMarkdown,
    removePolicy,
    setAllowModes: setAllowModesV2,
    setDenyModes: setDenyModesV2,
    setPolicy,
    createResourcePolicyFor,
    getResourceAcrPolicy,
    getResourceAcrPolicyAll,
    getResourcePolicy,
    getResourcePolicyAll,
    removeResourceAcrPolicy,
    removeResourcePolicy,
    setResourceAcrPolicy,
    setResourcePolicy,
};
const v4MatcherFunctions = {
    addAgent,
    createMatcher,
    getAgentAll,
    getMatcher,
    getMatcherAll,
    removeAgent,
    removeMatcher,
    matcherAsMarkdown,
    setAgent,
    setMatcher,
    addClient,
    getClientAll,
    hasAnyClient,
    removeClient,
    setAnyClient,
    setClient,
    removeAnyClient,
    hasAuthenticated,
    hasCreator,
    hasPublic,
    setAuthenticated,
    setCreator,
    setPublic,
    removeAuthenticated,
    removeCreator,
    removePublic,
    getAnyOfMatcherUrlAll,
    addAnyOfMatcherUrl,
    removeAnyOfMatcherUrl,
    setAnyOfMatcherUrl,
    getAllOfMatcherUrlAll,
    addAllOfMatcherUrl,
    removeAllOfMatcherUrl,
    setAllOfMatcherUrl,
    getNoneOfMatcherUrlAll,
    addNoneOfMatcherUrl,
    removeNoneOfMatcherUrl,
    setNoneOfMatcherUrl,
    createResourceMatcherFor,
    getResourceMatcher,
    getResourceMatcherAll,
    removeResourceMatcher,
    setResourceMatcher,
};
const v4MockFunctions = {
    addMockAcrTo,
    mockAcrFor,
};
/**
 * @hidden
 * @deprecated Please import directly from the "acp/*" modules.
 */
const acp_v4 = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, v4AcpFunctions), v4ControlFunctions), v4PolicyFunctions), v4MatcherFunctions), v4MockFunctions);

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
const knownActorRelations$1 = [acp.agent];
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
function internal_getActorAccess$1(acpData, actorRelation, actor) {
    if (acpData.inaccessibleUrls.length > 0) {
        // If we can't see all access data,
        // we can't reliably determine what access the given actor has:
        return null;
    }
    const applicableAcrPolicies = acpData.acrPolicies.filter((policy) => policyAppliesTo$1(policy, actorRelation, actor, acpData));
    const applicablePolicies = acpData.policies.filter((policy) => policyAppliesTo$1(policy, actorRelation, actor, acpData));
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
function internal_getAgentAccess$1(acpData, webId) {
    return internal_getActorAccess$1(acpData, acp.agent, webId);
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
function internal_getPublicAccess$1(acpData) {
    return internal_getActorAccess$1(acpData, acp.agent, acp.PublicAgent);
}
function policyAppliesTo$1(policy, actorRelation, actor, acpData) {
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
function policyConflictsWith$1(policy, otherAccess) {
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
function internal_findActorAll$1(acpData, actorRelation) {
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
function internal_getActorAccessAll$1(acpData, actorRelation) {
    if (acpData.inaccessibleUrls.length > 0) {
        // If we can't see all access data,
        // we can't reliably determine what access actors of the given type have:
        return null;
    }
    const result = {};
    const actors = internal_findActorAll$1(acpData, actorRelation);
    actors.forEach((iri) => {
        // The type assertion holds, because if internal_getActorAccess were null,
        // we would have returned {} already.
        const access = internal_getActorAccess$1(acpData, actorRelation, iri);
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
function internal_getAgentAccessAll$1(acpData) {
    return internal_getActorAccessAll$1(acpData, acp.agent);
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
function internal_setActorAccess$1(resource, acpData, actorRelation, actor, access) {
    var _a, _b, _c, _d, _e;
    if (!hasAccessibleAcr(resource) || acpData.inaccessibleUrls.length > 0) {
        return null;
    }
    // Get the access that currently applies to the given actor
    const existingAccess = internal_getActorAccess$1(acpData, actorRelation, actor);
    /* istanbul ignore if: It returns null if the ACR has inaccessible Policies, which should happen since we already check for that above. */
    if (existingAccess === null) {
        return null;
    }
    // Get all Policies that apply specifically to the given actor
    const applicableAcrPolicies = acpData.acrPolicies.filter((policy) => policyAppliesTo$1(policy, actorRelation, actor, acpData));
    const applicablePolicies = acpData.policies.filter((policy) => policyAppliesTo$1(policy, actorRelation, actor, acpData));
    // We only need to override Policies that define access other than what we want:
    const conflictingAcrPolicies = applicableAcrPolicies.filter((policy) => policyConflictsWith$1(policy, {
        read: access.controlRead,
        write: access.controlWrite,
    }));
    const conflictingPolicies = applicablePolicies.filter((policy) => policyConflictsWith$1(policy, {
        read: access.read,
        append: access.append,
        write: access.write,
    }));
    // For every Policy that applies specifically to the given Actor, but _also_
    // to another actor (i.e. that applies using an anyOf Matcher, or a Matcher that
    // mentions both the given and another actor)...
    const otherActorAcrPolicies = conflictingAcrPolicies.filter((acrPolicy) => policyHasOtherActors$1(acrPolicy, actorRelation, actor, acpData));
    const otherActorPolicies = conflictingPolicies.filter((policy) => policyHasOtherActors$1(policy, actorRelation, actor, acpData));
    // ...check what access the current actor would have if we removed them...
    const acpDataWithPoliciesExcluded = Object.assign(Object.assign({}, acpData), { acrPolicies: acpData.acrPolicies.filter((acrPolicy) => !otherActorAcrPolicies.includes(acrPolicy)), policies: acpData.policies.filter((policy) => !otherActorPolicies.includes(policy)) });
    const remainingAccess = internal_getActorAccess$1(acpDataWithPoliciesExcluded, actorRelation, actor);
    /* istanbul ignore if: It returns null if the ACR has inaccessible Policies, which should happen since we already check for that at the start. */
    if (remainingAccess === null) {
        return null;
    }
    // ...add copies of those Policies and their Matchers, but excluding the given actor...
    let updatedResource = resource;
    otherActorAcrPolicies.forEach((acrPolicy) => {
        const [policyCopy, matcherCopies] = copyPolicyExcludingActor$1(acrPolicy, resource, acpData, actorRelation, actor);
        updatedResource = setResourceAcrPolicy(updatedResource, policyCopy);
        updatedResource = matcherCopies.reduce(setResourceMatcher, updatedResource);
    });
    otherActorPolicies.forEach((policy) => {
        const [policyCopy, matcherCopies] = copyPolicyExcludingActor$1(policy, resource, acpData, actorRelation, actor);
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
function internal_setAgentAccess$1(resource, acpData, webId, access) {
    return internal_setActorAccess$1(resource, acpData, acp.agent, webId, access);
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
function internal_setPublicAccess$1(resource, acpData, access) {
    return internal_setActorAccess$1(resource, acpData, acp.agent, acp.PublicAgent, access);
}
function policyHasOtherActors$1(policy, actorRelation, actor, acpData) {
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
    knownActorRelations$1.forEach((knownActorRelation) => {
        const otherActorsWithThisRelation = getIriAll(matcher, knownActorRelation).filter((applicableActor) => applicableActor !== actor || knownActorRelation !== actorRelation);
        // Unfortunately Node 10 does not support `.flat()` yet, hence the use of `push`:
        otherActors.push(...otherActorsWithThisRelation);
    });
    return otherActors.length > 0;
}
function copyPolicyExcludingActor$1(inputPolicy, resourceWithAcr, acpData, actorRelationToExclude, actorToExclude) {
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
        knownActorRelations$1.forEach((knownActorRelation) => {
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
        .filter(isNotNull$1);
}
function isNotNull$1(value) {
    return value !== null;
}
async function internal_getPoliciesAndMatchers(resource, options = internal_defaultFetchOptions) {
    const acrPolicyUrls = getAcrPolicyUrlAll(resource);
    const policyUrls = getPolicyUrlAll(resource);
    const allPolicyResourceUrls = getResourceUrls$1(acrPolicyUrls).concat(getResourceUrls$1(policyUrls));
    const policyResources = await getResources$1(allPolicyResourceUrls, options);
    const acrPolicies = getThingsFromResources$1(acrPolicyUrls, policyResources).filter(isNotNull$1);
    const policies = getThingsFromResources$1(policyUrls, policyResources).filter(isNotNull$1);
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
    const matcherResourceUrls = matcherUrls.map((matcherUrl) => getResourceUrl$1(matcherUrl));
    const unfetchedMatcherResourceUrls = matcherResourceUrls.filter((matcherResourceUrl) => !allPolicyResourceUrls.includes(matcherResourceUrl));
    const matcherResources = await getResources$1(unfetchedMatcherResourceUrls, options);
    const allResources = Object.assign(Object.assign({}, policyResources), matcherResources);
    const matchers = getThingsFromResources$1(matcherUrls, allResources).filter(isNotNull$1);
    const inaccessibleUrls = Object.keys(allResources).filter((resourceUrl) => allResources[resourceUrl] === null);
    return {
        inaccessibleUrls: inaccessibleUrls,
        acrPolicies: acrPolicies,
        policies: policies,
        matchers: matchers,
    };
}
function getResourceUrl$1(thingUrl) {
    const thingUrlObject = new URL(thingUrl);
    thingUrlObject.hash = "";
    return thingUrlObject.href;
}
function getResourceUrls$1(thingUrls) {
    const resourceUrls = [];
    thingUrls.forEach((thingUrl) => {
        const resourceUrl = getResourceUrl$1(thingUrl);
        if (!resourceUrls.includes(resourceUrl)) {
            resourceUrls.push(resourceUrl);
        }
    });
    return resourceUrls;
}
async function getResources$1(resourceUrls, options) {
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
function getThingsFromResources$1(thingUrls, resources) {
    return thingUrls.map((thingUrl) => {
        const resourceUrl = getResourceUrl$1(thingUrl);
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
function universalAccessToAcl(newAccess, previousAccess) {
    var _a, _b, _c, _d;
    // Universal access is aligned on ACP, which means there is a distinction between
    // controlRead and controlWrite. This split doesn't exist in WAC, which is why
    // the type for the input variable of this function is a restriction on the
    // universal Access type.
    if (newAccess.controlRead !== newAccess.controlWrite) {
        throw new Error("For Pods using Web Access Control, controlRead and controlWrite must be equal.");
    }
    return {
        read: (_a = newAccess.read) !== null && _a !== void 0 ? _a : previousAccess.read,
        append: (_b = newAccess.append) !== null && _b !== void 0 ? _b : previousAccess.append,
        write: (_c = newAccess.write) !== null && _c !== void 0 ? _c : previousAccess.write,
        control: (_d = newAccess.controlRead) !== null && _d !== void 0 ? _d : previousAccess.control,
    };
}
function aclAccessToUniversal(access) {
    // In ACL, denying access to an actor is a notion that doesn't exist, so an
    // access is either granted or not for a given mode.
    // This creates a misalignment with the ACP notion of an access being granted,
    // denied, or simply not mentioned. Here, we convert the boolean vision of
    // ACL into the boolean or undefined vision of ACP.
    return {
        read: access.read,
        write: access.write,
        append: access.append,
        controlRead: access.control,
        controlWrite: access.control,
    };
}
async function getActorAccess(resource, actor, accessEvaluationCallback, options) {
    const resourceAcl = await internal_fetchAcl(resource, options);
    const wacAccess = accessEvaluationCallback(internal_setAcl(resource, resourceAcl), actor);
    if (wacAccess === null) {
        return null;
    }
    return aclAccessToUniversal(wacAccess);
}
async function getActorClassAccess(resource, accessEvaluationCallback, options) {
    const resourceAcl = await internal_fetchAcl(resource, options);
    const wacAccess = accessEvaluationCallback(internal_setAcl(resource, resourceAcl));
    if (wacAccess === null) {
        return null;
    }
    return aclAccessToUniversal(wacAccess);
}
async function getActorAccessAll(resource, accessEvaluationCallback, options) {
    const resourceAcl = await internal_fetchAcl(resource, options);
    const wacAgentAccess = accessEvaluationCallback(internal_setAcl(resource, resourceAcl));
    if (wacAgentAccess === null) {
        return null;
    }
    const result = {};
    for (const [webId, wacAccess] of Object.entries(wacAgentAccess)) {
        result[webId] = aclAccessToUniversal(wacAccess);
    }
    return result;
}
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
function getAgentAccess$2(resource, agent, options = internal_defaultFetchOptions) {
    return getActorAccess(resource, agent, getAgentAccess$3, options);
}
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
function getGroupAccess$1(resource, group, options = internal_defaultFetchOptions) {
    return getActorAccess(resource, group, getGroupAccess$2, options);
}
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
function getPublicAccess$2(resource, options = internal_defaultFetchOptions) {
    return getActorClassAccess(resource, getPublicAccess$3, options);
}
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
function getAgentAccessAll$2(resource, options = internal_defaultFetchOptions) {
    return getActorAccessAll(resource, getAgentAccessAll$3, options);
}
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
function getGroupAccessAll$1(resource, options = internal_defaultFetchOptions) {
    return getActorAccessAll(resource, getGroupAccessAll$2, options);
}
async function prepareResourceAcl(resource, options) {
    if (!hasAccessibleAcl(resource)) {
        return null;
    }
    const acl = await internal_fetchAcl(resource, options);
    const resourceWithAcl = internal_setAcl(resource, acl);
    let resourceAcl;
    if (hasResourceAcl(resourceWithAcl)) {
        // This is the simple case, where the Resource ACL we need to update already
        // exists.
        resourceAcl = internal_getResourceAcl(resourceWithAcl);
    }
    else if (hasFallbackAcl(resourceWithAcl)) {
        // In this case, the Resource ACL needs to be created first, and then updated.
        resourceAcl = createAclFromFallbackAcl(resourceWithAcl);
    }
    else {
        return null;
    }
    return internal_setResourceAcl(resourceWithAcl, resourceAcl);
}
async function saveUpdatedAcl(resource, acl, options) {
    let savedAcl = null;
    try {
        savedAcl = await saveAclFor(resource, acl, options);
        return internal_setResourceAcl(resource, savedAcl);
    }
    catch (e) {
        return null;
    }
}
async function setActorClassAccess(resource, access, getAccess, setAccess, options) {
    const resourceWithOldAcl = await prepareResourceAcl(resource, options);
    if (resourceWithOldAcl === null) {
        return null;
    }
    const resourceAcl = getResourceAcl(resourceWithOldAcl);
    const currentAccess = getAccess(resourceWithOldAcl);
    const wacAccess = universalAccessToAcl(access, currentAccess);
    const updatedResourceAcl = setAccess(resourceAcl, wacAccess);
    return await saveUpdatedAcl(resourceWithOldAcl, updatedResourceAcl, options);
}
async function setActorAccess(resource, actor, access, getAccess, setAccess, options) {
    const resourceWithOldAcl = await prepareResourceAcl(resource, options);
    if (resourceWithOldAcl === null) {
        return null;
    }
    const currentAccess = getAccess(resourceWithOldAcl, actor);
    const resourceAcl = getResourceAcl(resourceWithOldAcl);
    const wacAccess = universalAccessToAcl(access, currentAccess);
    const updatedResourceAcl = setAccess(resourceAcl, actor, wacAccess);
    return await saveUpdatedAcl(resourceWithOldAcl, updatedResourceAcl, options);
}
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
async function setAgentResourceAccess(resource, agent, access, options = internal_defaultFetchOptions) {
    return await setActorAccess(resource, agent, access, getAgentAccess$3, setAgentResourceAccess$1, options);
}
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
async function setGroupResourceAccess(resource, group, access, options = internal_defaultFetchOptions) {
    return await setActorAccess(resource, group, access, getGroupAccess$2, setGroupResourceAccess$1, options);
}
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
async function setPublicResourceAccess(resource, access, options = internal_defaultFetchOptions) {
    return await setActorClassAccess(resource, access, getPublicAccess$3, setPublicResourceAccess$1, options);
}

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
const knownActorRelations = [acp.agent, acp.group];
/**
 * Get an overview of what access is defined for a given actor in a Resource's Access Control Resource.
 *
 * This will only return a value if all relevant access is defined in just the Resource's Access
 * Control Resource; in other words, if an Access Policy or Access Rule applies that is re-used for
 * other Resources, this function will not be able to determine the access relevant to this actor.
 *
 * Additionally, this only considers access given _explicitly_ to the given actor, i.e. without
 * additional conditions.
 *
 * In other words, this function will generally understand and return the access as set by
 * [[internal_setActorAccess]], but not understand more convoluted Policies.
 *
 * @param acpData All Access Control Policies and Rules that apply to a particular Resource.
 * @param actorRelation What type of actor (e.g. acp:agent or acp:group) you want to get the access for.
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
        const allowModes = getAllowModesV1(policy);
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
        const allowModes = getAllowModesV1(policy);
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
        const denyModes = getDenyModesV1(policy);
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
        const denyModes = getDenyModesV1(policy);
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
 * Control Resource; in other words, if an Access Policy or Access Rule applies that is re-used for
 * other Resources, this function will not be able to determine the access relevant to this Agent.
 *
 * Additionally, this only considers access given _explicitly_ to the given Agent, i.e. without
 * additional conditions.
 *
 * In other words, this function will generally understand and return the access as set by
 * [[internal_setAgentAccess]], but not understand more convoluted Policies.
 *
 * @param acpData All Access Control Policies and Rules that apply to a particular Resource.
 * @param webId WebID of the Agent you want to get the access for.
 * @returns What Access modes are granted to the given Agent explicitly, or null if it could not be determined.
 */
function internal_getAgentAccess(acpData, webId) {
    return internal_getActorAccess(acpData, acp.agent, webId);
}
/**
 * Get an overview of what access is defined for a given Group in a Resource's Access Control Resource.
 *
 * This will only return a value if all relevant access is defined in just the Resource's Access
 * Control Resource; in other words, if an Access Policy or Access Rule applies that is re-used for
 * other Resources, this function will not be able to determine the access relevant to this Group.
 *
 * Additionally, this only considers access given _explicitly_ to the given Group, i.e. without
 * additional conditions.
 *
 * In other words, this function will generally understand and return the access as set by
 * [[internal_setGroupAccess]], but not understand more convoluted Policies.
 *
 * @param acpData All Access Control Policies and Rules that apply to a particular Resource.
 * @param groupUrl URL of the Group you want to get the access for.
 * @returns What Access modes are granted to the given Group explicitly, or null if it could not be determined.
 */
function internal_getGroupAccess(acpData, groupUrl) {
    return internal_getActorAccess(acpData, acp.group, groupUrl);
}
/**
 * Get an overview of what access is defined for everybody in a Resource's Access Control Resource.
 *
 * This will only return a value if all relevant access is defined in just the Resource's Access
 * Control Resource; in other words, if an Access Policy or Access Rule applies that is re-used for
 * other Resources, this function will not be able to determine the access relevant to everybody.
 *
 * Additionally, this only considers access given _explicitly_ to everybody, i.e. without
 * additional conditions.
 *
 * In other words, this function will generally understand and return the access as set by
 * [[internal_setPublicAccess]], but not understand more convoluted Policies.
 *
 * @param acpData All Access Control Policies and Rules that apply to a particular Resource.
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
    //       the return value of internal_getPoliciesAndRules() did not have any
    //       inaccessible URLs, so we should be able to find every Rule.
    const allOfRules = getAllOfRuleUrlAll(policy).map((ruleUrl) => acpData.rules.find((rule) => asIri(rule) === ruleUrl));
    const anyOfRules = getAnyOfRuleUrlAll(policy).map((ruleUrl) => acpData.rules.find((rule) => asIri(rule) === ruleUrl));
    const noneOfRules = getNoneOfRuleUrlAll(policy).map((ruleUrl) => acpData.rules.find((rule) => asIri(rule) === ruleUrl));
    // We assume that this Policy applies if this specific actor is mentioned
    // and no further restrictions are in place.
    // (In other words, the Policy may apply to others *in addition to* this
    // actor, but if it applies to this actor *unless* some other condition holds,
    // we cannot be sure whether it will apply to this actor.)
    // This means that:
    return (
    // Every existing allOf Rule explicitly applies explicitly to this given actor:
    allOfRules.every((rule) => ruleAppliesTo(rule, actorRelation, actor)) &&
        // If there are anyOf Rules, at least one applies explicitly to this actor:
        (anyOfRules.length === 0 ||
            anyOfRules.some((rule) => ruleAppliesTo(rule, actorRelation, actor))) &&
        // No further restrictions are in place that make this sometimes not apply
        // to the given actor:
        noneOfRules.length === 0);
}
function policyConflictsWith(policy, otherAccess) {
    const allowModes = getIriAll(policy, acp.allow);
    const denyModes = getIriAll(policy, acp.deny);
    return ((otherAccess.read === true && denyModes.includes(acp.Read)) ||
        (otherAccess.read === false &&
            allowModes.includes(acp.Read) &&
            !denyModes.includes(acp.Read)) ||
        (otherAccess.append === true && denyModes.includes(acp.Append)) ||
        (otherAccess.append === false &&
            allowModes.includes(acp.Append) &&
            !denyModes.includes(acp.Append)) ||
        (otherAccess.write === true && denyModes.includes(acp.Write)) ||
        (otherAccess.write === false &&
            allowModes.includes(acp.Write) &&
            !denyModes.includes(acp.Write)));
}
function ruleAppliesTo(rule, actorRelation, actor) {
    // A Rule that does not list *any* actor matches for everyone:
    let isEmpty = true;
    knownActorRelations.forEach((knownActorRelation) => {
        isEmpty && (isEmpty = getIri(rule, knownActorRelation) === null);
    });
    return isEmpty || getIriAll(rule, actorRelation).includes(actor);
}
/**
 * Get a set of all actors mentioned in an ACR by active Rules (i.e. that are
 * referenced by Policies referenced by the ACR Control, and therefore that
 * effectively apply).
 *
 * @param acpData All Access Control Policies and Rules that apply to a particular Resource.
 * @param actorRelation
 */
function internal_findActorAll(acpData, actorRelation) {
    const actors = new Set();
    // This code could be prettier using flat(), which isn't supported by nodeJS 10.
    // If you read this comment after April 2021, feel free to refactor.
    acpData.rules.forEach((rule) => {
        getIriAll(rule, actorRelation)
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
 * @param acpData All Access Control Policies and Rules that apply to a particular Resource.
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
 * Get an overview of what access are defined for all Groups in a Resource's Access Control Resource.
 *
 * This will only return a value if all relevant access is defined in just the Resource's Access
 * Control Resource; in other words, if an Access Policy or Access Rule applies that is re-used for
 * other Resources, this function will not be able to determine the access relevant to the mentionned
 * Groups.
 *
 * Additionally, this only considers access given _explicitly_ to individual Groups, i.e. without
 * additional conditions.
 *
 * In other words, this function will generally understand and return the access as set by
 * [[internal_setAgentAccess]], but not understand more convoluted Policies.
 *
 * @param acpData All Access Control Policies and Rules that apply to a particular Resource.
 * @returns A map with each Group's access indexed by their URL, or null if some
 * external policies are referenced.
 */
function internal_getGroupAccessAll(acpData) {
    return internal_getActorAccessAll(acpData, acp.group);
}
/**
 * Get an overview of what access are defined for all Agents in a Resource's Access Control Resource.
 *
 * This will only return a value if all relevant access is defined in just the Resource's Access
 * Control Resource; in other words, if an Access Policy or Access Rule applies that is re-used for
 * other Resources, this function will not be able to determine the access relevant to the mentionned
 * Agents.
 *
 * Additionally, this only considers access given _explicitly_ to individual Agents, i.e. without
 * additional conditions.
 *
 * In other words, this function will generally understand and return the access as set by
 * [[internal_setAgentAccess]], but not understand more convoluted Policies.
 *
 * @param acpData All Access Control Policies and Rules that apply to a particular Resource.
 * @returns A map with each Agent's access indexed by their WebID, or null if some
 * external policies are referenced.
 */
function internal_getAgentAccessAll(acpData) {
    return internal_getActorAccessAll(acpData, acp.agent);
}
/**
 * Set access to a Resource for a specific actor.
 *
 * This function adds the relevant Access Control Policies and Rules to a
 * Resource's Access Control Resource to define the given access for the given
 * actor specifically. In other words, it can, for example, add Policies that
 * give a particular Group Read access to the Resource. However, if other
 * Policies specify that everyone in that Group is *denied* Read access *except*
 * for a particular Agent, then that will be left intact.
 * This means that, unless *only* this module's functions are used to manipulate
 * access to this Resource, the set access might not be equal to the effective
 * access for an agent matching the given actor.
 *
 * There are a number of preconditions that have to be fulfilled for this
 * function to work:
 * - Access to the Resource is determined via an Access Control Resource.
 * - The Resource's Access Control Resource does not refer to (Policies or Rules
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
 * @param acpData All Access Control Policies and Rules that apply to a particular Resource.
 * @param actorRelation What type of actor (e.g. acp:agent or acp:group) you want to set the access for.
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
    // to another actor (i.e. that applies using an anyOf Rule, or a Rule that
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
    // ...add copies of those Policies and their Rules, but excluding the given actor...
    let updatedResource = resource;
    otherActorAcrPolicies.forEach((acrPolicy) => {
        const [policyCopy, ruleCopies] = copyPolicyExcludingActor(acrPolicy, resource, acpData, actorRelation, actor);
        updatedResource = setResourceAcrPolicy(updatedResource, policyCopy);
        updatedResource = ruleCopies.reduce(setResourceRule, updatedResource);
    });
    otherActorPolicies.forEach((policy) => {
        const [policyCopy, ruleCopies] = copyPolicyExcludingActor(policy, resource, acpData, actorRelation, actor);
        updatedResource = setResourcePolicy(updatedResource, policyCopy);
        updatedResource = ruleCopies.reduce(setResourceRule, updatedResource);
    });
    // ...add a new Policy that applies the given access,
    // and the previously applying access for access modes that were undefined...
    const newRuleName = `rule_${encodeURIComponent(`${actorRelation}_${actor}`)}`;
    let newRule = createResourceRuleFor(resource, newRuleName);
    newRule = setIri(newRule, actorRelation, actor);
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
        newAcrPolicy = setAllowModesV1(newAcrPolicy, {
            read: newControlReadAccess === true,
            append: false,
            write: newControlWriteAccess === true,
        });
        newAcrPolicy = addIri(newAcrPolicy, acp.allOf, newRule);
        updatedResource = setResourceAcrPolicy(updatedResource, newAcrPolicy);
        updatedResource = setResourceRule(updatedResource, newRule);
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
        newPolicy = setAllowModesV1(newPolicy, {
            read: newReadAccess === true,
            append: newAppendAccess === true,
            write: newWriteAccess === true,
        });
        newPolicy = addIri(newPolicy, acp.allOf, newRule);
        updatedResource = setResourcePolicy(updatedResource, newPolicy);
        updatedResource = setResourceRule(updatedResource, newRule);
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
 * This function adds the relevant Access Control Policies and Rules to a
 * Resource's Access Control Resource to define the given access for the given
 * Agent specifically. In other words, it can, for example, add Policies that
 * give a particular Agent Read access to the Resource. However, if other
 * Policies specify that that Agent is *denied* Read access *except* if they're
 * in a particular Group, then that will be left intact.
 * This means that, unless *only* this function is used to manipulate access to
 * this Resource, the set access might not be equal to the effective access for
 * the given Agent.
 *
 * There are a number of preconditions that have to be fulfilled for this
 * function to work:
 * - Access to the Resource is determined via an Access Control Resource.
 * - The Resource's Access Control Resource does not refer to (Policies or Rules
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
 * @param acpData All Access Control Policies and Rules that apply to a particular Resource.
 * @param webId Which Agent you want to set the access for.
 * @param access What access (read, append, write, controlRead, controlWrite) to set for the given Agent. `true` to allow, `false` to deny, and `undefined` to leave unchanged.
 * @returns The Resource with the updated Access Control Resource attached, if updated successfully, or `null` if not.
 */
function internal_setAgentAccess(resource, acpData, webId, access) {
    return internal_setActorAccess(resource, acpData, acp.agent, webId, access);
}
/**
 * Set access to a Resource for a specific Group.
 *
 * This function adds the relevant Access Control Policies and Rules to a
 * Resource's Access Control Resource to define the given access for the given
 * Group specifically. In other words, it can, for example, add Policies that
 * give a particular Group Read access to the Resource. However, if other
 * Policies specify that it is *denied* Read access *except* if they're a
 * particular Agent, then that will be left intact.
 * This means that, unless *only* this module's functions are used to manipulate
 * access to this Resource, the set access might not be equal to the effective
 * access for Agents in the given Group.
 *
 * There are a number of preconditions that have to be fulfilled for this
 * function to work:
 * - Access to the Resource is determined via an Access Control Resource.
 * - The Resource's Access Control Resource does not refer to (Policies or Rules
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
 * @param acpData All Access Control Policies and Rules that apply to a particular Resource.
 * @param groupUrl Which Group you want to set the access for.
 * @param access What access (read, append, write, controlRead, controlWrite) to set for the given Group. `true` to allow, `false` to deny, and `undefined` to leave unchanged.
 * @returns The Resource with the updated Access Control Resource attached, if updated successfully, or `null` if not.
 */
function internal_setGroupAccess(resource, acpData, groupUrl, access) {
    return internal_setActorAccess(resource, acpData, acp.group, groupUrl, access);
}
/**
 * Set access to a Resource for everybody.
 *
 * This function adds the relevant Access Control Policies and Rules to a
 * Resource's Access Control Resource to define the given access for everybody
 * specifically. In other words, it can, for example, add Policies that
 * give everybody Read access to the Resource. However, if other
 * Policies specify that everybody is *denied* Read access *except* if they're
 * in a particular Group, then that will be left intact.
 * This means that, unless *only* this module's functions are used to manipulate
 * access to this Resource, the set access might not be equal to the effective
 * access for a particular Agent.
 *
 * There are a number of preconditions that have to be fulfilled for this
 * function to work:
 * - Access to the Resource is determined via an Access Control Resource.
 * - The Resource's Access Control Resource does not refer to (Policies or Rules
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
 * @param acpData All Access Control Policies and Rules that apply to a particular Resource.
 * @param access What access (read, append, write, controlRead, controlWrite) to set for everybody. `true` to allow, `false` to deny, and `undefined` to leave unchanged.
 * @returns The Resource with the updated Access Control Resource attached, if updated successfully, or `null` if not.
 */
function internal_setPublicAccess(resource, acpData, access) {
    return internal_setActorAccess(resource, acpData, acp.agent, acp.PublicAgent, access);
}
function policyHasOtherActors(policy, actorRelation, actor, acpData) {
    // Note: the non-null assertions (`!`) here should be valid because
    //       the caller of `policyHasOtherActors` should already have validated
    //       that the return value of internal_getPoliciesAndRules() did not have
    //       any inaccessible URLs, so we should be able to find every Rule.
    const allOfRules = getIriAll(policy, acp.allOf).map((ruleUrl) => acpData.rules.find((rule) => asIri(rule) === ruleUrl));
    const allOfRulesHaveOtherActors = allOfRules.some((rule) => {
        return ruleHasOtherActors(rule, actorRelation, actor);
    });
    const anyOfRules = getIriAll(policy, acp.anyOf).map((ruleUrl) => acpData.rules.find((rule) => asIri(rule) === ruleUrl));
    const anyOfRulesHaveOtherActors = anyOfRules.some((rule) => {
        return ruleHasOtherActors(rule, actorRelation, actor);
    });
    /* istanbul ignore next This function only gets called after policyAppliesTo, which already filters out all noneOf Rules */
    const noneOfRules = getIriAll(policy, acp.noneOf).map((ruleUrl) => acpData.rules.find((rule) => asIri(rule) === ruleUrl));
    /* istanbul ignore next This function only gets called after policyAppliesTo, which already filters out all noneOf Rules */
    const noneOfRulesHaveOtherActors = noneOfRules.some((rule) => {
        return ruleHasOtherActors(rule, actorRelation, actor);
    });
    return (allOfRulesHaveOtherActors ||
        anyOfRulesHaveOtherActors ||
        noneOfRulesHaveOtherActors);
}
function ruleHasOtherActors(rule, actorRelation, actor) {
    const otherActors = [];
    knownActorRelations.forEach((knownActorRelation) => {
        const otherActorsWithThisRelation = getIriAll(rule, knownActorRelation).filter((applicableActor) => applicableActor !== actor || knownActorRelation !== actorRelation);
        // Unfortunately Node 10 does not support `.flat()` yet, hence the use of `push`:
        otherActors.push(...otherActorsWithThisRelation);
    });
    return otherActors.length > 0;
}
function copyPolicyExcludingActor(inputPolicy, resourceWithAcr, acpData, actorRelationToExclude, actorToExclude) {
    const newIriSuffix = "_copy_without" +
        `_${encodeURIComponent(actorRelationToExclude)}_${actorToExclude}` +
        `_${Date.now()}_${Math.random()}`;
    // Create new Rules for the Policy, excluding the given Actor
    const newAllOfRules = copyRulesExcludingActor(getIriAll(inputPolicy, acp.allOf), resourceWithAcr, acpData, newIriSuffix, actorRelationToExclude, actorToExclude);
    const newAnyOfRules = copyRulesExcludingActor(getIriAll(inputPolicy, acp.anyOf), resourceWithAcr, acpData, newIriSuffix, actorRelationToExclude, actorToExclude);
    const newNoneOfRules = copyRulesExcludingActor(getIriAll(inputPolicy, acp.noneOf), resourceWithAcr, acpData, newIriSuffix, actorRelationToExclude, actorToExclude);
    // Create a new Policy with the new Rules
    let newPolicy = createResourcePolicyFor(resourceWithAcr, encodeURI(asIri(inputPolicy)) + newIriSuffix);
    getIriAll(inputPolicy, acp.allow).forEach((allowMode) => {
        newPolicy = addIri(newPolicy, acp.allow, allowMode);
    });
    getIriAll(inputPolicy, acp.deny).forEach((denyMode) => {
        newPolicy = addIri(newPolicy, acp.deny, denyMode);
    });
    newAllOfRules.forEach((newRule) => {
        newPolicy = addIri(newPolicy, acp.allOf, newRule);
    });
    newAnyOfRules.forEach((newRule) => {
        newPolicy = addIri(newPolicy, acp.anyOf, newRule);
    });
    /* istanbul ignore next Policies listing noneOf Rules are left alone (because they do not unambiguously apply to the given actor always), so there will usually not be any noneOf Rules to copy. */
    newNoneOfRules.forEach((newRule) => {
        newPolicy = addIri(newPolicy, acp.noneOf, newRule);
    });
    return [
        newPolicy,
        newAllOfRules.concat(newAnyOfRules).concat(newNoneOfRules),
    ];
}
/** Creates clones of all the Rules identified by `ruleIris` in `acpData`, excluding the given Actor */
function copyRulesExcludingActor(ruleIris, resourceWithAcr, acpData, iriSuffix, actorRelationToExclude, actorToExclude) {
    return ruleIris
        .map((ruleIri) => {
        const rule = acpData.rules.find((rule) => asIri(rule) === ruleIri);
        /* istanbul ignore if: getPoliciesAndRules should already have fetched all referenced Rules, so this should never be true: */
        if (typeof rule === "undefined") {
            return null;
        }
        let newRule = createResourceRuleFor(resourceWithAcr, encodeURI(asIri(rule)) + iriSuffix);
        let listsOtherActors = false;
        knownActorRelations.forEach((knownActorRelation) => {
            getIriAll(rule, knownActorRelation).forEach((targetActor) => {
                if (knownActorRelation === actorRelationToExclude &&
                    targetActor === actorToExclude) {
                    return;
                }
                listsOtherActors = true;
                newRule = addIri(newRule, knownActorRelation, targetActor);
            });
        });
        return listsOtherActors ? newRule : null;
    })
        .filter(isNotNull);
}
function isNotNull(value) {
    return value !== null;
}
async function internal_getPoliciesAndRules(resource, options = internal_defaultFetchOptions) {
    const acrPolicyUrls = getAcrPolicyUrlAll(resource);
    const policyUrls = getPolicyUrlAll(resource);
    const allPolicyResourceUrls = getResourceUrls(acrPolicyUrls).concat(getResourceUrls(policyUrls));
    const policyResources = await getResources(allPolicyResourceUrls, options);
    const acrPolicies = getThingsFromResources(acrPolicyUrls, policyResources).filter(isNotNull);
    const policies = getThingsFromResources(policyUrls, policyResources).filter(isNotNull);
    const ruleUrlSet = new Set();
    acrPolicies.forEach((acrPolicy) => {
        const referencedRuleUrls = getReferencedRuleUrls(acrPolicy);
        referencedRuleUrls.forEach((ruleUrl) => {
            ruleUrlSet.add(ruleUrl);
        });
    });
    policies.forEach((policy) => {
        const referencedRuleUrls = getReferencedRuleUrls(policy);
        referencedRuleUrls.forEach((ruleUrl) => {
            ruleUrlSet.add(ruleUrl);
        });
    });
    const ruleUrls = Array.from(ruleUrlSet);
    const ruleResourceUrls = ruleUrls.map((ruleUrl) => getResourceUrl(ruleUrl));
    const unfetchedRuleResourceUrls = ruleResourceUrls.filter((ruleResourceUrl) => !allPolicyResourceUrls.includes(ruleResourceUrl));
    const ruleResources = await getResources(unfetchedRuleResourceUrls, options);
    const allResources = Object.assign(Object.assign({}, policyResources), ruleResources);
    const rules = getThingsFromResources(ruleUrls, allResources).filter(isNotNull);
    const inaccessibleUrls = Object.keys(allResources).filter((resourceUrl) => allResources[resourceUrl] === null);
    return {
        inaccessibleUrls: inaccessibleUrls,
        acrPolicies: acrPolicies,
        policies: policies,
        rules: rules,
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
function getReferencedRuleUrls(policy) {
    return getAllOfRuleUrlAll(policy)
        .concat(getAnyOfRuleUrlAll(policy))
        .concat(getNoneOfRuleUrlAll(policy));
}

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
async function getAgentAccess$1(resourceUrl, webId, options = internal_defaultFetchOptions) {
    const resourceInfo = await getResourceInfoWithAcr(resourceUrl, options);
    if (hasAccessibleAcr(resourceInfo)) {
        const acpData = await internal_getPoliciesAndRules(resourceInfo, options);
        return internal_getAgentAccess(acpData, webId);
    }
    if (hasAccessibleAcl(resourceInfo)) {
        return await getAgentAccess$2(resourceInfo, webId, options);
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
async function setAgentAccess$1(resourceUrl, webId, access, options = internal_defaultFetchOptions) {
    const resourceInfo = await getResourceInfoWithAcr(resourceUrl, options);
    if (hasAccessibleAcr(resourceInfo)) {
        const acpData = await internal_getPoliciesAndRules(resourceInfo, options);
        const updatedResource = internal_setAgentAccess(resourceInfo, acpData, webId, access);
        if (updatedResource) {
            try {
                await saveAcrFor(updatedResource, options);
                return await getAgentAccess$1(resourceUrl, webId, options);
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
        return await getAgentAccess$2(resourceInfo, webId, options);
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
async function getAgentAccessAll$1(resourceUrl, options = internal_defaultFetchOptions) {
    const resourceInfo = await getResourceInfoWithAcr(resourceUrl, options);
    if (hasAccessibleAcr(resourceInfo)) {
        const acpData = await internal_getPoliciesAndRules(resourceInfo, options);
        return internal_getAgentAccessAll(acpData);
    }
    if (hasAccessibleAcl(resourceInfo)) {
        return await getAgentAccessAll$2(resourceInfo, options);
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
async function getPublicAccess$1(resourceUrl, options = internal_defaultFetchOptions) {
    const resourceInfo = await getResourceInfoWithAcr(resourceUrl, options);
    if (hasAccessibleAcr(resourceInfo)) {
        const acpData = await internal_getPoliciesAndRules(resourceInfo, options);
        return internal_getPublicAccess(acpData);
    }
    if (hasAccessibleAcl(resourceInfo)) {
        return await getPublicAccess$2(resourceInfo, options);
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
async function setPublicAccess$1(resourceUrl, access, options = internal_defaultFetchOptions) {
    const resourceInfo = await getResourceInfoWithAcr(resourceUrl, options);
    if (hasAccessibleAcr(resourceInfo)) {
        const acpData = await internal_getPoliciesAndRules(resourceInfo, options);
        const updatedResource = internal_setPublicAccess(resourceInfo, acpData, access);
        if (updatedResource) {
            try {
                await saveAcrFor(updatedResource, options);
                return getPublicAccess$1(resourceUrl, options);
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
        return await getPublicAccess$2(resourceInfo, options);
    }
    return null;
}

var universal_v1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getAgentAccess: getAgentAccess$1,
  setAgentAccess: setAgentAccess$1,
  getAgentAccessAll: getAgentAccessAll$1,
  getGroupAccess: getGroupAccess,
  getGroupAccessAll: getGroupAccessAll,
  setGroupAccess: setGroupAccess,
  getPublicAccess: getPublicAccess$1,
  setPublicAccess: setPublicAccess$1,
  getAccessFor: getAccessFor,
  getAccessForAll: getAccessForAll,
  setAccessFor: setAccessFor
});

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

var universal = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getAccessFor: getAccessFor,
  getAccessForAll: getAccessForAll,
  setAccessFor: setAccessFor,
  getAgentAccess: getAgentAccess$1,
  setAgentAccess: setAgentAccess$1,
  getAgentAccessAll: getAgentAccessAll$1,
  getGroupAccess: getGroupAccess,
  getGroupAccessAll: getGroupAccessAll,
  setGroupAccess: setGroupAccess,
  getPublicAccess: getPublicAccess$1,
  setPublicAccess: setPublicAccess$1
});

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
async function getAccessFor(resourceUrl, actorType, actor = internal_defaultFetchOptions, options = internal_defaultFetchOptions) {
    if (actorType === "agent") {
        if (typeof actor !== "string") {
            throw new Error("When reading Agent-specific access, the given agent cannot be left undefined.");
        }
        return await getAgentAccess$1(resourceUrl, actor, options);
    }
    if (actorType === "group") {
        if (typeof actor !== "string") {
            throw new Error("When reading Group-specific access, the given group cannot be left undefined.");
        }
        return await getGroupAccess(resourceUrl, actor, options);
    }
    if (actorType === "public") {
        if (typeof actor === "string") {
            throw new Error(`When reading public access, no actor type should be specified (here [${actor}]).`);
        }
        return await getPublicAccess$1(resourceUrl, actor);
    }
    return null;
}
/**
 * Get an overview of what access is defined for a given set of actors: all Agents
 * or all Groups.
 *
 * This function works with Solid Pods that implement either the Web Access
 * Control spec or the Access Control Policies proposal, with some caveats:
 *
 * - If access to the given Resource has been set using anything other than the
 *   functions in this module, it is possible that it has been set in a way that
 *   prevents this function from reliably reading access, in which case it will
 *   resolve to `null`.
 * - It will only return access specified explicitly for the given actor (Agent
 *   or Group). If additional restrictions are set up to apply to the given Agent
 *   in a particular situation, those will not be reflected in the return value
 *   of this function.
 * - It will only return access specified explicitly for the given Resource.
 *   In other words, if the Resource is a Container, the returned Access may not
 *   apply to contained Resources.
 * - If the current user does not have permission to view access for the given
 *   Resource, this function will resolve to `null`.
 *
 * @param resourceUrl URL of the Resource you want to read the access for.
 * @param actorType type of actor whose access is being read.
 * @returns What access is set for the given resource, grouped by resp. Agent or Group.
 * @since 1.5.0
 */
async function getAccessForAll(resourceUrl, actorType, options = internal_defaultFetchOptions) {
    if (actorType === "agent") {
        return await getAgentAccessAll$1(resourceUrl, options);
    }
    if (actorType === "group") {
        return await getGroupAccessAll(resourceUrl, options);
    }
    return null;
}
async function setAccessFor(resourceUrl, actorType, access, actor = internal_defaultFetchOptions, options = internal_defaultFetchOptions) {
    if (actorType === "agent") {
        if (typeof actor !== "string") {
            throw new Error("When writing Agent-specific access, the given agent cannot be left undefined.");
        }
        return await setAgentAccess$1(resourceUrl, actor, access, options);
    }
    if (actorType === "group") {
        if (typeof actor !== "string") {
            throw new Error("When writing Group-specific access, the given group cannot be left undefined.");
        }
        return await setGroupAccess(resourceUrl, actor, access, options);
    }
    if (actorType === "public") {
        if (typeof actor === "string") {
            throw new Error(`When writing public access, no actor type should be specified (here [${actor}]).`);
        }
        return await setPublicAccess$1(resourceUrl, access, actor);
    }
    return null;
}

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
        const acpData = await internal_getPoliciesAndMatchers(resourceInfo, options);
        return internal_getAgentAccess$1(acpData, webId);
    }
    if (hasAccessibleAcl(resourceInfo)) {
        return await getAgentAccess$2(resourceInfo, webId, options);
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
        const acpData = await internal_getPoliciesAndMatchers(resourceInfo, options);
        const updatedResource = internal_setAgentAccess$1(resourceInfo, acpData, webId, access);
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
        return await getAgentAccess$2(resourceInfo, webId, options);
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
        const acpData = await internal_getPoliciesAndMatchers(resourceInfo, options);
        return internal_getAgentAccessAll$1(acpData);
    }
    if (hasAccessibleAcl(resourceInfo)) {
        return await getAgentAccessAll$2(resourceInfo, options);
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
        const acpData = await internal_getPoliciesAndMatchers(resourceInfo, options);
        return internal_getPublicAccess$1(acpData);
    }
    if (hasAccessibleAcl(resourceInfo)) {
        return await getPublicAccess$2(resourceInfo, options);
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
        const acpData = await internal_getPoliciesAndMatchers(resourceInfo, options);
        const updatedResource = internal_setPublicAccess$1(resourceInfo, acpData, access);
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
        return await getPublicAccess$2(resourceInfo, options);
    }
    return null;
}

var universal_v2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getAgentAccess: getAgentAccess,
  setAgentAccess: setAgentAccess,
  getAgentAccessAll: getAgentAccessAll,
  getPublicAccess: getPublicAccess,
  setPublicAccess: setPublicAccess,
  getAccessFor: getAccessFor,
  getAccessForAll: getAccessForAll,
  setAccessFor: setAccessFor
});

export { FetchError, SolidClientError, ThingExpectedError, universal as access, universal_v1 as access_v1, universal_v2 as access_v2, acp_v1, acp_v2, acp_v3, acp_v4, addBoolean, addDate, addDatetime, addDecimal, addInteger, addIri, addJwkToJwks, addLiteral, addMockFallbackAclTo, addMockResourceAclTo, addNamedNode, addPublicKeyToProfileJwks, addStringEnglish, addStringNoLocale, addStringWithLocale, addTerm, addTime, addUrl, asIri, asUrl, buildThing, changeLogAsMarkdown, createAcl, createAclFromFallbackAcl, createContainerAt, createContainerInContainer, createSolidDataset, createThing, deleteAclFor, deleteContainer, deleteFile, deleteSolidDataset, fromRdfJsDataset, getAgentAccess$3 as getAgentAccess, getAgentAccessAll$3 as getAgentAccessAll, getAgentDefaultAccess, getAgentDefaultAccessAll, getAgentResourceAccess, getAgentResourceAccessAll, getBoolean, getBooleanAll, getContainedResourceUrlAll, getContentType$1 as getContentType, getDate, getDateAll, getDatetime, getDatetimeAll, getDecimal, getDecimalAll, getEffectiveAccess, getFallbackAcl, getFile, getFileWithAcl, getGroupAccess$2 as getGroupAccess, getGroupAccessAll$2 as getGroupAccessAll, getGroupDefaultAccess, getGroupDefaultAccessAll, getGroupResourceAccess, getGroupResourceAccessAll, getInteger, getIntegerAll, getIri, getIriAll, getLinkedResourceUrlAll, getLiteral, getLiteralAll, getNamedNode, getNamedNodeAll, getPodOwner, getProfileJwksIri, getPropertyAll, getPublicAccess$3 as getPublicAccess, getPublicDefaultAccess, getPublicResourceAccess, getResourceAcl, getResourceInfo, getResourceInfoWithAcl, getSolidDataset, getSolidDatasetWithAcl, getSourceIri, getSourceUrl, getStringByLocaleAll, getStringEnglish, getStringEnglishAll, getStringNoLocale, getStringNoLocaleAll, getStringWithLocale, getStringWithLocaleAll, getTerm, getTermAll, getThing, getThingAll, getTime, getTimeAll, getUrl, getUrlAll, getWellKnownSolid, hasAccessibleAcl, hasAcl, hasFallbackAcl, hasResourceAcl, hasResourceInfo, hasServerResourceInfo, isContainer, isPodOwner, isRawData, isThing, isThingLocal, mockContainerFrom, mockFetchError, mockFileFrom, mockSolidDatasetFrom, mockThingFrom, overwriteFile, removeAll, removeBoolean, removeDate, removeDatetime, removeDecimal, removeInteger, removeIri, removeLiteral, removeNamedNode, removeStringEnglish, removeStringNoLocale, removeStringWithLocale, removeThing, removeTime, removeUrl, responseToResourceInfo, responseToSolidDataset, saveAclFor, saveFileInContainer, saveSolidDatasetAt, saveSolidDatasetInContainer, setAgentDefaultAccess, setAgentResourceAccess$1 as setAgentResourceAccess, setBoolean, setDate, setDatetime, setDecimal, setGroupDefaultAccess, setGroupResourceAccess$1 as setGroupResourceAccess, setInteger, setIri, setLiteral, setNamedNode, setProfileJwks, setPublicDefaultAccess, setPublicResourceAccess$1 as setPublicResourceAccess, setStringNoLocale, setStringWithLocale, setTerm, setThing, setTime, setUrl, solidDatasetAsMarkdown, thingAsMarkdown, toRdfJsDataset };
