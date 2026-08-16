import z from "zod";

export const articleFormValidation = z
    .object({
        title: z
            .string()
            .min(5, "Title must be at least 5 characters"),

        hook: z
            .string()
            .max(120, "Hook must be under 120 characters")
            .optional(),

        insights: z
            .array(
                z
                    .string()
                    .max(120, "Insight too long")
            )
            .max(5, "Maximum 5 insights allowed")
            .optional(),

        level: z
            .enum(["Beginner", "Intermediate", "Advanced"])
            .default("Beginner"),

        content: z
            .object({})
            .passthrough()
            .optional(),

        isPublished: z
            .boolean()
            .default(false),

        coverImage: z
            .string()
            .url("Invalid image URL")
            .nullable()
            .optional(),

        tags: z
            .array(z.string())
            .default([]),

        seriesPartOf: z
            .string()
            .transform((value) => value || undefined)
            .optional(),
    })
    .superRefine((data, ctx) => {
        if (!data.isPublished) {
            return;
        }


        if (!data.hook?.trim()) {
            ctx.addIssue({
                code: "custom",
                path: ["hook"],
                message: "Hook is required when publishing",
            });
        } else if (data.hook.trim().length < 10) {
            ctx.addIssue({
                code: "custom",
                path: ["hook"],
                message: "Hook must be at least 10 characters",
            });
        }


        if (!data.insights || data.insights.length === 0) {
            ctx.addIssue({
                code: "custom",
                path: ["insights"],
                message: "At least one insight is required when publishing",
            });
        }

        data.insights?.forEach((insight, index) => {
            if (insight.trim().length < 10) {
                ctx.addIssue({
                    code: "custom",
                    path: ["insights", index],
                    message: "Insight must be at least 10 characters",
                });
            }
        });


        if (!data.content || Object.keys(data.content).length === 0) {
            ctx.addIssue({
                code: "custom",
                path: ["content"],
                message: "Content is required when publishing",
            });
        }
    });