export function slugify(text) {
  return String(text)
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Returns a slug for `name` that no other document in `Model` uses. */
export async function uniqueSlug(Model, name, excludeId) {
  const base = slugify(name) || "item";
  let candidate = base;
  for (let n = 2; ; n += 1) {
    const filter = { slug: candidate };
    if (excludeId) filter._id = { $ne: excludeId };
    if (!(await Model.exists(filter))) return candidate;
    candidate = `${base}-${n}`;
  }
}
