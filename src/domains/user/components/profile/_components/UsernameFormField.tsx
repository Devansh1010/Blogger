'use client'
import { Input } from '@/components/ui/input'
import { UsernameFieldProps } from '@/domains/user/type'
import { Controller, useFormContext } from 'react-hook-form'

const UsernameFormField = ({ mutationPending, usernameData, debouncedValue, currentUsername }: UsernameFieldProps) => {
    const { control } = useFormContext()
    return (
        <div>
            <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">
                            Username
                        </label>
                        <Input
                            {...field}
                            disabled={mutationPending}
                            className="bg-secondary/30 border-border/50 focus:ring-primary/20 h-12 rounded-xl"
                            placeholder="e.g. janesmith_dev"
                            onChange={(e) => {
                                field.onChange(e)
                            }}
                        />
                        {fieldState.error && (
                            <p className="text-xs text-destructive font-medium">
                                {fieldState.error.message}
                            </p>
                        )}
                        
                        {
                            currentUsername != debouncedValue && (
                                usernameData?.message === 'Username Available' ?
                                    <p className='text-green-500'>
                                        Username Available
                                    </p> :
                                    <p className='text-red-500'>
                                        Usename not Available
                                    </p>
                            ) 
                        }
                    </div>
                )}
            />
        </div>
    )
}

export default UsernameFormField
