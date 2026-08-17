'use client'
import UploadImage, { ImageKitData } from "@/components/Imagekit/ImageUpload";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Controller, useFormContext } from "react-hook-form";

const AvatarFormField = () => {
  const { control } = useFormContext()
  return (
    <div>
      <Controller
        name="profileImage"
        control={control}
        render={({ field, fieldState }) => (
          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">
              Avatar
            </label>
            <div className="flex items-center gap-6 p-4 border-2 border-dashed border-border/60 rounded-2xl bg-secondary/10">
              <div className="relative aspect-square w-full max-w-20 shrink-0">
                {!field.value ? (
                  <div className="w-full h-full rounded-full bg-secondary/40 flex items-center justify-center overflow-hidden border-2 border-border/50">
                    <UploadImage
                      onUploadSuccess={(data: ImageKitData) => {
                        field.onChange({
                          url: data.url
                        });
                      }}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/20 shadow-inner">
                    {
                      field.value.url ?
                      (<Image
                      src={field.value.url}
                      alt="profile"
                      fill
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />) : 
                    (
                      <p>No Profile photo</p>
                    )
                    }
                    {/* Interactive Circular Overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[1px]">
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          field.onChange(null);
                        }}
                        className="text-[10px] font-bold text-black px-2 py-1 rounded-full hover:bg-primary/80 transition-transform active:scale-90"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold">Profile Photo</p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG or GIF. Max 2MB.
                </p>
                {fieldState.error && (
                  <p className="text-[11px] text-destructive font-bold mt-1 animate-pulse">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      />
    </div>
  )
}

export default AvatarFormField