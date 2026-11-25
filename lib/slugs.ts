/** URL slug helpers shared by the list pages and the [slug] detail pages. */

export function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Slug for an experience, education or leadership entry: "<title>-<org>". */
export function entrySlug(title: string, org: string) {
  return slugify(`${title}-${org}`);
}

/** Slug for an interest page. */
export function interestSlug(name: string) {
  return slugify(name);
}
