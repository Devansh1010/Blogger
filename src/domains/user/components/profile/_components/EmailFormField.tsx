'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const EmailFormField = ({ mutationPendding }: { mutationPendding: boolean }) => {
    const [emailDisabled, setEmailDisabled] = useState<boolean>(true)

    const { control } = useFormContext()

    return (
        <div>
            <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">
                            Email Address
                        </label>

                        {/* 1. Added 'group' and 'relative' to the container */}
                        <div className="relative group">
                            <Input
                                {...field}
                                disabled={emailDisabled || mutationPendding}
                                className="bg-secondary/30 border-border/50 focus:ring-primary/20 h-12 rounded-xl pr-12 transition-all duration-300"
                                placeholder="name@company.com"
                            />

                            {/* 2. The Pencil Button */}
                            <Button
                                type="button"
                                className="absolute right-3 top-1 p-2 rounded-lg
                                hover:text-foreground hover:bg-background/50
                               opacity-0 group-hover:opacity-100 cursor-pointer"
                                onClick={() => setEmailDisabled((prev) => !prev)}
                            >


                                <Pencil size={16} strokeWidth={2} />
                            </Button>
                        </div>

                        {fieldState.error && (
                            <p className="text-xs text-destructive font-medium">
                                {fieldState.error.message}
                            </p>
                        )}
                    </div>
                )}
            />
        </div>
    )
}

export default EmailFormField