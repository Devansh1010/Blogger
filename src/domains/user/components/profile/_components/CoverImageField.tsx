'use client'

import UploadImage, { ImageKitData } from "@/components/Imagekit/ImageUpload";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Controller, useFormContext } from "react-hook-form";

const CoverImageFormField = () => {
    const { control } = useFormContext();

    return (
        <Controller
            name="coverImage"
            control={control}
            render={({ field, fieldState }) => (
                <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">
                        Cover Image
                    </label>

                    <div className="overflow-hidden rounded-2xl border-2 border-dashed border-border/60 bg-secondary/10">

                        {!field.value ? (
                            <div className="relative flex h-52 flex-col items-center justify-center bg-linear-to-r from-slate-800 via-slate-700 to-slate-900">

                                <UploadImage
                                    onUploadSuccess={(data: ImageKitData) => {
                                        field.onChange({
                                            url: data.url,
                                        });
                                    }}
                                />

                                <p className="mt-4 text-sm font-semibold text-white">
                                    Upload Cover Image
                                </p>

                                <p className="text-xs text-slate-300">
                                    Recommended: 1500 × 500
                                </p>
                            </div>
                        ) : (
                            <div className="group relative h-56">

                                {
                                    field.value.url ?
                                        (<Image
                                            src={field.value.url}
                                            alt="Cover"
                                            fill
                                            className="object-cover transition duration-500 group-hover:scale-105"
                                        />) :
                                        (
                                            <p>No CoverImage</p>
                                        )
                                }

                                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition-all duration-300 group-hover:opacity-100">

                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            field.onChange(null);
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                            PNG, JPG or WEBP. Maximum 5MB.
                        </p>

                        {fieldState.error && (
                            <p className="text-[11px] font-bold text-destructive animate-pulse">
                                {fieldState.error.message}
                            </p>
                        )}
                    </div>
                </div>
            )}
        />
    );
};

export default CoverImageFormField;