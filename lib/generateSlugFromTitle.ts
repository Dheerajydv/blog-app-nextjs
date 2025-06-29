const generateSlugFromTitle = (title: string): string => {
    let generatedSlug = title.toLowerCase();

    // Replace special characters with their ASCII equivalents (e.g., 'á' to 'a').
    // This step is important for international characters to be handled correctly.
    generatedSlug = generatedSlug
        .normalize("NFD") // Normalize the string to decomposed form
        .replace(/[\u0300-\u036f]/g, ""); // Remove diacritics (combining diacritical marks)

    // Replace any non-alphanumeric characters (except hyphens and spaces) with a hyphen.
    // This regular expression keeps letters, numbers, and spaces.
    generatedSlug = generatedSlug.replace(/[^a-z0-9\s-]/g, "");

    // Replace spaces and underscores with a single hyphen.
    generatedSlug = generatedSlug.replace(/[\s_]+/g, "-");

    // Remove leading and trailing hyphens.
    generatedSlug = generatedSlug.replace(/^-+|-+$/g, "");

    return generatedSlug;
}

export default generateSlugFromTitle;