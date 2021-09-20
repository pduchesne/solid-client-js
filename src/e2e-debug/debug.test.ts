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

import { describe, it, expect } from "@jest/globals";
import { rdf } from "../constants";
import { addIri, getIri, getIriAll, getSolidDataset, getThing } from "../index";

describe("End-to-end test of API usage scenarii", () => {
  it("starts from a clean dataset", async () => {
    const dataset = await getSolidDataset(
      "https://pod.inrupt.com/zwifi/debug/1/profile.ttl"
    );
    const profile = getThing(
      dataset,
      "https://pod.inrupt.com/zwifi/debug/1/profile.ttl#me"
    );
    expect(getIriAll(profile!, rdf.type)).not.toContain(
      "https://example.org/ns#DoggieDoorman"
    );
  });

  it("fetches a dataset, changes a value in it, and writes it back", async () => {
    const dataset = await getSolidDataset(
      "https://pod.inrupt.com/zwifi/debug/1/profile.ttl"
    );
    const profile = getThing(
      dataset,
      "https://pod.inrupt.com/zwifi/debug/1/profile.ttl#me"
    );
    addIri(profile!, rdf.type, "https://example.org/ns#DoggieDoorman");
    const updatedDataset = await getSolidDataset(
      "https://pod.inrupt.com/zwifi/debug/1/profile.ttl"
    );
    const updatedProfile = getThing(
      updatedDataset,
      "https://pod.inrupt.com/zwifi/debug/1/profile.ttl#me"
    );
    expect(getIri(updatedProfile!, rdf.type)).toBe(
      "https://example.org/ns#DoggieDoorman"
    );
  });
});
