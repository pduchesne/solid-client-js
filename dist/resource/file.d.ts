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
/// <reference types="node" />
import { File, UploadRequestInit, WithResourceInfo, Url, UrlString, WithServerResourceInfo } from "../interfaces";
/**
 * Options when fetching a file from a Pod.
 *
 * Available options:
 * - `fetch`: A custom `fetch` function with the same signature as
 *   [`window.fetch`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch).
 *   This will be used to execute the actual requests. This option can be used to, for example,
 *   attach credentials to requests that need authentication.
 */
export declare type GetFileOptions = {
    fetch: typeof window.fetch;
    /** @internal */
    init: UploadRequestInit;
};
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
export declare function getFile(input: Url | UrlString, options?: Partial<GetFileOptions>): Promise<File & WithServerResourceInfo>;
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
export declare function deleteFile(file: Url | UrlString | WithResourceInfo, options?: Partial<GetFileOptions>): Promise<void>;
/**
 * ```{note} This type is still experimental and subject to change, even in a
 * non-major release.
 * ```
 * Options available when saving a file (extends the options available when
 * writing a file: [[WriteFileOptions]]).
 *
 */
declare type SaveFileOptions = WriteFileOptions & {
    /**
     * This option can be used as a hint to the server in how to name a new file.
     * Note: the server is still free to choose a completely different, unrelated
     * name if it chooses.
     */
    slug?: string;
};
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
export declare function saveFileInContainer<FileExt extends File | Buffer>(folderUrl: Url | UrlString, file: FileExt, options?: Partial<SaveFileOptions>): Promise<FileExt & WithResourceInfo>;
/**
 * ```{note} This function is still experimental and subject to change, even in a non-major release.
 * ```
 *
 * Options available when writing a file.
 */
export declare type WriteFileOptions = GetFileOptions & {
    /**
     * Allows a file's content type to be provided explicitly, if known. Value is
     * expected to be a valid
     * [media type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type).
     * For example, if you know your file is a JPEG image, then you should provide
     * the media type `image/jpeg`. If you don't know, or don't provide a media
     * type, a default type of `application/octet-stream` will be applied (which
     * indicates that the file should be regarded as pure binary data).
     */
    contentType: string;
};
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
export declare function overwriteFile<FileExt extends File | Buffer>(fileUrl: Url | UrlString, file: FileExt, options?: Partial<WriteFileOptions>): Promise<FileExt & WithResourceInfo>;
/**
 * @hidden
 * This function feels unnecessarily complicated, but is required in order to
 * have Headers according to type definitions in both Node and browser environments.
 * This might require a fix upstream to be cleaned up.
 *
 * @param headersToFlatten A structure containing headers potentially in several formats
 */
export declare function flattenHeaders(headersToFlatten: Headers | Record<string, string> | string[][] | undefined): Record<string, string>;
export {};
