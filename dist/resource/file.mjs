import { fetch } from '../fetcher.mjs';
import { hasResourceInfo } from '../interfaces.mjs';
import { internal_toIriString } from '../interfaces.internal.mjs';
import { FetchError, getSourceIri } from './resource.mjs';
import { internal_isUnsuccessfulResponse, internal_parseResourceInfo, internal_cloneResource } from './resource.internal.mjs';

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

export { deleteFile, flattenHeaders, getFile, overwriteFile, saveFileInContainer };
