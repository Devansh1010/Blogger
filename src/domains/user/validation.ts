import z from "zod";

const ImageSchema = z.object({
    url: z.string().url(),
    id: z.string().optional(),
    name: z.string().optional()
});

const selectedBadges = z
    .array(z.string())
    .max(3, {
        message: "You can select a maximum of 3 badges",
    })
    .refine(
        (badges) => new Set(badges).size === badges.length,
        {
            message: "Duplicate badges are not allowed",
        }
    )
    .optional()

export const updateUserSchema = z.object({
    username: z.string()
        .min(2, { message: 'Minimum 2 characters required in Username' })
        .max(20, { message: 'Max 20 characters allowed in the Username' })
        .regex(/^[a-zA-Z0-9_]+$/, { message: 'Special characters are not allowed' })
        .optional(),

    email: z
        .string()
        .optional(),

    profileImage: ImageSchema.nullable().optional(),

    coverImage: ImageSchema.nullable().optional(),

    selectedBadges: selectedBadges
})

export type ProfileFormValues = z.infer<typeof updateUserSchema>;