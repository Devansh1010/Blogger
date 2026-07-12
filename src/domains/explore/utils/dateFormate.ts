export const formatDate = (date?: Date) => {
    if (!date || !new Date(date)) return "Recently";

    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    })
};